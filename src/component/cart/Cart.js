import { Button, Card, FlexLayout, FormElement } from "@cedcommerce/ounce-ui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  decreaseQuantity,
  deleteCartProduct,
  increaseQuantity,
} from "../../redux/AppSlice";

export const Cart = () => {
  const data = useSelector((state) => state.eCommerceApp);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [totalAmt, setTotalAmt] = useState(0);
  // Increase Quantity 
  const handleIncreaseQuan = (id) => {
    dispatch(increaseQuantity(id));
  };
  // Decrease Quantity
  const handleDecreaseQuan = (id) => {
    dispatch(decreaseQuantity(id));
  };
  // function to delete the product in the cart
  const handleDeleteProduct = (id) => {
    dispatch(deleteCartProduct(id));
  };
  // function to checkout from cart page
  const handleCheckout = () => {
    alert("Thank you for shopping");
    navigate("/");
  };
  // UseEffect Hook to display the total amount
  useEffect(() => {
    let temp = 0;
    for (let i = 0; i < data.cartArray.length; i++) {
      temp +=
        Number(data.cartArray[i].quantity) * Number(data.cartArray[i].price);
    }
    setPrice(temp);
    let totalTemp = price - (price * 10) / 100;
    setTotalAmt(totalTemp);
  }, [data.cartArray, price]);
  return (
    <div className="cart-wrapper">
      <h1
        style={{
          textAlign: "center",
          padding: "15px 0px 15px 0px",
          background: "lightgray",
        }}
      >
        Your Shopping Cart
      </h1>
      <div className="cart-div">
        {data.cartArray.length > 0 ? (
          <FlexLayout
            direction="horizontal"
            spacing="loose"
            valign="left"
            desktopWidth="50"
            mobileWidth="100"
            tabWidth="50"
          >
            <Card>
              {data.cartArray.length > 0
                ? data.cartArray.map((ele) => (
                    <Card cardType="Bordered">
                      <FlexLayout
                        direction="horizontal"
                        spacing="loose"
                        valign="start"
                      >
                        <img
                          src={ele.thumbnail}
                          alt="..."
                          style={{ width: "335px", height: "200px" }}
                        />
                        <FlexLayout
                          direction="vertical"
                          spacing="loose"
                          valign="start"
                        >
                          <h2>{ele.title}</h2>
                          <p>
                            <i>${ele.price}(per unit)</i>
                          </p>
                          <span>
                            <Button
                              type="Outlined"
                              onClick={() => handleIncreaseQuan(ele.id)}
                            >
                              +
                            </Button>{" "}
                            {ele.quantity}{" "}
                            <Button
                              type="Outlined"
                              onClick={() => handleDecreaseQuan(ele.id)}
                            >
                              -
                            </Button>
                          </span>
                          <p>
                            <Button
                              type="Danger"
                              onClick={() => handleDeleteProduct(ele.id)}
                            >
                              Remove
                            </Button>
                          </p>
                        </FlexLayout>
                      </FlexLayout>
                    </Card>
                  ))
                : null}
            </Card>
            <Card>
              <Card cardType="Bordered">
                <div className="bill">
                  <h2>Your Bill</h2>
                  <span className="">Amount</span>
                  <span className="float-end">${price}</span>
                  <br></br>
                  <span>Shipping Charges</span>
                  <span className="float-end">$0</span>
                  <br></br>
                  <span>Discount(%)</span>
                  <span className="float-end">10%</span>
                  <br></br>
                  <span style={{ color: "green", fontSize: "18px" }}>
                    Total Amount
                  </span>
                  <span
                    style={{ color: "green", fontSize: "18px" }}
                    className="float-end"
                  >
                    ${totalAmt}
                  </span>
                  <p style={{ textAlign: "center" }}>
                    <Button type="Danger" onClick={handleCheckout}>
                      Checkout
                    </Button>
                  </p>
                </div>
              </Card>
            </Card>
          </FlexLayout>
        ) : (
          <Card>
            <Card cardType="Bordered">
              <h1>Your Cart is empty!!!</h1>
              <br></br>
              <h3>Please Add Some Products</h3>
            </Card>
          </Card>
        )}
      </div>
    </div>
  );
};
