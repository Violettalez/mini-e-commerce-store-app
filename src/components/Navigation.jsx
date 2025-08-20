import { IoHeartSharp } from "react-icons/io5";
import { PiShoppingCartFill } from "react-icons/pi";
function Navigation({ data }) {
  return (
    <nav className="flex justify-between items-center mb-5">
      <img src="/long-logo.svg" alt="logo" draggable="false" />
      <ul className="flex gap-15 items-center *:text-lg *:hover:border-b-3 *:hover:border-basic-red *:font-header *:hover:cursor-pointer">
        <li>Home</li>
        <li>About us</li>
        <li>Favorites</li>
        <li>Cart</li>
        <li>Orders</li>
      </ul>
      <div className="flex gap-4 *:hover:cursor-pointer">
        <IoHeartSharp className="text-2xl text-basic-red" />
        <PiShoppingCartFill className="text-2xl" />
      </div>
    </nav>
  );
}
export default Navigation;
