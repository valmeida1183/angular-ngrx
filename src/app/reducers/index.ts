import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";
import { routerReducer } from "@ngrx/router-store";

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};

// this is a metaReducer, metareducer is called before real Reducers and should be used in generally in development environment.
export const logger = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    console.log("state before: ", state);
    console.log("action: ", action);

    return reducer(state, action); // this is necessary to continue reducers chain
  };
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
