export type KeysOf<T> = keyof T;

export type Reveal<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;
