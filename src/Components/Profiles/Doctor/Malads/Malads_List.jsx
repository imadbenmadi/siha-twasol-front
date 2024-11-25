import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../../AppContext";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function List() {
    const { user } = useAppContext();

    const location = useLocation();
    const id = location.pathname.split("/")[3];
    const [malads, setMalads] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredCompanies, setFilteredCompanies] = useState([]);

    // Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchMalads = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Doctors/${user.id}/Malads`,
                    { withCredentials: true, validateStatus: () => true }
                );

                setMalads(response.data);
                setLoading(false);

                if (Array.isArray(response.data)) {
                    setMalads(response.data);
                    setFilteredCompanies(response.data);

                    // Extract unique locations for filter options
                    // const uniqueLocations = [
                    //     ...new Set(
                    //         response.data.map((malad) => malad?.Location)
                    //     ),
                    // ];
                    // setLocations(uniqueLocations);
                } else {
                    setMalads([]);
                    setFilteredCompanies([]);
                }
            } catch (error) {
                setError("حدث خطأ أثناء تحميل بيانات المريض.");
            } finally {
                setLoading(false);
            }
        };
        fetchMalads();
    }, [id, user.id]);
    useEffect(() => {
        const filtered = malads.filter((company) => {
            // const matchesType = typeFilter
            //     ? company?.Type === typeFilter
            //     : true;
            // const matchesLocation = locationFilter
            //     ? company?.Location === locationFilter
            //     : true;
            const matchesSearch = company?.Name.toLowerCase().includes(
                searchQuery.toLowerCase()
            );

            return matchesType && matchesLocation && matchesSearch;
        });

        setFilteredCompanies(filtered);
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

                {/* Type Filter */}
                {/* <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="p-2 border rounded-md shadow-sm"
                >
                    <option value="">نوع المريض"</option>
                    <option value="CHU">CHU</option>
                    <option value="Clinic">Clinic</option>
                </select> */}

                {/* Location Filter */}
                {/* <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="p-2 border rounded-md shadow-sm"
                >
                    <option value="">الموقع</option>
                    {locations.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </select> */}
            </div>

            {/* Companies Table */}
            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="table-auto w-full text-center border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 font-medium">
                            <th className="px-6 py-4">الاسم</th>
                            <th className="px-6 py-4 border-l border-gray-200">
                                الموقع
                            </th>
                            <th className="px-6 py-4 border-l border-gray-200">
                                الولاية
                            </th>
                            <th className="px-6 py-4 border-l border-gray-200">
                                نوع المريض"
                            </th>
                            <th className="px-6 py-4 border-l border-gray-200">
                                عدد الاطباء
                            </th>
                            <th className="px-6 py-4 border-l border-gray-200">
                                عرض
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(filteredCompanies) &&
                        filteredCompanies.length > 0 ? (
                            filteredCompanies.map((company) => (
                                <tr
                                    key={company?.id}
                                    className="border-t border-gray-200 hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 font-semibold text-gray-700">
                                        {company?.Name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {company?.Location}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {company?.Wilaya}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {company?.Type}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {company?.Doctors.length}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/Malad/Companies/${company?.id}`}
                                            className="py-1 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                                        >
                                            عرض
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-6 text-gray-500">
                                    لا توجد شركات مطابقة
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
