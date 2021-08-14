import AppContext, { initialAppState } from './app';
import AuthContext, { initialAuthContext } from './auth';

export const initialState = { app: initialAppState, auth: initialAuthContext };
export default { App: AppContext, Auth: AuthContext };
