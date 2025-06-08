import {
  compare,
  email,
  password,
  required,
} from '@rxweb/reactive-form-validators';

export class SignUp {
  @required({ message: 'First Name is required' })
  public firstName: string = '';

  @required({ message: 'Last Name is required' })
  public lastName: string = '';

  @required({ message: 'Email is required' })
  @email({ message: 'Must be an email' })
  public email: string = '';

  @required({ message: 'Password is required' })
  @password({
    validation: {
      digit: true,
      alphabet: true,
      lowerCase: true,
      upperCase: true,
      specialCharacter: true,
      minLength: 8,
      maxLength: 20,
    },
    message:
      'Password must be 8-20 characters, include upper and lower case letters, a digit, and a special character.',
  })
  public password: string = '';

  @required({ message: 'Confirmation Password is required' })
  @compare({ fieldName: 'password', message: 'Passwords do not match' })
  public confirmPassword: string = '';
}

type KeysOf<T> = keyof T;

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type SignUpFields = Expand<KeysOf<SignUp>>;
