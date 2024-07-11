import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import Login_image from "../../../../public/Login.png";
import Swal from "sweetalert2";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
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
    const [Privacy, setPrivacy] = useState(true);
    const handleChangePrivacy = () => {
        setPrivacy(!Privacy);
    };
    const [userType_value, setuserType_value] = useState("freelancer");
    function handle_change_UserType(value) {
        setuserType_value(value);
    }
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
                            }}
                            validate={(values) => {
                                const errors = {};

                                if (!values.firstName) {
                                    errors.firstName = "الاسم الأول مطلوب";
                                } else if (values.firstName.length < 3)
                                    errors.firstName = "الحد الأدنى 3 أحرف";
                                else if (values.firstName.length > 30)
                                    errors.firstName = "الحد الأقصى 30 حرفًا";
                                if (!values.lastName) {
                                    errors.lastName = "اسم العائلة مطلوب";
                                } else if (values.lastName.length < 3)
                                    errors.lastName = "الحد الأدنى 3 أحرف";
                                else if (values.lastName.length > 30)
                                    errors.lastName = "الحد الأقصى 30 حرفًا";
                                if (!values.email) {
                                    errors.email = "البريد الإلكتروني مطلوب";
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
                                                style={names_errorInputMessage}
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
                                                style={names_errorInputMessage}
                                            />
                                        </div>
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

                                    {/* <div className=" flex gap-3 text-sm">
                                        <input
                                            checked={Privacy}
                                            onClick={handleChangePrivacy}
                                            type="checkbox"
                                            className={`w-4 h-4`}
                                        />
                                        <div>
                                            بالضغط على المربع أدناه، فإنك تقر
                                            بأنك قرأت وفهمت وتوافق على الالتزام
                                            بهذه{" "}
                                            <Link
                                                to={"/Privacy?prev=Register"}
                                                className=" font-semibold underline"
                                            >
                                                شروط الخدمة.
                                            </Link>
                                        </div>
                                    </div> */}
                                    {
                                        isSubmitting ? (
                                            <span className="small-loader my-5  w-full m-auto"></span>
                                        ) : (
                                            // : Privacy ? (
                                            <button
                                                type="submit"
                                                className=" bg-blue_v py-2 mt-4 rounded-2xl text-white font-semibold "
                                                disabled={isSubmitting}
                                            >
                                                انشاء الحساب
                                            </button>
                                        )
                                        //     : (
                                        // <button
                                        //     type="submit"
                                        //     className=" bg-gray_white py-2 mt-4 rounded-2xl  text-gray-400 font-semibold "
                                        //     disabled={true}
                                        // >
                                        //     ابدأ الآن
                                        // </button>
                                        // )
                                    }
                                </Form>
                            )}
                        </Formik>
                        <div className="pt-6 text-sm font-semibold text-gray_v text-center">
                            هل لديك حساب بالفعل؟{" "}
                            <Link
                                to={"/Login"}
                                className=" underline text-blue_v"
                            >
                                تسجيل الدخول
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
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
