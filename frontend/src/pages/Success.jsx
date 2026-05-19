import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-10 text-center">
      <div className="bg-green-50 border border-green-300 rounded-xl p-10 shadow">
        <div className="text-6xl mb-4">:) </div>

        <h1 className="text-3xl font-bold text-green-700">
          Order Placed Successfully!
        </h1>

        <p className="mt-3 text-gray-600">
          Thanks for shopping with ShopSphere.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-black text-white px-6 py-3 rounded"
        >
          Continue Shopping →
        </button>
      </div>
    </div>
  );
};

export default Success;