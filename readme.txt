📚 BooksWeb

Aplikacja do zarządzania książkami (CRUD) z logowaniem użytkowników.
Backend: Node.js + Express + better-sqlite3
Frontend: SPA (static)
CI/CD: GitHub Actions → Render

🚀 Funkcje

Rejestracja i logowanie użytkowników (hashowane hasła)

Dodawanie, edycja, usuwanie książek

Lista książek z filtrowaniem

Walidacja danych:

UI (frontend)

backend (Joi)

Globalny format błędów

CI/CD:

testy uruchamiane przy push do main

deploy na Render

🛠 Stack
Warstwa	Technologie
Frontend	vanilla JS, fetch API, SPA build
Backend	Node.js, Express
Baza danych	better-sqlite3
CI	GitHub Actions
Deploy	Render.com
🔗 Endpointy API
Metoda	Endpoint	Opis
GET	/api/books	Lista książek
POST	/api/books	Dodanie książki
PUT	/api/books/:id	Edycja książki
DELETE	/api/books/:id	Usunięcie książki
POST	/api/register	Rejestracja
POST	/api/login	Logowanie
❗ Walidacja i kody błędów
Kody HTTP

400 – błędny format danych

409 – konflikt danych (np. duplikat)

422 – naruszenie reguł biznesowych

404 – zasób nie istnieje

401/403 – brak autoryzacji

Format błędu (spójny backend ↔ frontend)
{
  "timestamp": "2025-10-30T18:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Niepoprawny format danych",
  "path": "/api/books"
}

Middleware globalny (server.js)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    timestamp: new Date().toISOString(),
    status,
    error: err.name || "Error",
    message: err.message || "Wystąpił błąd",
    path: req.originalUrl
  });
});

🧪 Testy

testy jednostkowe i integracyjne

supertest do API

mocha + chai

Uruchamianie:

npm test

⚙️ CI/CD (GitHub Actions)
1. Testy → PR/push

Plik: .github/workflows/ci.yml

name: CI
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v4
        with:
          node-version: "18"
      - run: npm install
      - run: npm test

2. Deploy na Render

.github/workflows/deploy.yml

name: Deploy to Render
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        uses: JorgeLNJunior/render-deploy@v1.4.6
        with:
          service_id: ${{ secrets.RENDER_SERVICE_ID }}
          api_key: ${{ secrets.RENDER_API_KEY }}
          wait_deploy: true

Sekrety w GitHub
NAME	VALUE
RENDER_SERVICE_ID	ID serwisu z Render
RENDER_API_KEY	API key
🚀 Uruchomienie lokalne
npm install
npm start


Serwer:

http://localhost:3000

🌐 Deploy (Render)

Auto deploy po push do main

Build command: npm install

Start command: node server.js lub npm start

📦 Struktura projektu
booksWeb/
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── validators/
│   └── db/
├── public/
│   └── index.html
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── server.js
└── README.md
