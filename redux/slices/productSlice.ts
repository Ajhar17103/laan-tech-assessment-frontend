import axiosInstance from '@/lib/axiosInstance';
import { ProductDto } from '@/types/product/product.type';
import { getBaseUrl } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ProductState {
  products: ProductDto[];
  product: ProductDto | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};


export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(getBaseUrl('/products'));
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch products');
    }
  },
);

export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(getBaseUrl(`/product/${id}`));
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch product');
    }
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
