import React from "react";

function BlogsSection({ blogs }) {
    if (!blogs || blogs.length === 0) {
        return <div>No blogs available for this company.</div>;
    }

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Blogs</h3>
            <ul className="space-y-4">
                {blogs.map((blog) => (
                    <li
                        key={blog.id}
                        className="border p-4 rounded-lg shadow-sm"
                    >
                        <h4 className="text-lg font-semibold">{blog.title}</h4>
                        <p className="text-gray-700">
                            {blog.description || "No description provided"}
                        </p>
                        <p className="text-sm text-gray-500">
                            Published on:{" "}
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BlogsSection;
