import { createSlice } from "@reduxjs/toolkit";

export const chartReducer = createSlice({
  name: "revenue",
  initialState: {
    isLoading: false,
    data: [],
    totalSum: {},
    filterList: [],
    activeFilter: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setData: (state, action) => {
      state.data = [...action.payload];

      const totalSum = {};
      action.payload.forEach((data) => {
        if (!state.filterList.includes(data.revenue_type))
          state.filterList = [...state.filterList, data.revenue_type];
        if (!Object.hasOwn(totalSum, data.month))
          totalSum[data.month] = {};
        if (!Object.hasOwn(totalSum[data.month], data.product))
          totalSum[data.month][data.product] = 0;
        totalSum[data.month][data.product] += data.acv;
      });

      state.totalSum = { ...totalSum };
    },
  },
});

export const { setData, setLoading } = chartReducer.actions;

export default chartReducer.reducer;
