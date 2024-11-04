import React from "react";
import dayjs from "dayjs";

function BlogsSection({ blogs }) {
    if (!blogs || blogs.length === 0) {
        return <p>لا توجد مقالات</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
                <div
                    key={blog.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
                >
                    {blog.image_link ? (
                        <img
                            src={`http://localhost:3000${blog.image_link}`}
                            alt="Blog"
                            className="w-full h-40 object-cover"
                        />
                    ) : (
                        <div className="w-full h-40 bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-500">
                                صورة غير متوفرة
                            </span>
                        </div>
                    )}
                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-2">{blog.Title}</h3>
                        <p className="text-gray-600 text-sm mb-2">
                            {dayjs(blog.createdAt).format("DD MMMM YYYY")}
                        </p>
                        <p className="text-gray-700 mb-4">
                            {blog.Description.length > 100
                                ? `${blog.Description.substring(0, 100)}...`
                                : blog.Description}
                        </p>
                        <Link
                            to={`/companies/${blog.companyId}/blogs/${blog.id}`}
                            className="text-blue-500 hover:underline font-semibold"
                        >
                            اقرأ المزيد
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BlogsSection;
