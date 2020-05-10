import firebase from 'firebase';
import { ThunxDispatcher } from '../../typings';

export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';

export interface ISignUpAction {
	type: typeof SIGN_UP;
	payload: unknown;
}

export interface ILoginAction {
	type: typeof LOGIN;
	payload: unknown;
}
export type AuthActionType = ISignUpAction | ILoginAction;

export const SignUp = (email: string, password: string): ThunxDispatcher<AuthActionType> => {
	return async (dispatch): Promise<void> => {
		try {
			const response = await firebase.auth().createUserWithEmailAndPassword(email, password);

			dispatch({ type: SIGN_UP, payload: {} });
		} catch (err) {
			console.log(err);
		}
	};
};

export const login = (email: string, password: string): ThunxDispatcher<AuthActionType> => {
	return async (dispatch): Promise<void> => {
		try {
			const response = await firebase.auth().signInWithEmailAndPassword(email, password);
			console.info(response);

			dispatch({ type: LOGIN, payload: {} });
		} catch (err) {
			console.log(err);
		}
	};
};
