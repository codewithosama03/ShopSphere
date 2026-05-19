import { useEffect, useState } from "react";
import { getMyOrdersAPI } from "../services/api";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await getMyOrdersAPI();
      setOrders(data || []);
    };

    loadOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded p-4 shadow"
            >
              <p className="font-semibold mb-3">
                Order ID: {order._id}
              </p>

              {order.orderItems.map((item) => (
              <div
  key={item._id}
  className="flex justify-between items-center border-b py-2"
>
  <span>
    {item.name} × {item.qty}
  </span>

  <div className="flex gap-4 items-center">
    <span>₹{item.price * item.qty}</span>

    <button
      onClick={() =>
        window.location.href = `/product/${item.product}`
      }
      className="text-sm bg-black text-white px-3 py-1 rounded"
    >
      Buy Again
    </button>
  </div>
</div>

              ))}

              <p className="mt-3 font-bold">
                Total: ₹{order.totalPrice}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;