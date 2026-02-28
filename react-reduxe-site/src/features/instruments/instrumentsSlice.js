import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInstrumentalApi, fetchInstrumentalByIdApi, createInstrumentalApi, updateInstrumentalApi, deleteInstrumentalApi } from "../../api/instrumentalApi";

// Async thunks для получения данных
export const fetchInstruments = createAsyncThunk(
    'instruments/fetchInstruments',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchInstrumentalApi();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// CREATE
export const createInstrument = createAsyncThunk(
    'instruments/createInstrument',
    async (data, { rejectWithValue }) => {
        try {
            const newInstrument = await createInstrumentalApi(data);
            return newInstrument;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// UPDATE
export const updateInstrument = createAsyncThunk(
    'instruments/updateInstrument',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const updated = await updateInstrumentalApi(id, data);
            return updated;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// DELETE
export const deleteInstrument = createAsyncThunk(
    'instruments/deleteInstrument',
    async (id, { rejectWithValue }) => {
        try {
            const deleted = await deleteInstrumentalApi(id);
            return deleted;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchInstrumentById = createAsyncThunk(
    'instruments/fetchInstrumentById',
    async (id, { rejectWithValue }) => {
        try {
            const data = await fetchInstrumentalByIdApi(id);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const instrumentsSlice = createSlice({
    name: 'instruments',
    initialState: {
        items: [],
        selectedInstrument: null,
        loading: false,
        error: null,
        showForm: false,
        editingId: null
    },
    reducers: {
        setSelectedInstrument(state, action) {
            state.selectedInstrument = action.payload;
        },
        clearSelectedInstrument(state) {
            state.selectedInstrument = null;
        },
        openForm(state, action) {
            state.showForm = true;
            state.editingId = action.payload || null;
        },
        closeForm(state) {
            state.showForm = false;
            state.editingId = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Получение списка инструментов
            .addCase(fetchInstruments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInstruments.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchInstruments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Получение инструмента по ID
            .addCase(fetchInstrumentById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInstrumentById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedInstrument = action.payload;
            })
            .addCase(fetchInstrumentById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // CREATE
            .addCase(createInstrument.fulfilled, (state, action) => {
                state.items = [...state.items, action.payload];
                state.showForm = false;
                state.editingId = null;
            })
            // UPDATE
            .addCase(updateInstrument.fulfilled, (state, action) => {
                state.items = state.items.map(inst => inst.id === action.payload.id ? action.payload : inst);
                state.selectedInstrument = action.payload;
                state.showForm = false;
                state.editingId = null;
            })
            // DELETE
            .addCase(deleteInstrument.fulfilled, (state, action) => {
                state.items = state.items.filter(inst => inst.id !== action.payload.id);
                state.selectedInstrument = null;
            });
    }
});

export const { setSelectedInstrument, clearSelectedInstrument, openForm, closeForm } = instrumentsSlice.actions;
export default instrumentsSlice.reducer;
