let numbers = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "*",
  "0",
  "#",
  "clear",
];
let letters = [
  ".,!",
  "abc",
  "def",
  "ghi",
  "jkl",
  "mno",
  "pqrs",
  "tuv",
  "wxyz",
  "+",
  "space",
  "upward",
];
let output = "";
const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },
  properties: {
    value: null,
    capsLock: false,
  },
  init() {
    // Create Main Elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");
    this.elements.keysContainer.appendChild(this._createKeys());

    // Setup Main Elements
    this.elements.main.classList.add("keyboard");
    this.elements.keysContainer.classList.add("keyboard__keys");

    // Store information of all the keys in an array
    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard__key");

    //Add to the DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
  },
  _createKeys() {
    const fragment = document.createDocumentFragment();

    //Create an icon for HTML
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    for (i = 0; i <= 12; i++) {
      let counter = 0;
      const keyElement = document.createElement("button");
      const insertLineBreak = ["3", "6", "9", "#"].indexOf(numbers[i]) !== -1;

      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");
      let text = document.createElement("div");

      switch (numbers[i]) {
        case "*":
          text.innerHTML = numbers[i];
          keyElement.addEventListener("click", () => {
            output = output + text.innerHTML;
            document.getElementById("display").value = output;
          });
          break;

        case "0":
          text.innerHTML = numbers[i];
          keyElement.addEventListener("click", () => {
            output = output + text.innerHTML;
            document.getElementById("display").value = output;
          });
          break;

        case "#":
          text.innerHTML = numbers[i];
          keyElement.addEventListener("click", () => {
            output = output + text.innerHTML;
            document.getElementById("display").value = output;
          });
          break;

        case "clear":
          text.innerHTML = createIconHTML("keyboard_backspace");

          keyElement.addEventListener("click", () => {
            output = output.substring(0, output.length - 1);
            document.getElementById("display").value = output;
          });

          break;

        default:
          text.innerHTML = numbers[i] + "<br>" + letters[i];
          let presstimer = null;
          let longpress = false;
          let content = text.innerHTML;
          content = content.replace("<br>", "");

          keyElement.addEventListener("mousedown", () => {
            presstimer = setTimeout(() => {
              output += content[0];
              longpress = true;
              document.getElementById("display").value = output;
            }, 1000);
          });

          keyElement.addEventListener("mouseout", () => {
            if (presstimer !== null) {
              clearTimeout(presstimer);

              presstimer = null;
              longpress = false;
            }
          });

          keyElement.addEventListener("click", () => {
            if (presstimer !== null) {
              clearTimeout(presstimer);
              presstimer = null;
            }
            console.log(longpress);
            counter++;
            if (!longpress) {
              if (counter == 1) {
                output += content[1];
                document.getElementById("display").value = output;
                setTimeout(() => {
                  counter = 0;
                }, 1500);
              } else if (counter % content.length == 1) {
                output = output.toString().replace(/.$/, content[1]);
                document.getElementById("display").value = output;
              } else if (counter % content.length == 0) {
                output = output.toString().replace(/.$/, content[0]);
                document.getElementById("display").value = output;
              } else if (counter % content.length == 2) {
                output = output.toString().replace(/.$/, content[2]);
                document.getElementById("display").value = output;
              } else if (counter % content.length == 3) {
                output = output.toString().replace(/.$/, content[3]);
                document.getElementById("display").value = output;
              } else {
                output = output.toString().replace(/.$/, content[4]);
                document.getElementById("display").value = output;
              }
            } else {
              longpress = false;
              counter = 0;
            }
          });

          break;
      }

      keyElement.appendChild(text);

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    }

    return fragment;
  },
};

window.addEventListener("DOMContentLoaded", () => {
  Keyboard.init();
});
