const createSlice = require("@reduxjs/toolkit").createSlice;
const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;

const initialState = {
  products: [], //products array
  searchedArray: [], //search products array
  cartArray: [], //cart array product
  error: "",
  loading: "block",
};
// method to fetch products through API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://dummyjson.com/products");
    const element = await response.json();
    let temp = [];
    console.log("ELE", element);
    for (let i = 0; i < element.products.length; i++) {
      let obj = {
        id: element.products[i].id,
        title: element.products[i].title,
        brand: element.products[i].brand,
        category: element.products[i].category,
        description: element.products[i].description,
        price: element.products[i].price,
        ratings: element.products[i].rating,
        thumbnail: element.products[i].thumbnail,
        quantity: 1,
      };
      temp.push(obj);
    }
    return temp;
  }
);
// slice
export const AppSlice = createSlice({
  name: "eCommerceApp",
  initialState,
  reducers: {
    // to search products
    handleSearch: (state, action) => {
      state.searchedArray.push(action.payload);
    },
    deleteSearch: (state, action) => {
      state.searchedArray = [];
    },
    handleAddToCart: (state, action) => {
      state.cartArray.push(action.payload);
    },
    increaseQuantity: (state, action) => {
      for (let i = 0; i < state.cartArray.length; i++) {
        if (state.cartArray[i].id === action.payload) {
          state.cartArray[i].quantity += 1;
        }
      }
    },
    decreaseQuantity: (state, action) => {
      for (let i = 0; i < state.cartArray.length; i++) {
        if (state.cartArray[i].id === action.payload) {
          if (state.cartArray[i].quantity > 1) {
            state.cartArray[i].quantity -= 1;
          } else {
            let confirm = window.confirm("Are you sure?");
            if (confirm === true) {
              state.cartArray.splice(i, 1);
            } else return;
          }
        }
      }
    },
    deleteCartProduct: (state, action) => {
      for (let i = 0; i < state.cartArray.length; i++) {
        if (state.cartArray[i].id === action.payload) {
          let confirm = window.confirm("Are you sure?");
          if (confirm === true) {
            state.cartArray.splice(i, 1);
          } else return;
        }
      }
    },
    // sort as per price low to high
    priceLowtoHigh: (state, action) => {
      let temp = [...action.payload];
      state.products = temp.sort((a, b) => a.price - b.price);
    },
     // sort as per price high to low
    priceHighToLow: (state, action) => {
      let temp = [...action.payload];
      state.products = temp.sort((b, a) => a.price - b.price);
    },
    // sort as per rating low to high
    ratingLowtoHigh: (state, action) => {
      let temp = [...action.payload];
      state.products = temp.sort((a, b) => a.ratings - b.ratings);
    },
    // sort as per rating low to high
    ratingHighToLow: (state, action) => {
      let temp = [...action.payload];
      state.products = temp.sort((b, a) => a.ratings - b.ratings);
    },
  },
  extraReducers: (builder) => {
    /*--------Fetch Products-------*/
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = "block";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = "none";
      state.products = action.payload;
      console.log("Redux------->", state.products);
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = "none";
      state.products = [];
      state.error = action.error.message;
    });
  },
});
export const {
  handleSearch,
  deleteSearch,
  handleAddToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteCartProduct,
  priceLowtoHigh,
  priceHighToLow,
  ratingLowtoHigh,
  ratingHighToLow,
} = AppSlice.actions;
export default AppSlice.reducer;
