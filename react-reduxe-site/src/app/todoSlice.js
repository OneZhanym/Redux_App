import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [
            { id: 1, text: 'Купить струны для гитары', completed: false },
            { id: 2, text: 'Настроить барабаны', completed: true }
        ],
    },
    reducers: {
        addTodo: (state, action) => {
            state.items.push({
                id: Date.now(),
                text: action.payload,
                completed: false
            });
        },
        // Другие редьюсеры...
    }
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;