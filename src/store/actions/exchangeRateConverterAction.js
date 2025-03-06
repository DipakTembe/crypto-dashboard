
import axios from 'axios';

export const fetchExchangeRateRequest = () => ({
  type: 'FETCH_EXCHANGE_RATE_REQUEST',
});

export const fetchExchangeRateSuccess = (rate) => ({
  type: 'FETCH_EXCHANGE_RATE_SUCCESS',
  payload: rate,
});

export const fetchExchangeRateFailure = (error) => ({
  type: 'FETCH_EXCHANGE_RATE_FAILURE',
  payload: error,
});

export const fetchExchangeRate = (toCurrency, fromCurrency) => async (dispatch) => {
  dispatch(fetchExchangeRateRequest());
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        vs_currencies: fromCurrency,
        ids: toCurrency,
      },
    });
    dispatch(fetchExchangeRateSuccess(response.data[toCurrency][fromCurrency]));
  } catch (error) {
    dispatch(fetchExchangeRateFailure(error.message));
  }
};
