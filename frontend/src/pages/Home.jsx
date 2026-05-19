import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { fetchProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchProducts(debouncedSearch, category);
      setProducts(data);
    };

    load();
  }, [debouncedSearch, category]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Search + Filter */}
      <div className="bg-zinc-900 rounded-2xl p-5 mb-8 shadow-md">
        <div className="flex flex-col md:flex-row gap-4">

          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-700 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter */}
          <select
            className="px-4 py-3 rounded-lg border border-gray-700 bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Footwear">Footwear</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>

    </div>
  );
};

export default Home;