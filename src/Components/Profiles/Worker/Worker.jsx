import React from "react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useAppContext } from "../../../AppContext";
import axios from "axios";
import { Outlet } from "react-router";
import NavBar from "./NavBar/NavBar";
import Logo from "../../../../public/Logo.png";

function Worker() {
    const Navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { userId, isAuth, set_user, userType, set_Auth, user, set_Messages } =
        useAppContext();
    useEffect(() => {
        console.log(userType);
    }, [userType]);
    useEffect(() => {
        if (!isAuth || !userId) {
            set_Auth(false);
            Navigate("/Login");
        }
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.scs-tawassolsihi.com/Workers/${userId}/Profile`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                console.log(response.status);
                console.log(response.data);
                if (response.status == 200) {
                    set_user(response.data.User);
                } else {
                    set_Auth(false);
                    Navigate("/Login");
                }
            } catch (error) {
                set_Auth(false);
                Navigate("/Login");
            }
        };
        fetchData().then(() => {
            setLoading(false);
        });
    }, []);
    if (loading)
        return (
            <div className=" w-screen h-screen flex flex-col items-center justify-center">
                <img src={Logo} alt="" className=" w-20 pb-6" />
                <span className="loader"></span>
            </div>
        );
    else
        return (
            <div className="relative h-screen overflow-y-auto custom-overflow overflow-x-hidden ">
                <NavBar />
                <div className=" pt-[60px]">
                    <Outlet />
                </div>
            </div>
        );
}

export default Worker;
