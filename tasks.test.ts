import { describe, it, expect } from 'vitest';
import { createUser, createBook, calculateArea, getStatusColor, capitalizeFirst, trimAndTransform, getFirstElement, findById } from './tasks';
// 1. Тесты для User
describe('createUser', () => {
  it('should create user with required fields', () => {
    const user = createUser(1, "Иван Петров");
    expect(user).toEqual({
      id: 1,
      name: "Иван Петров",
      email: undefined,
      isActive: true
    });
  });

  it('should create user with all fields', () => {
    const user = createUser(2, "Мария Сидорова", "maria@example.com", false);
    expect(user).toEqual({
      id: 2,
      name: "Мария Сидорова",
      email: "maria@example.com",
      isActive: false
    });
  });
});

// 2. Тесты для Book
describe('createBook', () => {
  it('should create book with all fields', () => {
    const book = createBook({
      title: "Война и мир",
      author: "Лев Толстой",
      year: 1869,
      genre: "fiction"
    });
    expect(book).toEqual({
      title: "Война и мир",
      author: "Лев Толстой",
      year: 1869,
      genre: "fiction"
    });
  });

  it('should create book without year', () => {
    const book = createBook({
      title: "Краткая история времени",
      author: "Стивен Хокинг",
      genre: "non-fiction"
    });
    expect(book).toEqual({
      title: "Краткая история времени",
      author: "Стивен Хокинг",
      genre: "non-fiction"
    });
    expect(book.year).toBeUndefined();
  });
});

// 3. Тесты для calculateArea
describe('calculateArea', () => {
  it('should calculate circle area', () => {
    expect(calculateArea('circle', 5)).toBeCloseTo(78.5398, 4);
  });

  it('should calculate square area', () => {
    expect(calculateArea('square', 4)).toBe(16);
  });
});

// 4. Тесты для getStatusColor
describe('getStatusColor', () => {
  it('should return green for active', () => {
    expect(getStatusColor('active')).toBe('green');
  });

  it('should return gray for inactive', () => {
    expect(getStatusColor('inactive')).toBe('gray');
  });

  it('should return blue for new', () => {
    expect(getStatusColor('new')).toBe('blue');
  });
});

// 5. Тесты для StringFormatter
describe('StringFormatter', () => {
  describe('capitalizeFirst', () => {
    it('should capitalize first letter', () => {
      expect(capitalizeFirst("привет МИР!")).toBe("Привет мир!");
    });

    it('should handle empty string', () => {
      expect(capitalizeFirst("")).toBe("");
    });
  });

  describe('trimAndTransform', () => {
    it('should trim string', () => {
      expect(trimAndTransform("  hello world  ")).toBe("hello world");
    });

    it('should trim and uppercase', () => {
      expect(trimAndTransform("  hello world  ", true)).toBe("HELLO WORLD");
    });
  });
});

// 6. Тесты для getFirstElement
describe('getFirstElement', () => {
  it('should return first element of number array', () => {
    expect(getFirstElement([1, 2, 3, 4, 5])).toBe(1);
  });

  it('should return first element of string array', () => {
    expect(getFirstElement(["a", "b", "c"])).toBe("a");
  });

  it('should return undefined for empty array', () => {
    expect(getFirstElement([])).toBeUndefined();
  });
});

// 7. Тесты для findById
describe('findById', () => {
  const products = [
    { id: 1, name: "Ноутбук", price: 1000 },
    { id: 2, name: "Мышь", price: 25 },
    { id: 3, name: "Клавиатура", price: 75 }
  ];

  it('should find product by id', () => {
    expect(findById(products, 2)).toEqual({ id: 2, name: "Мышь", price: 25 });
  });

  it('should return undefined if id not found', () => {
    expect(findById(products, 10)).toBeUndefined();
  });
});
