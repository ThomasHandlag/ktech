const nameValidation = (name) => {
  if (name.length < 3) {
    const nameError = document.getElementById("errorName");
    nameError.textContent = "Name must be at least 3 characters long.";
    nameError.style.color = "red";
    document
      .getElementById("name")
      .classList.add(["border-2", "border-indigo-400"]); // Limit name to 3 characters
    return false;
  } else {
    const nameError = document.getElementById("errorName");
    nameError.textContent = "";
    document
      .getElementById("name")
      .classList.remove(["border", "border-indigo-500"]);
    return true;
  }
};

const mailValidation = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    const emailError = document.getElementById("errorMail");
    emailError.textContent = "Please enter a valid email address.";
    emailError.style.color = "red";
    return false;
  } else {
    const emailError = document.getElementById("errorMail");
    emailError.textContent = "";
    return true;
  }
};

const hobbiesValidation = () => {
  const hobs = document.getElementsByName("hobbies");
  for (let i = 0; i < hobs.length; i++) {
    if (hobs[i].checked) {
      const hobbyError = document.getElementById("errorHobbies");
      hobbyError.textContent = "";
      return true;
    }
  }
  const hobbyError = document.getElementById("errorHobbies");
  hobbyError.textContent = "Please select at least one hobby.";
  hobbyError.style.color = "red";
  return false;
};

const phoneValidation = (phone) => {
  const phonePattern = /^\d{10}$/; // Adjust the pattern as needed
  if (!phonePattern.test(phone)) {
    const phoneError = document.getElementById("errorPhone");
    phoneError.textContent = "Please enter a valid phone number.";
    phoneError.style.color = "red";
    return false;
  } else {
    const phoneError = document.getElementById("errorPhone");
    phoneError.textContent = "";
    return true;
  }
};

const passwordValidation = (password) => {
  if (password.length < 8) {
    const passwordError = document.getElementById("errorPassword");
    passwordError.textContent = "Password must be at least 9 characters long.";
    passwordError.style.color = "red";
    return false;
  }

  if (!/[A-Z]/.test(password)) {
    const passwordError = document.getElementById("errorPassword");
    passwordError.textContent =
      "Password must contain at least one uppercase letter.";
    passwordError.style.color = "red";
    return false;
  }

  if (!/[a-z]/.test(password)) {
    const passwordError = document.getElementById("errorPassword");
    passwordError.textContent =
      "Password must contain at least one lowercase letter.";
    passwordError.style.color = "red";
    return false;
  }

  if (!/[0-9]/.test(password)) {
    const passwordError = document.getElementById("errorPassword");
    passwordError.textContent = "Password must contain at least one number.";
    passwordError.style.color = "red";
    return false;
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    const passwordError = document.getElementById("errorPassword");
    passwordError.textContent =
      "Password must contain at least one special character.";
    passwordError.style.color = "red";
    return false;
  }
};

const confirmPasswordValidation = () => {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    const confirmPasswordError = document.getElementById(
      "errorConfirmPassword"
    );
    confirmPasswordError.textContent = "Passwords do not match.";
    confirmPasswordError.style.color = "red";
    return false;
  } else {
    const confirmPasswordError = document.getElementById(
      "errorConfirmPassword"
    );
    confirmPasswordError.textContent = "";
    return true;
  }
};

const ageValidation = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age < 18) {
    const dobError = document.getElementById("errorBod");
    dobError.textContent = "You must be at least 18 years old.";
    dobError.style.color = "red";
    return false;
  } else {
    const dobError = document.getElementById("errorBod");
    dobError.textContent = "";
    return true;
  }
};

const bioValidation = (bio) => {
  if (bio.length > 300) {
    const bioError = document.getElementById("errorBio");
    bioError.textContent = "Exceeded maximum length of 300 characters.";
    bioError.style.color = "red";
    this.value = bio.slice(0, 300); // Limit bio to 300 characters
    return false;
  } else {
    const bioError = document.getElementById("errorBio");
    bioError.textContent = "";
    return true;
  }
};

const avatarValidation = (file) => {
  if (file) {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      const avatarError = document.getElementById("errorAvatar");
      avatarError.textContent =
        "Please upload a valid image file (JPEG, PNG, GIF).";
      avatarError.style.color = "red";
      return false;
    } else {
      const avatarError = document.getElementById("errorAvatar");
      avatarError.textContent = "";
    }
  }
  return true;
};

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  nameValidation(document.getElementById("name").value);
  mailValidation(document.getElementById("email").value);
  passwordValidation(document.getElementById("password").value);
  confirmPasswordValidation();
  ageValidation(document.getElementById("dob").value);
  phoneValidation(document.getElementById("phone").value);
  avatarValidation(document.getElementById("avatar").files[0]);
  bioValidation(document.getElementById("bio").value);
  hobbiesValidation();
  if (
    !nameValidation(document.getElementById("name").value) ||
    !mailValidation(document.getElementById("email").value) ||
    !passwordValidation(document.getElementById("password").value) ||
    !confirmPasswordValidation() ||
    !ageValidation(document.getElementById("dob").value) ||
    !phoneValidation(document.getElementById("phone").value) ||
    !avatarValidation(document.getElementById("avatar").files[0]) ||
    !bioValidation(document.getElementById("bio").value) ||
    !hobbiesValidation()
  ) {
    event.preventDefault(); // Prevent form submission if validation fails
  } else {
    // If all validations pass, you can submit the form or perform further actions
    alert("Form submitted successfully!");
  }
});

document.getElementById("name").addEventListener("input", function () {
  const name = this.value;
  nameValidation(name);
});

document.getElementById("email").addEventListener("input", function () {
  const email = this.value;
  mailValidation(email);
});

document.getElementById("password").addEventListener("input", function () {
  const password = this.value;
  passwordValidation(password);
});

document
  .getElementById("confirmPassword")
  .addEventListener("input", function () {
    confirmPasswordValidation();
  });

document.getElementById("dob").addEventListener("change", function () {
  const dob = this.value;
  if (dob) {
    ageValidation(dob);
  } else {
    const dobError = document.getElementById("errorBod");
    dobError.textContent = "Please select a date of birth.";
    dobError.style.color = "red";
  }
});

document.getElementById("phone").addEventListener("input", function () {
  const phone = this.value;
  phoneValidation(phone);
});

document.getElementById("avatar").addEventListener("change", function () {
  const file = this.files[0];
  avatarValidation(file);
});

document.getElementById("bio").addEventListener("input", function () {
  const bio = this.value;
  bioValidation(bio);
});
