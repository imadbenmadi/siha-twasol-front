import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../../../AppContext";
import ReviewCard from "./Rate_Card";
import Rate from "./Rate";
function Malad() {
    const location = useLocation();
    const { user } = useAppContext();
    const id = location.pathname.split("/")[4];
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [malad, setMalad] = useState(null);
    const [maladrates, setMaladrates] = useState([]);
    const [is_rated, setIs_rated] = useState(false);
    useEffect(() => {
        const fetchMalad = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Doctors/${user.id}/Malads/Own/${id}`,
                    { withCredentials: true }
                );
                setIs_rated(response.data.is_rated);
                setMaladrates(response.data.maladrates);
                setMalad(response.data.malad.Malad);
                setLoading(false);
            } catch (error) {

                setError("حدث خطأ أثناء تحميل بيانات المريض.");
                setLoading(false);
            }
        };
        fetchMalad();
    }, []);

    if (loading) return <div>جاري التحميل...</div>;
    if (error) return <div className="text-red-600">{error}</div>;

    return (
        <>
            <div
                className="max-w-lg mx-auto p-6 mt-6 bg-white shadow-lg rounded-lg border border-gray-200"
                dir="rtl"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    الحساب الشخصي للمريض
                </h2>

                <div className="border-b pb-4 mb-4">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        الصورة الشخصية
                    </h3>
                    {malad?.profile_pic_link ? (
                        <img
                            src={`http://localhost:3000/${malad?.profile_pic_link}`}
                            alt="Profile"
                            className="w-32 h-32 rounded-full mx-auto object-cover"
                        />
                    ) : (
                        <p className="text-gray-600 text-center">
                            لا توجد صورة
                        </p>
                    )}
                </div>

                <div className="border-b pb-4 mb-4">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        المعلومات الشخصية
                    </h3>
                    <p className="text-gray-600">
                        <span className="font-medium">الاسم الكامل:</span>{" "}
                        {malad?.firstName || "غير متوفر"}{" "}
                        {malad?.lastName || ""}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">البريد الإلكتروني:</span>{" "}
                        {malad?.email || "غير متوفر"}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">رقم الهاتف:</span>{" "}
                        {malad?.telephone || "غير متوفر"}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">تاريخ الميلاد:</span>{" "}
                        {malad?.birthDate
                            ? new Date(malad?.birthDate).toLocaleDateString(
                                  "ar"
                              )
                            : "غير متوفر"}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">العنوان:</span>{" "}
                        {malad?.adress || "غير متوفر"}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">الجنس:</span>{" "}
                        {malad?.gender || "غير متوفر"}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">نبذة:</span>{" "}
                        {malad?.about || "غير متوفر"}
                    </p>
                </div>

                <div className="border-b pb-4 mb-4 text-gray-600">
                    <p>
                        <span className="font-medium">تاريخ إنشاء الحساب:</span>{" "}
                        {malad?.createdAt
                            ? new Date(malad?.createdAt).toLocaleDateString(
                                  "ar"
                              )
                            : "غير متوفر"}
                    </p>
                    <p>
                        <span className="font-medium">آخر تحديث:</span>{" "}
                        {malad?.updatedAt
                            ? new Date(malad?.updatedAt).toLocaleDateString(
                                  "ar"
                              )
                            : "غير متوفر"}
                    </p>
                </div>
                <div className="flex justify-center mt-6 gap-4">
                    <Link
                        to={"/Doctor/Malads/" + malad?.id + "/upload"}
                        className="py-2 px-6 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                    >
                        اضافة ملف جديد
                    </Link>
                </div>
            </div>
            <div className=" mt-6">
                {!is_rated && (
                    <div className="">
                        <Rate userId={user.id} maladId={id} />
                    </div>
                )}

                <div>
                    <div className="max-w-[80vw] pl-6 py-10">
                        <h2 className="text-2xl font-bold text-gray-600 mb-4 text-center">
                            التقييمات
                        </h2>
                        <div className="my-6 px-6 py-4 shadow-md font-semibold text-gray-500 flex gap-3 w-fit mx-auto rounded-lg ">
                            <div>
                                {maladrates && maladrates.length > 0
                                    ? (
                                          maladrates.reduce(
                                              (sum, rate) => sum + rate.Rate,
                                              0
                                          ) / maladrates.length
                                      ).toFixed(1) // Calculate average and format to 2 decimal places
                                    : 0.0}
                            </div>
                            <div>اجمالي التقييم</div>
                        </div>
                        {!maladrates || maladrates.length === 0 ? (
                            <div className="text-center font-semibold text-sm text-gray-400">
                                لا يوجد تقييمات حاليا
                            </div>
                        ) : (
                            maladrates.map((review) => (
                                <ReviewCard key={review?.id} review={review} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Malad;
