const collapseButtons = document.getElementsByClassName('name__btn');
const collapseBody = document.getElementById("3");
const collapseText = document.getElementById("6");
const url = "http://127.0.0.1:5000/getall"


function synchronousRequest(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    if (xhr.status === 200) {
       return xhr.responseText;
    } else {
       throw new Error('Request failed: ' + xhr.statusText);
    }
}

let list = JSON.parse(synchronousRequest(url));
console.log(list);

function redrawButtons() {
    const collapseHeader = document.getElementById("5");
    collapseHeader.innerHTML = ''
    for (const i in list) {
        const x = document.createElement("button");
        x.textContent = list[i].name;
        x.classList.add("name__btn");
        x.id = `button` + i;
        x.addEventListener('click', () => {
            if (collapseText.textContent === list[i].text) {
                if (collapseBody.classList.contains("hidden")) {
                    collapseBody.classList.remove("hidden");
                } else {
                    collapseBody.classList.add("hidden")
                }
            } else {
                collapseText.textContent = list[i].text;
                collapseBody.classList.remove("hidden");
            }
 
            } 
        )
        if (collapseHeader.children[i]) {
            collapseHeader.replaceChild(collapseHeader.children[i], x)
        }
        collapseHeader.appendChild(x);
    }
}

redrawButtons();
const eventSource = new EventSource("http://127.0.0.1:5000/sse")

eventSource.onopen = (event) => {
    console.log("connection established")
}

eventSource.onmessage = (event) => {
    try {
        const data = JSON.parse(event.data);
        console.log(data)
        list = data
        redrawButtons()
    } catch {
    }
}

eventSource.onerror = (event) => {
    console.log(`Error happened with eventsource: `, event)
}

// for (let i = 0; i < collapseButtons.length; i++) {
//     const collapseButton = collapseButtons[i];
//     collapseButton.addEventListener("click", () => {
//         collapseBody.textContent = list[i].text;
//         if (collapseBody.classList.contains("hidden")) {
//             collapseBody.classList.remove("hidden");
//         } else {
//             collapseBody.classList.add("hidden")
//         }
//     })
// }

const textField = document.getElementById("1");
console.log("script loaded");
