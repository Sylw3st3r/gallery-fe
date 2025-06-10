import { ValidatorFn } from '@angular/forms';

export type FormConfig<Keys extends string | number | symbol> = Record<
  Keys,
  [string, ValidatorFn[]?]
>;

export type ValidationMessages<Keys extends string | number | symbol> = Record<
  Keys,
  Record<string, string>
>;
