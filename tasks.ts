// 1
interface user {
  id: number;
  name: string;
  email?: string;
  isactive: boolean;
}

function createuser(id: number, name: string, email?: string, isactive: boolean = true): user {
  return { id, name, email, isactive };
}

// 2
type genre = 'fiction' | 'non-fiction';

interface book {
  title: string;
  author: string;
  year?: number;
  genre: genre;
}

function createbook(book: book): book {
  return book;
}

// 3
function calculatearea(shape: 'circle' | 'square', param: number): number {
  return shape === 'circle' ? Math.PI * param * param : param * param;
}

// 4
type status = 'active' | 'inactive' | 'new';

function getstatuscolor(status: status): string {
  const colors = { active: 'green', inactive: 'gray', new: 'blue' };
  return colors[status];
}

// 5
type formatter = (s: string, up?: boolean) => string;

const capfirst: formatter = (s) => s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : s;
const trimit: formatter = (s, up = false) => up ? s.trim().toUpperCase() : s.trim();

// 6
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// 7
interface hasid {
  id: number;
}

function findbyid<T extends hasid>(items: T[], id: number): T | undefined {
  return items.find(x => x.id === id);
}
// для тестов
export { 
  createuser, 
  createbook, 
  calculatearea, 
  getstatuscolor, 
  capfirst, 
  trimit, 
  first, 
  findbyid 
};};
// примеры
const u1 = createuser(1, "иван");
const u2 = createuser(2, "мария", "m@m.ru", false);

const b1 = createbook({ title: "война и мир", author: "толстой", year: 1869, genre: "fiction" });
const b2 = createbook({ title: "история", author: "хокинг", genre: "non-fiction" });

console.log("1:", u1, u2);
console.log("2:", b1, b2);
console.log("3: круг", calculatearea('circle', 5), "квадрат", calculatearea('square', 4));
console.log("4:", getstatuscolor('active'), getstatuscolor('inactive'), getstatuscolor('new'));
console.log("5:", capfirst("привет"), trimit("  hello  "), trimit("  hello  ", true));
console.log("6:", first([1,2,3]), first(["a","b"]), first([]));
console.log("7:", findbyid([{id:1,name:"x"},{id:2,name:"y"}], 2));
