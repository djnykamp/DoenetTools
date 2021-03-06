import React, { useState } from "react";
import ToolLayout from "./ToolLayout/ToolLayout";
import ToolLayoutPanel from "./ToolLayout/ToolLayoutPanel";

const alphabet =
  "a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z a b c d e f g h i j k l m n o p q r s t u v w x y z ";
export default function DoenetExampleTool(props) {

  let [x, setX] = useState(0);
  const panelHeaderControls = [<button>Search</button>];
  const panelHeaderControlsEditor = [<button>Edit</button>]
  const panelHeaderControlsViewer = [<button>Update</button>];

  return (
    <>
      {/* ToolLayout    
         toolName - same tool title in DoenetHeader(can send as props in anytool )
         headingTitle - Header text in middle of Header
         leftPanelWidth - can add width of first child of ToolLayout
            leftPanelWidth= '100' && ! <= 0 && !> 300
            
            rightPanelWidth - can add width of third child if available in ToolLayout
            rightPanelWidth= '200' && ! <= 0 &&  !> 500
              
            leftPanelClose - can be true or false or none - open or close left panel on load
             rightPanelClose  - can be true or false or none - open or close right panel on load
      ) */}
      
      <ToolLayout toolName="Example" headingTitle="Example Heading" leftPanelClose={true} rightPanelClose={false} 
      guestUser = {true}
   
      >
        {/* ToolLayoutPanel 
              panelHeaderControls ( before was menuControls ) - menu controls can be defined & send as prop
              panelName - In small screen panel button's name label
        */}

        <ToolLayoutPanel key="one" panelHeaderControls={panelHeaderControls} panelName="Context Panel" >
          <div>
            {alphabet} {alphabet} {alphabet}{alphabet} {alphabet} {alphabet}{alphabet} {alphabet} {alphabet}
            <button onClick={() => setX(x + 1)}> Count</button>{x}
            <p>test</p>
          </div>
        </ToolLayoutPanel>

        <ToolLayoutPanel key="two" panelHeaderControls={panelHeaderControlsEditor} panelName="Editor">
          <div>
            {alphabet} {alphabet} {alphabet}{alphabet} {alphabet} {alphabet}{alphabet} {alphabet} {alphabet}{alphabet} {alphabet} {alphabet}
          </div>
        </ToolLayoutPanel>

        <ToolLayoutPanel key="three" panelHeaderControls={panelHeaderControlsViewer} panelName="Viewer">
          <div>
            {alphabet} {alphabet} {alphabet}{alphabet} {alphabet} {alphabet}{alphabet} {alphabet} {alphabet}{alphabet} {alphabet} {alphabet}

          </div>
        </ToolLayoutPanel>
      </ToolLayout>
    </>
  );
}

