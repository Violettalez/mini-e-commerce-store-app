import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import Navigation from "./components/Navigation";
import Orders from "./pages/Orders";
import AboutUs from "./pages/AboutUs";
import { store } from "./store/store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/mini-e-commerce-store-app">
        <div className="w-full min-h-screen py-5 md:px-20">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
