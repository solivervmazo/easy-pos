import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { selectProducts } from "../../db/products";
import * as SQLlite from "expo-sqlite";
import { useState } from "react";
const db_name = "easy-pos";
const ITEMS = new Array(10).fill({}).map((item, index) => {
  return {
    id: index + 1,
    itemName: `Item ${index} with ${["sugar", "salt", "onion"].splice(
      Math.floor(Math.random() * 3),
      1
    )}`,
    itemNumber: "1000" + (index + 1),
    price: (Math.random() * 1000 + 200).toFixed(2),
    categories: [
      "food",
      "add-ons",
      "freebie",
      "dessert",
      "veberage",
      "condiments",
    ].splice(Math.floor(Math.random() * 6), Math.random() * 6 + 5),
  };
});

class FormSate {
  static fresh = "FRESH";
  static view = "VIEW";
  static update = "UPDATE";
}

const initialState = {
  loading: true,
  formLoading: false,
  formState: FormSate.fresh,
  itemList: [],
  error: null,
  response: null,
};

export const fetchItems = createAsyncThunk("item/fetchItems", async () => {
  const db = SQLlite.openDatabase(db_name);
  const { query, args } = selectProducts();
  let rows = [];
  await db.transactionAsync((tx) => {
    rows = tx.executeSqlAsync(query, args);
  });
  return rows?.rows || [];
});

export const fetchItemDetail = createAsyncThunk(
  "item/fetchItemDetail",
  async () => {
    return {};
  }
);

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.itemList = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = itemSlice.actions;

export default itemSlice.reducer;
