import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Info() {
    const { company } = useOutletContext();
    const [followLoading, setFollowLoading] = useState(false);

    const handleFollow = async () => {
        setFollowLoading(true);
        try {
            const response = await axios.post(
                `http://localhost:3000/Malads/${company?.id}/Companies/${company?.id}/Follow`,
                {},
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );

            if (response.status === 200) {
                Swal.fire("نجاح!", "أنت الآن تتابع هذه الشركة", "success");
            }
        } catch (error) {
            Swal.fire("خطأ!", "حدث خطأ ما. حاول مرة أخرى", "error");
        } finally {
            setFollowLoading(false);
        }
    };

    const handleUnfollow = async () => {
        setFollowLoading(true);
        try {
            const response = await axios.post(
                `http://localhost:3000/Malads/${company?.id}/Companies/${company?.id}/Unfollow`,
                {},
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );

            if (response.status === 200) {
                Swal.fire("نجاح!", "لقد توقفت عن متابعة هذه الشركة", "success");
            }
        } catch (error) {
            Swal.fire("خطأ!", "حدث خطأ ما. حاول مرة أخرى", "error");
        } finally {
            setFollowLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-blue-800">
                تفاصيل الشركة
            </h2>

            {/* Basic Info */}
            <div className="mb-6">
                <p className="text-gray-700 mb-2">
                    <span className="font-semibold">الاسم:</span>{" "}
                    {company?.Name}
                </p>
                <p className="text-gray-700 mb-2">
                    <span className="font-semibold">الموقع:</span>{" "}
                    {company?.Location}
                </p>
                <p className="text-gray-700 mb-2">
                    <span className="font-semibold">الولاية:</span>{" "}
                    {company?.Wilaya}
                </p>
                <p className="text-gray-700 mb-2">
                    <span className="font-semibold">النوع:</span>{" "}
                    {company?.Type}
                </p>
                <p className="text-gray-700 mb-2">
                    <span className="font-semibold">تاريخ الإنشاء:</span>{" "}
                    {new Date(company?.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-2">
                    <span className="font-semibold">آخر تحديث:</span>{" "}
                    {new Date(company?.updatedAt).toLocaleDateString()}
                </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                    <p className="text-lg font-semibold text-blue-700">
                        عدد المدونات
                    </p>
                    <p className="text-2xl font-bold text-blue-800">
                        {company?.Blogs?.length || 0}
                    </p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg text-center">
                    <p className="text-lg font-semibold text-green-700">
                        عدد الأحداث
                    </p>
                    <p className="text-2xl font-bold text-green-800">
                        {company?.Events?.length || 0}
                    </p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg text-center">
                    <p className="text-lg font-semibold text-yellow-700">
                        عدد الأطباء
                    </p>
                    <p className="text-2xl font-bold text-yellow-800">
                        {company?.Doctors?.length || 0}
                    </p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg text-center">
                    <p className="text-lg font-semibold text-purple-700">
                        عدد الخدمات
                    </p>
                    <p className="text-2xl font-bold text-purple-800">
                        {company?.Services?.length || 0}
                    </p>
                </div>
            </div>

            {/* Follow/Unfollow Buttons */}
            <div className="flex space-x-4">
                <button
                    onClick={handleFollow}
                    disabled={followLoading}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    {followLoading ? "متابعة..." : "متابعة"}
                </button>
                <button
                    onClick={handleUnfollow}
                    disabled={followLoading}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
                >
                    {followLoading ? "إلغاء المتابعة..." : "إلغاء المتابعة"}
                </button>
            </div>
        </div>
    );
}

export default Info;
