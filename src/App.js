import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { NavBar } from "./component/navbar/NavBar";
import { Product } from "./component/landing_page/Products";
import { Cart } from "./component/cart/Cart";
import { createContext } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Footer } from "./component/footer/Footer";
export const ProductContext = createContext();
function App() {
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
      <RouterProvider router={router} />
      <Footer/>
    </Provider>
  );
}

export default App;
