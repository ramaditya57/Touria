import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  items: [],
  loaded: false, // ✅ added flag to track load status
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const exists = state.items.find(
        (item) => item.tour._id === action.payload._id
      );
      if (exists) return state;
      return {
        ...state,
        items: [...state.items, { tour: action.payload, quantity: 1 }],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.tour._id !== action.payload),
      };

    case "CLEAR_CART":
      return { ...initialState, loaded: true }; // keep loaded true

    case "LOAD_CART":
      return {
        ...state,
        ...action.payload,
        loaded: true, // ✅ set loaded true once cart is loaded
      };

    case "ADD_HOTEL_TO_CART":
      const hotelExists = state.items.find(
        (item) => item.hotel && item.hotel._id === action.payload._id
      );
      if (hotelExists) return state;
      return {
        ...state,
        items: [...state.items, { hotel: action.payload }],
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // ✅ Load from localStorage once when app starts
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.items) {
          dispatch({ type: "LOAD_CART", payload: parsed });
          // console.log("✅ Cart loaded from localStorage:", parsed);
        }
      } else {
        // even if no cart found, mark as loaded to allow saving later
        dispatch({ type: "LOAD_CART", payload: { items: [] } });
      }
    } catch (err) {
      console.warn("⚠️ Error loading cart from localStorage", err);
    }
  }, []);

  // ✅ Save to localStorage whenever cart changes — only after initial load
  useEffect(() => {
    if (state.loaded) {
      // console.log("💾 Saving cart to localStorage:", state);
      localStorage.setItem("cart", JSON.stringify({ items: state.items }));
    }
  }, [state]);

  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

export { useCart };
