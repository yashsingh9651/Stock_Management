import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
//  Fetching Products
export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const response = await fetch("https://akanksha-enterprises.vercel.app/api/product");
  let rjson = await response.json();
  return rjson.products;
});

// Fetching Dropdown Products...
export const fetchDropdownProducts = createAsyncThunk("fetchDropdownProducts", async (query) => {
  const response = await fetch("http://localhost:3000/api/search?query="+query);
  let rjson = await response.json();
  return rjson.products;
});

//  Adding Product...
export const addProduct = createAsyncThunk("addProduct", async (values) => {
  const response = await fetch("http://localhost:3000/api/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  if (response.ok) {
    toast.success("Product Added Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else {
    toast.error("Internal Server Error", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  const r = await fetch("http://localhost:3000/api/product");
  let rjson = await r.json();
  return rjson.products;
});

//  Editting Product...
export const editProduct = createAsyncThunk("editProduct", async (values) => {
  const response = await fetch("http://localhost:3000/api/editProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  if (response.ok) {
    toast.success("Product Editted Successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  } else {
    toast.error("Internal Server Error", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  const r = await fetch("http://localhost:3000/api/product");
  let rjson = await r.json();
  return rjson.products;
});

// Creating Slice...
const apiCallSlice = createSlice({
  name: "apiCall",
  initialState: {
    products: [],
    dropdownProducts: [],
    query:"",
    showEditBox: false,
    loading:false,
  },
  reducers: {
    toggleEditBox: (state) => {
      state.showEditBox = !state.showEditBox;
    },
    toggleLoading: (state) => {
      state.loading = true;
    },
    setQuery: (state,action) => {
      state.query =action.payload;
    },
    setDropdownEmpty: (state) => {
      state.dropdownProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.products = action.payload;
      state.showEditBox = !state.showEditBox;
    });
    builder.addCase(fetchDropdownProducts.fulfilled, (state, action) => {
      state.dropdownProducts = action.payload;
      state.loading = false;
    });
  },
});
export const { toggleEditBox,toggleLoading,setDropdownEmpty,setQuery } = apiCallSlice.actions;
export default apiCallSlice.reducer;