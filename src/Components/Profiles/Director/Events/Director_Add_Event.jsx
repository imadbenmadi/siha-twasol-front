import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";
import { useAppContext } from "../../../../AppContext";

function Director_AddEvent() {
    const navigate = useNavigate();
    const { user } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);

    async function handleAddEvent(values, { setSubmitting }) {
        try {
            const response = await axios.post(
                `http://localhost:3000/Directors/${user.id}/${user.companyId}/Events`,
                values,
                { withCredentials: true, validateStatus: () => true }
            );

            if (response.status === 200) {
                navigate("/Director/Events");
            } else {
                setSubmitting(false);
                Swal.fire("Error", response.data.message, "error");
            }
        } catch (error) {
            setSubmitting(false);
            Swal.fire("Error!", "Something went wrong", "error");
        }
    }

    useEffect(() => {
        setLoading(true);
        const fetchServices = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Directors/${user.id}/${user.companyId}/Services`,
                    { withCredentials: true, validateStatus: () => true }
                );
                if (response.status === 200) {
                    setServices(response.data.Services);
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    if (loading) {
        return (
            <div className="w-[80vw] h-[80vh] flex items-center justify-center">
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
    } else {
        return (
            <div className="flex text-right">
                <div className="w-full py-12 bg-white flex flex-col items-center justify-center">
                    <div className="w-[80%] text-black">
                        <div className="pb-4 pt-24 md:pt-0">
                            <div className="text-3xl font-semibold">
                                إضافة حدث جديد
                            </div>
                        </div>
                        <Formik
                            initialValues={{
                                eventName: "",
                                date: "",
                                location: "",
                                serviceId: "",
                            }}
                            validate={(values) => {
                                const errors = {};
                                if (!values.eventName) {
                                    errors.eventName = "اسم الحدث مطلوب";
                                } else if (values.eventName.length < 3) {
                                    errors.eventName = "الحد الأدنى 3 أحرف";
                                }
                                if (!values.date) {
                                    errors.date = "تاريخ الحدث مطلوب";
                                }
                                if (!values.location) {
                                    errors.location = "موقع الحدث مطلوب";
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                if (!values.serviceId) {
                                    Swal.fire(
                                        "Error!",
                                        "يجب اختيار القسم المرتبط بالحدث",
                                        "error"
                                    );
                                } else {
                                    handleAddEvent(values, { setSubmitting });
                                }
                            }}
                        >
                            {({ isSubmitting, setFieldValue }) => (
                                <Form className="flex flex-col text-sm md:text-lg gap-4 text-black">
                                    <div className="flex flex-col gap-6 w-full py-6">
                                        <div className="w-full relative">
                                            <div className="font-semibold text-sm pb-1">
                                                اسم الحدث
                                            </div>
                                            <Field
                                                type="text"
                                                name="eventName"
                                                placeholder="اسم الحدث"
                                                disabled={isSubmitting}
                                                className="w-full border border-gray_white px-4 py-2 rounded-lg text-sm text-right"
                                            />
                                            <ErrorMessage
                                                name="eventName"
                                                component="div"
                                                style={errorInputMessage}
                                            />
                                        </div>
                                        <div className="w-full relative">
                                            <div className="font-semibold text-sm pb-1">
                                                تاريخ الحدث
                                            </div>
                                            <Field
                                                type="date"
                                                name="date"
                                                disabled={isSubmitting}
                                                className="w-full border border-gray_white px-4 py-2 rounded-lg text-sm text-right"
                                            />
                                            <ErrorMessage
                                                name="date"
                                                component="div"
                                                style={errorInputMessage}
                                            />
                                        </div>
                                        <div className="w-full relative">
                                            <div className="font-semibold text-sm pb-1">
                                                موقع الحدث
                                            </div>
                                            <Field
                                                type="text"
                                                name="location"
                                                placeholder="الموقع"
                                                disabled={isSubmitting}
                                                className="w-full border border-gray_white px-4 py-2 rounded-lg text-sm text-right"
                                            />
                                            <ErrorMessage
                                                name="location"
                                                component="div"
                                                style={errorInputMessage}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end items-center gap-4 flex-wrap">
                                        {services.length === 0 ? (
                                            <div className="text-sm mx-auto flex items-center gap-3">
                                                <Link
                                                    to="/Director/Services/Add"
                                                    className="bg-blue_v text-white font-semibold px-4 py-2 rounded-lg"
                                                >
                                                    اضف قسم
                                                </Link>
                                                <div className="text-gray_v">
                                                    لا توجد اقسام
                                                </div>
                                            </div>
                                        ) : (
                                            <Field
                                                as="select"
                                                name="serviceId"
                                                onChange={(e) => {
                                                    setFieldValue(
                                                        "serviceId",
                                                        e.target.value
                                                    );
                                                }}
                                                className="border p-2 rounded-md text-sm font-semibold text-end"
                                            >
                                                <option value="">
                                                    اختر القسم
                                                </option>
                                                {services.map((service) => (
                                                    <option
                                                        key={service.id}
                                                        value={service.id}
                                                    >
                                                        {service.Name}
                                                    </option>
                                                ))}
                                            </Field>
                                        )}
                                    </div>

                                    {isSubmitting ? (
                                        <span className="small-loader my-5 w-full m-auto"></span>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="bg-blue_v py-2 mt-4 rounded-2xl text-white font-semibold"
                                            disabled={isSubmitting}
                                        >
                                            إضافة الحدث
                                        </button>
                                    )}
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        );
    }
}

const errorInputMessage = {
    fontSize: "12px",
    color: "red",
};

export default Director_AddEvent;
