
export type NonNullableRecursive<T extends object | string | number | symbol> = T extends object ? {
  [K in keyof T]: NonNullable<T[K]>;
} : NonNullable<T>;
