import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useAppContext } from "../../../../AppContext";
import { useLocation } from "react-router";
dayjs.extend(customParseFormat);

function Doctor() {
    const location = useLocation();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const doctorId = location.pathname.split("/")[3];
    const { user } = useAppContext();
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchDoctor = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Directors/${user.id}/${user.companyId}/Doctors/${doctorId}`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );

                if (response.status === 200) {
                    setDoctor(response.data.User);
                } else if (response.status === 401) {
                    Swal.fire("خطأ", "يجب عليك تسجيل الدخول مرة أخرى", "error");
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

        fetchDoctor();
    }, []);

    const handleDelete = () => {
        Swal.fire({
            title: "هل أنت متأكد؟",
            text: "لن تتمكن من استعادة هذا العنصر!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "نعم، احذفه!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire("تم الحذف!", "تم حذف الطبيب بنجاح.", "success");
                setDeleteLoading(true);
                await axios
                    .delete(
                        `http://localhost:3000/Directors/${user.id}/${user.companyId}/Doctors/${doctorId}`,
                        {
                            withCredentials: true,
                            validateStatus: () => true,
                        }
                    )
                    .then((response) => {
                        if (response.status === 200) {
                            navigate("/Director/Doctors");
                        } else {
                            Swal.fire("خطأ", response.data.message, "error");
                        }
                    })
                    .catch((error) => {
                        Swal.fire("خطأ", error.message, "error");
                    })
                    .finally(() => {
                        setDeleteLoading(false);
                    });
            }
        });
    };

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
    } else if (!doctor) {
        return (
            <div className="py-6 px-4">
                <div className="flex justify-center items-center flex-col gap-6 mt-12">
                    <div className="text-center font-semibold text-sm text-red-500 pt-12">
                        لم يتم العثور على الطبيب
                    </div>
                    <Link
                        to={"/Director/Doctors"}
                        className="py-2 px-4 rounded bg-blue_v text-white cursor-pointer font-semibold text-sm"
                    >
                        الرجوع إلى قائمة الاطباء
                    </Link>
                </div>
            </div>
        );
    } else {
        return (
            <div className="py-6 px-4">
                <div className="text-xl font-semibold text-blue_v mb-6 text-center">
                    معلومات الطبيب
                </div>
                <div className="border p-6 rounded-lg bg-gray-50 shadow-lg max-w-3xl mx-auto">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">
                            الاسم الكامل:
                        </h3>
                        <p className="text-gray-700">{`${doctor.firstName} ${doctor.lastName}`}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">
                            البريد الإلكتروني:
                        </h3>
                        <p className="text-gray-700">{doctor.email}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">التخصص:</h3>
                        <p className="text-gray-700">{doctor.speciality}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">الهاتف:</h3>
                        <p className="text-gray-700">{doctor.telephone}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">القسم :</h3>
                        <p className="text-gray-700">{doctor.Service?.Name}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">
                            تاريخ الإنشاء:
                        </h3>
                        <p className="text-gray-700">
                            {dayjs(doctor.createdAt).format("DD MMMM YYYY")}
                        </p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">المؤسسة:</h3>
                        <p className="text-gray-700">{doctor.Company?.Name}</p>
                    </div>
                    <div className="flex justify-end gap-4">
                        <Link
                            to={`/Director/Doctors/${doctor.id}/Edit`}
                            className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            تعديل
                        </Link>
                        {deleteLoading ? (
                            <span className="small-loader"></span>
                        ) : (
                            <button
                                onClick={handleDelete}
                                className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                حذف
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Doctor;
