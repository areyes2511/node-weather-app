
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#m1");
const messageTwo = document.querySelector("#m2");

messageOne.textContent = "";
messageTwo.textContent = "";
//Listener passes in an event object "e"
weatherForm.addEventListener("submit", (e) => {
    //Prevents default behavior to refesh the browser
    e.preventDefault();
    
    messageOne.textContent = "Loading!!";
    messageTwo.textContent = "";

    fetch(`/weather?address=${search.value}`).then((response) => {
        //This function will run when the data arrives and is parsed 
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error;
            }

            messageOne.textContent = data.forecast.temp;
            messageTwo.textContent = data.forecast.temp;
        });
    });
});