let input = document.querySelector(".box");
let btn = document.querySelector(".btn");
btn.addEventListener("click",function(){
    let input_text = input.value.trim();
    console.log(input_text);


    //api call
    const api_data = ()=> {
        async function fn() {
        console.log("Inside function");
        const response = await fetch(
          "https://api.weatherapi.com/v1/current.json?key=c7236d36debb4636a18170654262201&q=pune&aqi=no",
        );
        console.log(response);
        const jsonData = await response.json();
        console.log("Bottom of fn")

      }

    }

    api_data();






    //dom update
    input.value="";
})