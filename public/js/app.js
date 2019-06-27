

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//     response.json().then((data) => {
//         console.log(data);    
//     });    
// });



const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#m1");
const messageTwo = document.querySelector("#m2");

messageOne.textContent = "";
messageTwo.textContent = "";

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    messageOne.textContent = "Loading!!";
    messageTwo.textContent = "";

    fetch(`http://localhost:3000/weather?address=${search.value}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            return messageOne.textContent = data.error;
        }

        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast.temp;
    });
});
});