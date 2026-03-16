import { describe, it, expectTypeOf } from 'vitest';
import { dr, pbt, eh } from './t';

describe('dr', () => {
  it('1', () => {
    type a = { x: number; y: { z: string } };
    type ra = dr<a>;
    expectTypeOf<ra>().toEqualTypeOf<{
      readonly x: number;
      readonly y: { readonly z: string };
    }>();
  });

  it('2', () => {
    type a = { items: number[] };
    type ra = dr<a>;
    expectTypeOf<ra>().toEqualTypeOf<{
      readonly items: readonly number[];
    }>();
  });

  it('3', () => {
    type rn = dr<number>;
    type rs = dr<string>;
    expectTypeOf<rn>().toBeNumber();
    expectTypeOf<rs>().toBeString();
  });
});

describe('pbt', () => {
  it('1', () => {
    type a = { id: number; name: string; age: number; city: string };
    type num = pbt<a, number>;
    type str = pbt<a, string>;
    expectTypeOf<num>().toEqualTypeOf<{ id: number; age: number }>();
    expectTypeOf<str>().toEqualTypeOf<{ name: string; city: string }>();
  });

  it('2', () => {
    type a = { id: number };
    type str = pbt<a, string>;
    expectTypeOf<str>().toEqualTypeOf<{}>();
  });
});

describe('eh', () => {
  it('1', () => {
    type e = { click: { x: number }; input: string; focus: void };
    type h = eh<e>;
    expectTypeOf<h>().toEqualTypeOf<{
      onclick: (arg: { x: number }) => void;
      oninput: (arg: string) => void;
      onfocus: (arg: void) => void;
    }>();
  });

  it('2', () => {
    type e = { mousemove: { x: number }; keydown: { key: string } };
    type h = eh<e>;
    expectTypeOf<h>().toEqualTypeOf<{
      onmousemove: (arg: { x: number }) => void;
      onkeydown: (arg: { key: string }) => void;
    }>();
  });
});
