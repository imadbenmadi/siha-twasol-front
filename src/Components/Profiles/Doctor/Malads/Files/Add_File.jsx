import React from "react";
import { useState, useEffect } from "react";
import ScrollToTop from "../../../../Shared/ScrollToTop";
function Add_File() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <ScrollToTop />
            <div>hi</div>
        </div>
    );
}

export default Add_File;
