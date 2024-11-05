import React from "react";
import { Link, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function EventDetail() {
    const { id } = useParams();
    const { company } = useOutletContext();

    // Find the specific event by id
    const event = company?.Events?.find((event) => event?.id === parseInt(id));

    if (!event) {
        return (
            <div className="text-red-600 text-center mt-6">
                لم يتم العثور على الفعالية.
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 text-right">
            {/* Event Image */}
            {event?.image_link && (
                <img
                    src={`http://localhost:3000/${event?.image_link}`}
                    alt={event?.Title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                />
            )}

            {/* Event Title */}
            <h1 className="text-3xl font-bold text-blue-800 mb-4">
                {event?.Title}
            </h1>

            {/* Event Date */}
            <p className="text-sm text-gray-500 mb-4">
                التاريخ: {new Date(event?.createdAt).toLocaleDateString()}
            </p>

            {/* Event Description */}
            <div className="text-gray-700 leading-relaxed mb-6">
                <p>{event?.Description}</p>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-100 p-4 rounded-lg">
                {event?.ownerType === "Doctor" ? (
                    <Link
                        to={`/Malad/Companies/${company.id}/Doctors/${event?.OwnerId}`}
                        className="text-gray-600 mb-2"
                    >
                        <span className="font-semibold text-gray-700">
                            نوع المالك:
                        </span>{" "}
                    </Link>
                ) : (
                    <Link
                        to={`/Malad/Companies/${company.id}`}
                        className="text-gray-600 mb-2"
                    >
                        <span className="font-semibold text-gray-700">
                            نوع المالك:
                        </span>{" "}
                        {}
                    </Link>
                )}

                <Link
                    to={`/Malad/Companies/${company.id}`}
                    className="text-gray-600"
                >
                    <span className="font-semibold text-gray-700">
                        {" "}
                        اسم الشركة :
                    </span>{" "}
                    {event?.Name}
                </Link>
            </div>
        </div>
    );
}

export default EventDetail;
