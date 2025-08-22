import { IoHeartSharp } from "react-icons/io5";
import { PiShoppingCartFill } from "react-icons/pi";
import { FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Navigation({ data }) {
  const { totalQ } = useSelector((state) => state.cart);
  return (
    <nav className="flex justify-between items-center mb-5">
      <img src="/long-logo.svg" alt="logo" draggable="false" />
      <ul className="flex gap-15 items-center *:text-lg *:hover:border-b-3 *:hover:border-basic-red *:font-header *:hover:cursor-pointer">
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
                <p className="w-full text-sm text-cente font-bold text-basic-weight">
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
    </nav>
  );
}
export default Navigation;
