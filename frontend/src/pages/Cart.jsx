import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const [loginWarning, setLoginWarning] = useState(false);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const checkoutHandler = () => {
    if (!userInfo) {
      setLoginWarning(true);
      return;
    }

    setLoginWarning(false);
    navigate("/shipping");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">

        <h1 className="text-3xl font-bold mb-8 text-center">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag
              size={70}
              className="mx-auto text-gray-300 mb-4"
            />

            <h2 className="text-2xl font-semibold mb-2">
              Your cart feels lonely :(
            </h2>

            <p className="text-gray-500">
              Looks like you haven’t added anything yet.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-5">
              {cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>

            <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <h2 className="text-2xl font-bold">
                Total: ₹{total}
              </h2>

              <button
                onClick={checkoutHandler}
                className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-xl">
        <p className="text-sm text-center">
          Note: If the total briefly shows ₹0, please refresh once.
          We're improving cart synchronization for a smoother experience.
        </p>
      </div>

      {loginWarning && (
        <div className="mt-4 bg-red-50 border border-red-300 text-red-700 p-4 rounded-xl text-center">
          Please login to continue checkout.
        </div>
      )}

    </div>
  );
};

export default Cart;