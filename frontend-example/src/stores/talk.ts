import { createSlice } from "@reduxjs/toolkit";

type Talk = {
  message: string;
  name: string;
  time: string;
  id: number;
  channel: string;
}

type Type = {
  talks: Talk[]
};

// Stateの初期状態
const initialState: Type = {
  talks: []
};

// Sliceを生成する
const slice = createSlice({
  name: "talk",
  initialState,
  reducers: {
    setTalk: (
      state,
      action: {
        payload: string;
      }
    ) => {
      state.talks = [
        ...state.talks,
        JSON.parse(action.payload)
      ]
    },
  },
});

// Reducerをエクスポートする
export default slice.reducer;

// Action Creatorsをエクスポートする
export const { setTalk } = slice.actions;
