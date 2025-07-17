import React, { useState } from "react";
import Slider from "react-slick";
import { FaPaw } from "react-icons/fa";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import galleryImage1 from "../assets/galleryImage/gallery1.jpg";
import galleryImage2 from "../assets/galleryImage/gallery2.jpg";
import galleryImage3 from "../assets/galleryImage/gallery3.jpg";
import galleryImage4 from "../assets/galleryImage/gallery4.jpg";
import galleryImage5 from "../assets/galleryImage/gallery5.jpg";
import galleryImage6 from "../assets/galleryImage/gallery6.jpg";

const galleryImages = [
  { id: 1, src: galleryImage1, alt: "Man playing with a brown dog" },
  { id: 2, src: galleryImage2, alt: "Person holding a kitten" },
  { id: 3, src: galleryImage3, alt: "Woman with a white dog" },
  { id: 4, src: galleryImage4, alt: "Two golden retriever puppies" },
  { id: 5, src: galleryImage5, alt: "White cat looking up" },
  { id: 6, src: galleryImage6, alt: "Corgi on a leash" },
];

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleImageClick = (i) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <div className="overflow-hidden mb-24">
      <div className="mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
            — IMAGE TOUR —
          </p>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">GALLERY</h2>
          <div className="text-[#018AE0]/50 rotate-12 text-xl flex justify-center">
            <FaPaw />
          </div>
        </div>

        {/* Slider */}
        <Slider {...settings}>
          {galleryImages.map((image, i) => (
            <div key={image.id} className="px-4 outline-none">
              <div
                className="relative overflow-hidden rounded-lg  cursor-pointer"
                onClick={() => handleImageClick(i)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-white/40 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Lightbox Viewer */}
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={galleryImages.map((img) => ({ src: img.src, alt: img.alt }))}
          styles={{
            container: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Gallery;
