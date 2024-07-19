let optionButton = document.querySelectorAll(".option-button");
let advanceOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSize = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButton = document.querySelectorAll(".align");
let spacingButton = document.querySelectorAll(".spacing");
let formatButton = document.querySelectorAll(".format");
let scriptButton = document.querySelectorAll(".script");

let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive"
];

const initializer = () => {
    Highlighter(alignButton, true);
    Highlighter(spacingButton, true);
    Highlighter(formatButton, false);
    Highlighter(scriptButton, true);

    fontList.map(value => {
        let option = document.createElement("option")
        option.value = value
        option.innerHTML = value
        fontName.appendChild(option)
    })

    for (let i = 0; i <= 7; i++) {
        let option = document.createElement("option")
        option.value = i
        option.innerHTML = i
        fontSize.appendChild(option)
    }

    fontSize.value = 3

    const modifyText = (command, defaultUi, value) => {
        document.execCommand(command, defaultUi, value)
    }

    optionButton.forEach(button => {
        button.addEventListener("click", () => {
            modifyText(button.id, false, null)
        })
    })

    advanceOptionButton.forEach((button) => {
        button.addEventListener("change", () => {
            modifyText(button.id, false, button.value)
        })
    })


    // link 
    linkButton.addEventListener("click", () => {
        let userLink = prompt("Enter a URL")
        if (/http/i.test(userLink)) {
            modifyText(linkButton.id, false, userLink)
        }
        else {
            userLink = "http://" + userLink
            modifyText(linkButton.id, false, userLink)
        }
    })
};

const Highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if (needsRemoval) {
                let alreadyActive = false;

                if (button.classList.contains("active")) {
                    alreadyActive = true;
                }
                HighlighterRemover(className);
                if (!alreadyActive) {
                    button.classList.add("active");
                }
            } else {
                button.classList.toggle("active");
            }
        });
    });
};

const HighlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};


window.onload = initializer;
