import React from "react";
import Hero_image from "../../../public/Home/Hero.png";
import { useNavigate } from "react-router-dom";
function Hero() {
    const Navigate = useNavigate();
    return (
        <div>
            <div className=" flex flex-col md:flex-row justify-center items-center md:items-start
              md:gap-6 md:mt-24 mt-20">
                <img src={Hero_image} className=" w-[320px] shrink-0" alt="" />
                <div className="h-full md:pt-12 max-w-[350px]">
                    <div className=" font-semibold text-2xl  ">
                        تواصل مع مقدم الرعاية الصحية الخاص بك بسلاسة
                    </div>
                    <div className=" text-sm pt-2">
                        يمكنك تلقي التحديثات الصحية والبقاء على اطلاع على جميع
                        المؤسسات الاستشفائية
                    </div>
                    <div
                        onClick={() => {
                            Navigate("/Register");
                        }}
                        className=" w-[90%] mx-auto py-2 font-bold cursor-pointer px-4 text-center bg-blue_v text-white mt-6  rounded-lg"
                    >
                        إبدأ معنا
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
