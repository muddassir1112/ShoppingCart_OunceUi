import {
  Button,
  Card,
  FlexLayout,
  FormElement,
  Loader,
  TextField,
  TextStyles,
} from "@cedcommerce/ounce-ui";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductContext } from "../../App";
import {
  deleteSearch,
  fetchProducts,
  handleSearch,
} from "../../redux/AppSlice";
// import { CarouselAdds } from "./CarouselAdds";

export const Product = () => {
  const data = useSelector((state) => state.eCommerceApp);
  const dispatch = useDispatch();
  const [searchedInput, setSearchedInput] = useState("");
  const [mappedState, setMappedState] = useState([]);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  console.log(data);
  // function to search the products
  const handleSearchProducts = (e) => {
    // e.preventDefault();
    let startsWithAlphabet = searchedInput.toUpperCase();
    if (data.searchedArray !== undefined || searchedInput === "") {
      dispatch(deleteSearch());
      for (var i = 0; i < data.products.length; i++) {
        if (
          data.products[i].title.toUpperCase().includes(startsWithAlphabet) ||
          data.products[i].brand.toUpperCase().includes(startsWithAlphabet) ||
          data.products[i].category.toUpperCase().includes(startsWithAlphabet)
        ) {
          dispatch(handleSearch(data.products[i]));
          setSearchedInput("");
        }
      }
    }
  };
  // const handleSort = (e) => {
  //   console.log(select1Ref.current.value);
  //   let newArr;
  //   if (
  //     select1Ref.current.value === "price" &&
  //     select2Ref.current.value === "LowToHigh"
  //   ) {
  //     newArr = productsArr.sort((a, b) => Number(a.price) - Number(b.price));
  //   } else if (
  //     select1Ref.current.value === "price" &&
  //     select2Ref.current.value === "HighToLow"
  //   ) {
  //     newArr = productsArr.sort((b, a) => Number(a.price) - Number(b.price));
  //   } else if (
  //     select1Ref.current.value === "rating" &&
  //     select2Ref.current.value === "LowToHigh"
  //   ) {
  //     newArr = productsArr.sort((a, b) => Number(a.rating - b.rating));
  //   } else if (
  //     select1Ref.current.value === "rating" &&
  //     select2Ref.current.value === "HighToLow"
  //   ) {
  //     newArr = productsArr.sort((b, a) => Number(a.rating - b.rating));
  //   }
  //   setProductsArr([...newArr]);
  //   select1Ref.current.value = "--Sort By--";
  //   select2Ref.current.value = "--Order--";
  // };
  return (
    <>
      <h1>Our Featured Products</h1>
      <Card>
        <FlexLayout
          desktopWidth="50"
          mobileWidth="100"
          spacing="extraLoose"
          tabWidth="50"
        >
          <TextField
            autocomplete="off"
            // name="Text"
            onChange={function noRefCheck(e) {
              setSearchedInput(e);
            }}
            placeHolder="Search product by title,brand,category etc...."
            type="text"
          />
          <Button
            content="Search"
            type="DangerOutlined"
            onClick={handleSearchProducts}
          />
          <Button
            content="Clear Search Results"
            onClick={() => dispatch(deleteSearch())}
            type="Primary"
          />
        </FlexLayout>
      </Card>
      {data.products.length < 1 ? (
        <div style={{ height: "20px" }}>
          <Loader
            percentage={20}
            title="We are Setting Up your Store"
            type="Loader1"
          />
        </div>
      ) : null}
      <div>
        <FlexLayout halign="center" wrap="wrap" order="Order">
          {data.searchedArray.length > 0
            ? data.searchedArray.map((ele, index) => (
                <div className="product-card" key={index}>
                  <Card alt="Natutre" cardType="Shadowed" title={ele.title}>
                    <img
                      src={ele.thumbnail}
                      alt="..."
                      style={{ width: "400px", height: "225px" }}
                    />
                    <div className="product-details">
                      <TextStyles
                        alignment="center"
                        subheadingTypes="MD-2.2"
                        type="SubHeading"
                        content={`Category: ${ele.category}`}
                      />
                      <TextStyles
                        alignment="left"
                        textcolor="positive"
                        subheadingTypes="SM-1.8"
                        type="SubHeading"
                        content={`Price: $${ele.price}`}
                      />
                      <span>Ratings: {ele.ratings}</span>&nbsp;
                      <span style={{ color: "#f8b704" }}>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </span>
                    </div>
                    <Button
                      content="ADD TO CART"
                      type="Danger"
                      length="fullBtn"
                    />
                  </Card>
                </div>
              ))
            : null}
        </FlexLayout>
      </div>
      <hr></hr>
      <FlexLayout halign="center" wrap="wrap" order="Order">
        {data.products.length > 0
          ? data.products.map((ele, index) => (
              <div className="product-card" key={index}>
                <Card alt="Natutre" cardType="Shadowed" title={ele.title}>
                  <img
                    src={ele.thumbnail}
                    alt="..."
                    style={{ width: "400px", height: "225px" }}
                  />
                  <div className="product-details">
                    <TextStyles
                      alignment="center"
                      subheadingTypes="MD-2.2"
                      type="SubHeading"
                      content={`Category: ${ele.category}`}
                    />
                    <TextStyles
                      alignment="left"
                      textcolor="positive"
                      subheadingTypes="SM-1.8"
                      type="SubHeading"
                      content={`Price: $${ele.price}`}
                    />
                    <span>Ratings: {ele.ratings}</span>&nbsp;
                    <span style={{ color: "#f8b704" }}>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                    </span>
                  </div>
                  <Button
                    content="ADD TO CART"
                    type="Danger"
                    length="fullBtn"
                  />
                </Card>
              </div>
            ))
          : null}
      </FlexLayout>
    </>
  );
};
