import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for async actions
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:5000/api/users', {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
});

export const fetchCountries = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('https://restcountries.com/v3.1/all');
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await axios.delete(`http://localhost:5000/api/users/${id}`);
  return id;
});

export const addUser = createAsyncThunk('users/addUser', async (userData) => {
  const response = await axios.post('http://localhost:5000/api/register', userData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, formData }) => {
  const response = await axios.put(`http://localhost:5000/api/users/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
});

// Slice
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default usersSlice.reducer;
