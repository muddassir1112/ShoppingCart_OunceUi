const createSlice = require("@reduxjs/toolkit").createSlice;
const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;

const initialState = {
  products: [], //products array
  searchedArray: [], //search products array
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
    // console.log("temp", temp);
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
  },
  extraReducers: (builder) => {
    /*--------Fetch Products-------*/
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = "block";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = "none";
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = "none";
      state.products = [];
      state.error = action.error.message;
    });
  },
});
export const { handleSearch, deleteSearch } = AppSlice.actions;
export default AppSlice.reducer;
