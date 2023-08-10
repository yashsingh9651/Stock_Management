import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
//  Fetching Products
export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product`);
  let rjson = await response.json();
  return rjson.products;
});

//  Fetching Bilss...
export const fetchBills = createAsyncThunk("fetchBills", async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/bills`);
  let rjson = await response.json();
  return rjson.allBills;
});

// Fetching Dropdown Products...
export const fetchDropdownProducts = createAsyncThunk(
  "fetchDropdownProducts",
  async (query) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/search?query=` + query
    );
    let rjson = await response.json();
    return rjson.products;
  }
);

// Generating Bill...
export const generatingBill = createAsyncThunk(
  "generatingBill",
  async (products) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/billProducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    });
    const res = await response.json();
    if (res.ok) {
      toast.success("Bill Generated Successfully", {
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
  }
);

//  Adding Product...
export const addProduct = createAsyncThunk("addProduct", async (values) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const res = await response.json();
  if (res.ok) {
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
  const r = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product`);
  let rjson = await r.json();
  return rjson.products;
});

//  Editting Product...
export const editProduct = createAsyncThunk("editProduct", async (values) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/editProduct`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
  const res = await response.json();
  if (res.ok) {
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
  const r = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product`);
  let rjson = await r.json();
  return rjson.products;
});

// Creating Slice...
const apiCallSlice = createSlice({
  name: "apiCall",
  initialState: {
    products: [],
    loading2: true,
    dropdownProducts: [],
    query: "",
    bills:[],
    showEditBox: false,
    loading: false,
    showProductBox:false,
    clientBillingProducts:[],
    subTotal:0
  },
  reducers: {
    toggleEditBox: (state) => {
      state.showEditBox = !state.showEditBox;
    },
    toggleLoading: (state) => {
      state.loading = true;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setDropdownEmpty: (state) => {
      state.dropdownProducts = [];
    },
    toggleProductBox: (state) => {
      state.showProductBox = !state.showProductBox;
    },
    setClientBillingProductsEmpty: (state) => {
      state.clientBillingProducts = [];
      state.subTotal=0
    },
    concatingBillingProduct: (state,action) => {
      state.clientBillingProducts = state.clientBillingProducts.concat(action.payload);
      let subT = 0;
      state.clientBillingProducts.forEach((element)=>{
        subT += element.price*element.quantity;
        state.subTotal = subT;
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading2 = false;
      state.products = action.payload;
    });
    builder.addCase(fetchBills.fulfilled, (state, action) => {
      state.bills = action.payload;
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
export const { toggleEditBox,setClientBillingProductsEmpty, toggleLoading, setDropdownEmpty,concatingBillingProduct,toggleProductBox,setQuery } =
  apiCallSlice.actions;
export default apiCallSlice.reducer;
