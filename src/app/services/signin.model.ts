import { required } from '@rxweb/reactive-form-validators';
import { KeysOf, Reveal } from './utils.type';

export class SignIn {
  @required({ message: 'Email is required' })
  public email: string = '';

  @required({ message: 'Password is required' })
  public password: string = '';
}

export interface ISignInResposne {
  token: string;
}

export type SignInFields = Reveal<KeysOf<SignIn>>;
