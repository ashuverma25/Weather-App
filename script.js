let input = document.querySelector(".box");
let btn = document.querySelector(".btn");
btn.addEventListener("click",function(){
    let input_text = input.value.trim();
    console.log(input_text);
    input.value="";
})