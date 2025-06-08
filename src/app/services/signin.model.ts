import { email, password, required } from '@rxweb/reactive-form-validators';

export class SignIn {
  @required({ message: 'Email is required' })
  public email: string = '';

  @required({ message: 'Password is required' })
  public password: string = '';
}

export interface ISignInResposne {
  token: string;
}

type KeysOf<T> = keyof T;

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type SignInFields = Expand<KeysOf<SignIn>>;
