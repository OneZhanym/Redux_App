import { createSlice } from '@reduxjs/toolkit';


function loadAuthState() {
  try {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    return { users, currentUser, error: null };
  } catch {
    return { users: [], currentUser: null, error: null };
  }
}

const initialState = loadAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { username, password } = action.payload;
      const exists = state.users.find(u => u.username === username);
      if (exists) {
        state.error = 'Пользователь уже существует';
      } else {
        state.users.push({ username, password });
        state.currentUser = { username };
        state.error = null;
        localStorage.setItem('users', JSON.stringify(state.users));
        localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      }
    },
    loginUser: (state, action) => {
      const { username, password } = action.payload;
      const user = state.users.find(u => u.username === username && u.password === password);
      if (user) {
        state.currentUser = { username };
        state.error = null;
        localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      } else {
        state.error = 'Неверный логин или пароль';
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.error = null;
      localStorage.removeItem('currentUser');
    }
  }
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
