import React from "react";
import { useState } from "react";
import Menu_Toogler from "./Menu_Toogler";
import Mobile_Nav_Items from "./Mobile_Nav_Items";
import { Link } from "react-router-dom";
import Logo from "../../../../../public/Logo.png";
import { useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import axios from "axios";
import { useAppContext } from "../../../../AppContext";
import notification_icon from "../../../../../public/Notification.png";

function Mobile_Nav({ Active_nav, handleLogout, LogoutClicked }) {
    const Navigate = useNavigate();
    const [MobileNav_Open, set_MobileNav_Open] = useState(false);
    function Toogle_Menu_Bar({ Active_nav }) {
        set_MobileNav_Open(!MobileNav_Open);
    }
    const [open_Notifications, setopen_Notifications] = useState(false);

    const { user, Notifications, set_Messages } = useAppContext();
    const toogleopen_Notifications = () => {
        setopen_Notifications(!open_Notifications);
    };
    const Delete_Notification = (id) => {
        const newNotifications = Notifications.filter(
            (notification) => notification.id !== id
        );
        set_Notifications(newNotifications);
        axios.delete(
            `http://localhost:3000/Teachers/${user?.id}/Notifications/${id}`,

            {
                withCredentials: true,
                validateStatus: () => true,
            }
        );
    };
    return (
        <div className=" md:hidden relative h-[60px] ">
            <div
                className=" flex gap-5 items-center justify-between mx-3 md:hidden 
            h-full bg-white border-b"
            >
                <div>
                    <img src={Logo} alt="Logo" className=" w-[50px] " />
                </div>
                <div className=" flex items-center justify-center gap-4 md:gap-6">
                    <Menu_Toogler
                        MobileNav_Open={MobileNav_Open}
                        set_MobileNav_Open={set_MobileNav_Open}
                        Toogle_Menu_Bar={Toogle_Menu_Bar}
                    />
                </div>
            </div>
            <Mobile_Nav_Items
                MobileNav_Open={MobileNav_Open}
                Toogle_Menu_Bar={Toogle_Menu_Bar}
                Active_nav={Active_nav}
                handleLogout={handleLogout}
                LogoutClicked={LogoutClicked}
            />
        </div>
    );
}

export default Mobile_Nav;
