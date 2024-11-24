const collapseButtons = document.getElementsByClassName('name__btn');
const collapseBody = document.getElementById("3");
const url = "http://127.0.0.1:5000/create"

const createForm = document.getElementById("4");
createForm.addEventListener('submit',async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    let response = await fetch(url + `?name=${form.get('name')}&text=${form.get('text')}`, {
        method: "GET",
    })
})

console.log("script loaded");
