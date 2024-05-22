import { createSlice } from "@reduxjs/toolkit";

// Function to load initial user state from local storage
const loadUserStateFromLocalStorage = () => {
  try {
    const userState = localStorage.getItem("userState");
    if (userState) {
      return JSON.parse(userState);
    }
  } catch (error) {
    console.error("Error loading user state from local storage:", error);
  }
  return {
    name: "",
    token: "",
    image: "",
    isAuth: false,
  };
};

const initialState = loadUserStateFromLocalStorage();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    successLogin(state, action) {
      // Payload = object
      state.name = action.payload.firstName;
      state.token = action.payload.token;
      state.image = action.payload.image;
      state.isAuth = true;

      // Save updated user state to local storage
      try {
        localStorage.setItem("userState", JSON.stringify(state));
      } catch (error) {
        console.error("Error saving user state to local storage:", error);
      }
    },
    logout(state) {
      state.name = "";
      state.token = "";
      state.image = "";
      state.isAuth = false;
      localStorage.removeItem("userState");
      // return initialState;
    },
  },
});

export const { successLogin, logout } = userSlice.actions;
export default userSlice.reducer;
