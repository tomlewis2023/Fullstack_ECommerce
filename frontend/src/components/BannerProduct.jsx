import React, { useEffect, useState } from "react";
import image1 from "../asset/banner/img1.webp";
import image2 from "../asset/banner/img2.webp";
import image3 from "../asset/banner/img3.jpg";
import image4 from "../asset/banner/img4.jpg";
import image5 from "../asset/banner/img5.webp";

import image1Mobile from "../asset/banner/img1_mobile.jpg";
import image2Mobile from "../asset/banner/img2_mobile.webp";
import image3Mobile from "../asset/banner/img3_mobile.jpg";
import image4Mobile from "../asset/banner/img4_mobile.jpg";
import image5Mobile from "../asset/banner/img5_mobile.png";

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setcurrentImage] = useState(0);

  const desktopImages = [image1, image2, image3, image4, image5];

  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setcurrentImage((preve) => preve + 1);
    }
  };

  const preveImage = () => {
    if (currentImage != 0) {
      setcurrentImage((preve) => preve - 1);
    }
  };
  //auto scroll banner
  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setcurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);

  return (
    <div className="container mx-auto px-4 rounded ">
      <div className="h-60 md:h-80 w-full bg-slate-200 relative">
        <div className="absolute z-10 h-full w-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-2xl">
            <button
              onClick={preveImage}
              className="bg-white shadow-md rounded-full p-1"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className="bg-white shadow-md rounded-full p-1"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* desktop and tablet version */}

        <div className="hidden md:flex w-full h-full overflow-hidden">
          {desktopImages.map((imageurl, index) => {
            return (
              //translate(-${currentImage * 100}%): This CSS transform function moves the container horizontally. The currentImage index determines how much the container is shifted.
              //For example, if currentImage is 1, the container will shift -100% to the left, showing the second image in the banner.
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={imageurl}
                style={{ transform: `translate(-${currentImage * 100}%)` }}
              >
                <img src={imageurl} className="w-full h-full" />
              </div>
            );
          })}
        </div>

        {/* Mobile version */}

        <div className="flex w-full h-full overflow-hidden md:hidden">
          {mobileImages.map((imageurl, index) => {
            return (
              //translate(-${currentImage * 100}%): This CSS transform function moves the container horizontally. The currentImage index determines how much the container is shifted.
              //For example, if currentImage is 1, the container will shift -100% to the left, showing the second image in the banner.
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={imageurl}
                style={{ transform: `translate(-${currentImage * 100}%)` }}
              >
                <img src={imageurl} className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
