<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include "db_connection.php";

$sql="
SELECT   -- get all repos user has access to
  f.folderId as folderId,
  f.title as title,
  f.parentId as parentId,
  f.creationDate as creationDate,
  f.isRepo as isRepo,
  f.public as isPublic,
  f.folderId as rootId
FROM repo_access AS ra
LEFT JOIN folder f ON ra.repoId = f.folderId
WHERE ra.username='$remoteuser' AND ra.removedFlag=0
UNION
SELECT  -- get all personal folders 
  f.folderId as folderId,
  f.title as title,
  f.parentId as parentId,
  f.creationDate as creationDate,
  f.isRepo as isRepo,
  f.public as isPublic,
  fc.rootId as rootId
FROM user_folders AS uf
LEFT JOIN folder f ON uf.folderId = f.folderId
LEFT JOIN folder_content fc ON uf.folderId = fc.childId
WHERE uf.username='$remoteuser'
";

$result = $conn->query($sql); 
$response_arr = array();
$folder_info_arr = array();
$fi_array = array();
$all_fi_array = array();
$repos_arr = array();
if ($result->num_rows > 0){
  while($row = $result->fetch_assoc()){ 
    if ($row["parentId"] == "root") array_push($fi_array, $row["folderId"]);
    if ($row["isRepo"] == 1) array_push($repos_arr,$row["folderId"]);
    array_push($all_fi_array, $row["folderId"]);
    $folder_info_arr[$row["folderId"]] = array(
          "title" => $row["title"],
          "publishDate" => $row["creationDate"],
          "parentId" => $row["parentId"],
          "rootId" => $row["rootId"] == NULL ? $row["folderId"] : $row["rootId"],
          "type" => ($row["isRepo"] == 1)? "repo": "folder",
          "childContent" => array(),
          "childUrls" => array(),
          "childFolders" => array(),
          "isRepo" => ($row["isRepo"] == 1),
          "isPublic" => ($row["isPublic"] == 1)
    );
  }
}

// insert root object into folderInfo
$folder_info_arr["root"] = array(
  "title" => "root",
  "publishDate" => "",
  "parentId" => "root",
  "rootId" => "root",
  "type" => "folder",
  "childContent" => array(),
  "childUrls" => array(),
  "childFolders" => array(),
  "isRepo" => FALSE,
  "isPublic" => TRUE
);


// get children content and folders
$sql="
SELECT 
 fc.folderId as folderId,
 fc.childId as childId,
 fc.childType as childType,
 fc.timestamp as creationDate
FROM folder_content AS fc
WHERE fc.removedFlag=0 AND fc.folderId IN ('".implode("','",$all_fi_array)."')
ORDER BY fc.folderId
";

$result = $conn->query($sql); 

if ($result->num_rows > 0){
  while($row = $result->fetch_assoc()){ 
    if ($row["childType"] == "content") {
      array_push($folder_info_arr[$row["folderId"]]["childContent"], $row["childId"]);
    } else if ($row["childType"] == "folder"){
      array_push($folder_info_arr[$row["folderId"]]["childFolders"], $row["childId"]);
    } else if ($row["childType"] == "url"){
      array_push($folder_info_arr[$row["folderId"]]["childUrls"], $row["childId"]);
    }
  }
}

//Collect users who can access repos
foreach ($repos_arr as $repoId){
  $sql = "
  SELECT 
u.firstName AS firstName,
u.lastName AS lastName,
u.username AS username,
u.email AS email,
ra.owner AS owner
FROM repo_access AS ra
LEFT JOIN user AS u
ON u.username = ra.username
WHERE ra.repoId = '$repoId'
";
$result = $conn->query($sql); 
$users = array();
while($row = $result->fetch_assoc()){ 
  $user_info = array(
    "firstName"=>$row["firstName"],
    "lastName"=>$row["lastName"],
    "username"=>$row["username"],
    "email"=>$row["email"],
    "owner"=>$row["owner"]
  );
  array_push($users,$user_info);
}

$folder_info_arr[$repoId]["user_access_info"] = $users;
}


$response_arr = array(
  "folderInfo"=>$folder_info_arr,
  "folderIds"=>$fi_array,
);

// set response code - 200 OK
http_response_code(200);

// make it json format
echo json_encode($response_arr);
$conn->close();


?>