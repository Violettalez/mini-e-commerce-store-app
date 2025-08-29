import { useSelector, useDispatch } from "react-redux";
import { addOrders } from "../store/ordersSlice";
import { useNavigate } from "react-router-dom";
import {
  addProduct,
  deleteProduct,
  totalDeleteProduct,
  addPromoCode,
  cleanCart,
  setDelivery,
} from "../store/cartSlice";
import { MdDeleteForever } from "react-icons/md";
import { FaSquarePlus, FaSquareMinus } from "react-icons/fa6";
import { FaBoxes } from "react-icons/fa";
import {
  selectCartTotalWithDiscount,
  selectCartQuantity,
  selectCartTotal,
} from "../store/cartSlice";
import { useState } from "react";

function Cart({ data }) {
  const { products, discount, delivery } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sum = useSelector(selectCartTotal);
  const totalQ = useSelector(selectCartQuantity);
  const [promoCode, setPromoCode] = useState("");
  const totalWithDiscount = useSelector(selectCartTotalWithDiscount);
  return (
    <div className="flex flex-row gap-6 pt-10">
      <div className="flex flex-col gap-4 w-[63vw] pt-4">
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
                draggable="false"
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
                <p className=" text-lg font-bold">₴{product.price}</p>
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
          <div className="flex flex-col items-center justify-center py-[20%]">
            <FaBoxes className="text-6xl text-basic-red opacity-50" />
            <p className="font-bold opacity-50">No products in your cart!</p>
          </div>
        )}
      </div>

      <div className="fixed right-20 bg-dark-weight min-h-[80vh] w-[25%] rounded-xl flex flex-col py-6 px-[15px] text-white">
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="PromoCode"
            value={promoCode}
            className="flex-1 px-3 py-2 rounded-lg bg-basic-weight text-basic-black placeholder-gray-400 border border-gray-600 focus:border-red-500 focus:outline-none"
            onChange={(e) => setPromoCode(e.target.value)}
          />

          <button
            className="px-4 py-2 bg-basic-red rounded-lg hover:bg-red-700 transition disabled:bg-dark-weight disabled:border-1 disabled:border-basic-red disabled:text-basic-red"
            disabled={totalQ < 1}
            onClick={() => dispatch(addPromoCode(promoCode))}
          >
            Apply
          </button>
        </div>
        {discount !== 0 ? (
          <p className=" text-basic-red">Your discount: {discount}%</p>
        ) : null}
        <h2 className="text-xl font-semibold mb-4 border-b text-basic-black">
          Your Order
        </h2>

        <div className="flex justify-between mb-2 text-basic-black items-center">
          <p>Products quantity:</p>
          <p>{totalQ}</p>
        </div>
        <div className="flex justify-between mb-3 text-basic-black items-center">
          <p>Total:</p>
          {discount === 0 ? (
            <p className="text-2xl font-semibold">₴{sum}</p>
          ) : (
            <div>
              <p className="text-2xl font-semibold text-basic-red">
                ₴{totalWithDiscount}
              </p>
              <p className="text-lg line-through text-gray-500">₴{sum}</p>
            </div>
          )}
        </div>

        <details className="py-3  flex flex-col gap-2" open="true">
          <summary className="text-xl font-semibold mb-3 border-b text-basic-black">
            Delivery
          </summary>
          <div className="flex flex-col gap-2">
            <div
              className={`flex items-center justify-between rounded-xl p-2 transition 
    ${
      delivery === 150
        ? "border-basic-red border-2"
        : "border border-gray-700/60 hover:border-basic-red hover:border-2"
    }`}
              onClick={() => dispatch(setDelivery(150))}
            >
              <div>
                <p className="font-medium text-basic-black">
                  Standard Delivery
                </p>
                <p className="text-sm text-gray-400">3–5 days</p>
              </div>
              <span className="font-semibold text-basic-black">₴150</span>
            </div>

            <div
              className={`flex items-center justify-between rounded-xl p-2 transition 
    ${
      delivery === 350
        ? "border-basic-red border-2"
        : "border border-gray-700/60 hover:border-basic-red hover:border-2"
    }`}
              onClick={() => dispatch(setDelivery(350))}
            >
              <div>
                <p className="font-medium text-basic-black">Express Delivery</p>
                <p className="text-sm text-gray-400">1–2 days</p>
              </div>
              <span className="font-semibold text-basic-black">₴350</span>
            </div>

            <div
              className={`flex items-center justify-between rounded-xl p-2 transition 
    ${
      delivery === 0
        ? "border-basic-red border-2"
        : "border border-gray-700/60 hover:border-basic-red hover:border-2"
    }`}
              onClick={() => dispatch(setDelivery(0))}
            >
              <div>
                <p className="font-medium text-basic-black">Pickup Point</p>
                <p className="text-sm text-gray-400">2–3 days</p>
              </div>
              <span className="font-semibold text-basic-red">Free</span>
            </div>
          </div>
        </details>

        <button
          className="w-full py-3 mt-auto  rounded-xl bg-basic-red font-semibold hover:bg-red-700 transition disabled:bg-dark-weight disabled:border-1 disabled:border-basic-red disabled:text-basic-red"
          disabled={totalQ < 1}
          onClick={() => {
            console.log({
              products: products,
              discount: discount,
              delivery: delivery,
              sum: sum,
              totalQ: totalQ,
              totalWithDiscount: totalWithDiscount,
            });
            dispatch(
              addOrders({
                products: products,
                discount: discount,
                delivery: delivery,
                sum: sum,
                totalQ: totalQ,
                totalWithDiscount: totalWithDiscount,
              })
            );
            dispatch(cleanCart());
            navigate("/orders");
          }}
        >
          Apply order
        </button>
        <button
          className="text-sm text-gray-400 py-3 cursor-pointer"
          onClick={() => dispatch(cleanCart())}
        >
          Clean Cart
        </button>
      </div>
    </div>
  );
}
export default Cart;
