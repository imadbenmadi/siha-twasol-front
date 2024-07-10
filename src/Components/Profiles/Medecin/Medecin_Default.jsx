import { useNavigate } from "react-router";
import { useEffect } from "react";

function Medecin_Default() {
    const Navigate = useNavigate();
    useEffect(() => {
        Navigate("/Medecin/Workers");
    }, []);
}

export default Medecin_Default;
