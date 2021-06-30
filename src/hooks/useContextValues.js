import { useState } from "react";
import { useLocalStorage, useSetState } from "react-use";

export default function useContextValues() {
  const [persistedToken, setPersistedToken, removePersistedToken] =
    useLocalStorage("TOKEN", "");
  const [persistedUser, setPersistedUser, removePersistedUser] =
    useLocalStorage("USER", {});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(persistedToken);
  const [user, setUser] = useSetState(persistedUser);
  const [products, setProducts] = useState([]);
  const [productIdEdit, setProductIdEdit] = useState(0);
  const [open, setOpen] = useState(false);

  function login({ token, user }) {
    setToken(token);
    setPersistedToken(token);
    setPersistedUser(user);
    setUser(user);
  }

  function logout() {
    setToken("");
    removePersistedToken();
    removePersistedUser();
    setUser({});
  }

  async function loadProducts() {
    try {
      const response = await fetch("https://market-cubos.herokuapp.com/products", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      if (responseData.error) {
        return setError(responseData.error);
      }
      setProducts(responseData);
    } catch (error) {
      setError(error.message);
    }
  }

  const handleDelete = async (productId) => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `https://market-cubos.herokuapp.com/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      setLoading(false);
      setOpen(false);

      if (responseData.error) {
        return setError(responseData.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  return {
    loading,
    setLoading,
    error,
    setError,
    token,
    login,
    logout,
    user,
    setUser,
    products,
    setProducts,
    productIdEdit,
    setProductIdEdit,
    open,
    setOpen,
    handleDelete,
    loadProducts,
    isEmpty,
  };
}
