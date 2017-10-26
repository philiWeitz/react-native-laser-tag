
import Immutable from 'immutable';
import { loop, Cmd } from 'redux-loop';
import { handleActions, createAction } from 'redux-actions';

export const APP_REHYDRATE_STORE_START = createAction('APP_REHYDRATE_STORE_START');
export const APP_REHYDRATE_STORE_DONE = createAction('APP_REHYDRATE_STORE_STOP');

// Initial state
const AppStateRecord = Immutable.Record({
  isLoading: true,
});

const initialState = new AppStateRecord();


const AppStateReducer = handleActions({

  [APP_REHYDRATE_STORE_START]: (state) => loop(
    state,
    Cmd.action({ type: APP_REHYDRATE_STORE_DONE }),
  ),

  [APP_REHYDRATE_STORE_DONE]: (state) => state.merge({
    isLoading: false,
  }),

}, initialState);

export default AppStateReducer;
