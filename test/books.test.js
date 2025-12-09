const request = require("supertest");
const { expect } = require("chai");
const app = require("../server");

describe("Books API", () => {
  it("POST /api/books - tworzy książkę", async () => {
    const payload = {
      title: "Test book",
      author: "Author 1",
      genre: "Klasyka",
    };
    const res = await request(app).post("/api/books").send(payload);
    expect(res.status).to.equal(200);
    expect(res.body).to.include({
      title: "Test book",
      author: "Author 1",
      genre: "Klasyka",
    });
    expect(res.body).to.have.property("id");
  });

  it("POST /api/books - walidacja brak gatunku", async () => {
    const payload = { title: "Test book", author: "Author 1" };
    const res = await request(app).post("/api/books").send(payload);
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message");
    expect(res.body.message).to.equal("Gatunek musi zostać wybrany!");
  });

  it("GET /api/books - zwraca tablicę", async () => {
    const res = await request(app).get("/api/books");
    expect(res.status).to.equal(200);
    expect(Array.isArray(res.body)).to.be.true;
  });
});
