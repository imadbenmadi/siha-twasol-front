import { useNavigate } from "react-router";
import { useEffect } from "react";

function Worker_Default() {
    const Navigate = useNavigate();
    useEffect(() => {
        Navigate("/Worker/Workers");
    }, []);
}

export default Worker_Default;
