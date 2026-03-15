export type tr<T> = (x: T[]) => T[];

export type wh<T> = <K extends keyof T>(k: K, v: T[K]) => tr<T>;

export type so<T> = <K extends keyof T>(k: K) => tr<T>;

export type gr<T, K> = {
  key: K;
  items: T[];
};

export type gb<T> = <K extends keyof T>(k: K) => tr<gr<T, T[K]>>;

export type gt<T, K> = (x: gr<T, K>[]) => gr<T, K>[];

export type hv<T> = <K extends keyof T>(p: (g: gr<T, T[K]>) => boolean) => gt<T, T[K]>;

export function q<T>(...s: any[]): tr<T> {
  return (d: T[]) => {
    let r: any = d;
    for (const step of s) {
      r = step(r);
    }
    return r as T[];
  };
}
