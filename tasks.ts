// 1
interface User {
  id: number;
  name: string;
  email?: string;
  isActive: boolean;
}

function createUser(id: number, name: string, email?: string, isActive: boolean = true): User {
  return {
    id,
    name,
    email,
    isActive
  };
}

// 2
type Genre = 'fiction' | 'non-fiction';

interface Book {
  title: string;
  author: string;
  year?: number;
  genre: Genre;
}

function createBook(book: Book): Book {
  return book;
}

// 3
function calculateArea(shape: 'circle', radius: number): number;
function calculateArea(shape: 'square', side: number): number;
function calculateArea(shape: 'circle' | 'square', param: number): number {
  if (shape === 'circle') {
    return Math.PI * param * param;
  } else {
    return param * param;
  }
}

// 4
type Status = 'active' | 'inactive' | 'new';

function getStatusColor(status: Status): string {
  switch (status) {
    case 'active':
      return 'green';
    case 'inactive':
      return 'gray';
    case 'new':
      return 'blue';
    default:
      return 'unknown';
  }
}

// 5
type StringFormatter = (str: string, uppercase?: boolean) => string;

const capitalizeFirst: StringFormatter = (str: string) => {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const trimAndTransform: StringFormatter = (str: string, uppercase: boolean = false) => {
  const trimmed = str.trim();
  return uppercase ? trimmed.toUpperCase() : trimmed;
};

// 6
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}

// 7
interface HasId {
  id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

interface Product extends HasId {
  name: string;
  price: number;
}

const user1 = createUser(1, "Иван Петров");
const user2 = createUser(2, "Мария Сидорова", "maria@example.com", false);

const book1 = createBook({
  title: "Война и мир",
  author: "Лев Толстой",
  year: 1869,
  genre: "fiction"
});

const book2 = createBook({
  title: "Краткая история времени",
  author: "Стивен Хокинг",
  genre: "non-fiction"
});

const circleArea = calculateArea('circle', 5);
const squareArea = calculateArea('square', 4);

const statusColor1 = getStatusColor('active');
const statusColor2 = getStatusColor('inactive');
const statusColor3 = getStatusColor('new');

const capitalized = capitalizeFirst("привет МИР!");
const trimmed1 = trimAndTransform("  hello world  ");
const trimmed2 = trimAndTransform("  hello world  ", true);

const firstNumber = getFirstElement([1, 2, 3, 4, 5]);
const firstString = getFirstElement(["a", "b", "c"]);
const firstEmpty = getFirstElement([]);

const products: Product[] = [
  { id: 1, name: "Ноутбук", price: 1000 },
  { id: 2, name: "Мышь", price: 25 },
  { id: 3, name: "Клавиатура", price: 75 }
];

const foundProduct = findById(products, 2);
const notFoundProduct = findById(products, 10);

console.log("=== РЕЗУЛЬТАТЫ ===\n");

console.log("1.");
console.log(user1);
console.log(user2);

console.log("\n2.");
console.log(book1);
console.log(book2);

console.log("\n3.");
console.log("круг 5:", circleArea);
console.log("квадрат 4:", squareArea);

console.log("\n4.");
console.log("active:", statusColor1);
console.log("inactive:", statusColor2);
console.log("new:", statusColor3);

console.log("\n5.");
console.log("первая буква:", capitalized);
console.log("обрезать:", trimmed1);
console.log("обрезать + верхний:", trimmed2);

console.log("\n6.");
console.log("числа:", firstNumber);
console.log("строки:", firstString);
console.log("пустой:", firstEmpty);

console.log("\n7.");
console.log("найден:", foundProduct);
console.log("не найден:", notFoundProduct);
