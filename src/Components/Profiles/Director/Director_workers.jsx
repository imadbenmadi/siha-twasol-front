import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useAppContext } from "../../../AppContext";
dayjs.extend(customParseFormat);
function Users() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [userTypeFilter, setUserTypeFilter] = useState("");

    const { user } = useAppContext();
    useEffect(() => {
        setLoading(true);
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Directors/${user.id}/${user.companyId}/Workers`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    setUsers(response.data.Users);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                    navigate("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter((user) => {
        const fullName = `${user?.firstName} ${user?.lastName}`.toLowerCase();
        const email = user?.email.toLowerCase();
        return (
            fullName.includes(searchQuery.toLowerCase()) ||
            email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    if (loading) {
        return (
            <div className="w-[80vw] h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error) {
        return (
            <div className="w-[80vw] h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    } else {
        return (
            <div className="py-6 px-4">
                <div className="text-xl font-semibold  text-blue_v">العمال</div>
                <div className="mt-4 flex flex-col md:flex-row gap-4 justify-center md:justify-start md:ml-6 md:gap-6 text-gray_v">
                    <div
                        className="border p-2 mr-4 rounded-md flex items-center justify-between gap-2 text-sm 
                    font-semibold min-w-[300px]"
                    >
                        <IoSearch className="w-fit shrink-0" />
                        <input
                            type="text"
                            placeholder="ابحث عن عامل بالاسم او البريد الالكتروني"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full placeholder:text-end text-end"
                        />
                    </div>
                </div>
                {filteredUsers?.length === 0 ? (
                    <div className="flex justify-center items-center flex-col gap-6">
                        <div className="text-center font-semibold text-sm text-gray_v pt-12  ">
                            لا يوجد عمال
                        </div>
                        <Link
                            to={"/Director/Workers/Add"}
                            className=" py-2 px-4 rounded bg-blue_v text-white cursor-pointer font-semibold text-sm"
                        >
                            اضافة عامل جديد
                        </Link>
                    </div>
                ) : (
                    <table className="table-auto w-full mt-4 text-sm">
                        <thead>
                            <tr className="bg-gray_white font-normal">
                                <th className="px-4 py-2 rounded-tl-md">
                                    Full Name
                                </th>
                                <th className="px-4 py-2 border-l border-white">
                                    Email
                                </th>
                                <th className="px-4 py-2 border-l border-white">
                                    Telephone
                                </th>
                                <th className="px-4 py-2 border-l border-white">
                                    User Type
                                </th>
                                <th className="px-4 py-2 border-l border-white">
                                    Created At
                                </th>
                                {/* <th className="px-4 py-2 border-l border-white rounded-tr-md">
                                    Action
                                </th> */}
                            </tr>
                        </thead>
                        <tbody className="text-xs text-center font-semibold">
                            {filteredUsers?.map((user) => (
                                <tr key={user?.id}>
                                    <td className="border px-4 py-2">{`${user.firstName} ${user.lastName}`}</td>
                                    <td className="border px-4 py-2">
                                        {user?.email}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {user?.telephone}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {user?.userType === "malad" ? (
                                            "Malad"
                                        ) : user?.userType === "medecin" ? (
                                            "medecin"
                                        ) : user?.userType === "worker" ? (
                                            "Worker"
                                        ) : (
                                            <span className=" text-red-500">
                                                not set
                                            </span>
                                        )}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {dayjs(user?.createdAt).format(
                                            "DD MMMM YYYY"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default Users;
