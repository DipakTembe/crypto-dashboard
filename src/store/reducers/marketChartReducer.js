
const initialState = {
    chartCurrency: null,
    chartData: null,
    chartDataSuccess: false,
    chartDataError: null,
  };
  
  const marketChartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_MARKET_CHART_DATA_REQUEST':
        return {
          ...state,
          chartData: null,
          chartDataSuccess: false,
          chartDataError: null,
        };
      case 'FETCH_MARKET_CHART_DATA_SUCCESS':
        return {
          ...state,
          chartDataSuccess: true,
          chartData: action.payload,
        };
      case 'FETCH_MARKET_CHART_DATA_FAILURE':
        return {
          ...state,
          chartData: null,
          chartDataSuccess: false,
          chartDataError: action.payload,
        };
      case 'SET_CHART_CURRENCY_REQUEST':
        return {
          ...state,
          chartCurrency: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default marketChartReducer;
  