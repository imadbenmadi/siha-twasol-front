import React, { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";

function EventsSection() {
    const { company } = useOutletContext();
    const [events, setEvents] = useState(company?.Events);

    useEffect(() => {
        setEvents(company?.Events);
    }, [company]);

    if (!events || events.length === 0) {
        return <div>لا توجد فعاليات متاحة لهذه الشركة.</div>;
    }

    return (
        <div className="p-6">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">الفعاليات</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </ul>
        </div>
    );
}

function EventCard({ event }) {
    const { company } = useOutletContext();

    return (
        <li className="border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
            {/* Event Image */}
            <img
                src={`http://localhost:3000/${event.image_link}`}
                alt={event.Title}
                className="w-full h-48 object-cover rounded-t-lg"
            />

            <div className="p-4">
                {/* Event Title */}
                <h4 className="text-lg font-semibold text-blue-700 mb-2">
                    {event.Title}
                </h4>

                {/* Event Date */}
                <p className="text-sm text-gray-500 mb-2">
                    التاريخ:{" "}
                    {new Date(event.createdAt).toLocaleDateString()}
                </p>

                {/* Event Description */}
                <p className="text-gray-700 mb-4">
                    {event.Description.substring(0, 100)}...
                </p>

                {/* Link to Event Detail */}
                <Link
                    to={`/Malad/Companies/${company.id}/Events/${event.id}`}
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

export default EventsSection;
