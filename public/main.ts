console.log("hello from main.ts")
let addInputBtn = document.getElementById("addInputBtn");
let inputContainer = document.getElementById("inputContainer")
addInputBtn?.addEventListener("click",()=>{
    let inputBoxStyle = "border text-xl border-gray-700 rounded-full bg-gray-100 w-90 h-12 block";
    let inputBox = document.createElement("input")
    inputBox.setAttribute("class",inputBoxStyle);
    inputBox.setAttribute("type","text") 
    inputContainer?.appendChild(inputBox);
})