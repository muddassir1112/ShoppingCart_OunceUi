import { Button, Card, FlexLayout, PageHeader } from "@cedcommerce/ounce-ui";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";

export const NavBar = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.eCommerceApp);

  return (
    <>
      <Card cardType="Bordered">
        <PageHeader
          action={
            <FlexLayout spacing="loose" wrap="noWrap">
              <Button
                onClick={function noRefCheck() {
                  navigate("/");
                }}
                type="Outlined"
              >
                <i className="fas fa-home"></i> Home
              </Button>
              <Button onClick={function noRefCheck() {}} type="Outlined">
                <i className="fas fa-info"></i> About Us
              </Button>
              <Button onClick={function noRefCheck() {}} type="Outlined">
                <i className="fab fa-servicestack"></i> Services
              </Button>
              <Button onClick={function noRefCheck() {}} type="Outlined">
                <i className="fas fa-mobile"></i> Contact Us
              </Button>
              <Button
                onClick={function noRefCheck() {
                  navigate("/cart");
                }}
                type="Outlined"
              >
                <i className="fas fa-shopping-cart"></i> Cart
                {data.cartArray.length}
              </Button>
            </FlexLayout>
          }
          title={<img src={logo} alt="..." />}
        />
      </Card>
    </>
  );
};
