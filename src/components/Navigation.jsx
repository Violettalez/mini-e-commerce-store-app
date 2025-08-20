import { IoHeartSharp } from "react-icons/io5";
import { PiShoppingCartFill } from "react-icons/pi";
import { Link } from "react-router-dom";
function Navigation({ data }) {
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
          <Link to="/favorites">Favorites</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
      </ul>
      <div className="flex gap-4 *:hover:cursor-pointer">
        <Link to="/favorites">
          <IoHeartSharp className="text-2xl text-basic-red" />
        </Link>
        <Link to="/cart">
          <PiShoppingCartFill className="text-2xl" />
        </Link>
      </div>
    </nav>
  );
}
export default Navigation;
