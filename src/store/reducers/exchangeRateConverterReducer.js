
const initialState = {
    rate: null,
    success: false,
    error: null,
  };
  
  const exchangeRateConverterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_EXCHANGE_RATE_REQUEST':
        return {
          ...state,
          rate: 0,
          success: false,
          error: null,
        };
      case 'FETCH_EXCHANGE_RATE_SUCCESS':
        return {
          ...state,
          success: true,
          rate: action.payload,
        };
      case 'FETCH_EXCHANGE_RATE_FAILURE':
        return {
          ...state,
          rate: null,
          success: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default exchangeRateConverterReducer;
  