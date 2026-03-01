import { describe, it, expect } from 'vitest';
import { 
  createuser, 
  createbook, 
  calculatearea, 
  getstatuscolor, 
  capfirst, 
  trimit, 
  first, 
  findbyid 
} from './tasks.js';

describe('createuser', () => {
  it('creates user', () => {
    const x = createuser(1, "x");
    expect(x.id).toBe(1);
    expect(x.name).toBe("x");
    expect(x.isactive).toBe(true);
  });
});

describe('createbook', () => {
  it('creates book with year', () => {
    const b = createbook({ title: "t", author: "a", year: 2000, genre: "fiction" });
    expect(b.year).toBe(2000);
  });
  it('creates book without year', () => {
    const b = createbook({ title: "t", author: "a", genre: "non-fiction" });
    expect(b.year).toBe(undefined);
  });
});

describe('calculatearea', () => {
  it('circle', () => expect(calculatearea('circle', 1)).toBeCloseTo(3.14, 2));
  it('square', () => expect(calculatearea('square', 2)).toBe(4));
});

describe('getstatuscolor', () => {
  it('active', () => expect(getstatuscolor('active')).toBe('green'));
  it('inactive', () => expect(getstatuscolor('inactive')).toBe('gray'));
  it('new', () => expect(getstatuscolor('new')).toBe('blue'));
});

describe('formatter', () => {
  it('capfirst', () => expect(capfirst("abc")).toBe("Abc"));
  it('trimit', () => expect(trimit("  a  ")).toBe("a"));
  it('trimit upper', () => expect(trimit("  a  ", true)).toBe("A"));
});

describe('first', () => {
  it('numbers', () => expect(first([1,2,3])).toBe(1));
  it('strings', () => expect(first(["a","b"])).toBe("a"));
  it('empty', () => expect(first([])).toBe(undefined));
});

describe('findbyid', () => {
  const items = [{id:1,n:"x"},{id:2,n:"y"}];
  it('finds', () => expect(findbyid(items, 2)).toEqual({id:2,n:"y"}));
  it('not finds', () => expect(findbyid(items, 3)).toBe(undefined));
});
