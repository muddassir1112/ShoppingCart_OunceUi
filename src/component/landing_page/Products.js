import {
  Button,
  Card,
  FlexLayout,
  Loader,
  TextStyles,
} from "@cedcommerce/ounce-ui";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSearch,
  fetchProducts,
  handleAddToCart,
  handleSearch,
  priceHighToLow,
  priceLowtoHigh,
  ratingHighToLow,
  ratingLowtoHigh,
} from "../../redux/AppSlice";
import { CarouselAdds } from "../carousel/CarouselAdds";

export const Product = () => {
  const data = useSelector((state) => state.eCommerceApp);
  const dispatch = useDispatch();
  const [searchedInput, setSearchedInput] = useState("");//input state fro searching the product
  const [mappedState, setMappedState] = useState([]);//to map the product on the landing page
  const [select1, setSelect1] = useState("");//onchange state for slecting the filter option
  const [select2, setSelect2] = useState("");
  // useEffect Hook to dispatch the function
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  // function to search the products
  const handleSearchProducts = (e) => {
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
  //sort functionality
  const handleSort = () => {
    if (select1 === "price" && select2 === "LTH") {
      dispatch(priceLowtoHigh(data.products));
    } else if (select1 === "price" && select2 === "HTL") {
      dispatch(priceHighToLow(data.products));
    } else if (select1 === "ratings" && select2 === "LTH") {
      dispatch(ratingLowtoHigh(data.products));
    } else if (select1 === "ratings" && select2 === "HTL") {
      dispatch(ratingHighToLow(data.products));
    }
  };

  // add to cart functionality
  const addToCart = (item) => {
    let tempCartArr = data.cartArray;
    if (tempCartArr === null) {
      dispatch(handleAddToCart(item));
    } else {
      for (let i = 0; i < tempCartArr.length; i++) {
        if (item.id === tempCartArr[i].id) {
          alert("Item already in the cart");
          return;
        }
      }
      dispatch(handleAddToCart(item));
    }
  };
// function to map the array as per the requirement
  useEffect(() => {
    if (data.searchedArray.length > 0) {
      setMappedState(data.searchedArray);
    } else if (data.products.length > 0 && data.searchedArray.length === 0) {
      setMappedState(data.products);
    }
  }, [data.products, data.searchedArray]);
  return (
    <div>
      <CarouselAdds />
      <h1 className="mt-2" style={{ textAlign: "center" }}>
        Our Featured Products
      </h1>
      <div className="d-flex p-4" style={{ marginLeft: "4%" }}>
        <div className="input-group me-1" style={{ height: "50px", width: "45%" }}>
          <input
            type="text"
            className="form-control"
            value={searchedInput}
            style={{ fontSize: "16px" }}
            onChange={(e) => setSearchedInput(e.target.value)}
            placeHolder="Search product by title,brand,category etc...."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            style={{ fontSize: "16px" }}
            onClick={handleSearchProducts}
          >
            Search
          </button>
        </div>
        <button
          onClick={() => dispatch(deleteSearch())}
          className="btn btn-primary me-5"
          style={{ fontSize: "16px" }}
          type="button"
        >
          Clear Search Results
        </button>
         <select
          id="inputState"
          className="me-2 form-select"
          style={{ height: "50px", width: "15%", fontSize: "16px" }}
          onChange={(e) => setSelect1(e.target.value)}
        >
          <option selected>Sort By...</option>
          <option value="price">Price</option>
          <option value="ratings">Ratings</option>
        </select>
        <select
          id="inputState"
          className="me-2 form-select"
          style={{ height: "50px", width: "15%", fontSize: "16px" }}
          onChange={(e) => {
            console.log(e.target.value);
            setSelect2(e.target.value);
          }}
        >
          <option selected>Order By...</option>
          <option value="LTH">Low to High</option>
          <option value="HTL">High to Low</option>
        </select>
        <button
          type="button"
          className="btn btn-danger me-2"
          style={{ width: "65px", fontSize: "16px" }}
          onClick={handleSort}
        >
          Sort
        </button>
      </div>

      {data.products.length < 1 ? (
        <div style={{ height: "20px" }}>
          <Loader
            percentage={20}
            title="We are Setting Up your Store"
            type="Loader1"
          />
        </div>
      ) : null}
      <FlexLayout halign="center" wrap="wrap" order="Order">
        {mappedState.length > 0
          ? mappedState.map((ele, index) => (
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
                    onClick={() => addToCart(ele)}
                  />
                </Card>
              </div>
            ))
          : null}
      </FlexLayout>
    </div>
  );
};
