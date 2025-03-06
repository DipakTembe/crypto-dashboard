
const initialState = {
    coins: [],
    coinsMarketData: [],
    loading: false,
    error: null,
  };
  
  const coinReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_COINS_MARKET_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'FETCH_COINS_MARKET_SUCCESS':
        return {
          ...state,
          loading: false,
          coinsMarketData: action.payload,
        };
      case 'FETCH_COINS_MARKET_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case 'FETCH_COINS_REQUEST':
        return {
          ...state,
          coins: []
        };
      case 'FETCH_COINS_SUCCESS':
        return {
          ...state,
          coins: action.payload,
        };
      case 'FETCH_COINS_FAILURE':
        return {
          ...state,
          coins: []
        };
      default:
        return state;
    }
  };
  
  export default coinReducer;
  