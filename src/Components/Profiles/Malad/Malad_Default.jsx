import { useNavigate } from "react-router";
import { useEffect } from "react";

function Malad_Default() {
    const Navigate = useNavigate();
    useEffect(() => {
        Navigate("/Malad/Blogs");
    }, []);
}

export default Malad_Default;
