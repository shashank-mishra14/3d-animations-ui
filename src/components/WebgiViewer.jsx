import React,{useRef} from "react";

function WebgiViewer() {
    const canvasRef= useRef(null);
    return (  
    <div id="webgi-canvas-container"> 
    <canvas id="webgi-canvas" ref={canvasRef}/>
    </div>
    );
}

export default WebgiViewer;