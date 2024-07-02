import React from "react";
import benefits1_image from "../../../public/Home/benefits1.png";
import benefits2_image from "../../../public/Home/benefits2.png";
import benefits3_image from "../../../public/Home/benefits3.png";
import benefits4_image from "../../../public/Home/benefits4.png";
import Benefits_card from "./Benefits_card";
function Benefits() {
    return (
        <div>
            <div className=" text-center mt-24">
                <div className=" text-2xl font-semibold">الفوائد</div>
                <div className=" text-sm pt-2">
                    استكشف فوائد منصتنا القوية المصممة لإبقائك على اتصال والتحكم
                    في صحتك
                </div>
            </div>
            <div className=" flex flex-col flex-wrap justify-center md:flex-row items-center gap-12  md:overflow-x-auto overflow-hidden custom-overflow px-12 py-12">
                <Benefits_card
                    image={benefits1_image}
                    title="تواصل مع الأطباء"
                    description="تواصل مع الأطباء المختصين في مجالات متعددة واحصل على الاستشارات الطبية اللازمة"
                />
                <Benefits_card
                    image={benefits2_image}
                    title="متابعة الحالة الصحية"
                    description="متابعة حالتك الصحية والتقارير الطبية الخاصة بك بشكل دوري"
                />
                <Benefits_card
                    image={benefits3_image}
                    title="تذكير بالأدوية"
                    description="تلقي تذكيرات يومية بأوقات تناول الأدوية والجرعات المطلوبة"
                />
                <Benefits_card
                    image={benefits4_image}
                    title="متابعة اللقاحات"
                    description="متابعة اللقاحات المطلوبة والتواريخ المحددة لها"
                />
            </div>
        </div>
    );
}

export default Benefits;
