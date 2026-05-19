import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Building2,
  Mail,
  Globe,
} from "lucide-react";

const Shipping = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const shippingAddress = {
      address,
      city,
      postalCode,
      country,
    };

    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(shippingAddress)
    );

    navigate("/placeorder");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="bg-zinc-100 rounded-3xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Shipping Details
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Enter your delivery information
        </p>

        <form
          onSubmit={submitHandler}
          className="space-y-5"
        >
          {/* Address */}
          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full pl-10 pr-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-black"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              required
            />
          </div>

          {/* City */}
          <div className="relative">
            <Building2
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="City"
              className="w-full pl-10 pr-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-black"
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
              required
            />
          </div>

          {/* Postal */}
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="w-full pl-10 pr-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-black"
              value={postalCode}
              onChange={(e) =>
                setPostalCode(e.target.value)
              }
              required
            />
          </div>

          {/* Country */}
          <div className="relative">
            <Globe
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Country"
              className="w-full pl-10 pr-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-black"
              value={country}
              onChange={(e) =>
                setCountry(e.target.value)
              }
              required
            />
          </div>

          <button className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition text-lg font-medium">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;