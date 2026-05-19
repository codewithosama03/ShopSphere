import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shipping from "./pages/Shipping";
import PlaceOrder from "./pages/PlaceOrder";
import Success from "./pages/Success";
import OrderHistory from "./pages/OrderHistory";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/product/:id"
              element={<ProductDetails />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/shipping"
              element={<Shipping />}
            />
            <Route
              path="/placeorder"
              element={<PlaceOrder />}
            />
            <Route
              path="/success"
              element={<Success />}
            />
            <Route
              path="/orders"
              element={<OrderHistory />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;