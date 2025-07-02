const changeText = () => {
  const container = document.getElementById("textDisplay");
  container.innerText = "Hello, JavaScript!";
};

const toggle = () => {
  const box = document.getElementsByClassName("box");

  for (let i = 0; i < box.length; i++) {
    box[i].classList.toggle("hightlight");
  }
};

const addItem = () => {
  const newItem = document.getElementById("itemInput").value;
  const item = document.createElement("li");
  item.innerText = newItem;

  document.getElementById("itemList").appendChild(item);
};

const createList = () => {
  const itemsData = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

  const list = document.getElementById("rmList");

  for (let i = 0; i < itemsData.length; i++) {
    const item = document.createElement("li");
    item.id = `item-${i}`;
    const delButton = document.createElement("button");
    delButton.innerText = "Delete";
    delButton.onclick = () => {
      const rmItem = document.getElementById(item.id);
      rmItem.remove();
    };

    item.innerText = itemsData[i];
    item.appendChild(delButton);

    list.appendChild(item);
  }
};

createList();

const changeImageSrc = () => {
  const image = document.getElementById("mainImage");
  image.src = "dog.jpg";
};

const userAlert = () => {
  const userName = document.getElementById("usernameInput").value;
  if (userName) {
    alert(`Hello, ${userName}!`);
  } else {
    alert("Please enter your name.");
  }
};

const createListener = () => {
  const buttons = document.getElementsByClassName("colorBtn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
      alert(buttons[i].innerText);
      console.log(buttons[i].innerText);
    });
  }
};

createListener();

const createHoverEffect = () => {
  const boxes = document.getElementsByClassName("hoverBox");
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("mouseover", () => {
      boxes[i].classList.add("hovered");
    });
    boxes[i].addEventListener("mouseout", () => {
      boxes[i].classList.remove("hovered");
    });
  }
};
createHoverEffect();

const clock = () => {
  const timeDisplay = document.getElementById("clockDisplay");
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  timeDisplay.innerText = `${hours}:${minutes}:${seconds}`;
};

setInterval(clock, 1000);

const validateEmail = () => {
  const emailInput = document.getElementById("emailInput");
  const email = emailInput.value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.innerText = "Please enter a valid email address.";
  } else {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.innerText = "";
  }
};

const hideParagraph = () => {
  const paragraph = document.getElementById("infoPara");
  paragraph.style.display = "none";
};

const greetUser = () => {
  const greetingText = document.getElementById("greetingText");

  // greeting user base on time
  const date = new Date();
  const hours = date.getHours();
  if (hours < 12) {
    greetingText.innerText = "Good Morning!";
  } else if (hours < 18) {
    greetingText.innerText = "Good Afternoon!";
  } else {
    greetingText.innerText = "Good Evening!";
  }
};

window.onload = () => {
  greetUser();
};

const onSubmit = () => {
  const nameInput = document.getElementById("nameInput");
  if (nameInput.value.trim() === "") {
    const nameError = document.getElementById("nameError");
    nameError.innerText = "Name cannot be empty.";
    nameError.style.border = "1px solid red";
  }
};

const once = () => {
  const onceBtn = document.getElementById("onceBtn");
  onceBtn.addEventListener("click", () => {
    onceBtn.disabled = true; // Disable the button after first click
  });
};
once();

document.getElementById("bioInput").addEventListener("input", (event) => {
  const bioText = event.target.value;
  const bioDisplay = document.getElementById("charCount");
  if (bioText.length > 300) {
    bioDisplay.innerText = bioDisplay.innerText.slice(0, 300);
  }
  bioDisplay.innerText = "Character count: " + (300 - bioText.length);
});
