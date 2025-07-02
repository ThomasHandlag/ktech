const themeToggleBtn = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;
const moonIcon = document.getElementById("moon-icon");
const sunIcon = document.getElementById("sun-icon");

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  htmlElement.classList.add("dark");
  moonIcon.classList.add("hidden");
  sunIcon.classList.remove("hidden");
} else {
  htmlElement.classList.remove("dark");
  moonIcon.classList.remove("hidden");
  sunIcon.classList.add("hidden");
}

themeToggleBtn.addEventListener("click", () => {
  htmlElement.classList.toggle("dark");

  moonIcon.classList.toggle("hidden");
  sunIcon.classList.toggle("hidden");

  if (htmlElement.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

const tickClock = () => {
  const greetingText = document.getElementById("greetingText");
  const datef = new Date();
  const hoursf = datef.getHours();
  if (hoursf < 12) {
    greetingText.innerText = "Good Morning!";
  } else if (hoursf < 18) {
    greetingText.innerText = "Good Afternoon!";
  } else {
    greetingText.innerText = "Good Evening!";
  }
  const timeDisplay = document.getElementById("clock");
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  timeDisplay.innerText = `${hours}:${minutes}:${seconds}`;
};

setInterval(tickClock, 1000);

const ToDoItem = ({ text, onClick, id, completed }) => {
  const item = document.createElement("div");
  item.dataset.id = id;
  item.className = `flex items-center justify-between p-3 rounded-md ${
    completed
      ? "bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-100"
      : "bg-gray-50 dark:bg-gray-600"
  }`;
  const content = document.createElement("div");
  content.className = "flex items-center space-x-3";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.className = "form-checkbox text-blue-500 rounded-sm todo-checkbox";

  const label = document.createElement("span");
  label.innerText = escapeHTML(text);
  label.className = completed
    ? "line-through text-gray-500 dark:text-gray-400"
    : "";
  content.appendChild(checkbox);
  content.appendChild(label);

  const delButton = document.createElement("button");
  delButton.className =
    "px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md";
  delButton.innerText = "Delete";

  delButton.addEventListener("click", () => {
    onClick();
  });

  item.appendChild(content);
  item.appendChild(delButton);
  return item;
};

const NoteItem = ({ text, onClick, id }) => {
  const item = document.createElement("div");
  item.dataset.id = id;
  item.className =
    "relative p-4 rounded-md bg-green-200 dark:bg-green-600 text-gray-900 dark:text-white shadow-md";
  const content = document.createElement("p");
  content.innerText = escapeHTML(text);
  content.className = "text-sm";
  const delButton = document.createElement("button");
  delButton.className =
    "absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white leading-none flex items-center justify-center w-6 h-6 note-delete-btn";
  const icon = document.createElement("i");
  icon.setAttribute("data-lucide", "x");
  icon.classList.add("w-4", "h-4");

  delButton.appendChild(icon);

  delButton.addEventListener("click", () => {
    onClick();
  });

  item.appendChild(content);
  item.appendChild(delButton);
  return item;
};

const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addBtn");
const todoListContainer = document.getElementById("todos");
const filterAllBtn = document.getElementById("fAll");
const filterCompletedBtn = document.getElementById("fCompleted");
const filterIncompleteBtn = document.getElementById("fIncomplete");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentTodoFilter = "all";

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoListContainer.innerHTML = "";

  const filteredTodos = todos.filter((todo) => {
    if (currentTodoFilter === "completed") {
      return todo.completed;
    } else if (currentTodoFilter === "incomplete") {
      return !todo.completed;
    }
    return true;
  });

  if (filteredTodos.length === 0 && currentTodoFilter !== "all") {
    const noItemsDiv = document.createElement("div");
    noItemsDiv.className = "p-3 text-center text-gray-500 dark:text-gray-400";
    noItemsDiv.textContent = `No ${currentTodoFilter} tasks found.`;
    todoListContainer.appendChild(noItemsDiv);
    return;
  } else if (
    filteredTodos.length === 0 &&
    currentTodoFilter === "all" &&
    todos.length === 0
  ) {
    const noItemsDiv = document.createElement("div");
    noItemsDiv.className = "p-3 text-center text-gray-500 dark:text-gray-400";
    noItemsDiv.textContent = `No tasks added yet.`;
    todoListContainer.appendChild(noItemsDiv);
    return;
  }

  filteredTodos.forEach((todo) => {
    const todoItem = ToDoItem({
      completed: todo.completed,
      text: todo.text,
      onClick: () => deleteTodo(todo.id),
      id: todo.id,
    });
    todoListContainer.appendChild(todoItem);
  });
}

todoListContainer.addEventListener("click", (e) => {
  const todoItem = e.target.closest("[data-id]");
  if (!todoItem) return;

  const id = parseInt(todoItem.dataset.id);

  if (e.target.classList.contains("todo-checkbox")) {
    toggleTodoStatus(id);
  } else if (e.target.classList.contains("todo-delete-btn")) {
    deleteTodo(id);
  }
});

function addTodo() {
  const text = todoInput.value.trim();
  if (text) {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
    };
    todos.push(newTodo);
    saveTodos();
    todoInput.value = "";
    renderTodos();
  } else {
    alert("Cannot add an empty task.");
  }
}

function toggleTodoStatus(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

addTodoBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

function setActiveFilterButton(buttonId) {
  [filterAllBtn, filterCompletedBtn, filterIncompleteBtn].forEach((btn) => {
    btn.classList.remove("bg-blue-500", "text-white", "border-blue-500");
    btn.classList.add(
      "bg-gray-50",
      "dark:bg-gray-600",
      "border-gray-300",
      "dark:border-gray-600",
      "hover:bg-gray-200",
      "dark:hover:bg-gray-500"
    );
  });
  const activeButton = document.getElementById(buttonId);
  activeButton.classList.remove(
    "bg-gray-50",
    "dark:bg-gray-600",
    "border-gray-300",
    "dark:border-gray-600",
    "hover:bg-gray-200",
    "dark:hover:bg-gray-500"
  );
  activeButton.classList.add("bg-blue-500", "text-white", "border-blue-500");
}

filterAllBtn.addEventListener("click", () => {
  currentTodoFilter = "all";
  setActiveFilterButton("fAll");
  renderTodos();
});

filterCompletedBtn.addEventListener("click", () => {
  currentTodoFilter = "completed";
  setActiveFilterButton("fCompleted");
  renderTodos();
});

filterIncompleteBtn.addEventListener("click", () => {
  currentTodoFilter = "incomplete";
  setActiveFilterButton("fIncomplete");
  renderTodos();
});

// --- Sticky Notes Management ---

const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesGridContainer = document.getElementById("notes");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
  notesGridContainer.innerHTML = "";

  if (notes.length === 0) {
    const noNotesDiv = document.createElement("div");
    noNotesDiv.className =
      "p-3 text-center text-gray-500 dark:text-gray-400 col-span-full";
    noNotesDiv.textContent = `No sticky notes added yet.`;
    notesGridContainer.appendChild(noNotesDiv);
    return;
  }

  notes.forEach((note) => {
    const noteItem = NoteItem({
      text: note.text,
      id: note.id,
      onClick: () => deleteNote(note.id),
    });
    notesGridContainer.appendChild(noteItem);
  });
}

function addNote() {
  const text = noteInput.value.trim();
  if (text) {
    const newNote = {
      id: Date.now(),
      text: text,
    };
    notes.push(newNote);
    saveNotes();
    noteInput.value = "";
    renderNotes();
  } else {
    alert("Cannot add an empty note.");
  }
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  renderNotes();
}

addNoteBtn.addEventListener("click", addNote);
noteInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addNote();
  }
});

notesGridContainer.addEventListener("click", (e) => {
  const noteItem = e.target.closest("[data-id]");
  if (!noteItem) return;

  const id = parseInt(noteItem.dataset.id);

  if (
    e.target.classList.contains("note-delete-btn") ||
    e.target.closest(".note-delete-btn")
  ) {
    deleteNote(id);
  }
});

const escapeHTML = (str) => {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

renderTodos();
renderNotes();
setActiveFilterButton("fAll");
