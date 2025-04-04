console.log("hello from main.ts")
//Getting necessary DOM elements
let addInputBtn = document.getElementById("addInputBtn");
let  getStatusBtn = document.getElementById("getStatusBtn");

let inputContainer = document.getElementById("inputContainer")

//Button event listeners
addInputBtn?.addEventListener("click",()=>{
    console.log("addInputButton clicked")
    let inputBoxStyle = "urlInput border text-xl border-gray-700 rounded-full bg-gray-100 w-90 h-12 block";
    let inputBox = document.createElement("input")
    inputBox.setAttribute("class",inputBoxStyle);
    inputBox.setAttribute("type","text") 
    inputContainer?.appendChild(inputBox);
})

getStatusBtn?.addEventListener('click',()=>{
    console.log("getStatus btn clicked")
    //TODO: find a way to validate user Input 
    let inputElements = document.getElementsByClassName("urlInput");
    console.log("all inputElements", inputElements)
    //map elements to extract textContent

    //@ts-ignore: input element does indeed have a value attribute :)
    let inputUrls = Array.from(inputElements).map((element)=>element.value)
    console.log("values:",inputUrls)
    
})