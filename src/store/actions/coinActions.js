
import axios from 'axios';

export const fetchCoinsMarketRequest = () => ({
  type: 'FETCH_COINS_MARKET_REQUEST',
});

export const fetchCoinsMarketSuccess = (coins) => ({
  type: 'FETCH_COINS_MARKET_SUCCESS',
  payload: coins,
});

export const fetchCoinsMarketFailure = (error) => ({
  type: 'FETCH_COINS_MARKET_FAILURE',
  payload: error,
});

export const fetchCoinsRequest = () => ({
  type: 'FETCH_COINS_REQUEST',
});

export const fetchCoinsSuccess = (coins) => ({
  type: 'FETCH_COINS_SUCCESS',
  payload: coins,
});

export const fetchCoinsFailure = (error) => ({
  type: 'FETCH_COINS_FAILURE',
  payload: error,
});

export const fetchCoinsMarketData = (currency) => async (dispatch) => {
  dispatch(fetchCoinsMarketRequest());
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
    // const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: currency ? currency : "usd",
        per_page: 10,
        page: 1,
      },
    });
    dispatch(fetchCoinsMarketSuccess(response.data));
  } catch (error) {
    dispatch(fetchCoinsMarketFailure(error.message));
  }
};

export const fetchCoinsList = () => async (dispatch) => {
  dispatch(fetchCoinsRequest());
  const coinsList = [
    {
      "id": "bitcoin",
      "symbol": "btc",
      "name": "Bitcoin"
    },
    {
      "id": "litherium",
      "symbol": "lith",
      "name": "Litherium"
    },
    {
      "id": "ethereum",
      "symbol": "eth",
      "name": "Ethereum"
    },
    {
      "id": "binancecoin",
      "symbol": "bnb",
      "name": "BNB"
    },
    {
      "id": "tether",
      "symbol": "usdt",
      "name": "Tether"
    },{
      "id": "cardano",
      "symbol": "ada",
      "name": "Cardano"
    },
  ]

  dispatch(fetchCoinsSuccess(coinsList));
  // try {
  //   const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
  //   dispatch(fetchCoinsSuccess(response.data));
  // } catch (error) {
  //   dispatch(fetchCoinsFailure(error.message));
  // }
};
