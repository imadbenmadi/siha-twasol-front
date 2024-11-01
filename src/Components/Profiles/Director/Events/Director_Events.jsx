import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useAppContext } from "../../../../AppContext";

dayjs.extend(customParseFormat);

function Director_events() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { user } = useAppContext();

    useEffect(() => {
        setLoading(true);
        const fetchEvents = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Directors/${user.id}/${user.companyId}/Events`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                if (response.status === 200) {
                    setEvents(response.data.Events);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should log in again", "error");
                    navigate("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const filteredEvents = events.filter((event) =>
        event?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="w-[80vw] h-[80vh] flex flex-col items-center justify-center">
                <span className="loader"></span>
            </div>
        );
    } else if (error) {
        return (
            <div className="w-[80vw] h-screen flex items-center justify-center">
                <div className="text-red-600 font-semibold">
                    {error.message}
                </div>
            </div>
        );
    } else if (!events || events.length === 0) {
        return (
            <div className="py-6 px-4">
                <div className="flex justify-center items-center flex-col gap-6 mt-12">
                    <div className="text-center font-semibold text-sm text-gray_v pt-12">
                        No events found
                    </div>
                    <Link
                        to={"/Director/Events/Add"}
                        className="py-2 px-4 rounded bg-blue_v text-white cursor-pointer font-semibold text-sm"
                    >
                        Add New Event
                    </Link>
                </div>
            </div>
        );
    } else {
        return (
            <div className="py-6 px-1 md:px-4">
                <div className="text-xl font-semibold text-blue_v mb-6">
                    Events
                </div>
                <div className="mt-4 flex flex-col md:flex-row mb-6 gap-4 justify-center md:justify-start md:ml-6 md:gap-6 text-gray_v">
                    <div className="border p-2 mr-4 rounded-md flex items-center justify-between gap-2 text-sm font-semibold min-w-[300px]">
                        <IoSearch className="w-fit md:shrink-0" />
                        <input
                            type="text"
                            placeholder="Search by event name"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full placeholder:text-end text-end"
                        />
                    </div>
                    <Link
                        to={"/Director/Events/Add"}
                        className="py-2 px-4 rounded text-center bg-blue_v text-white cursor-pointer font-semibold text-sm"
                    >
                        Add New Event
                    </Link>
                </div>
                <div className="overflow-auto">
                    {filteredEvents.length === 0 ? (
                        <div className="flex justify-center items-center flex-col gap-6 mt-12">
                            <div className="text-center font-semibold text-sm text-gray_v pt-12">
                                No matching events found
                            </div>
                        </div>
                    ) : (
                        <table className="table-auto w-full mt-4 text-sm text-center overflow-auto">
                            <thead>
                                <tr className="bg-gray_white font-normal">
                                    <th className="px-4 py-2 rounded-tl-md">
                                        Event Name
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Location
                                    </th>
                                    <th className="px-4 py-2 border-l border-white">
                                        Date
                                    </th>
                                    <th className="px-4 py-2 border-l border-white"></th>
                                </tr>
                            </thead>
                            <tbody className="text-xs text-center font-semibold">
                                {filteredEvents.map((event) => (
                                    <tr key={event?.id}>
                                        <td className="border px-4 py-2">
                                            {event.name}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {event?.location || "N/A"}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {dayjs(event?.date).format(
                                                "DD MMMM YYYY"
                                            )}
                                        </td>
                                        <td className="border px-4 py-2">
                                            <Link
                                                to={`/Director/Events/${event.id}`}
                                                className="bg-blue_v text-white px-4 py-1 rounded-md"
                                            >
                                                Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        );
    }
}

export default Director_events;
