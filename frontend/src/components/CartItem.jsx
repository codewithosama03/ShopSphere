
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart, deleteFromCart } = useCart();

  //  Handle BOTH cases (guest + logged in)
  const name = item.product?.name || item.name;
  const price = item.product?.price || item.price;
  const id = item.product?._id || item._id;

  return (
    <div className="flex justify-between items-center border p-4 rounded">
      <div>
        <h2 className="font-semibold">{name}</h2>
        <p>₹{price}</p>
      </div>

      <div className="flex items-center gap-3">
        {/* ➖ decrease */}
        <button
          onClick={() => removeFromCart(id)}
          className="bg-gray-300 px-2 rounded"
        >
          -
        </button>

        <span>{item.qty}</span>

        {/*  increase */}
        <button
          onClick={() => addToCart(item.product || item)}
          className="bg-gray-300 px-2 rounded"
        >
          +
        </button>

        {/*  delete completely */}
        <button
          onClick={() => deleteFromCart(id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;