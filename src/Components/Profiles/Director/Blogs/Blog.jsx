import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useAppContext } from "../../../../AppContext";
import { useLocation } from "react-router";

dayjs.extend(customParseFormat);

function Blog() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAppContext();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const blogId = location.pathname.split("/")[3];

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Directors/${user.id}/${user.companyId}/Blogs/${blogId}`,
                    { withCredentials: true, validateStatus: () => true }
                );

                if (response.status === 200) {
                    setBlog(response.data.User);
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

    const handleDelete = () => {
        Swal.fire({
            title: "هل أنت متأكد؟",
            text: "لن تتمكن من استعادة هذا العنصر!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "نعم، احذفه!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setDeleteLoading(true);
                try {
                    const response = await axios.delete(
                        `http://localhost:3000/Directors/${user.id}/${user.companyId}/Blogs/${blogId}`,
                        { withCredentials: true, validateStatus: () => true }
                    );

                    if (response.status === 200) {
                        Swal.fire(
                            "تم الحذف!",
                            "تم حذف العامل بنجاح.",
                            "success"
                        );
                        navigate("/Director/Blogs");
                    } else {
                        Swal.fire(
                            "خطأ",
                            response.data.message || "Failed to delete blog.",
                            "error"
                        );
                    }
                } catch (deleteError) {
                    Swal.fire(
                        "خطأ",
                        deleteError.message || "Failed to delete blog.",
                        "error"
                    );
                } finally {
                    setDeleteLoading(false);
                }
            }
        });
    };

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
                        لم يتم العثور على العامل
                    </p>
                    <Link
                        to="/Director/Blogs"
                        className="py-2 px-4 bg-blue_v text-white rounded-md font-semibold text-sm"
                    >
                        الرجوع إلى قائمة العمال
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="py-6 px-4">
            <h2 className="text-xl font-semibold text-blue_v mb-6 text-center">
                معلومات العامل
            </h2>
            <div className="border p-6 rounded-lg bg-gray-50 shadow-lg max-w-3xl mx-auto">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">
                        الاسم الكامل:
                    </h3>
                    <p className="text-gray-700">{`${blog.firstName} ${blog.lastName}`}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">
                        البريد الإلكتروني:
                    </h3>
                    <p className="text-gray-700">{blog.email}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">القسم:</h3>
                    <p className="text-gray-700">
                        {blog.Service?.Name || "غير محدد"}
                    </p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">
                        تاريخ الإنشاء:
                    </h3>
                    <p className="text-gray-700">
                        {dayjs(blog.createdAt).format("DD MMMM YYYY")}
                    </p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">المؤسسة:</h3>
                    <p className="text-gray-700">
                        {blog.Company?.Name || "غير محدد"}
                    </p>
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <Link
                        to={`/Director/Blogs/${blog.id}/Edit`}
                        className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        تعديل
                    </Link>
                    <button
                        onClick={handleDelete}
                        disabled={deleteLoading}
                        className={`py-2 px-4 rounded-md text-white ${
                            deleteLoading
                                ? "bg-gray-400"
                                : "bg-red-500 hover:bg-red-600"
                        }`}
                    >
                        {deleteLoading ? "جاري الحذف..." : "حذف"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Blog;
