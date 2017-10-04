
import PropType from 'prop-types';
import Immutable from 'immutable';
import { handleActions, createAction } from 'redux-actions';

export const GUN_SET_GUN_DEVICE = createAction('GUN_SET_GUN_DEVICE');

// Initial state
const GunStateRecord = Immutable.Record({
  id: PropType.string,
  name : PropType.string,
});

const initialState = new GunStateRecord();


const GunReducer = handleActions({

  [GUN_SET_GUN_DEVICE]: (state, action) => state.merge({
    name: action.payload.name,
  }),

}, initialState);

export default GunReducer;
