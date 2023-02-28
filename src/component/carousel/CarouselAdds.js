import React from "react";
import { Card, Carousel } from "@cedcommerce/ounce-ui";
import { bannerImages } from "../../data/Data";
export const CarouselAdds = () => {
  return (
    <>
      <div
        className="story-color-aria story-color-GR65"
        style={{
          backgroundColor: "#FBFCFC",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2>Our Offer Zone</h2>
      </div>
      <Carousel
        arrowalign="bottomCenter"
        arrows
        dots
        dotsalign="bottomCenter"
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {/* carousel images with the help of map function */}
        {bannerImages.map((ele, index) => (
          <Card cardType="Bordered" media={ele} key={index}></Card>
        ))}
      </Carousel>
    </>
  );
};
