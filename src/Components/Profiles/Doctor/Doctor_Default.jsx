import { useNavigate } from "react-router";
import { useEffect } from "react";

function Doctor_Default() {
    const Navigate = useNavigate();
    useEffect(() => {
        Navigate("/Doctor/Workers");
    }, []);
}

export default Doctor_Default;
