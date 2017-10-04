
import Immutable from 'immutable';
import { loop, Effects } from 'redux-loop';
import { handleActions, createAction } from 'redux-actions';

// Initial state
const WelcomeStateRecord = Immutable.Record({

});

const initialState = new WelcomeStateRecord();


const WelcomeReducer = handleActions({

}, initialState);

export default WelcomeReducer;
