import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
  priceId:string;
}

interface CartState {
  items: CartItem[];
}

const loadInitialState = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const storedItems = sessionStorage.getItem('cartItems');
    if (storedItems) {
      return JSON.parse(storedItems);
    }
  }
  return [];
};

const initialState: CartState = {
  items: loadInitialState(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('cartItems', JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('cartItems');
      }
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const itemToUpdate = state.items.find(item => item.productId === action.payload.productId);
      if (itemToUpdate) {
        itemToUpdate.quantity = action.payload.quantity;
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('cartItems', JSON.stringify(state.items));
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;



