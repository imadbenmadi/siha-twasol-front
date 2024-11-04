import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FaRegImage } from "react-icons/fa";
import { useAppContext } from "../../../../AppContext";

dayjs.extend(customParseFormat);

function BlogsFeed() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const { user } = useAppContext();

    useEffect(() => {
        setLoading(true);
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Workers/${user.id}/${user.companyId}/Blogs`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    setBlogs(response.data.blogs || []);
                } else if (response.status === 401) {
                    Swal.fire("خطأ", "يرجى تسجيل الدخول مرة أخرى", "error");
                    navigate("/Login");
                } else {
                    setError(response.data.message || "حدث خطأ.");
                }
            } catch (error) {
                setError("فشل في جلب البيانات. حاول مرة أخرى.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [navigate, user.id, user.companyId]);

    const filteredBlogs = blogs.filter((blog) => {
        const title = blog?.Title.toLowerCase();
        const description = blog?.Description?.toLowerCase() || "";
        return (
            title.includes(searchQuery.toLowerCase()) ||
            description.includes(searchQuery.toLowerCase())
        );
    });

    if (loading) {
        return (
            <div className="w-[80vw] h-[80vh] flex items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-[80vw] h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">{error}</div>
            </div>
        );
    }

    return (
        <div className="py-6 px-4">
            <div className="text-xl font-semibold text-blue_v mb-4">
                المقالات
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start text-gray_v mb-6">
                <div className="border p-2 rounded-md flex items-center gap-2 text-sm font-semibold min-w-[300px]">
                    <IoSearch className="w-fit shrink-0" />
                    <input
                        type="text"
                        placeholder="ابحث عن المقال"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full placeholder:text-end text-end"
                    />
                </div>
                <Link
                    to={"/Worker/Blogs/Add"}
                    className="py-2 px-4 rounded bg-blue_v text-white cursor-pointer font-semibold text-sm"
                >
                    اضافة مقال جديد
                </Link>
            </div>

            {filteredBlogs.length === 0 ? (
                <div className="flex justify-center items-center flex-col gap-6 mt-12">
                    <div className="text-center font-semibold text-sm text-gray_v">
                        لا توجد مقالات تطابق بحثك
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBlogs.map((blog) => (
                        <div
                            key={blog.id}
                            className="border rounded-lg shadow-md overflow-hidden bg-white"
                        >
                            <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                                {blog.image_link ? (
                                    <img
                                        src={`http://localhost:3000${blog.image_link}`}
                                        alt="Blog"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <FaRegImage className="text-6xl text-gray-400" />
                                )}
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-bold mb-2 text-gray-800">
                                    {blog.Title}
                                </h2>
                                <p className="text-sm text-gray-500 mb-4">
                                    {dayjs(blog.createdAt).format(
                                        "DD MMMM YYYY"
                                    )}
                                </p>
                                <p className="text-gray-700 mb-4">
                                    {blog.Description.length > 100
                                        ? `${blog.Description.slice(0, 100)}...`
                                        : blog.Description}
                                </p>
                                <Link
                                    to={`/Worker/Blogs/${blog.id}`}
                                    className="text-blue-500 hover:underline font-semibold"
                                >
                                    قراءة المزيد
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BlogsFeed;
