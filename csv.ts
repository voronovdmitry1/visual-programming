import { readFile, writeFile } from 'node:fs/promises';

export function f(a: string[], d: string): object[] {
  if (a.length === 0) throw new Error('пусто');
  
  const h = a[0].split(d);
  const r: object[] = [];
  
  for (let i = 1; i < a.length; i++) {
    const v = a[i].split(d);
    
    if (v.length !== h.length) {
      throw new Error(`строка ${i} имеет ${v.length} колонок, нужно ${h.length}`);
    }
    
    const o: any = {};
    h.forEach((x, j) => {
      const y = v[j];
      o[x] = isNaN(Number(y)) ? y : Number(y);
    });
    
    r.push(o);
  }
  
  return r;
}

export async function g(
  i: string,
  o: string,
  d: string
): Promise<void> {
  try {
    const data = await readFile(i, 'utf-8');
    const lines = data.split('\n').filter(x => x.trim() !== '');
    
    const json = f(lines, d);
    await writeFile(o, JSON.stringify(json, null, 2));
  } catch (err) {
    throw new Error(`ошибка: ${(err as Error).message}`);
  }
}
