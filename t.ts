export type dr<T> = T extends object ? {
  readonly [P in keyof T]: dr<T[P]>
} : T;

export type pbt<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P]
};

export type eh<T> = {
  [P in keyof T as P extends string ? `on${P}` : never]: (arg: T[P]) => void
};
