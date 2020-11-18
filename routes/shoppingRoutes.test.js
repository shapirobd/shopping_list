process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const items = require("../fakeDb");

const item1 = { name: "Bread", price: 3.99 };
const item2 = { name: "Eggs", price: 1.99 };

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
