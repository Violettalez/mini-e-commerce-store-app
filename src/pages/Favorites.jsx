import { deleteProductFav } from "../store/favouritesSlice";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../store/cartSlice";
import { LuBookHeart } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function Favorites({ data }) {
  const { products } = useSelector((state) => state.favourites);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="mt-10 px-5">
      <div className="w-full py-6 bg-gradient-to-r from-basic-red via-dark-red to-basic-black text-center rounded-2xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg tracking-wide">
          Favourites List
        </h1>
        <p className="text-dark-weight text-center">
          Your saved items in one place
        </p>
      </div>

      {products.length !== 0 ? (
        <div className="grid grid-cols-4 gap-10 pt-4">
          {products.map((product) => (
            <div
              className="flex flex-col items-center shadow-xl rounded-xl justify-between py-4 px-[10%] gap-4 mb-4"
              key={product.id}
            >
              <img
                src={product.picture}
                alt={product.title}
                className="w-[100px] h-[100px] object-cover rounded flex-1"
                draggable="false"
              />
              <div className="flex flex-col gap-0.5 flex-3 w-full">
                <h2 className="text-lg font-semibold font-header">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-500">Brand: {product.brand}</p>
                <p className="text-sm text-gray-400">
                  Category: {product.category}
                </p>
                <p className="text-lg font-bold">₴{product.price}</p>
                <p className="text-sm text-yellow-500">
                  Rating: {product.rating}⭐
                </p>
              </div>
              <button
                className="w-full bg-basic-red text-white py-2 px-4 rounded hover:bg-dark-red"
                onClick={() => {
                  dispatch(addProduct(product));
                  console.log("Product added in cart!");
                  navigate("/cart");
                }}
              >
                Buy now
              </button>
              <button
                className="text-sm text-gray-400 py-1 cursor-pointer"
                onClick={() => dispatch(deleteProductFav(product.id))}
              >
                Remove from Favourites
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-[10%]">
          <LuBookHeart className="text-6xl text-basic-red opacity-50" />
          <p className="font-bold opacity-50">
            No products in your favourites!
          </p>
        </div>
      )}
    </div>
  );
}
export default Favorites;
