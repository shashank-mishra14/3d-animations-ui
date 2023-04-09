import gsap  from "gsap";

export const  scrollAnimation =(position, target, onUpdate) => {
    const tl = gsap.timeline();

    tl.to(position,{                    // the "to" method tell us the parameters that are going to be changed.//
        x: -3.38,
        y:-10.74,
        z:-5.93,    
        scrollTrigger:{
            trigger:' .sound-section',
            start: "top bottom",
            end:"top top",
            scrub:2,
            immediateRender:false
        },
        onUpdate
    })
    .to(target,{                    // the "to" method tell us the parameters that are going to be changed.//
        x: 1.52,
        y:0.77,
        z:-1.08,    
        scrollTrigger:{
            trigger:' .sound-section',
            start: "top bottom",
            end:"top top",
            scrub:2,
            immediateRender:false
        },
    })
    .to('.jumbotron-section ',{                    // the "to" method tell us the parameters that are going to be changed.//
        opacity:0,  
        scrollTrigger:{
            trigger:' .sound-section',
            start: "top bottom",
            end:"top top",
            scrub:2,
            immediateRender:false
        },
    })
    .to('.sound-section-content ',{                    // the "to" method tell us the parameters that are going to be changed.//
        opacity:1,  
        scrollTrigger:{
            trigger:' .sound-section',
            start: "top bottom",
            end:"top top",
            scrub:2,
            immediateRender:false
        },
    })
}