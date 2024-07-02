import contact_image from "../public/contact.png";
import fawa1_image from "../public/fawa1.png";
import fawa2_image from "../public/fawa2.png";
import fawa3_image from "../public/fawa3.png";
import fawa4_image from "../public/fawa4.png";
import fb_image from "../public/fb.png";
import Hero_image from "../public/Hero.png";
import howWeWorkImage_image from "../public/how_we_work_image.png";
import howWeWork_image from "../public/how_we_work.png";
import instagram_image from "../public/instagram.png";
import linkedin_image from "../public/linkedin.png";
import service1_image from "../public/service1.png";
import service2_image from "../public/service2.png";
import service3_image from "../public/service3.png";
import whatsup_image from "../public/whatsup.png";
import React from "react";
import { useState, useEffect } from "react";

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
    return <div>Home</div>;
}

export default Home;
