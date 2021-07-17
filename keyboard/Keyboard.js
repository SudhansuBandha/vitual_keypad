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

// This function gerts invoked whenever there is change in textarea
const textChange = (val) => {
  output = val;
};

//Object that handles the entire KEYPAD
const Keyboard = {
  //These elements act as major div tag for the keypad
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },
  capsLock: false,
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

      //for line breaks
      const insertLineBreak = ["3", "6", "9", "#"].indexOf(numbers[i]) !== -1;

      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");
      let text = document.createElement("div");
      let presstimer = null;
      let longpress = false;

      switch (numbers[i]) {
        case "*":
          text.innerHTML = numbers[i];
          keyElement.addEventListener("click", () => {
            output = output + text.innerHTML;
            document.getElementById("display").value = output;
          });
          break;

        case "0":
          text.innerHTML = numbers[i] + "<br>" + createIconHTML("space_bar");
          keyElement.addEventListener("click", () => {
            if (presstimer !== null) {
              clearTimeout(presstimer);
              presstimer = null;
            }

            if (!longpress) {
              output = output + text.innerHTML[0];
              document.getElementById("display").value = output;
            } else {
              longpress = false;
            }
          });

          keyElement.addEventListener("mousedown", () => {
            presstimer = setTimeout(() => {
              longpress = true;
              output = output + " ";
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

          break;

        case "#":
          text.innerHTML = numbers[i] + "<br>" + createIconHTML("arrow_upward");

          keyElement.addEventListener("click", () => {
            if (presstimer !== null) {
              clearTimeout(presstimer);
              presstimer = null;
            }

            if (!longpress) {
              output = output + text.innerHTML[0];
              document.getElementById("display").value = output;
            } else {
              longpress = false;
            }
          });

          keyElement.addEventListener("mousedown", () => {
            presstimer = setTimeout(() => {
              longpress = true;
              this._toggleCapsLock();
            }, 1000);
          });

          keyElement.addEventListener("mouseout", () => {
            if (presstimer !== null) {
              clearTimeout(presstimer);

              presstimer = null;
              longpress = false;
            }
          });

          break;

        case "clear":
          text.innerHTML = createIconHTML("keyboard_backspace");

          keyElement.addEventListener("click", () => {
            if (presstimer !== null) {
              clearInterval(presstimer);
              presstimer = null;
            }
            if (!presstimer) {
              output = output.substring(0, output.length - 1);
              document.getElementById("display").value = output;
            } else {
              presstimer = false;
            }
          });

          keyElement.addEventListener("mousedown", () => {
            presstimer = setInterval(() => {
              output = output.substring(0, output.length - 1);
              longpress = true;
              document.getElementById("display").value = output;
            }, 300);
          });

          keyElement.addEventListener("mouseout", () => {
            if (presstimer !== null) {
              clearInterval(presstimer);

              presstimer = null;
              longpress = false;
            }
          });

          break;

        default:
          text.innerHTML = numbers[i] + "<br>" + letters[i];

          let content = text.innerHTML;
          content = content.replace("<br>", "");

          //Operation for CapsLock Turn on/off
          first_char = content[0];

          if (
            first_char != "1" &&
            first_char != "*" &&
            first_char != "0" &&
            first_char != "#" &&
            first_char != "<"
          ) {
            content = content.substring(1, content.length);
            content = this.capsLock
              ? content.toUpperCase()
              : content.toLowerCase();
            content = first_char + content;
          }

          //For LongPress
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

          //For OnClick
          keyElement.addEventListener("click", () => {
            if (presstimer !== null) {
              clearTimeout(presstimer);
              presstimer = null;
            }

            counter++;
            if (!longpress) {
              if (counter == 1) {
                output += this.capsLock
                  ? content[1].toUpperCase()
                  : content[1].toLowerCase();
                document.getElementById("display").value = output;

                setTimeout(() => {
                  counter = 0;
                }, 1500);
              } else if (counter % content.length == 1) {
                output = output
                  .toString()
                  .replace(
                    /.$/,
                    this.capsLock
                      ? content[1].toUpperCase()
                      : content[1].toLowerCase()
                  );
                document.getElementById("display").value = output;
              } else if (counter % content.length == 0) {
                output = output.toString().replace(/.$/, content[0]);
                document.getElementById("display").value = output;
              } else if (counter % content.length == 2) {
                output = output
                  .toString()
                  .replace(
                    /.$/,
                    this.capsLock
                      ? content[2].toUpperCase()
                      : content[2].toLowerCase()
                  );
                document.getElementById("display").value = output;
              } else if (counter % content.length == 3) {
                output = output
                  .toString()
                  .replace(
                    /.$/,
                    this.capsLock
                      ? content[3].toUpperCase()
                      : content[3].toLowerCase()
                  );
                document.getElementById("display").value = output;
              } else {
                output = output
                  .toString()
                  .replace(
                    /.$/,
                    this.capsLock
                      ? content[4].toUpperCase()
                      : content[4].toLowerCase()
                  );
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
  _toggleCapsLock() {
    this.capsLock = !this.capsLock;
    this.elements.keys.forEach((key) => {
      element = key.children[0].innerHTML;
      element = element.replace("<br>", "");
      first_char = element[0];
      if (
        first_char != "1" &&
        first_char != "*" &&
        first_char != "0" &&
        first_char != "#" &&
        first_char != "<"
      ) {
        element = element.substring(1, element.length);
        element = this.capsLock ? element.toUpperCase() : element.toLowerCase();
        key.children[0].innerHTML = first_char + "<br>" + element;
      }
    });
  },
};

window.addEventListener("DOMContentLoaded", () => {
  Keyboard.init();
});
