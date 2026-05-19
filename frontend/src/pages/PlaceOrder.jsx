import { useCart } from "../context/CartContext";
import { createOrderAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  ShoppingBag,
  CreditCard,
} from "lucide-react";

const PlaceOrder = () => {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  const shippingAddress = JSON.parse(
    localStorage.getItem("shippingAddress")
  );

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

 const placeOrderHandler = async () => {
  try {
    console.log("cartItems:", cartItems);
    console.log("shipping:", shippingAddress);

    const data = await createOrderAPI({
      shippingAddress,
      paymentMethod: "Cash on Delivery",
    });

    console.log("ORDER RESPONSE:", data);

    if (data?.order?._id) {
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("cartItems");
      setCartItems([]);
      navigate("/success");
    }
  } catch (error) {
    console.log("ORDER ERROR:", error);
    alert("Order failed. Check console.");
  }
};

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <div className="bg-zinc-100 rounded-3xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Review & Place Order
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Left */}
          <div className="space-y-6">

            <div className="bg-white rounded-2xl p-6 shadow">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={22} />
                <h2 className="text-xl font-semibold">
                  Shipping Address
                </h2>
              </div>

              <div className="text-gray-600 space-y-1">
                <p>{shippingAddress?.address}</p>
                <p>{shippingAddress?.city}</p>
                <p>{shippingAddress?.postalCode}</p>
                <p>{shippingAddress?.country}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard size={22} />
                <h2 className="text-xl font-semibold">
                  Payment Method
                </h2>
              </div>

              <p className="text-gray-600">
                Cash on Delivery
              </p>
            </div>

          </div>

          {/* Right */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="flex items-center gap-3 mb-6">
              <ShoppingBag size={22} />
              <h2 className="text-xl font-semibold">
                Order Summary
              </h2>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between border-b pb-3"
                >
                  <span className="text-gray-700">
                    {item.name} × {item.qty}
                  </span>

                  <span className="font-medium">
                    ₹{item.price * item.qty}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t mt-6 pt-6">
              <h3 className="text-2xl font-bold flex justify-between">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </h3>

              <button
                onClick={placeOrderHandler}
                className="w-full bg-black text-white py-4 rounded-xl mt-6 hover:bg-gray-800 transition text-lg font-medium"
              >
                Place Order
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;