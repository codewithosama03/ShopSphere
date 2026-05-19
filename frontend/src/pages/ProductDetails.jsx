import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../services/api";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    load();
  }, [id]);

  if (!product)
    return (
      <div className="text-center py-20 text-lg">
        Loading...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-zinc-100 rounded-3xl shadow-lg p-6 md:p-10">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Product Image */}
          <div className="overflow-hidden rounded-2xl bg-white shadow">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="w-full h-80 md:h-[500px] object-cover hover:scale-105 transition duration-300"
            />
          </div>

          {/* Product Info */}
          <div>
            <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full mb-4">
              In Stock: {product.stock}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold">
              {product.name}
            </h1>

            <p className="text-3xl font-bold mt-4 text-black">
              ₹{product.price}
            </p>

            <p className="mt-6 text-gray-600 leading-7">
              {product.description}
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Category: {product.category}
            </p>

            <button
              onClick={() => addToCart(product)}
              className="mt-8 w-full md:w-auto bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition text-lg font-medium"
            >
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;