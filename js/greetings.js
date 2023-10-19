const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const logoutButton = document.querySelector("#logout-button");
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  event.preventDefault();
  const username = loginInput.value;
  loginInput.value = "";
  loginForm.classList.add(HIDDEN_CLASSNAME);
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
  showTodo();
}

function paintGreetings(username) {
  greeting.innerText = `Hello ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
  logoutButton.classList.remove(HIDDEN_CLASSNAME);
}

function showTodo() {
  document.querySelector("#todo-form").classList.remove(HIDDEN_CLASSNAME);
  document.querySelector("#todo-list").classList.remove(HIDDEN_CLASSNAME);
}

function onLogout() {
  todoInput.value = "";
  todoList.innerHTML = "";
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem("todos");
  todoForm.classList.add(HIDDEN_CLASSNAME);
  todoList.classList.add(HIDDEN_CLASSNAME);
  greeting.classList.add(HIDDEN_CLASSNAME);
  logoutButton.classList.add(HIDDEN_CLASSNAME);
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

logoutButton.addEventListener("click", onLogout);

if(savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  logoutButton.classList.remove(HIDDEN_CLASSNAME);
  paintGreetings(savedUsername);
  showTodo();
}