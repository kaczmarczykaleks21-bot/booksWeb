'use strict';

const API_URL = 'http://localhost:3000/api/books';

let books = [];
let currentIndex = 0;

const form = document.querySelector('form');
const titleInput = document.querySelector('input[name="title"]');
const authorInput = document.querySelector('input[name="author"]');
const descriptionInput = document.querySelector('input[name="description"]');
const genreInput = document.querySelector('input[name="genre"]');
const quoteInput = document.querySelector('input[name="quote"]');

const titleDisplay = document.querySelector('.bookTitle');
const authorDisplay = document.querySelector('.bookAuthor');
const descriptionDisplay = document.querySelector('.bookDescryption');
const genreDisplay = document.querySelector('.bookGenre');
const quoteDisplay = document.querySelector('.bookQuote');

const prevBtn = document.querySelector('.previousBtn');
const nextBtn = document.querySelector('.nextBtn');
const deleteBtn = document.querySelector('.deleteBtn');
const editBtn = document.querySelector('.edit');
const addBtn = document.querySelector('.addBtn');



async function loadBooks() {
  try {
    const res = await fetch(API_URL);
    books = await res.json();
    if (books.length > 0) {
      currentIndex = 0;
      displayBook();
    } else {
      clearDisplay();
    }
  } catch (err) {
    console.error('Błąd podczas ładowania książek:', err);
  }
}

// Wyświetlenie książki
function displayBook() {
  if (books.length === 0) {
    clearDisplay();
    return;
  }
  const book = books[currentIndex];
  titleDisplay.textContent = `Tytuł: ${book.title}`;
  authorDisplay.textContent = `Autor: ${book.author}`;
  descriptionDisplay.textContent = book.description;
  genreDisplay.textContent = `Gatunek: ${book.genre}`;
  quoteDisplay.textContent = `Cytat: ${book.quote || '-'}`;
}

// Wyczyść widok (gdy brak książek)
function clearDisplay() {
  titleDisplay.textContent = 'Tytuł: -';
  authorDisplay.textContent = 'Autor: -';
  descriptionDisplay.textContent = '';
  genreDisplay.textContent = 'Gatunek: -';
  quoteDisplay.textContent = 'Cytat: -';
}

// Dodawanie nowej książki
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newBook = {
    title: titleInput.value,
    author: authorInput.value,
    description: descriptionInput.value,
    genre: genreInput.value,
    quote: quoteInput.value,
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    });
    if (!res.ok) throw new Error('Błąd przy dodawaniu książki');
    await loadBooks();
    form.reset();
  } catch (err) {
    console.error(err);
  }
});

// Usuwanie książki
deleteBtn.addEventListener('click', async () => {
  if (books.length === 0) return;
  const id = books[currentIndex].id;
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  await loadBooks();
});

// Edycja książki
editBtn.addEventListener('click', async () => {
  if (books.length === 0) return;
  const book = books[currentIndex];
  const newTitle = prompt('Nowy tytuł:', book.title);
  const newAuthor = prompt('Nowy autor:', book.author);
  const newDescription = prompt('Nowy opis:', book.description);
  const newGenre = prompt('Nowy gatunek:', book.genre);
  const newQuote = prompt('Nowy cytat:', book.quote);

  if (!newTitle || !newAuthor || !newDescription || !newGenre || !newQuote) return;

  await fetch(`${API_URL}/${book.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: newTitle,
      author: newAuthor,
      description: newDescription,
      genre: newGenre,
      quote: newQuote,
    }),
  });

  await loadBooks();
});

// Poprzednia książka
prevBtn.addEventListener('click', () => {
  if (books.length === 0) return;
  currentIndex = (currentIndex - 1 + books.length) % books.length;
  displayBook();
});

// Następna książka
nextBtn.addEventListener('click', () => {
  if (books.length === 0) return;
  currentIndex = (currentIndex + 1) % books.length;
  displayBook();
});


// walidacja

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const titleInput = document.querySelector("input[name='title']");
  const authorInput = document.querySelector("input[name='author']");
  const descInput = document.querySelector("input[name='description']");
  const genreInput = document.querySelector("input[name='genre']");
  const quoteInput = document.querySelector("input[name='quote']");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const description = descInput.value.trim();
    const genre = genreInput.value.trim();
    const quote = quoteInput.value.trim();

  
    if (!title || !author || !description) {
      alert("❌ Wszystkie pola muszą być wypełnione!");
      return;
    }

    const response = await fetch("http://localhost:3000/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, description, genre, quote }),
    });

    if (response.ok) {
      alert("✅ Książka dodana!");
      form.reset();
    } else {
      const error = await response.json();
      alert(`Błąd: ${error.message}`);
    }
  });
});


loadBooks();


