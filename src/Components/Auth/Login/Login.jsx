import React from "react";
import Login_image from "../../../../public/Login.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import handleLogin from "./Post_Login";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
    const [Privacy, setPrivacy] = useState(true);
    const handleChangePrivacy = () => {
        setPrivacy(!Privacy);
    };

    return (
        <div className="flex text-right">
            <div className=" w-[50vw] hidden md:block   h-[calc(100vh)]">
                <img
                    src={Login_image}
                    alt="تسجيل الدخول"
                    className=" w-full h-full object-cover "
                />
            </div>
            <div className="w-full h-screen bg-white flex flex-col items-center justify-center ">
                <div className=" w-[80%] text-black">
                    <div className=" pb-4 ">
                        <div className=" text-3xl font-semibold ">
                            تسجيل الدخول
                        </div>
                        <div>سجل الدخول للبدء.</div>
                    </div>

                    <div>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            validate={(values) => {
                                const errors = {};

                                // Validate email
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
                                handleLogin(values, { setSubmitting });
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className="  flex flex-col text-sm md:text-lg  gap-4 text-black">
                                    <div>
                                        <div className=" font-semibold text-sm pb-1">
                                            البريد الإلكتروني
                                        </div>
                                        <Field
                                            placeholder="example@gmail.com"
                                            type="email"
                                            name="email"
                                            disabled={isSubmitting}
                                            className="border border-gray_white text-right px-4 py-2 rounded-lg  text-sm  w-full"
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
                                                type="password"
                                                name="password"
                                                disabled={isSubmitting}
                                                className="border border-gray_white px-4 text-right py-2  rounded-lg text-sm  w-full"
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
                                            بتحديد المربع أدناه، فإنك تقر بأنك
                                            قد قرأت وفهمت وتوافق على الالتزام بـ{" "}
                                            <Link
                                                to={"/Privacy?prev=Login"}
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
                                            // : Privacy ?
                                            <button
                                                type="submit"
                                                className=" bg-blue_v py-2 mt-4 rounded-2xl text-white font-semibold "
                                                disabled={isSubmitting}
                                            >
                                                تسجيل الدخول
                                            </button>
                                        )
                                        // : (
                                        //     <button
                                        //         type="submit"
                                        //         className=" bg-gray_white py-2 mt-4 rounded-2xl  text-gray-400 font-semibold "
                                        //         disabled={true}
                                        //     >
                                        //         ابدأ
                                        //     </button>
                                        // )
                                    }
                                </Form>
                            )}
                        </Formik>

                        <div className="pt-6 text-sm font-semibold text-gray_v text-center ">
                            ليس لديك حساب؟{" "}
                            <Link
                                to={"/Register"}
                                className=" underline text-blue_v"
                            >
                                سجل حساب جديد
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

export default Login;
