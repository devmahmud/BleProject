import {createSlice} from '@reduxjs/toolkit';
// Slice
const slice = createSlice({
  name: 'user',
  initialState: {
    user: 'hello',
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
  },
});
export default slice.reducer;
