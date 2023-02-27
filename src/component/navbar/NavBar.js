import {
  Button,
  Card,
  FlexLayout,
  PageHeader,
  CartAdded
} from "@cedcommerce/ounce-ui";
import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import logo from "../../images/logo.png";
// import { fetchProducts } from "../../redux/AppSlice";
import { CarouselAdds } from "../carousel/CarouselAdds";

export const NavBar = () => {
 
  return (
    <>
      <Card cardType="Bordered">
        <PageHeader
          action={
            <FlexLayout spacing="loose" wrap="noWrap">
              <Button onClick={function noRefCheck() {}} type="Outlined">
                Home
              </Button>
              <Button onClick={function noRefCheck() {}} type="Outlined">
                About Us
              </Button>
              <Button onClick={function noRefCheck() {}} type="Outlined">
                Services
              </Button>
              <Button onClick={function noRefCheck() {}} type="Outlined">
                Contact Us
              </Button>
              <Button onClick={function noRefCheck() {}} type="Outlined">
                Cart<i className='fas fa-shopping-cart'></i>
                {/* <CartAdded size="24" color="#1c2433" /> */}
              </Button>
            </FlexLayout>
          }
          title={<img src={logo} alt="..." />}
        />
      </Card>
      <CarouselAdds />
    </>
  );
};
