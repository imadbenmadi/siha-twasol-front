import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../AppContext";
import { useEffect } from "react";
import axios from "axios";
function Director_Addworkers() {
    const Naviagte = useNavigate();
    async function handleRegister(values, { setSubmitting }) {
        try {
            let response = await Axios.post(
                "http://localhost:3000/Register",
                values,
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                Naviagte("/Director/Workers");
            } else if (response.status == 400) {
                setSubmitting(false);
                Swal.fire("Error", `${response.data.message} `, "error");
            } else if (response.status == 409) {
                setSubmitting(false);
                Swal.fire("Error!", `${response.data.message} `, "error");
            } else if (response.status == 500) {
                setSubmitting(false);
                Swal.fire("Error!", `Internal Server Error   `, "error");
            } else {
                setSubmitting(false);
                Swal.fire(
                    "Error!",
                    `Something Went Wrong ,please trye again latter, ${response.data.message} `,
                    "error"
                );
            }
        } catch (error) {
            setSubmitting(false);
            Swal.fire(
                "Error!",
                `Something Went Wrong ,please trye again latter`,
                "error"
            );
        }

        // setSubmitting(false);
    }

    const [loading, setLoading] = useState(false);
    const [Services, setServices] = useState([]);
    const [serviceChoice, setServiceChoice] = useState("");
    const [error, setError] = useState(false);

    const { user } = useAppContext();
    useEffect(() => {
        setLoading(true);
        const fetch_services = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/Directors/${user.id}/${user.companyId}/Services`,
                    {
                        withCredentials: true,
                        validateStatus: () => true,
                    }
                );
                console.log(response.data);
                if (response.status === 200) {
                    setServices(response.data.Services);
                } else if (response.status === 401) {
                    Swal.fire("Error", "You should login again", "error");
                    Naviagte("/Login");
                } else {
                    setError(response.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetch_services();
    }, []);
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
    } else {
        return (
            <div className="flex text-right">
                <div className="w-full  overflow-y-auto py-12 bg-white flex flex-col items-center justify-center ">
                    <div className=" w-[80%] text-black">
                        <div className=" pb-4 pt-24 md:pt-0 ">
                            <div className=" text-3xl font-semibold ">
                                صفحة اضافة عمال جدد
                            </div>
                        </div>

                        <div>
                            <Formik
                                initialValues={{
                                    // userType: userType_value,
                                    firstName: "",
                                    lastName: "",
                                    email: "",
                                    password: "",
                                    companyId: user?.companyId,
                                    serviceId: "",
                                }}
                                validate={(values) => {
                                    const errors = {};

                                    if (!values.firstName) {
                                        errors.firstName = "الاسم الأول مطلوب";
                                    } else if (values.firstName.length < 3)
                                        errors.firstName = "الحد الأدنى 3 أحرف";
                                    else if (values.firstName.length > 30)
                                        errors.firstName =
                                            "الحد الأقصى 30 حرفًا";
                                    if (!values.lastName) {
                                        errors.lastName = "اسم العائلة مطلوب";
                                    } else if (values.lastName.length < 3)
                                        errors.lastName = "الحد الأدنى 3 أحرف";
                                    else if (values.lastName.length > 30)
                                        errors.lastName =
                                            "الحد الأقصى 30 حرفًا";
                                    if (!values.email) {
                                        errors.email =
                                            "البريد الإلكتروني مطلوب";
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                            values.email
                                        )
                                    ) {
                                        errors.email =
                                            "عنوان البريد الإلكتروني غير صالح";
                                    }

                                    // Validate password
                                    if (!values.password) {
                                        errors.password = "كلمة المرور مطلوبة";
                                    } else if (values.password.length < 8) {
                                        errors.password =
                                            "يجب أن تكون كلمة المرور مكونة من 8 أحرف على الأقل";
                                    }

                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    handleRegister(values, { setSubmitting });
                                }}
                            >
                                {({ isSubmitting, setFieldValue }) => (
                                    <Form className="  flex flex-col text-sm md:text-lg  gap-4 text-black">
                                        <div className=" flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 w-full py-6 ">
                                            <div className="w-full  md:w-[50%]  relative">
                                                <div className="  font-semibold text-sm pb-1">
                                                    الاسم الأول
                                                </div>
                                                <Field
                                                    placeholder="Prénom"
                                                    type="text"
                                                    name="firstName"
                                                    disabled={isSubmitting}
                                                    className="w-full border border-gray_white 
                                                px-4 py-2 rounded-lg  text-sm text-right"
                                                />
                                                <ErrorMessage
                                                    name="firstName"
                                                    component="div"
                                                    style={
                                                        names_errorInputMessage
                                                    }
                                                />
                                            </div>
                                            <div className="  w-full  md:w-[50%] relative">
                                                <div className="font-semibold text-sm pb-1">
                                                    اسم العائلة
                                                </div>
                                                <Field
                                                    placeholder="Nom de famille"
                                                    type="text"
                                                    name="lastName"
                                                    disabled={isSubmitting}
                                                    className="border border-gray_white px-4 py-2 
                                                rounded-lg  text-sm  w-full text-right"
                                                />
                                                <ErrorMessage
                                                    name="lastName"
                                                    component="div"
                                                    style={
                                                        names_errorInputMessage
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className=" flex justify-end items-center gap-4 flex-wrap">
                                            {Services?.length == 0 ? (
                                                <div className=" text-sm mx-auto flex items-center justify-center gap-3 ">
                                                    <Link
                                                        to={"/Services/Add"}
                                                        className=" bg-blue_v text-white font-semibold px-4 py-2 rounded-lg"
                                                    >
                                                        اضف خدمة
                                                    </Link>
                                                    <div className=" text-gray_v">
                                                        لا توجد خدمة{" "}
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <select
                                                        value={serviceChoice}
                                                        onChange={(e) => {
                                                            setServiceChoice(
                                                                e.target.value
                                                            );
                                                            setFieldValue(
                                                                "serviceId",
                                                                e.target.value
                                                            );
                                                        }}
                                                        name="serviceId"
                                                        id="servicechoix"
                                                        className="border p-2 w-fit  rounded-md 
                                                text-sm font-semibold text-end"
                                                    >
                                                        <option value="">
                                                            اختر الخدمة
                                                        </option>

                                                        {Services?.map(
                                                            (service) => (
                                                                <option
                                                                    key={
                                                                        service.id
                                                                    }
                                                                    value={
                                                                        service.id
                                                                    }
                                                                >
                                                                    {
                                                                        service.serviceName
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                    </select>

                                                    <label
                                                        htmlFor="servicechoix"
                                                        className="block text-xs font-medium text-black_text"
                                                    >
                                                        اختر الخدمة التي ينتمي
                                                        اليها هذا العامل{" "}
                                                    </label>
                                                </>
                                            )}
                                        </div>
                                        <div>
                                            <div className=" font-semibold text-sm pb-1">
                                                البريد الإلكتروني
                                            </div>
                                            <Field
                                                placeholder="example@gmail.com"
                                                type="email"
                                                name="email"
                                                disabled={isSubmitting}
                                                className="border border-gray_white px-4 py-2
                                             rounded-lg  text-sm  w-full text-right"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                style={errorInputMessage}
                                            />
                                        </div>
                                        <div>
                                            <div className=" font-semibold text-sm pb-1">
                                                كلمة المرور
                                            </div>
                                            <div className=" flex items-center">
                                                <Field
                                                    placeholder="•••••••••••••••••••"
                                                    type="text"
                                                    name="password"
                                                    disabled={isSubmitting}
                                                    className="border  border-gray_white px-4 py-2
                                                  rounded-lg text-sm  w-full text-right"
                                                />
                                            </div>

                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                style={errorInputMessage}
                                            />
                                        </div>

                                        {isSubmitting ? (
                                            <span className="small-loader my-5  w-full m-auto"></span>
                                        ) : (
                                            <button
                                                type="submit"
                                                className=" bg-blue_v py-2 mt-4 rounded-2xl text-white font-semibold "
                                                disabled={isSubmitting}
                                            >
                                                انشاء الحساب
                                            </button>
                                        )}
                                    </Form>
                                )}
                            </Formik>
                        </div>
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
const names_errorInputMessage = {
    position: "absolute",
    bottom: "-22px",
    right: "5px",
    fontSize: "12px",
    color: "red",
};
export default Director_Addworkers;
