import { Link } from "react-router-dom";
import Logo from "../../../../../public/Logo.png";
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

    return (
        <div className="hidden  md:flex  items-center justify-between mx-2 lg:mx-12  md:text-md lg:text-lg  font-[500] text-black_text h-full p-2 ">
            <div>
                <img src={Logo} alt="Logo" className=" w-[50px]  " />
            </div>
            <div className="flex gap-6 lg:gap-14">
                <div
                    className={` ${
                        Active_nav == "Profile"
                            ? "text-blue_v"
                            : "text-black_text"
                    } md:hover:text-blue_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Doctor/Profile"} className={"select-none"}>
                        <span className=" relative">الحساب</span>
                    </Link>
                </div>

                <div
                    className={` ${
                        Active_nav == "Malads"
                            ? "text-blue_v"
                            : "text-black_text"
                    } md:hover:text-blue_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Doctor/Malads"} className={" select-none"}>
                        المرضى{" "}
                    </Link>
                </div>
                <div
                    className={` ${
                        Active_nav == "ChatRooms"
                            ? "text-blue_v"
                            : "text-black_text"
                    } md:hover:text-blue_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Doctor/ChatRooms"} className=" select-none">
                        المراسلة
                    </Link>
                </div>
                <div
                    className={` ${
                        Active_nav == "Blogs"
                            ? "text-blue_v"
                            : "text-black_text"
                    } md:hover:text-blue_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Doctor/Blogs"} className=" select-none">
                        المقالات
                    </Link>
                </div>
                <div
                    className={` ${
                        Active_nav == "Events"
                            ? "text-blue_v"
                            : "text-black_text"
                    } md:hover:text-blue_v transition-all duration-150  cursor-pointer`}
                >
                    <Link to={"/Doctor/Events"} className=" select-none">
                        الاحداث
                    </Link>
                </div>
            </div>
            <div className=" flex items center justify-center gap-5">
                <div className="flex items-center justify-center gap-6 "></div>
                <div className=" relative">
                    {user?.profile_pic_link ? (
                        <img
                            src={`http://localhost:3000/${user.profile_pic_link}`}
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
                    {open_Notifications ? (
                        <div
                            className="absolute top-10 right-0 bg-white shadow border  
                             rounded-lg   z-50   min-w-[500px] h-[calc(100vh-100px)] overflow-y-auto
                             custom-overflow
                             "
                        >
                            <div className=" text-gray_v py-2 px-7 text-md font-semibold border-b">
                                Notifications
                            </div>
                            <div>
                                {Notifications?.length > 0 ? (
                                    Notifications.map((notification) => (
                                        <div
                                            onClick={() => {
                                                Delete_Notification(
                                                    notification.id
                                                );
                                                Navigate(notification.link);
                                                setopen_Notifications(false);
                                                setProfileClicked(false);
                                            }}
                                            key={notification.id}
                                            className="flex items-center gap-3 py-1 px-3 border-b cursor-pointer hover:bg-gray-100"
                                        >
                                            <div className=" flex gap-2 ">
                                                <IoMdNotificationsOutline className="shrink-0 mt-2" />
                                                <div>
                                                    <div className="text-black_text font-semibold">
                                                        {notification?.title}
                                                    </div>
                                                    <div className="text-gray_v text-sm">
                                                        {notification?.text}
                                                    </div>
                                                    <div className="text-gray_v text-xs pt-1">
                                                        {/* {new Date(
                                                            notification?.createdAt
                                                        ).toLocaleDateString()} */}
                                                        {dayjs(
                                                            notification?.createdAt
                                                        ).format(
                                                            "DD MMMM YYYY"
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-gray_v pt-6 flex-gap-2 ">
                                        No Notifications
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
