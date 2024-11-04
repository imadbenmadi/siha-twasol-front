import React from "react";

function EventsSection({ events }) {
    if (!events || events.length === 0) {
        return <div>No events available for this company.</div>;
    }

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Events</h3>
            <ul className="space-y-4">
                {events.map((event) => (
                    <li
                        key={event.id}
                        className="border p-4 rounded-lg shadow-sm"
                    >
                        <h4 className="text-lg font-semibold">{event.title}</h4>
                        <p className="text-gray-700">
                            {event.description || "No description provided"}
                        </p>
                        <p className="text-sm text-gray-500">
                            Date: {new Date(event.date).toLocaleDateString()}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventsSection;
