import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useAppContext } from "../../../../AppContext";
import { useLocation } from "react-router";
import { FaRegImage } from "react-icons/fa";

dayjs.extend(customParseFormat);

function Blog() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAppContext();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFullDescription, setShowFullDescription] = useState(false); // Toggle for "Read More"
    const blogId = location.pathname.split("/")[3];

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Malads/${user.id}/Blogs/${blogId}`,
                    { withCredentials: true, validateStatus: () => true }
                );

                if (response.status === 200) {
                    setBlog(response.data.blog);
                } else if (response.status === 401) {
                    Swal.fire("خطأ", "يجب عليك تسجيل الدخول مرة أخرى", "error");
                    navigate("/Login");
                } else {
                    setError(
                        response.data.message || "Error fetching blog data."
                    );
                }
            } catch (fetchError) {
                setError("Failed to fetch blog. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [blogId, user.id, user.companyId, navigate]);

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

    if (!blog) {
        return (
            <div className="py-6 px-4">
                <div className="flex flex-col items-center gap-6 mt-12">
                    <p className="text-center font-semibold text-sm text-red-500 pt-12">
                        لم يتم العثور على المقال
                    </p>
                    <Link
                        to="/Worker/Blogs"
                        className="py-2 px-4 bg-blue_v text-white rounded-md font-semibold text-sm"
                    >
                        الرجوع إلى قائمة المقالات
                    </Link>
                </div>
            </div>
        );
    }

    const descriptionLimit = 100; // Character limit for the truncated description

    return (
        <div className="py-6 px-4">
            <div className="max-w-3xl mx-auto border rounded-lg shadow-lg overflow-hidden bg-white">
                {/* Blog Image */}
                <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
                    {blog.image_link ? (
                        <img
                            src={`http://localhost:3000${blog.image_link}`}
                            alt="Blog Image"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <FaRegImage className="text-6xl text-gray-400" />
                    )}
                </div>

                {/* Blog Content */}
                <div className="p-6">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        {blog.Title}
                    </h1>

                    {/* Date */}
                    <p className="text-gray-500 text-sm mb-4">
                        {dayjs(blog.createdAt).format("DD MMMM YYYY")}
                    </p>

                    {/* Description */}
                    <p className="text-gray-700 mb-4">
                        {showFullDescription ||
                        blog.Description.length <= descriptionLimit
                            ? blog.Description
                            : `${blog.Description.slice(
                                  0,
                                  descriptionLimit
                              )}...`}
                    </p>

                    {/* Read More / Show Less Toggle */}
                    {blog.Description.length > descriptionLimit && (
                        <button
                            onClick={() =>
                                setShowFullDescription(!showFullDescription)
                            }
                            className="text-blue-500 hover:underline font-semibold"
                        >
                            {showFullDescription ? "إظهار أقل" : "قراءة المزيد"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Blog;
