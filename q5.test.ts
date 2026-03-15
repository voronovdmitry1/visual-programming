import { describe, it, expect } from 'vitest';
import { q, w, s, g, h, tr } from './q5';
type u = { id: number; name: string; sname: string; age: number; city: string };
const data: u[] = [
  { id: 1, name: 'иван', sname: 'петров', age: 34, city: 'мск' },
  { id: 2, name: 'иван', sname: 'петров', age: 33, city: 'мск' },
  { id: 3, name: 'иван', sname: 'петров', age: 35, city: 'спб' },
  { id: 4, name: 'миша', sname: 'петров', age: 35, city: 'спб' }
];
describe('q', () => {
  it('только where', () => {
    const wh1 = w<u>()('name', 'иван');
    const wh2 = w<u>()('sname', 'петров');
    const res = q<u>(wh1, wh2)(data);
    expect(res).toEqual([
      { id: 1, name: 'иван', sname: 'петров', age: 34, city: 'мск' },
      { id: 2, name: 'иван', sname: 'петров', age: 33, city: 'мск' },
      { id: 3, name: 'иван', sname: 'петров', age: 35, city: 'спб' }
    ]);
  });
  it('where + sort', () => {
    const wh1 = w<u>()('name', 'иван');
    const wh2 = w<u>()('sname', 'петров');
    const so1 = s<u>()('age');
    const res = q<u>(wh1, wh2, so1)(data);
    expect(res).toEqual([
      { id: 2, name: 'иван', sname: 'петров', age: 33, city: 'мск' },
      { id: 1, name: 'иван', sname: 'петров', age: 34, city: 'мск' },
      { id: 3, name: 'иван', sname: 'петров', age: 35, city: 'спб' }
    ]);
  });
  it('group + having', () => {
    const gb1 = g<u>()('city');
    const hv1 = h<u>()((g: any) => g.items.length > 1);
    const res = q<u>(gb1, hv1)(data);
    expect(res).toEqual([
      { key: 'мск', items: [data[0], data[1]] },
      { key: 'спб', items: [data[2], data[3]] }
    ]);
  });
  it('where + group + having', () => {
    const wh1 = w<u>()('sname', 'петров');
    const gb1 = g<u>()('city');
    const hv1 = h<u>()((g: any) => g.items.some((x: any) => x.age > 34));
    const res = q<u>(wh1, gb1, hv1)(data);
    expect(res).toEqual([
      { key: 'спб', items: [data[2], data[3]] }
    ]);
  });
  it('все вместе', () => {
    const wh1 = w<u>()('sname', 'петров');
    const gb1 = g<u>()('city');
    const hv1 = h<u>()((g: any) => g.items.some((x: any) => x.age > 34));
    const so1 = s<u>()('age');
    const res = q<u>(wh1, gb1, hv1, so1)(data);
    expect(res).toEqual([
      { key: 'спб', items: [data[2], data[3]] }
    ]);
  });
  it('типы - правильный порядок', () => {
    const wh1 = w<u>()('name', 'иван');
    const gb1 = g<u>()('city');
    const hv1 = h<u>()((g: any) => true);
    const so1 = s<u>()('age');
    const f1 = q<u>(wh1, wh1, gb1, hv1, so1);
    const f2 = q<u>(wh1, gb1, hv1);
    const f3 = q<u>(wh1, wh1, wh1, gb1, hv1, so1, so1);
    expect(true).toBe(true);
  });
});
