import { describe, it, expect } from 'vitest';
import { wh, so, gb, hv, q, tr, gr } from './q';

type u = { id: number; name: string; sname: string; age: number; city: string };

const whf: wh<u> = (k, v) => (d) => d.filter(x => x[k] === v);
const sof: so<u> = (k) => (d) => [...d].sort((a, b) => {
  const av = a[k];
  const bv = b[k];
  if (av < bv) return -1;
  if (av > bv) return 1;
  return 0;
});
const gbf: gb<u> = (k) => (d) => {
  const r = new Map<any, gr<u, any>>();
  for (const x of d) {
    const key = x[k];
    if (!r.has(key)) r.set(key, { key, items: [] });
    r.get(key)!.items.push(x);
  }
  return Array.from(r.values());
};
const hvf: hv<u> = (p) => (g) => g.filter(p);

describe('q', () => {
  const data: u[] = [
    { id: 1, name: 'иван', sname: 'петров', age: 34, city: 'мск' },
    { id: 2, name: 'иван', sname: 'петров', age: 33, city: 'мск' },
    { id: 3, name: 'иван', sname: 'петров', age: 35, city: 'спб' },
    { id: 4, name: 'миша', sname: 'петров', age: 35, city: 'спб' }
  ];

  it('фильтр и сортировка', () => {
    const res = q<u>(
      whf('name', 'иван'),
      whf('sname', 'петров'),
      sof('age')
    )(data);
    
    expect(res).toEqual([
      { id: 2, name: 'иван', sname: 'петров', age: 33, city: 'мск' },
      { id: 1, name: 'иван', sname: 'петров', age: 34, city: 'мск' },
      { id: 3, name: 'иван', sname: 'петров', age: 35, city: 'спб' }
    ]);
  });

  it('группировка', () => {
    const res = q<u>(
      gbf('city')
    )(data);
    
    expect(res).toEqual([
      { key: 'мск', items: [data[0], data[1]] },
      { key: 'спб', items: [data[2], data[3]] }
    ]);
  });

  it('группировка + having', () => {
    const res = q<u>(
      gbf('city'),
      hvf((g: gr<u, any>) => g.items.length > 1)
    )(data);
    
    expect(res).toEqual([
      { key: 'мск', items: [data[0], data[1]] },
      { key: 'спб', items: [data[2], data[3]] }
    ]);
  });

  it('все вместе', () => {
    const res = q<u>(
      whf('sname', 'петров'),
      gbf('city'),
      hvf((g: gr<u, any>) => g.items.some(x => x.age > 34))
    )(data);
    
    expect(res).toEqual([
      { key: 'спб', items: [data[2], data[3]] }
    ]);
  });
});
