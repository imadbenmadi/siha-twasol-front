import { Link } from "react-router-dom";
import Logo from "../../../../../public/Logo.png";
import message_icon from "../../../../../public/message.png";
import user_default from "../../../../../public/user_default2.png";
import { useEffect, useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { useAppContext } from "../../../../AppContext";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import axios from "axios";
function Laptop_Nav_Items({ Active_nav, handleLogout, LogoutClicked }) {
    const Navigate = useNavigate();
    const { user, Notifications, set_Messages } = useAppContext();
    const [ProfileClicked, setProfileClicked] = useState(false);
    const toogleProfile = () => {
        setopen_Notifications(false);
        setProfileClicked(!ProfileClicked);
    };
    const [open_Notifications, setopen_Notifications] = useState(false);
    const toogleopen_Notifications = () => {
        setProfileClicked(false);
        setopen_Notifications(!open_Notifications);
    };

    const Delete_Notification = (id) => {
        const newNotifications = Notifications.filter(
            (notification) => notification.id !== id
        );
        set_Messages(newNotifications);
        axios.delete(
            `http://localhost:3000/Directors/${user.id}/Notifications/${id}`,

            {
                withCredentials: true,
                validateStatus: () => true,
            }
        );
    };

    return (
        <div className="hidden  md:flex  items-center justify-between mx-2 lg:mx-12  md:text-md lg:text-lg  font-[500] text-black_text h-full p-2 ">
            <div>
                <Link to={"/Director"} className="select-none">
                    <img src={Logo} alt="Logo" className="  w-[50px]  " />
                </Link>
            </div>
            <div className="flex gap-6 lg:gap-14">
                <div
                    className={` ${
                        Active_nav == "Complete_Profile"
                            ? "text-perpol_v"
                            : "text-black_text"
                    } md:hover:text-perpol_v transition-all duration-150  cursor-pointer`}
                >
                    <Link
                        to={"/Director/Complete_Profile"}
                        className={"select-none"}
                    >
                        <span className=" relative">Edite profile</span>
                    </Link>
                </div>

                <div
                    className={` ${
                        Active_nav == "Profile"
                            ? "text-perpol_v"
                            : "text-black_text"
                    } md:hover:text-perpol_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Director/Profile"} className={" select-none"}>
                        Profil
                    </Link>
                </div>

                <div
                    className={` ${
                        Active_nav == "Projects"
                            ? "text-perpol_v"
                            : "text-black_text"
                    } md:hover:text-perpol_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Director/Projects"} className=" select-none">
                        Projects
                    </Link>
                </div>
            </div>
            <div className=" flex items center justify-center gap-5">
                <div className="flex items-center justify-center gap-6 ">
                    {/* <div>
                            <img src={message_icon} alt="" />
                        </div> */}
                    <Link to={"/Malad/Messages"} className="relative">
                        {Notifications?.length > 0 && (
                            <div className=" w-2 h-2 rounded-full bg-red-500 absolute top-0 right-0 "></div>
                        )}
                        <img
                            src={message_icon}
                            alt=""
                            className=" cursor-pointer"
                            onClick={toogleopen_Notifications}
                        />
                    </Link>
                </div>
                <div className=" relative">
                    {user?.profile_pic_link ? (
                        <img
                            src={user.profile_pic_link}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = user_default;
                            }}
                            alt="pic"
                            className=" w-8 cursor-pointer"
                            onClick={toogleProfile}
                        />
                    ) : (
                        <img
                            src={user_default}
                            alt="pic"
                            className=" w-8 cursor-pointer"
                            onClick={toogleProfile}
                        />
                    )}

                    {ProfileClicked ? (
                        <div
                            className="absolute top-10 right-0 bg-white shadow border  
                    rounded-lg p-2 w-40 z-50 flex items-center  flex-col gap-3"
                        >
                            <div
                                className="text-black_text cursor-pointer w-[80px] "
                                onClick={() => {
                                    setProfileClicked(false);
                                }}
                            >
                                <div
                                    className=" select-none flex items-center gap-2 "
                                    onClick={() => {
                                        Navigate("/Director/Profile");
                                        // window.location.href =
                                        //     "/Director/Profile";
                                    }}
                                >
                                    <FiUser className="  text-xl " />
                                    Profil
                                </div>
                            </div>
                            <div className="">
                                {LogoutClicked ? (
                                    <div className="w-full ">
                                        <span className="small-loader font-bold  w-full m-auto"></span>
                                    </div>
                                ) : (
                                    <div
                                        className="cursor-pointer w-full 
                                    flex items-center gap-3 text-red-500"
                                        onClick={() => {
                                            handleLogout();
                                        }}
                                    >
                                        <TbLogout2 className="  text-xl" />
                                        Logout
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : null}
                </div>{" "}
            </div>
        </div>
    );
}

export default Laptop_Nav_Items;
