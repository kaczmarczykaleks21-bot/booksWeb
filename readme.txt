1. Wymagania

Przed rozpoczęciem upewnij się, że masz zainstalowane:
- [Node.js](https://nodejs.org) (zalecana wersja 18 lub wyższa)
- NPM (instaluje się razem z Node.js)
- Edytor (np. Visual Studio Code)

Sprawdzenie:
```bash
node -v
npm -v

2. Struktura projektu
pgsql
Skopiuj kod
booksWeb/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── backend/
    ├── server.js
    ├── db.js
    └── routes/
        └── books.js

3. Instalacja zależności
 Wejdź do folderu backendu:
bash
Skopiuj kod
cd backend
 Zainicjuj projekt Node.js (tylko raz):
bash
Skopiuj kod
npm init -y
 Zainstaluj wymagane paczki:
bash
Skopiuj kod
npm install express cors body-parser sqlite3
 4. Uruchomienie serwera
 W folderze backend uruchom:
bash
Skopiuj kod
node server.js
Po kilku sekundach powinno się pojawić:

arduino
Skopiuj kod
Server running on http://localhost:3000
Serwer backendu działa na porcie 3000.

5. Test backendu
Otwórz przeglądarkę i wpisz:

bash
Skopiuj kod
http://localhost:3000/api/books
Jeśli wszystko działa poprawnie, powinieneś zobaczyć:

json
Skopiuj kod
[]
(pusta lista książek).

6. Uruchomienie frontendu
Otwórz plik frontend/index.html w przeglądarce.
Możesz też użyć rozszerzenia Live Server w VS Code.

W formularzu wpisz dane książki i kliknij Dodaj.
Dane zostaną zapisane w bazie SQLite (books.db w folderze backendu).

7. Dodatkowe komendy (opcjonalne)
Automatyczne restartowanie serwera po zmianach:
Zainstaluj nodemon:

bash
Skopiuj kod
npm install -g nodemon
Uruchom serwer:

bash
Skopiuj kod
nodemon server.js
Usunięcie i ponowne utworzenie bazy danych:
Po prostu usuń plik:

bash
Skopiuj kod
backend/books.db
Zostanie automatycznie stworzony przy kolejnym uruchomieniu.

8. Najważniejsze skróty
Czynność Komenda
Wejście do backendu	cd backend
Instalacja zależności	npm install
Uruchomienie serwera	node server.js
Uruchomienie z nodemon	nodemon server.js
Zatrzymanie serwera	CTRL + C
Sprawdzenie wersji Node.js	node -v

9. Struktura bazy danych
Tabela books:

Kolumna	Typ	Opis
id	INTEGER PRIMARY KEY AUTOINCREMENT	unikalny identyfikator książki
title	TEXT	tytuł książki
author	TEXT	autor książki
description	TEXT	opis książki

-- Dodatkowe wskazówki --

- Jeśli nie masz zainstalowanego **Live Servera**, możesz dodać go globalnie:
  ```bash

  npm install -g live-server

  Po tym polecenie: npm run dev uruchomi frontend i backend automatycznie.

!!!Zmiany w ramach etapu B!!!

Dodano dwa nowe pola do encji książki:
- **genre** – gatunek książki (pole wymagane, walidowane po stronie backendu i frontendu),
- **quote** – cytat z książki (pole opcjonalne).

Zaktualizowano:
- model/tabelę `books` – dodano kolumny `genre` i `quote`,
- API REST – rozszerzono obsługę CRUD o nowe pola + walidację,
- frontend – formularz dodawania/edycji oraz widok szczegółów,
- README – sekcja o nowych polach i sposobie testowania.

Testowanie:
1. Uruchom backend (`node server.js`).
2. Otwórz `index.html` w przeglądarce.
3. Spróbuj dodać książkę bez gatunku (powinien pojawić się komunikat walidacyjny).  
4. Dodaj książkę z gatunkiem i (opcjonalnie) cytatem, dane wyświetlą się poprawnie w liście.