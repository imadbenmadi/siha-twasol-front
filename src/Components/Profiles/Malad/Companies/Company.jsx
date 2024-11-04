import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DoctorsSection from "./Company_Components/DoctorsSection";
import BlogsSection from "./Company_Components/BlogsSection";
import EventsSection from "./Company_Components/EventsSection";
import { useAppContext } from "../../../../AppContext";
function Company() {
    const { user } = useAppContext();
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [activeSection, setActiveSection] = useState("Doctors");
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
                setError("Failed to load company data.");
                setLoading(false);
            }
        };

        fetchCompany();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <div className="flex">
            {/* Sidebar Navigation */}
            <div className="w-1/4 p-4 bg-gray-100 min-h-screen border-r">
                <h2 className="text-xl font-semibold mb-6">Company Details</h2>
                <ul className="space-y-4">
                    <li
                        onClick={() => setActiveSection("Doctors")}
                        className={`cursor-pointer ${
                            activeSection === "Doctors"
                                ? "font-bold text-blue-600"
                                : ""
                        }`}
                    >
                        Doctors
                    </li>
                    <li
                        onClick={() => setActiveSection("Blogs")}
                        className={`cursor-pointer ${
                            activeSection === "Blogs"
                                ? "font-bold text-blue-600"
                                : ""
                        }`}
                    >
                        Blogs
                    </li>
                    <li
                        onClick={() => setActiveSection("Events")}
                        className={`cursor-pointer ${
                            activeSection === "Events"
                                ? "font-bold text-blue-600"
                                : ""
                        }`}
                    >
                        Events
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-6">
                <h2 className="text-2xl font-bold mb-4">{company.Name}</h2>
                <p className="text-gray-700 mb-6">
                    <span className="font-semibold">Location:</span>{" "}
                    {company.Location} |{" "}
                    <span className="font-semibold">Wilaya:</span>{" "}
                    {company.Wilaya} |{" "}
                    <span className="font-semibold">Type:</span> {company.Type}
                </p>

                {/* Render Section Based on Active Tab */}
                {activeSection === "Doctors" && (
                    <DoctorsSection doctors={company.Medecins} />
                )}
                {activeSection === "Blogs" && (
                    <BlogsSection blogs={company.Blogs} />
                )}
                {activeSection === "Events" && (
                    <EventsSection events={company.Events} />
                )}
            </div>
        </div>
    );
}

export default Company;
