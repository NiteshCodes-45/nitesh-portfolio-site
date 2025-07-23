import { createSlice } from "@reduxjs/toolkit";
import blogs from "../data";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    allBlogs: blogs,
  },
  reducers: {},
});

export const selectAllBlogs = (state) => state.blogs.allBlogs;
export default blogSlice.reducer;
