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
import { scrollAnimation } from "../lib/scroll-animaton";

gsap.registerPlugin(ScrollTrigger);

const WebgiViewer = forwardRef((props, ref) => {

    const [postion, setPostion] = useState(null);

    const [viewerRef, setViewerRef] = useState(null);
    const [targetRef, setTargetRef] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [positionRef, setPostionRef] = useState(null);
    const canvasContainerRef = useRef(null);
    useImperativeHandle(ref, () => ({
        triggerPreview() {

            props.contentRef.current.style.opacity="0" 

            gsap.to(positionRef, {
                x: 13.4,
                y: -2.01,
                z:2.29,
                duration: 2,
                onUpdate: () =>{
                    viewerRef.setDirty();
                    cameraRef.postionTargetUpdated(true);   
                }
            })
            gsap.to(targetRef, {x:0.11,y:0.0,z:0.0,duration:2});
        },
    }));


    const memoizedScrollAnimation = useCallback(
        (position, targer, onUpdate)=>{
            if(position && targer && onUpdate){
                scrollAnimation(position, targer, onUpdate);  
            }
        },[] 
    )
    


    const setupViewer= useCallback(async() =>  {

        // Initialize the viewer
        const viewer = new ViewerApp({
            canvas: canvasRef.current,
        })
        
        setViewerRef(viewer);
        setCameraRef(viewer.scene.activeCamera);
        setPostionRef(viewer.scene.activeCamera.position);
        setTargetRef(viewer.scene.activeCamera.target);
        
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

        const onUpdate =()=>{
            needsupdate= true;      //says that camera and the viewer needs to  be updated
            viewer.setDirty();
        }

        viewer.addEventListener("preframe",() =>{
            if(needsupdate){
                camera.positionTargetUpdated(true);
                needsupdate= false;  
            }
        });
    
        memoizedScrollAnimation(postion, target, onUpdate);
    },[]);

    useEffect(()=>{
        setupViewer();
    },[]);

    const canvasRef= useRef(null);
    return (  
    <div ref={canvasContainerRef}id="webgi-canvas-container"> 
    <canvas id="webgi-canvas" ref={canvasRef}/>
    </div>
    );
}); 

export default WebgiViewer;