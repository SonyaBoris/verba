import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";
import { TUserTask } from "../types";

const BASE_URL: string = "https://c11159cb39807c7c.mokky.dev";

export const fetchTasks = createAsyncThunk<TUserTask[], void>(
  "tasks/fetchTasks",
  async (): Promise<TUserTask[]> => {
    try {
      const { data } = await axios.get<TUserTask[]>(`${BASE_URL}/tasks`)
      return data
    } catch (error) {
      console.log("Failed to fetch:")
      return []
    }
  }
)

export const postTasks = createAsyncThunk<TUserTask, TUserTask>(
  "tasks/postTasks",
  async (item) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/tasks`, item)
      return data
    } catch (error) {
      throw new Error("Failed to post basket")
    }
  }
)

export const delTasks = createAsyncThunk<number, number>(
  "tasks/delTasks",
  async (id) => {
    try {
      await axios.delete(`${BASE_URL}/tasks/${id}`)
      return id
    } catch (error) {
      throw new Error("Failed to delete basket")
    }
  }
)

export const updateTaskStatus = createAsyncThunk<
  TUserTask,
  Pick<TUserTask, "id" | "completed">
>("tasks/updateTaskStatus", async (payload) => {
  try {
    const { id, completed } = payload;
    const { data } = await axios.patch(`${BASE_URL}/tasks/${id}`, { completed })
    return data
  } catch (error) {
    throw new Error("Failed to update task status")
  }
});

type TState = {
  data: TUserTask[]
}

const initialState: TState = {
  data: [],
}

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.data = action.payload
    })

    builder.addCase(postTasks.fulfilled, (state, action) => {
      state.data.push(action.payload)
    })

    builder.addCase(delTasks.fulfilled, (state, action) => {
      state.data = state.data.filter((el) => el.id !== action.payload)
    })
    builder.addMatcher(
      isAnyOf(updateTaskStatus.fulfilled),
      (state, { payload }) => {
        const index = state.data.findIndex((task) => task.id === payload.id)
        if (index !== -1) {
          state.data[index] = payload
        }
      }
    );
    
  }
})

export default todoSlice.reducer;
