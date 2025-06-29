import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchUsers as fetchUsersApi,
  createUser as createUserApi,
  updateUser as updateUserApi,
  deleteUser as deleteUserApi,
} from '../api/reqres';

export const fetchUsers = createAsyncThunk('users/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await fetchUsersApi(1); 
    return res.data.data;
  } catch {
    return rejectWithValue('Failed to load users');
  }
});

export const addUser = createAsyncThunk('users/add', async (user, { rejectWithValue }) => {
  try {
    const res = await createUserApi(user);
    return { id: res.data.id, ...user };
  } catch {
    return rejectWithValue('Failed to add user');
  }
});

export const editUser = createAsyncThunk('users/edit', async ({ id, data }, { rejectWithValue }) => {
  try {
    await updateUserApi(id, data);
    return { id, ...data };
  } catch {
    return rejectWithValue('Failed to edit user');
  }
});

export const removeUser = createAsyncThunk('users/remove', async (id, { rejectWithValue }) => {
  try {
    await deleteUserApi(id);
    return id;
  } catch {
    return rejectWithValue('Failed to delete user');
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.list.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
