import {AuthActionTypes} from '../actions/auth.actions';
import {RootState} from '../../state';
import {ActionReducer} from '@ngrx/store';

export function clearState(reducer: ActionReducer<RootState>): ActionReducer<RootState> {
  return (state: RootState, action: any): RootState => {
    if (action.type === AuthActionTypes.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
