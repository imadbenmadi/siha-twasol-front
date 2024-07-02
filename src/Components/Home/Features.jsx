import React from "react";
import Feature1_image from "../../../public/Home/Feature1.png";
import Feature2_image from "../../../public/Home/Feature2.png";
import Feature3_image from "../../../public/Home/Feature3.png";
function Features() {
    return (
        <div className=" ">
            <div className=" text-center mt-24">
                <div className=" text-2xl font-semibold">ميزاتنا</div>
                <div className=" text-sm pt-2">
                    استكشف ميزات منصتنا القوية المصممة لإبقائك على اتصال والتحكم
                    في صحتك
                </div>
            </div>
            <div
                className=" flex flex-col md:flex-row items-center lg:justify-center gap-12  md:overflow-x-auto overflow-hidden
            custom-overflow px-12 py-12"
            >
                <div className=" w-[300px] md:h-[250px] shrink-0 border shadow-[#2a77f147] shadow-xl  rounded-xl py-4">
                    <div>
                        <img
                            src={Feature1_image}
                            className=" mx-auto w-12 pb-3"
                            alt=""
                        />
                    </div>
                    <div className=" text-center">
                        <div className=" text-lg md:text-xl font-semibold mb-4">
                            إشعارات الأدوية واللقاحات
                        </div>
                        <div className=" text-sm md:text-base">
                            احصل على إشعارات بشأن الحملات الصحية وأيام التوعية
                            والخدمات الطبية المجانية.
                        </div>
                    </div>
                </div>{" "}
                <div className=" w-[300px]  md:h-[250px] shrink-0 border shadow-[#2a77f147] shadow-xl  rounded-xl py-4">
                    <div>
                        <img
                            src={Feature2_image}
                            className=" mx-auto w-12 pb-3"
                            alt=""
                        />
                    </div>
                    <div className=" text-center">
                        <div className=" text-lg md:text-xl font-semibold mb-4">
                            إشعارات الأدوية واللقاحات
                        </div>
                        <div className=" text-sm md:text-base">
                            احصل على إشعارات بشأن الحملات الصحية وأيام التوعية
                            والخدمات الطبية المجانية.
                        </div>
                    </div>
                </div>{" "}
                <div className=" w-[300px]  md:h-[250px] shrink-0 border shadow-[#2a77f147] shadow-xl  rounded-xl py-4">
                    <div>
                        <img
                            src={Feature3_image}
                            className=" mx-auto w-12 pb-3"
                            alt=""
                        />
                    </div>
                    <div className=" text-center">
                        <div className=" text-lg md:text-xl font-semibold mb-4">
                            إشعارات الأدوية واللقاحات
                        </div>
                        <div className=" text-sm md:text-base">
                            احصل على إشعارات بشأن الحملات الصحية وأيام التوعية
                            والخدمات الطبية المجانية.
                        </div>
                    </div>
                </div>{" "}
            </div>
        </div>
    );
}

export default Features;
