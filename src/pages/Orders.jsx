import { useSelector, useDispatch } from "react-redux";
import { deleteOrders } from "../store/ordersSlice";
import { FaBoxOpen } from "react-icons/fa";

function Orders({ data }) {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  return (
    <div className="mt-10 px-5">
      <div className="w-full mb-4 py-6 bg-gradient-to-r from-basic-red via-dark-red to-basic-black text-center rounded-2xl shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg tracking-wide">
          Orders List
        </h1>
        <p className="text-dark-weight text-center">
          Your saved items in one place
        </p>
      </div>
      {orders.orders.length != 0 ? (
        orders.orders.map((ord) => (
          <details
            key={ord.id}
            className="py-4 px-4 shadow-xl rounded-xl mb-4"
            open={true}
          >
            <summary className="font-extrabold text-xl">
              Order №{ord.id}
            </summary>
            <div className="mb-2 md:mb-0 mt-2 md:mt-0 flex flex-col gap-1 md:flex-row items-start md:items-center justify-between">
              <p>Date: {new Date(ord.date).toLocaleDateString()}</p>
              <p>Status: {ord.status}</p>
              <p>Delivery: ₴{ord.delivery}</p>
              <p>Discount: {ord.discount}%</p>
              <p>Total: ₴{ord.totalWithDiscount}</p>
              <button
                className=" bg-basic-red text-white py-2 px-4 rounded hover:bg-dark-red"
                onClick={() => dispatch(deleteOrders(ord.id))}
              >
                Cancel order
              </button>
            </div>

            {ord.products.map((product) => (
              <div
                className="flex flex-col md:flex-row items-center shadow-xl rounded-xl justify-between py-4 px-[2%] gap-6"
                key={product.id}
              >
                <img
                  src={product.picture}
                  alt={product.title}
                  className="w-[150px] object-cover mb-4 rounded"
                  draggable="false"
                />
                <div className="flex-flex-col gap-0.5 flex-3">
                  <h2 className="text-lg font-semibold font-header">
                    {product.title}
                  </h2>
                  <p className=" text-sm text-gray-500">
                    Brand: {product.brand}
                  </p>
                  <p className=" text-sm text-gray-400">
                    Category: {product.category}
                  </p>
                  <p className=" text-sm">{product.description}</p>
                  <p className=" text-sm text-yellow-500">
                    Rating: {product.rating}⭐
                  </p>
                  <p>
                    ₴{product.price} x {product.quantity} ={" "}
                    <span className="text-lg font-bold">
                      ₴{product.price * product.quantity}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </details>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-[10%]">
          <FaBoxOpen className="text-6xl text-basic-red opacity-50" />
          <p className="font-bold opacity-50">
            You haven&apos;t done orders yet.
          </p>
        </div>
      )}
    </div>
  );
}
export default Orders;
