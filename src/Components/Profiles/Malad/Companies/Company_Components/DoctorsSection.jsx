import React from "react";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
function DoctorsSection() {
    const { company } = useOutletContext();

    const [doctors, setDoctors] = useState(company?.Doctors);
    useEffect(() => {
        setDoctors(company?.Doctors);
        console.log(doctors);
    }, [company]);
    if (!doctors || doctors.length === 0) {
        return <div>No doctors available for this company</div>;
    }

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Doctors</h3>
            <table className="w-full border rounded-lg">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Speciality</th>
                        <th className="px-4 py-2">Telephone</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor.id} className="border-t">
                            <td className="px-4 py-2">
                                {doctor.firstName} {doctor.lastName}
                            </td>
                            <td className="px-4 py-2">{doctor.speciality}</td>
                            <td className="px-4 py-2">
                                {doctor.telephone || "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DoctorsSection;
