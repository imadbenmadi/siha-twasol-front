import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../../../../../AppContext";
function BlogsSection() {
    const { company } = useOutletContext();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAppContext();
    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `http://localhost:3000/Malads/${user.id}/Companies/${company.id}/Blogs`
                );
                setBlogs(response.data.blogs);
            } catch (error) {
                setError("Failed to load blogs. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (company?.id) {
            fetchBlogs();
        }
    }, [company]);

    if (loading) {
        return (
            <div className="w-screen h-screen flex flex-col items-center justify-center">
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

    if (!blogs || blogs.length === 0) {
        return (
            <div className="text-center text-gray-700 mt-10">
                لا توجد مقالات متاحة لهذه الشركة.
            </div>
        );
    }

    return (
        <div className="p-6">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">المقالات</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        companyId={company.id}
                    />
                ))}
            </ul>
        </div>
    );
}

function BlogCard({ blog, companyId }) {
    return (
        <li className="border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
            {/* Blog Image */}
            {blog.image_link && (
                <img
                    src={`http://localhost:3000/${blog.image_link}`}
                    alt={blog.Title}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
            )}

            <div className="p-4">
                {/* Blog Title */}
                <h4 className="text-lg font-semibold text-blue-700 mb-2">
                    {blog.Title}
                </h4>

                {/* Blog Date */}
                <p className="text-sm text-gray-500 mb-2">
                    التاريخ: {new Date(blog.createdAt).toLocaleDateString()}
                </p>

                {/* Blog Description */}
                <p className="text-gray-700 mb-4">
                    {blog.Description?.substring(0, 100)}...
                </p>

                {/* Link to Blog Detail */}
                <Link
                    to={`/Malad/Companies/${companyId}/Blogs/${blog.id}`}
                    className="inline-block mt-4"
                >
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium text-center">
                        اقرأ المزيد
                    </div>
                </Link>
            </div>
        </li>
    );
}

export default BlogsSection;
