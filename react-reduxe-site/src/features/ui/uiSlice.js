import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice ({
    name: 'ui',
    initialState: {
        theme: 'light',

    userInfo: {
        name: "Петя Петров",
        age: 28,
        city: "Талас" 
    },
    stats: {
        visitors: 1500,
        online: 47
    }
},

    reducers: {
        toggleTheme(state) {
            state.theme = state.theme === 'light' ? 'dark': 'light'
        }
    }
})


export const { toggleTheme } = uiSlice.actions
export default uiSlice.reducer