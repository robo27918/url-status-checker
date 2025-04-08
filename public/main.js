"use strict";
console.log("hello from main.ts");
//Getting necessary DOM elements
let addInputBtn = document.getElementById("addInputBtn");
let getStatusBtn = document.getElementById("getStatusBtn");
let inputContainer = document.getElementById("inputContainer");
//Button event listeners
addInputBtn === null || addInputBtn === void 0 ? void 0 : addInputBtn.addEventListener("click", () => {
    console.log("addInputButton clicked");
    let inputBoxStyle = "urlInput text-center border text-xl border-gray-700 rounded-full bg-gray-100 w-90 h-12 block";
    let inputBox = document.createElement("input");
    inputBox.setAttribute("class", inputBoxStyle);
    inputBox.setAttribute("type", "url");
    inputBox.required = true;
    inputBox.setAttribute("pattern", "https?:\/\/[^\s/$.?#].[^\s]*");
    inputContainer === null || inputContainer === void 0 ? void 0 : inputContainer.appendChild(inputBox);
});
getStatusBtn === null || getStatusBtn === void 0 ? void 0 : getStatusBtn.addEventListener("click", () => {
    console.log("getStatus btn clicked");
    //TODO: find a way to validate user Input
    let inputElements = document.getElementsByClassName("urlInput");
    console.log("all inputElements", inputElements);
    //Implement Client-side validation
    for (let i = 0; i < inputElements.length; i++) {
        //@ts-ignore
        if (!inputElements[i].checkValidity()) {
            //@ts-ignore
            alert(`URL: ${inputElements[i].value} has invalid format`);
            return;
        }
    }
    //@ts-ignore: input element does indeed have a value attribute :)
    let inputUrls = Array.from(inputElements).map((element) => element.value);
    console.log("values:", inputUrls);
});
// function to fetch array of urls
async function fetchURLS(input_urls){
        options = {
            method:'POST',
            headers:{
                'Content-type': 'application/json',
            },
            body:JSON.stringify({
                urls:input_urls
            }),
        }
        const vercelHanlderUrl = "https://url-status-checker.vercel.app/check-urls.js"
        const data = await(vercelHanlderUrl,options)
        
    }
