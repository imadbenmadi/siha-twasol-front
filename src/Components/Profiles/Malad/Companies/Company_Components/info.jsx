import React from "react";
import { useOutletContext } from "react-router";
function info() {
    const { company } = useOutletContext();
    return (
        <div>
            <h2 className="text-xl font-semibold mb-6">تفاصيل الشركة</h2>

            <p className="text-gray-700 mb-4">
                <span className="font-semibold">الموقع:</span>{" "}
                {company?.Location}
            </p>
            <p className="text-gray-700 mb-4">
                <span className="font-semibold">الولاية:</span>{" "}
                {company?.Wilaya}
            </p>
            <p className="text-gray-700 mb-4">
                <span className="font-semibold">النوع:</span> {company?.Type}
            </p>
        </div>
    );
}

export default info;
