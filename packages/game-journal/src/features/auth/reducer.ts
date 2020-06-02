import { createReducer } from 'typesafe-actions';

export interface AuthSate {
    isLoggedIn: boolean;
}

export const auth = createReducer<AuthSate>({
    isLoggedIn: false,
});
