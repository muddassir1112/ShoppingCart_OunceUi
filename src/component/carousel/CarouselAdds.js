import React from "react";
import { Card, Carousel, TextStyles } from "@cedcommerce/ounce-ui";
import { bannerImages } from "../../data/Data";
export const CarouselAdds = () => {
  return (
    // <Card title="Our Offer Zone">
    <>
      {/* <div className="story-color-items">
        <div className="story-color-box"> */}
      <div
        className="story-color-aria story-color-GR65"
        style={{
          backgroundColor: "#D7EAE2",
          padding: "20px",
        }}
      >
        <TextStyles fontweight="extraBold" utility="story-color-Name">
          Our Offer Zone
        </TextStyles>
      </div>
      {/* </div>
       </div> */}
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
        {bannerImages.map((ele, index) => (
          <Card cardType="Bordered" media={ele} key={index}></Card>
        ))}
      </Carousel>
      {/* </Card> */}
    </>
  );
};
