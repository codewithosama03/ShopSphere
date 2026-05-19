import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
    >
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="h-56 sm:h-64 w-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h2 className="font-semibold text-lg sm:text-xl line-clamp-1">
          {product.name}
        </h2>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <p className="mt-4 text-xl font-bold text-black">
          ₹{product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;