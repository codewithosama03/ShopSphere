import { createContext, useContext, useState, useEffect } from "react";
import {
  getCart,
  addToCartAPI,
  removeFromCartAPI,
} from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userInfo } = useAuth();

 const normalizeCart = (items = []) =>
  items
    .map((item) => ({
      _id: item.product?._id || item._id,
      name: item.product?.name || item.name || "",
      image: item.product?.image || item.image || "",
      price: Number(
        item.product?.price ?? item.price ?? 0
      ),
      qty: Number(item.qty ?? 1),
    }))
    .filter(
      (item) =>
        item._id &&
        item.name &&
        item.price > 0 &&
        item.qty > 0
    );

  // FIX: initialize clean
  const [cartItems, setCartItems] = useState(() => {
    const local =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    return normalizeCart(local);
  });

  useEffect(() => {
    const loadCart = async () => {
      try {
        if (userInfo) {
          const localCart =
            JSON.parse(
              localStorage.getItem("cartItems")
            ) || [];

          for (const item of localCart) {
            await addToCartAPI(item._id);
          }

          localStorage.removeItem("cartItems");

          const dbCart = await getCart();
          setCartItems(normalizeCart(dbCart));
        } else {
          const local =
            JSON.parse(
              localStorage.getItem("cartItems")
            ) || [];
          setCartItems(normalizeCart(local));
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadCart();
  }, [userInfo]);

  const addToCart = async (product) => {
    if (userInfo) {
      const data = await addToCartAPI(product._id);
      setCartItems(normalizeCart(data));
    } else {
      let cart =
        JSON.parse(localStorage.getItem("cartItems")) || [];

      const exist = cart.find(
        (x) => x._id === product._id
      );

      if (exist) {
        cart = cart.map((x) =>
          x._id === product._id
            ? { ...x, qty: x.qty + 1 }
            : x
        );
      } else {
        cart.push({ ...product, qty: 1 });
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify(cart)
      );
      setCartItems(normalizeCart(cart));
    }
  };

  const removeFromCart = async (productId) => {
    if (userInfo) {
      const data = await removeFromCartAPI(productId);
      setCartItems(normalizeCart(data));
    } else {
      let cart =
        JSON.parse(localStorage.getItem("cartItems")) || [];

      cart = cart
        .map((x) =>
          x._id === productId
            ? { ...x, qty: x.qty - 1 }
            : x
        )
        .filter((x) => x.qty > 0);

      localStorage.setItem(
        "cartItems",
        JSON.stringify(cart)
      );
      setCartItems(normalizeCart(cart));
    }
  };
const deleteFromCart = async (productId) => {
  if (userInfo) {
    let current = [...cartItems];

    const item = current.find((x) => x._id === productId);

    if (!item) return;

    for (let i = 0; i < item.qty; i++) {
      await removeFromCartAPI(productId);
    }

    const updated = await getCart();
    setCartItems(normalizeCart(updated));
  } else {
    let cart =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    cart = cart.filter((x) => x._id !== productId);

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cart)
    );

    setCartItems(normalizeCart(cart));
  }
};


  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);