import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../../AppContext";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
function List() {
    const { user } = useAppContext();

    const location = useLocation();
    const id = location.pathname.split("/")[3];
    const [malads, setMalads] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredMalads, setFilteredMalads] = useState([]);

    // Filters
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        console.log("filteredMalads : ", filteredMalads);
    }, [filteredMalads]);
    useEffect(() => {
        const fetchMalads = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Doctors/${user.id}/Malads/Own`,
                    { withCredentials: true }
                );
                console.log("response : ", response.data);

                setMalads(response.data.malads);
                setFilteredMalads(response.data.malads);
            } catch (error) {
                console.log(error);

                setError("حدث خطأ أثناء تحميل بيانات المريض.");
            } finally {
                setLoading(false);
            }
        };
        fetchMalads();
    }, [id, user.id]);

    useEffect(() => {
        if (malads) {
            const filtered = malads.filter((malad) => {
                if (!malad) return false; // Safeguard
                const matchesSearch =
                    (malad?.firstName?.toLowerCase() ?? "").includes(
                        searchQuery.toLowerCase()
                    ) ||
                    (malad?.lastName?.toLowerCase() ?? "").includes(
                        searchQuery.toLowerCase()
                    ) ||
                    (malad?.email?.toLowerCase() ?? "").includes(
                        searchQuery.toLowerCase()
                    );

                return matchesSearch;
            });

            setFilteredMalads(filtered);
        }
    }, [searchQuery, malads]);

    if (loading) return <div>جاري التحميل...</div>;
    if (error) return <div className="text-red-600">{error}</div>;
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold text-center mb-6">
                قائمة المرضى
            </h2>

            {/* Search and filter controls */}
            <div className="flex flex-col md:flex-row gap-4 my-4">
                {/* Search Input */}
                <div className="flex items-center border p-2 rounded-md shadow-sm">
                    <IoSearch className="mr-2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="البحث عن مريض"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full border-none focus:outline-none placeholder-gray-400"
                    />
                </div>
            </div>

            {/* Malads Table */}
            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="table-auto w-full text-center border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 font-medium">
                            <th className="px-6 py-4">البريد الإلكتروني</th>
                            <th className="px-6 py-4 border-l border-gray-200">
                                الاسم
                            </th>
                            <th className="px-6 py-4 border-l border-gray-200">
                                الهاتف
                            </th>
                            <th className="px-6 py-4 border-l border-gray-200">
                                العنوان
                            </th>
                            <th className="px-6 py-4 border-l border-gray-200">
                                الجنس
                            </th>
                            <th className="px-6 py-4 border-l border-gray-200">
                                عرض
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(filteredMalads) &&
                        filteredMalads?.length > 0 ? (
                            filteredMalads.map((malad) => (
                                <tr
                                    key={malad?.id}
                                    className="border-t border-gray-200 hover:bg-gray-50"
                                >
                                    {/* Email */}
                                    <td className="px-6 py-4 text-gray-700">
                                        {malad?.email}
                                    </td>

                                    {/* Name */}
                                    <td className="px-6 py-4 text-gray-700">
                                        {malad?.firstName} {malad?.lastName}
                                    </td>

                                    {/* Telephone */}
                                    <td className="px-6 py-4 text-gray-600">
                                        {malad?.telephone || "غير متوفر"}
                                    </td>

                                    {/* Address */}
                                    <td className="px-6 py-4 text-gray-600">
                                        {malad?.adress || "غير متوفر"}
                                    </td>

                                    {/* Gender */}
                                    <td className="px-6 py-4 text-gray-600">
                                        {malad?.gender || "غير متوفر"}
                                    </td>

                                    {/* Action: View */}
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/Doctor/Malads/Own/${malad?.id}`}
                                            className="py-1 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                                        >
                                            عرض
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-6 text-gray-500">
                                    لا يوجد مرضى مطابقة
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default List;
