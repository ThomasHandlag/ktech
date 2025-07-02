document.getElementById("inputRegex").addEventListener("input", function () {
  const input = this.value;
  // validate only numbers and operators
  const regex = /^[0-9+\-*/().\s]*$/;
  if (!regex.test(input)) {
    this.value = input.replace(/[^0-9+\-*/().\s]/g, "");
  }
});

const calculate = () => {
  const input = document.getElementById("inputRegex").value;
  try {
    // Evaluate the expression safely
    const result = eval(input);
    document.getElementById("result").innerText = `Result: ${result}`;
  } catch (error) {
    document.getElementById("result").innerText = "Error: Invalid expression";
  }
};
