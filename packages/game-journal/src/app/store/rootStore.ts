import { StateType } from 'typesafe-actions';
import { combineReducers, createStore } from 'redux';
import { auth } from '../../features/auth/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  auth,
});
export type RootState = StateType<typeof rootReducer>;

export const rootStore = createStore(rootReducer, composeWithDevTools());
