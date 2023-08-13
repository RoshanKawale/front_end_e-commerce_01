import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, fetchItemsByUserId, updateItem , delteItemFromCart, resetCart } from './CartAPI';

const initialState = {
  status: 'idle',
  items: []
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (amount) => {
    const response = await addToCart(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const fetchUpdateItemAsync = createAsyncThunk(
  'cart/updateItem',
  async (update) => {
    const response = await updateItem(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const delteItemFromCartAsync= createAsyncThunk(
  'cart/delteItemFromCart',
  async (itemId) => {
    const response = await delteItemFromCart(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const resetCartAsync= createAsyncThunk(
  'cart/resetCart',
  async (userId) => {
    const response = await resetCart(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload
      })
      .addCase(fetchUpdateItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUpdateItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item=> item.id === action.payload.id);
        state.items[index] = action.payload
      })
      .addCase(delteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(delteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item=> item.id === action.payload.id);
        state.items.splice(index , 1)
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = [];
      });
  },
});

export const { increment} = cartSlice.actions;

export const selectItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;

export default cartSlice.reducer;
