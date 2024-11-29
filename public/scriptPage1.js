const collapseButtons = document.getElementsByClassName('name__btn');
const collapseBody = document.getElementById("3");
const url = "https://weblab6-production-2e8e.up.railway.app/create"

const createForm = document.getElementById("4");
createForm.addEventListener('submit',async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    let response = await fetch(url + `?name=${form.get('name')}&text=${form.get('text')}`, {
        method: "GET",
    })
    
    _ = response
})

console.log("script loaded");
