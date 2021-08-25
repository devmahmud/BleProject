import {createSlice} from '@reduxjs/toolkit';
// Slice
const deviceSlice = createSlice({
  name: 'device',
  initialState: {
    devices: [],
  },
  reducers: {
    addDevice: (state, action) => {
      if (!state.devices.find(dev => dev.id === action.payload.id)) {
        state.devices = [...state.devices, action.payload];
      }
    },
    clearDevice: state => {
      state.devices = [];
    },
  },
});
export default deviceSlice.reducer;
export const {addDevice, clearDevice} = deviceSlice.actions;
