const request = require("supertest");
const { expect } = require("chai");
const app = require("../server");

describe("Books API", () => {
  beforeEach(() => {
    // resetuje stan in-memory - jeśli twoja implementacja trzyma dane w pliku/db,
    // trzeba to odpowiednio ustawić. Tutaj app używa `books` w module server.js,
    // więc restart procesu resetuje stan. Testy uruchamiane pojedynczo będą działać.
  });

  it("POST /api/books - tworzy książkę (200+)", async () => {
    const payload = { title: "Test book", author: "Author 1" };
    const res = await request(app).post("/api/books").send(payload);
    expect(res.status).to.equal(201);
    expect(res.body).to.include({ title: "Test book", author: "Author 1" });
    expect(res.body).to.have.property("id");
  });

  it("POST /api/books - walidacja błędu (brak title)", async () => {
    const payload = { author: "Author 1" };
    const res = await request(app).post("/api/books").send(payload);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("errors");
  });

  it("GET /api/books - zwraca tablicę", async () => {
    const res = await request(app).get("/api/books");
    expect(res.status).to.equal(200);
    expect(Array.isArray(res.body)).to.be.true;
  });
});
