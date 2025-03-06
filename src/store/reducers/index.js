
import { combineReducers } from 'redux';
import coinReducer from './coinReducer';
import exchangeRateConverterReducer from './exchangeRateConverterReducer';
import marketChartReducer from './marketChartReducer';

const rootReducer = combineReducers({
  coin: coinReducer,
  exchangeRateConverter: exchangeRateConverterReducer,
  marketChart: marketChartReducer,
  // Add more reducers as needed
});

export default rootReducer;
