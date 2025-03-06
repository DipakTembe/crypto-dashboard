
import axios from 'axios';

export const fetchMarketChartDataRequest = () => ({
  type: 'FETCH_MARKET_CHART_DATA_REQUEST',
});

export const fetchMarketChartDataSuccess = (rate) => ({
  type: 'FETCH_MARKET_CHART_DATA_SUCCESS',
  payload: rate,
});

export const fetchMarketChartDataFailure = (error) => ({
  type: 'FETCH_MARKET_CHART_DATA_FAILURE',
  payload: error,
});

export const setChartCurrencyRequest = (currency) => ({
  type: 'SET_CHART_CURRENCY_REQUEST',
  payload: currency,
});

export const setChartCurrency = (currency) => async (dispatch) => {
  console.log(currency);
  dispatch(setChartCurrencyRequest(currency));
};

export const fetchMarketChartData = (currency, days) => async (dispatch) => {
  console.log(currency);
  dispatch(fetchMarketChartDataRequest());
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart', {
      params: {
        vs_currency: currency ? currency : "usd",
        days: days,
        interval: "daily",
        // precision: 4,
      },
    });
    dispatch(fetchMarketChartDataSuccess(response.data["prices"]));
  } catch (error) {
    dispatch(fetchMarketChartDataFailure(error.message));
  }
};
