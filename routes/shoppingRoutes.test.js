process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const items = require("../fakeDb");

const item1 = { name: "Bread", price: 3.99 };
const item2 = { name: "Eggs", price: 1.99 };
const item3 = { name: "Ketchup", price: 4.99 };
const item4 = { price: 4.49 };
const item5 = { name: "Relish" };

beforeEach(() => {
	items.push(item1);
	items.push(item2);
});

afterEach(() => {
	items.length = 0;
});

describe("GET /items", () => {
	test("Get all items", async () => {
		const res = await request(app).get("/items");
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual([item1, item2]);
	});
});

describe("POST /items", () => {
	test("Successful item creation", async () => {
		const res = await request(app).post("/items").send(item3);
		expect(res.statusCode).toBe(201);
		expect(res.body).toEqual({ added: item3 });
	});
	test("Request missing 'name'", async () => {
		const res = await request(app).post("/items").send(item4);
		expect(res.statusCode).toBe(400);
	});
	test("Request missing 'price'", async () => {
		const res = await request(app).post("/items").send(item5);
		expect(res.statusCode).toBe(400);
	});
	test("Request missing 'name' and 'price'", async () => {
		const res = await request(app).post("/items").send({});
		expect(res.statusCode).toBe(400);
	});
});
// describe('GET /items/:name', () => {
//     test(, async () => {

//     })
// })
// describe('PATCH /items/:name', () => {
//     test(, async () => {

//     })
// })
// describe('DELETE /items/:name', () => {
//     test(, async () => {

//     })
// })
