import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  _id: string;
  name: string;
  email: string;
  credits: number;
  avatar?: string;
  role?: string;
  createdAt?: string;
}

interface UserState {
  userData: UserData | null;
}

const loadInitialUser = (): UserData | null => {
  try {
    const saved = localStorage.getItem("interviewiq_user");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to parse saved user", e);
  }
  return null;
};

const initialState: UserState = {
  userData: loadInitialUser(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData | null>) => {
      state.userData = action.payload;
      try {
        if (action.payload) {
          localStorage.setItem("interviewiq_user", JSON.stringify(action.payload));
        } else {
          localStorage.removeItem("interviewiq_user");
        }
      } catch (e) {
        console.error("LocalStorage sync error", e);
      }
    },
    updateCredits: (state, action: PayloadAction<number>) => {
      if (state.userData) {
        state.userData.credits = action.payload;
        localStorage.setItem("interviewiq_user", JSON.stringify(state.userData));
      }
    },
  },
});

export const { setUserData, updateCredits } = userSlice.actions;
export default userSlice.reducer;
