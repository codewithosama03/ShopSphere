import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import { ShoppingBag } from "lucide-react";

const Navbar = () => {
  const { cartItems } = useCart();
  const { userInfo, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        {/* Desktop + Logo */}
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide hover:text-gray-300 transition"
          >
            ShopSphere
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
          <Link
  to="/cart"
  className="flex items-center gap-2 hover:text-gray-300 transition"
>
  <ShoppingBag size={20} />

  <span className="bg-white text-black text-xs px-2 py-0.5 rounded-full font-semibold">
    {cartItems.length}
  </span>
</Link>

            {userInfo && (
              <Link
                to="/orders"
                className="hover:text-gray-300 transition"
              >
                My Orders
              </Link>
            )}

            {userInfo ? (
              <button
                onClick={logout}
                className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-gray-300 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-4 pb-4 border-t border-gray-700 pt-4">
          <Link
  to="/cart"
  onClick={() => setMenuOpen(false)}
  className="flex items-center gap-2 hover:text-gray-300"
>
  <ShoppingBag size={20} />
  Cart ({cartItems.length})
</Link>

            {userInfo && (
              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className="hover:text-gray-300"
              >
                My Orders
              </Link>
            )}

            {userInfo ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-left hover:text-gray-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-gray-300"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-gray-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;