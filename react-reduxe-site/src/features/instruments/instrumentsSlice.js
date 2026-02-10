import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInstrumentalApi, fetchInstrumentalByIdApi } from "../../api/instrumentalApi";

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
        error: null
    },
    reducers: {
        setSelectedInstrument(state, action) {
            state.selectedInstrument = action.payload;
        },
        clearSelectedInstrument(state) {
            state.selectedInstrument = null;
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
            });
    }
});

export const { setSelectedInstrument, clearSelectedInstrument } = instrumentsSlice.actions;
export default instrumentsSlice.reducer;
