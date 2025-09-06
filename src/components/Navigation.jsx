import { useState } from "react";
import { IoHeartSharp } from "react-icons/io5";
import { PiShoppingCartFill } from "react-icons/pi";
import { FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CgMenuGridR } from "react-icons/cg";
import { selectCartQuantity } from "../store/cartSlice";
import { useLocation } from "react-router-dom";
import { IoFilterSharp } from "react-icons/io5";
import FiltersPanel from "./FiltersPanel";

function Navigation({ data }) {
  const totalQ = useSelector(selectCartQuantity);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 w-full bg-basic-weight py-4 px-4 md:px-25 flex justify-between items-center z-[100] shadow-lg">
      <img src="/long-logo.svg" alt="logo" draggable="false" />

      <ul className="hidden md:flex gap-15 items-center *:text-lg *:hover:border-b-3 *:hover:border-basic-red *:font-header *:hover:cursor-pointer">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About us</Link>
        </li>
        <li>
          <Link to="/favorites" className="flex items-center gap-1">
            <IoHeartSharp className="text-2xl text-basic-red" />
            Favorites
          </Link>
        </li>
        <li>
          <Link to="/cart" className="flex items-center gap-1 relative">
            <PiShoppingCartFill className="text-2xl" />
            Cart
            {totalQ > 0 ? (
              <div className="flex flex-col justify-center rounded-full w-4 h-4 absolute right-[-12px] top-[-2px] text-sm text-center bg-basic-red font-bold text-basic-weight">
                <p className="w-full text-sm font-bold text-basic-weight">
                  {totalQ}
                </p>
              </div>
            ) : null}
          </Link>
        </li>
        <li>
          <Link to="/orders" className="flex items-center gap-1">
            <FaBoxOpen className="text-2xl" />
            Orders
          </Link>
        </li>
      </ul>
      <div className="flex md:hidden gap-4 items-center">
        <Link to="/cart" className="flex text-3xl cursor-pointer items-center gap-1 relative">
          <PiShoppingCartFill className="text-2xl" />
          {totalQ > 0 ? (
            <div className="flex flex-col justify-center rounded-full w-4 h-4 absolute right-[-12px] top-[-2px] text-sm text-center bg-basic-red font-bold text-basic-weight">
              <p className="w-full text-sm font-bold text-basic-weight">
                {totalQ}
              </p>
            </div>
          ) : null}
        </Link>
        <CgMenuGridR
          className="block md:hidden text-3xl cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
        {location.pathname === "/" && (
          <IoFilterSharp
            className="block md:hidden text-3xl cursor-pointer"
            onClick={() => setIsOpenFilter(true)}
          />
        )}
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-basic-weight z-[200] flex flex-col items-center px-10 justify-center gap-8 text-2xl font-header transition-transform duration-500 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <button
          className="absolute top-6 right-6 text-3xl text-basic-red"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
        <img src="/long-logo.svg" alt="logo" draggable="false" />
        <Link to="/" onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link to="/about" onClick={() => setIsOpen(false)}>
          About us
        </Link>
        <Link
          to="/favorites"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2"
        >
          <IoHeartSharp className="text-2xl text-basic-red" />
          Favorites
        </Link>
        <Link
          to="/cart"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2 relative"
        >
          <PiShoppingCartFill className="text-2xl" />
          Cart
          {totalQ > 0 && (
            <span className="absolute -top-2 -right-3 bg-basic-red text-white text-xs font-bold rounded-full px-2 py-0.5">
              {totalQ}
            </span>
          )}
        </Link>
        <Link
          to="/orders"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2"
        >
          <FaBoxOpen className="text-2xl" />
          Orders
        </Link>
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-full bg-basic-weight z-[200] flex flex-col items-center px-10 justify-center gap-8 text-2xl font-header transition-transform duration-500 ${
          isOpenFilter ? "translate-y-0 " : "-translate-y-full" 
        }`}
      >
        <button
          className="absolute top-6 right-6 text-3xl text-basic-red"
          onClick={() => setIsOpenFilter(false)}
        >
          ✕
        </button>
        <FiltersPanel sortingName={"sortingMob"}/>
      </div>
    </nav>
  );
}

export default Navigation;
