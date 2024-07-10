import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel = ({ images }) => {
  //   console.log("data", JSON.parse(images[0])[0]);
  return (
    <Carousel showThumbs={false}>
      {images.length > 1 ? (
        images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Products ${index + 1}`}
              style={{ borderRadius: "10px" }}
            />
          </div>
        ))
      ) : (
        <img
          src={JSON.parse(images[0])[0]}
          alt={`Products`}
          style={{ borderRadius: "10px" }}
        />
      )}
      <img
        src={
          "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg"
        }
        alt={`No Products`}
        style={{ borderRadius: "10px" }}
      />
    </Carousel>
  );
};

export default ImageCarousel;
