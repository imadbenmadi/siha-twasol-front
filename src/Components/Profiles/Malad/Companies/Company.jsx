import React, { useState, useEffect } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../../../AppContext";

function Company() {
    const { user } = useAppContext();
    const location = useLocation();
    const id = location.pathname.split("/")[3];
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Malads/${user.id}/Companies/${id}`,
                    { withCredentials: true, validateStatus: () => true }
                );
                setCompany(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching company data:", error);
                setError("حدث خطأ أثناء تحميل بيانات الشركة.");
                setLoading(false);
            }
        };
        fetchCompany();
    }, [id, user.id]);

    if (loading) return <div>جاري التحميل...</div>;
    if (error) return <div className="text-red-600">{error}</div>;

    // Define the base path for easier reference
    const basePath = `/Malad/Companies/${id}`;

    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* Sidebar Navigation */}
            <aside className="w-1/5 bg-white p-6 shadow-md min-h-screen border-r">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    تفاصيل الشركة
                </h2>
                <ul className="space-y-4">
                    <li>
                        <Link
                            to={`${basePath}/Info`}
                            className={`font-medium ${
                                location.pathname === `${basePath}/Info`
                                    ? "text-blue-600 font-bold"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                        >
                            معلومات عامة
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`${basePath}/doctors`}
                            className={`font-medium ${
                                location.pathname === `${basePath}/doctors`
                                    ? "text-blue-600 font-bold"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                        >
                            الأطباء
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`${basePath}/blogs`}
                            className={`font-medium ${
                                location.pathname === `${basePath}/blogs`
                                    ? "text-blue-600 font-bold"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                        >
                            المقالات
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={`${basePath}/events`}
                            className={`font-medium ${
                                location.pathname === `${basePath}/events`
                                    ? "text-blue-600 font-bold"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                        >
                            الأحداث
                        </Link>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="w-4/5 p-8 bg-white shadow-lg rounded-lg mx-6 my-6">
                <Outlet context={company} />{" "}
                {/* This renders the selected child component */}
            </main>
        </div>
    );
}

export default Company;
