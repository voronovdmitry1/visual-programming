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
type whs<T, A extends any[] = []> = A;
type gbs<T, A extends any[] = []> = A;
type hvs<T, A extends any[] = []> = A;
type sos<T, A extends any[] = []> = A;
export function q<T, W extends any[] = [], G extends any[] = [], H extends any[] = [], S extends any[] = []>(
  ...s: [
    ...whs<T, W>,
    ...gbs<T, G>,
    ...hvs<T, H>,
    ...sos<T, S>
  ]
): tr<T> {
  return (d: T[]) => {
    let r: any = d;
    for (const step of s) {
      r = step(r);
    }
    return r as T[];
  };
}
export function w<T>(): wh<T> {
  return ((k: any, v: any) => (d: any) => d.filter((x: any) => x[k] === v)) as any;
}
export function s<T>(): so<T> {
  return ((k: any) => (d: any) => [...d].sort((a: any, b: any) => {
    const av = a[k];
    const bv = b[k];
    if (av < bv) return -1;
    if (av > bv) return 1;
    return 0;
  })) as any;
}
export function g<T>(): gb<T> {
  return ((k: any) => (d: any) => {
    const r = new Map();
    for (const x of d) {
      const key = x[k];
      if (!r.has(key)) r.set(key, { key, items: [] });
      r.get(key).items.push(x);
    }
    return Array.from(r.values());
  }) as any;
}
export function h<T>(): hv<T> {
  return ((p: any) => (g: any) => g.filter(p)) as any;
}
