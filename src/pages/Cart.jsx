import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  deleteProduct,
  totalDeleteProduct,
} from "../store/cartSlice";
import { MdDeleteForever } from "react-icons/md";
import { FaSquarePlus, FaSquareMinus } from "react-icons/fa6";

function Cart({ data }) {
  const { products, sum } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row gap-6">
      <div className="flex-2 flex flex-col gap-4 w-full">
        {products.length !== 0 ? (
          products.map((product) => (
            <div
              className="flex flex-row items-center shadow-xl rounded-xl justify-between py-4 px-[2%] gap-6"
              key={product.id}
            >
              <img
                src={product.picture}
                alt={product.title}
                className=" w-[100px] h-[100px] object-cover mb-4 rounded flex-1"
              />
              <div className="flex-flex-col gap-0.5 flex-3">
                <h2 className="text-lg font-semibold font-header">
                  {product.title}
                </h2>
                <p className=" text-sm text-gray-500">Brand: {product.brand}</p>
                <p className=" text-sm text-gray-400">
                  Category: {product.category}
                </p>
                <p className=" text-sm">{product.description}</p>
                <p className=" text-lg font-bold">${product.price}</p>
                <p className=" text-sm text-yellow-500">
                  Rating: {product.rating}⭐
                </p>
              </div>
              <div className="flex gap-1 items-center flex-1 justify-center">
                <FaSquareMinus
                  className="text-2xl cursor-pointer"
                  onClick={() => dispatch(deleteProduct(product.id))}
                />
                <p>{product.quantity}</p>
                <FaSquarePlus
                  className="text-2xl cursor-pointer"
                  onClick={() => dispatch(addProduct(product))}
                />
                <MdDeleteForever
                  className="cursor-pointer text-basic-red text-4xl"
                  onClick={() => dispatch(totalDeleteProduct(product.id))}
                />
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>No products in your cart!</p>
          </div>
        )}
      </div>

      <div className="flex-1 bg-dark-weight h-[80vh] rounded-xl"></div>
    </div>
  );
}
export default Cart;
