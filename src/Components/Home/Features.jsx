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
                className=" flex items-center md:justify-center gap-12  overflow-x-auto 
            custom-overflow px-12 py-12"
            >
                <div className=" w-[300px] h-[250px] shrink-0 border shadow-[#2a77f147] shadow-xl  rounded-xl py-4">
                    <div>
                        <img
                            src={Feature1_image}
                            className=" mx-auto w-12 pb-3"
                            alt=""
                        />
                    </div>
                    <div className=" text-center">
                        <div className=" text-xl font-semibold mb-4">
                            إشعارات الأدوية واللقاحات
                        </div>
                        <div>
                            احصل على إشعارات بشأن الحملات الصحية وأيام التوعية
                            والخدمات الطبية المجانية.
                        </div>
                    </div>
                </div>{" "}
                <div className=" w-[300px] h-[250px] shrink-0 border shadow-[#2a77f147] shadow-xl  rounded-xl py-4">
                    <div>
                        <img
                            src={Feature2_image}
                            className=" mx-auto w-12 pb-3"
                            alt=""
                        />
                    </div>
                    <div className=" text-center">
                        <div className=" text-xl font-semibold mb-4">
                            إشعارات الأدوية واللقاحات
                        </div>
                        <div>
                            احصل على إشعارات بشأن الحملات الصحية وأيام التوعية
                            والخدمات الطبية المجانية.
                        </div>
                    </div>
                </div>{" "}
                <div className=" w-[300px] h-[250px] shrink-0 border shadow-[#2a77f147] shadow-xl  rounded-xl py-4">
                    <div>
                        <img
                            src={Feature3_image}
                            className=" mx-auto w-12 pb-3"
                            alt=""
                        />
                    </div>
                    <div className=" text-center">
                        <div className=" text-xl font-semibold mb-4">
                            إشعارات الأدوية واللقاحات
                        </div>
                        <div>
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
