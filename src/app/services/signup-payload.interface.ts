export interface ISignUpPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type KeysOf<T> = keyof T;

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type SignUpPayloadKeys = Expand<KeysOf<ISignUpPayload>>;
