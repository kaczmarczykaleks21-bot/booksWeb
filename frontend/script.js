'use strict';

const API_URL = 'http://localhost:3000/api/books';
const API_BASE = 'http://localhost:3000/api';

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

// --- Logowanie i rejestracja ---
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn'); // Dodaj ten przycisk w HTML
const loginModalBox = document.getElementById('loginModalBox');
const registerModalBox = document.getElementById('registerModalBox');
const userIcon = document.getElementById('userIcon');


function registerLoginFormsDisplay(modalID, blurID) {
  loginModalBox.classList.add('hidden');
  registerModalBox.classList.add('hidden');
  modalID.classList.remove('hidden');
  blurID.classList.add('blur');
}

function closeAnyModal() {
  loginModalBox.classList.add('hidden');
  registerModalBox.classList.add('hidden');
  loginContainer.classList.remove('blur');
  registerContainer.classList.remove('blur');
}

// --- Książki ---

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

function clearDisplay() {
  titleDisplay.textContent = 'Tytuł: -';
  authorDisplay.textContent = 'Autor: -';
  descriptionDisplay.textContent = '';
  genreDisplay.textContent = 'Gatunek: -';
  quoteDisplay.textContent = 'Cytat: -';
}

// --- Dodawanie książki ---
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

// --- Usuwanie książki ---
deleteBtn.addEventListener('click', async () => {
  if (books.length === 0) return;
  const id = books[currentIndex].id;
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  await loadBooks();
});

// --- Edycja książki ---
editBtn.addEventListener('click', async () => {
  if (books.length === 0) return;
  const book = books[currentIndex];
  const newTitle = prompt('Nowy tytuł:', book.title);
  const newAuthor = prompt('Nowy autor:', book.author);
  const newDescription = prompt('Nowy opis:', book.description);
  const newGenre = prompt('Nowy gatunek:', book.genre);
  const newQuote = prompt('Nowy cytat:', book.quote);

  if (!newTitle || !newAuthor || !newDescription || !newGenre) return;

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

// --- Nawigacja książek ---
prevBtn.addEventListener('click', () => {
  if (books.length === 0) return;
  currentIndex = (currentIndex - 1 + books.length) % books.length;
  displayBook();
});

nextBtn.addEventListener('click', () => {
  if (books.length === 0) return;
  currentIndex = (currentIndex + 1) % books.length;
  displayBook();
});

// --- Rejestracja ---
const registerForm = document.querySelector('#registerModalBox form');
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = registerForm.querySelector('input[name="email"]').value;
  const username = registerForm.querySelector('input[name="register"]').value;
  const password = registerForm.querySelector('input[name="password"]').value;

  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });

    const data = await res.json();
    alert(data.message);
    if (res.ok) closeAnyModal();
  } catch (err) {
    alert('Błąd połączenia z serwerem.');
  }
});

// --- Logowanie ---
const loginForm = document.querySelector('#loginModalBox form');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = loginForm.querySelector('input[name="login"]').value;
  const password = loginForm.querySelector('input[name="password"]').value;

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    alert(data.message);
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify({ username }));
      closeAnyModal();
      updateAuthUI();
    }
  } catch (err) {
    alert('Błąd połączenia z serwerem.');
  }
});

// --- Wylogowanie ---
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('user');
  updateAuthUI();
  alert('Zostałeś wylogowany.');
  loginContainer.classList.remove('blur');
  registerContainer.classList.remove('blur');
});

// --- Aktualizacja UI ---
function updateAuthUI() {
  const user = localStorage.getItem('user');
  if (user) {
    loginBtn.classList.add('hidden');
    registerBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
    userIcon.classList.remove('hidden');
  } else {
    loginBtn.classList.remove('hidden');
    registerBtn.classList.remove('hidden');
    logoutBtn.classList.add('hidden');
    userIcon.classList.add('hidden');
  }
}

// --- Uruchom po starcie ---
document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();
  loadBooks();
});
