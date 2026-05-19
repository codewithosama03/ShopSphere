import { useEffect, useState } from "react";
import { getMyOrdersAPI } from "../services/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await getMyOrdersAPI();
      setOrders(data);
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
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded p-4 mb-4"
          >
            <p>
              <b>Date:</b>{" "}
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </p>

            <p>
              <b>Total:</b> ₹{order.totalPrice}
            </p>

            <p className="mt-2 font-semibold">
              Products:
            </p>

            <ul className="list-disc ml-6">
              {order.orderItems.map((item) => (
                <li key={item.product}>
                  {item.name} × {item.qty}
                </li>
              ))}
            </ul>

            <p className="mt-2">
              <b>Status:</b>{" "}
              {order.isPaid ? "Paid" : "Pending"}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;