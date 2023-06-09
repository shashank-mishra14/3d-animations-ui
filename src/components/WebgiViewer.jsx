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
    const [previewMode, setPreviewMode] = useState(false);
    const [isMobile, setIsMobile] = useState(null); 


    useImperativeHandle(ref, () => ({
        triggerPreview() {

            setPreviewMode(true); 

            canvasContainerRef.current.style.pointerEvent="all";
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
            viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled : true });
        },
    }));


    const memoizedScrollAnimation = useCallback(
        (position, targer,isMobile, onUpdate)=>{
            if(position && targer && onUpdate){
                scrollAnimation(position, targer, isMobile, onUpdate);  
            }
        },[] 
    )
    


    const setupViewer= useCallback(async() =>  {

        // Initialize the viewer
        const viewer = new ViewerApp({
            canvas: canvasRef.current,
        })
        
        setViewerRef(viewer);
        const isMobileOrTablet =mobileAndTabletCheck();
        setIsMobile(isMobileOrTablet);
        setCameraRef(camera);
        setPostionRef(position);
        setTargetRef(target);
        
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

        if(isMobileOrTablet){
            position.set(-16.7,1.17,11.7);
            target.set(0,1.37,0);
            props.contentRef.current.className = "mobile-or-tablet";

        }
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
    
        memoizedScrollAnimation(postion, target, isMobileOrTablet,onUpdate);
    },[]);

    useEffect(()=>{
        setupViewer();
    },[]);

    const handleExit = useCallback(()=>{
        setPreviewMode(false);
        canvasContainerRef.current.style.pointerEvent="none";
        props.contentRef.current.style.opacity="1"
        viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled : false });
        setPreviewMode(false);

        gsap.to(positionRef,{                    // the "to" method tell us the parameters that are going to be changed.//
            x: 1.56,
            y:5.0,
            z:0.01,    
            scrollTrigger:{
                trigger:' .display-section',
                start: "top bottom",
                end:"top top",
                scrub:2,
                immediateRender:false
            },
            onUpdate  : () =>{
                viewerRef.setDirty();
                cameraRef.postionTargetUpdated(true);   
            },
        });
        gsap.to(targetRef,{  
            x:-0.55,
            y:0.32,
            z:0.0,    
            scrollTrigger:{
                trigger:' .display-section',
                start: "top bottom",
                end:"top top",
                scrub:2,
                immediateRender:false
            },
        });
    },[ cameraRef, positionRef, targetRef, viewerRef,canvasContainerRef]);

    const canvasRef= useRef(null);
    return (  
    <div ref={canvasContainerRef}id="webgi-canvas-container"> 
    <canvas id="webgi-canvas" ref={canvasRef}/>
        {
            previewMode && (
                <button className="button" onClick={handleExit}>Exit</button>
            )
        }
    </div>
    );
}); 

export default WebgiViewer;