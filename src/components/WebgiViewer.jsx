import React,{
    useRef,
    useState,
    useCallback,
    forwardRef,
    useImperativeHandle,
    useEffect
} from "react";
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    mobileAndTabletCheck
} from "webgi";
import  gsap  from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function WebgiViewer() {

    const setupViewer= useCallback(async() =>  {

        // Initialize the viewer
        const viewer = new ViewerApp({
            canvas: canvasRef.current,
        })
    
        // Add some plugins
        const manager = await viewer.addPlugin(AssetManagerPlugin)

        const camera = viewer.scene.activeCamera;
        const position = camera.position;
        const target = camera.target;
        

        await viewer.addPlugin(GBufferPlugin)
         await viewer.addPlugin(new ProgressivePlugin(32))
         await viewer.addPlugin(new TonemapPlugin(true))
        await viewer.addPlugin(GammaCorrectionPlugin)
        await viewer.addPlugin(SSRPlugin)
        await viewer.addPlugin(SSAOPlugin)
        await viewer.addPlugin(BloomPlugin)
    
        // This must be called once after all plugins are added.
        viewer.renderer.refreshPipeline()
    
        await manager.addFromPath("scene-black.glb")

        viewer.getPlugin(TonemapPlugin).config.clipBackground = true;
        viewer.scene.activeCamera.setCameraOptions({ controlsEnabled : false });

        window.scrollTo(0,0);

        let needsupdate = true;

        viewer.addEventListener("preframe",() =>{
            if(needsupdate){
                camera.positionTargetUpdated(true);
                needsupdate= false;  
            }
        });
    
       
    },[]);

    useEffect(()=>{
        setupViewer();
    },[]);

    const canvasRef= useRef(null);
    return (  
    <div id="webgi-canvas-container"> 
    <canvas id="webgi-canvas" ref={canvasRef}/>
    </div>
    );
}

export default WebgiViewer;