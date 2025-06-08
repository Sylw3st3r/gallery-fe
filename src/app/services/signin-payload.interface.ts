export interface ISignInPayload {
  email: string;
  password: string;
}

export interface ISignInResposne {
  token: string;
}

type KeysOf<T> = keyof T;

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type SignInPayloadKeys = Expand<KeysOf<ISignInPayload>>;
