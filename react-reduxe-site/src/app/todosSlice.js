import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
    items: [],
    selectedTodo: null,
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // CREATE
        addTodo: (state, action) => {
            state.items.push({
                id: nanoid(),
                text: action.payload,
                completed: false,
                description: 'Описание для задачи ' + action.payload
            });
        },
        // DELETE
        deleteTodo: (state, action) => {
            state.items = state.items.filter(todo => todo.id !== action.payload);
            if (state.selectedTodo?.id === action.payload) state.selectedTodo = null;
        },
        // UPDATE (Toggle status)
        toggleTodo: (state, action) => {
            const todo = state.items.find(t => t.id === action.payload);
            if (todo) todo.completed = !todo.completed;
            if (state.selectedTodo?.id === action.payload) state.selectedTodo.completed = todo.completed;
        },
        // READ (Detail)
        getTodoById: (state, action) => {
            state.selectedTodo = state.items.find(t => t.id === action.payload) || null;
        },
        // Clear selection (Back to list)
        clearSelectedTodo: (state) => {
            state.selectedTodo = null;
        }
    }
});

export const { 
    addTodo, deleteTodo, toggleTodo, getTodoById, clearSelectedTodo 
} = todosSlice.actions;

export default todosSlice.reducer;