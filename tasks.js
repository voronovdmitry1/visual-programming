function createuser(id, name, email, isactive = true) {
    return { id, name, email, isactive };
}
function createbook(book) {
    return book;
}
// 3
function calculatearea(shape, param) {
    return shape === 'circle' ? Math.PI * param * param : param * param;
}
function getstatuscolor(status) {
    const colors = { active: 'green', inactive: 'gray', new: 'blue' };
    return colors[status];
}
const capfirst = (s) => s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : s;
const trimit = (s, up = false) => up ? s.trim().toUpperCase() : s.trim();
// 6
function first(arr) {
    return arr[0];
}
function findbyid(items, id) {
    return items.find(x => x.id === id);
}
// примеры
const u1 = createuser(1, "иван");
const u2 = createuser(2, "мария", "m@m.ru", false);
const b1 = createbook({ title: "война и мир", author: "толстой", year: 1869, genre: "fiction" });
const b2 = createbook({ title: "история", author: "хокинг", genre: "non-fiction" });
console.log("Результат\n");
console.log("1:", u1, u2);
console.log("2:", b1, b2);
console.log("3: круг", calculatearea('circle', 5), "квадрат", calculatearea('square', 4));
console.log("4:", getstatuscolor('active'), getstatuscolor('inactive'), getstatuscolor('new'));
console.log("5:", capfirst("привет"), trimit("  hello  "), trimit("  hello  ", true));
console.log("6:", first([1, 2, 3]), first(["a", "b"]), first([]));
console.log("7:", findbyid([{ id: 1, name: "x" }, { id: 2, name: "y" }], 2));
export { createuser, createbook, calculatearea, getstatuscolor, capfirst, trimit, first, findbyid };
