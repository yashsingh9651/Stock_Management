import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
//  Fetching Products
export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product`);
  let rjson = await response.json();
  return rjson;
});

//  Fetching Bills...
export const fetchBills = createAsyncThunk("fetchBills", async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getPostBills`);
  let rjson = await response.json();
  return rjson;
});

//  Fetching Restock Bills...
export const fetchRestockBills = createAsyncThunk("fetchRestockBills", async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getPostRestockBills`);
  let rjson = await response.json();
  return rjson;
});

// Fetching Dropdown Products...
export const fetchDropdownProducts = createAsyncThunk(
  "fetchDropdownProducts",
  async (query) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/search?query=` + query
    );
    let rjson = await response.json();
    return rjson;
  }
);

// Generating Bill...
export const generatingBill = createAsyncThunk(
  "generatingBill",
  async (products) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/postBillProducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    });
    const res = await response.json();
    if (res.ok) {
      toast.success(res.message, {
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
// Adding Restock Bill...
export const AddingStockBill = createAsyncThunk(
  "AddingStockBill",
  async (products) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/postRestockBillProducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(products),
    });
    const res = await response.json();
    if (res.ok) {
      toast.success(res.message, {
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
  return rjson;
});

//  Updating Product...
export const editProduct = createAsyncThunk("editProduct", async (values) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/product`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
  const res = await response.json();
  if (res.ok) {
    toast.success(res.message, {
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
    toast.error("Internal Server Error.", {
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
  return rjson;
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
    restockBills:[],
    showEditBox: false,
    loading: false,
    showProductBox:false,
    showRestockProductBox:false,
    clientBillingProducts:[],
    restockBillingProducts:[],
    subTotal:0,
    editClientProd:null,
    loadingBills:true,
    loadingRestockBills:true,
  },
  reducers: {
    toggleEditBox: (state) => {
      state.showEditBox = !state.showEditBox;
    },
    toggleEditClientProd: (state,action) => {
      state.editClientProd = action.payload;
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
    toggleRestockProductBox: (state) => {
      state.showRestockProductBox = !state.showRestockProductBox;
    },
    setClientBillingProductsEmpty: (state) => {
      state.clientBillingProducts = [];
      state.subTotal=0
    },
    setRestockBillingProductsEmpty: (state) => {
      state.restockBillingProducts = [];
      state.subTotal=0
    },
    sliceingClientBillProd: (state,action) => {
      const index = state.clientBillingProducts.findIndex(object => {
        return object.id === action.payload;
      })
      if (index === 0) {
        state.clientBillingProducts.shift();
        if (state.clientBillingProducts.length>0) {
          let subT = 0;
          state.clientBillingProducts.forEach((element)=>{
            subT += element.price*element.quantity;
            state.subTotal = subT;
          });
        }else{
          state.subTotal=0;
        }
      }else{
        state.clientBillingProducts.splice(index,1);
        if (state.clientBillingProducts.length>0) {
          let subT = 0;
          state.clientBillingProducts.forEach((element)=>{
            subT += element.price*element.quantity;
            state.subTotal = subT;
          });
        }else{
          state.subTotal=0;
        }
      }
    },
    sliceingRestockBillProd: (state,action) => {
      const index = state.restockBillingProducts.findIndex(object => {
        return object.id === action.payload;
      })
      if (index === 0) {
        state.restockBillingProducts.shift();
      }else{
        state.restockBillingProducts.splice(index,1);
      }
      if (state.restockBillingProducts.length>0) {
        let subT = 0;
        state.restockBillingProducts.forEach((element)=>{
          subT += element.price*element.quantity;
          state.subTotal = subT;
        });
      }else{
        state.subTotal=0;
      }
    },
    concatingBillingProduct: (state,action) => {
      state.clientBillingProducts = state.clientBillingProducts.concat(action.payload);
      let subT = 0;
      state.clientBillingProducts.forEach((element)=>{
        subT += element.price*element.quantity;
        state.subTotal = subT;
      })
    },
    concatingRestockBillingProduct: (state,action) => {
      state.restockBillingProducts = state.restockBillingProducts.concat(action.payload);
      let subT = 0;
      state.restockBillingProducts.forEach((element)=>{
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
      state.loadingBills= false;
    });
    builder.addCase(fetchRestockBills.fulfilled, (state, action) => {
      state.restockBills = action.payload;
      state.loadingRestockBills= false;
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
export const { toggleEditBox,concatingRestockBillingProduct,setRestockBillingProductsEmpty,sliceingClientBillProd,sliceingRestockBillProd,setClientBillingProductsEmpty,toggleEditClientProd, toggleLoading, setDropdownEmpty,concatingBillingProduct,toggleProductBox,toggleRestockProductBox,setQuery } =
  apiCallSlice.actions;
export default apiCallSlice.reducer;
