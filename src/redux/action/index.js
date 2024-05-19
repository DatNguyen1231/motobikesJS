import { setRegisterData } from '@/pages/api/api';
import { createSlice } from '@reduxjs/toolkit';

export const registerSlice = createSlice({
    name: 'register',
    initialState: {
        data: [],
    },
    reducers: {
        increment: (state, actions) => {
            const data = setRegisterData(actions.payload);
            state.data = data;
        },
    },
});
export const { increment } = registerSlice.actions;

export default registerSlice.reducer;
