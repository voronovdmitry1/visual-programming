import { describe, it, expect, vi } from 'vitest';
import { f, g } from './csv';

describe('f', () => {
  it('работает', () => {
    const x = f(['п1;п2', '1;А', '2;Б'], ';');
    expect(x).toEqual([{ п1: 1, п2: 'А' }, { п1: 2, п2: 'Б' }]);
  });

  it('числа', () => {
    const x = f(['ч;с', '123;х', '456;у'], ';');
    expect(x).toEqual([{ ч: 123, с: 'х' }, { ч: 456, с: 'у' }]);
  });

  it('пусто', () => {
    expect(() => f([], ';')).toThrow('пусто');
  });

  it('разное количество', () => {
    expect(() => f(['з1;з2', 'а;б;в'], ';')).toThrow('строка 1 имеет 3 колонок, нужно 2');
  });

  it('другой разделитель', () => {
    const x = f(['з1,з2', '1,х', '2,у'], ',');
    expect(x).toEqual([{ з1: 1, з2: 'х' }, { з1: 2, з2: 'у' }]);
  });
});

describe('g', () => {
  it('вызывает fs', async () => {
    const r = vi.fn().mockResolvedValue('з1;з2\n1;А\n2;Б');
    const w = vi.fn().mockResolvedValue(undefined);
    
    vi.doMock('node:fs/promises', () => ({
      readFile: r,
      writeFile: w
    }));
    
    const { g } = await import('./csv');
    await g('вход', 'выход', ';');
    
    expect(r).toHaveBeenCalledWith('вход', 'utf-8');
    expect(w).toHaveBeenCalledWith('выход', JSON.stringify([
      { з1: 1, з2: 'А' },
      { з1: 2, з2: 'Б' }
    ], null, 2));
  });

  it('ошибка файла', async () => {
    const r = vi.fn().mockRejectedValue(new Error('нет файла'));
    
    vi.doMock('node:fs/promises', () => ({ readFile: r }));
    
    const { g } = await import('./csv');
    await expect(g('плохо', 'выход', ';')).rejects.toThrow('ошибка: нет файла');
  });
});
