const BASE_URL = "http://localhost:5000/api";

// helper
const getToken = () => {
  const raw = localStorage.getItem("userInfo");

  if (!raw) return null;

  try {
    const user = JSON.parse(raw);
    return user?.token;
  } catch {
    return null;
  }
};

// PRODUCTS
export const fetchProducts = async (
  keyword = "",
  category = ""
) => {
  const res = await fetch(
    `${BASE_URL}/products?keyword=${keyword}&category=${category}`
  );
  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
};

// AUTH
export const registerUser = async (data) => {
  const res = await fetch(
    `${BASE_URL}/users/register`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(
    `${BASE_URL}/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await res.json();

  console.log("LOGIN RESPONSE:", result);

  return result;
};

// CART
export const getCart = async () => {
  const token = getToken();

  const res = await fetch(
    `${BASE_URL}/cart`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  return res.json();
};

export const addToCartAPI = async (
  productId
) => {
  const token = getToken();

  const res = await fetch(
    `${BASE_URL}/cart/add`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
        Authorization:
          `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
      }),
    }
  );

  return res.json();
};

export const removeFromCartAPI =
  async (productId) => {
    const token = getToken();

    const res = await fetch(
      `${BASE_URL}/cart/remove`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization:
            `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
        }),
      }
    );

    return res.json();
  };

// ORDER
export const createOrderAPI =
  async (orderData) => {
    const token = getToken();

    console.log(
      "TOKEN SENT:",
      token
    );

    const res = await fetch(
      `${BASE_URL}/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          Authorization:
            `Bearer ${token}`,
        },
        body: JSON.stringify(
          orderData
        ),
      }
    );

    return res.json();
  };

export const getMyOrdersAPI =
  async () => {
    const token = getToken();

    const res = await fetch(
      `${BASE_URL}/orders/myorders`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    return res.json();
  };