import React from "react";
import Iphone from "../assets/images/iphone-14.jpg";
import HandsIphone from "../assets/images/iphone-hand.png";
function Jumbotron() {

    const HandleLearnMore =()=> {
        const element= document.querySelector(".sound-section")
        window.scrollTo({
            top:element ?.getBoundingClientRect().top,
            left:0,
            behaviour:'smooth'
        });
    }

    return (
        <div className="jumbotron-section wrapper">
            <h2 className="title">New</h2>
            <img className="logo" src={Iphone} alt="Iphone 14 pro" />
            <p className="text">Big and Bigger.</p>
            <span className="desc">
                From $41.62/mo. or $999 before trade-in
            </span>
            <ul className="links">
                <li>
                    <button className="button">Buy</button>
                </li>
                <li>
                    <a className="link" onClick={HandleLearnMore}>Learn more</a>
                </li>
            </ul>
            <img className="iphone-img" src={HandsIphone} alt="iphonehands" />
        </div>
    );
}

export default Jumbotron;