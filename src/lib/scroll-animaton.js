import gsap  from "gsap";

export const  scrollAnimation =(position, target, onUpdate) => {
    const tl = gsap.timeline();

    tl.to(position,{                    // the "to" method tell us the parameters that are going to be changed.//
        x,
        y,
        z,    
        scrollTrigger:{
            trigger:' .sound-section',
            start: "top bottom",
            end:"top top",
            scrub:2,
            immediateRender:false
        }

        onUpdate

    })
}