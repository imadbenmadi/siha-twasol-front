import contact_image from "../../../public/Home/contact.png";
import fawa1_image from "../../../public/Home/fawa1.png";
import fawa2_image from "../../../public/Home/fawa2.png";
import fawa3_image from "../../../public/Home/fawa3.png";
import fawa4_image from "../../../public/Home/fawa4.png";
import fb_image from "../../../public/Home/fb.png";
import Hero_image from "../../../public/Home/Hero.png";
import howWeWorkImage_image from "../../../public/Home/how_we_work_image.png";
import howWeWork_image from "../../../public/Home/how_we_work.png";
import instagram_image from "../../../public/Home/instgram.png";
import linkedin_image from "../../../public/Home/linkedin.png";
import service1_image from "../../../public/Home/service1.png";
import service2_image from "../../../public/Home/service2.png";
import service3_image from "../../../public/Home/service3.png";
import whatsup_image from "../../../public/Home/whatup.png";
import Logo from "../../../public/Logo.png";
import NavBar from "./NavBar/NavBar";
import React from "react";
import { useState, useEffect } from "react";
import Hero from "./Hero";
function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch_images = () => {
            return new Promise((resolve, reject) => {
                const images = [
                    contact_image,
                    fawa1_image,
                    fawa2_image,
                    fawa3_image,
                    fawa4_image,
                    fb_image,
                    Hero_image,
                    howWeWorkImage_image,
                    howWeWork_image,
                    instagram_image,
                    linkedin_image,
                    service1_image,
                    service2_image,
                    service3_image,
                    whatsup_image,
                ];
                images.forEach((imageSrc) => {
                    const img = new Image();
                    img.onload = () => {
                        resolve();
                    };
                    img.onerror = () => {
                        resolve();
                    };
                    img.src = imageSrc;
                });
            });
        };

        Promise.all([fetch_images()])
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);
    if (loading) {
        return (
            <div className=" w-screen h-screen flex flex-col items-center justify-center">
                <img src={Logo} alt="" className=" w-20 pb-6" />
                <span className="loader"></span>
            </div>
        );
    }
    return (
        <div className="relative min-h-h-screen overflow-y-auto custom-overflow overflow-x-hidden">
            <NavBar />
            <div className=" mt-[60px]">
                <Hero />
            </div>
        </div>
    );
}

export default Home;
