import React, { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";

function BlogsSection() {
    const { company } = useOutletContext();
    const [blogs, setBlogs] = useState(company?.Blogs);

    useEffect(() => {
        setBlogs(company?.Blogs);
    }, [company]);

    if (!blogs || blogs.length === 0) {
        return <div>لا توجد فعاليات متاحة لهذه الشركة.</div>;
    }

    return (
        <div className="p-6">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">الفعاليات</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </ul>
        </div>
    );
}

function BlogCard({ blog }) {
    const { company } = useOutletContext();

    return (
        <li className="border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
            {/* Blog Image */}
            <img
                src={`http://localhost:3000/${blog.image_link}`}
                alt={blog.Title}
                className="w-full h-48 object-cover rounded-t-lg"
            />

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
                    {blog.Description.substring(0, 100)}...
                </p>

                {/* Link to Blog Detail */}
                <Link
                    to={`/Malad/Companies/${company.id}/Blogs/${blog.id}`}
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
