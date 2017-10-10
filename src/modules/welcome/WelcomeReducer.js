
import Immutable from 'immutable';
import { handleActions } from 'redux-actions';

// Initial state
const WelcomeStateRecord = Immutable.Record({

});

const initialState = new WelcomeStateRecord();


const WelcomeReducer = handleActions({

}, initialState);

export default WelcomeReducer;
