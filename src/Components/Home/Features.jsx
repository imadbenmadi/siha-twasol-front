import React from "react";
import Feature1_image from "../../../public/Home/Feature1.png";
import Feature2_image from "../../../public/Home/Feature2.png";
import Feature3_image from "../../../public/Home/Feature3.png";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function Features() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.5, // Delay between animations of each child
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 1.4, delay: i * 0.5 }, // Custom delay for each card
        }),
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div>
                <div className="text-center mt-24">
                    <div className="text-2xl font-semibold">ميزاتنا</div>
                    <div className="text-sm pt-2">
                        استكشف ميزات منصتنا القوية المصممة لإبقائك على اتصال
                        والتحكم في صحتك
                    </div>
                </div>
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : ""}
                    className="flex flex-col flex-wrap justify-center md:flex-row items-center gap-12 md:overflow-x-auto overflow-hidden custom-overflow px-12 py-12"
                >
                    {[Feature1_image, Feature2_image, Feature3_image].map(
                        (image, index) => (
                            <motion.div
                                key={index}
                                custom={index}
                                variants={itemVariants}
                                className="w-[300px] md:h-[250px] shrink-0 border shadow-[#2a77f147] shadow-xl rounded-xl py-4"
                            >
                                <div>
                                    <img
                                        src={image}
                                        className="mx-auto w-12 pb-3"
                                        alt=""
                                    />
                                </div>
                                <div className="text-center">
                                    <div className="text-lg md:text-xl font-semibold mb-4">
                                        إشعارات الأدوية واللقاحات
                                    </div>
                                    <div className="text-sm md:text-base">
                                        احصل على إشعارات بشأن الحملات الصحية
                                        وأيام التوعية والخدمات الطبية المجانية.
                                    </div>
                                </div>
                            </motion.div>
                        )
                    )}
                </motion.div>
            </div>
        </div>
    );
}

export default Features;
