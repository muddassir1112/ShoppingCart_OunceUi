import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { NavBar } from "./component/navbar/NavBar";
import { Product } from "./component/landing_page/Product";
import { Cart } from "./component/cart/Cart";
import { createContext, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
export const ProductContext = createContext();
function App() {
  // const [Products, setProducts] = useState([]);
  const AppLayout = () => (
    <>
      <NavBar />
      <Outlet />
    </>
  );
  let router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout />}>
        <Route path="/" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    )
  );

  return (
    <Provider store={store}>
      {/* <ProductContext.Provider value={{ Products, setProducts }}> */}
        <RouterProvider router={router} />
      {/* </ProductContext.Provider> */}
    </Provider>
  );
}

export default App;
