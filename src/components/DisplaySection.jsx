import React from "react";

function DisplaySection() {

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
            left: 0,
        });
    return ( 
        <div className="display-section wrapper">
            <h2 className="title">New</h2>
            <p className="text">Brilliant</p>
            <span className="description">
                A display that's upto 2x brighter in the sun.
            </span>
            <button className="button">Try me!</button>
            <button className="back-button"onClick={handleScrollToTop}>TOP</button>
        </div>
    );
}

export default DisplaySection;