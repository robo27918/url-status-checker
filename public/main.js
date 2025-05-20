"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("hello from main.ts");
//Getting necessary DOM elements
let addInputBtn = document.getElementById("addInputBtn");
let getStatusBtn = document.getElementById("getStatusBtn");
let inputContainer = document.getElementById("inputContainer");
//Button event listeners
addInputBtn === null || addInputBtn === void 0 ? void 0 : addInputBtn.addEventListener("click", () => {
    console.log("addInputButton clicked");
    let inputBoxStyle = "urlInput border text-xl border-gray-700 rounded-full bg-gray-100 w-90 h-12 block";
    let inputBox = document.createElement("input");
    inputBox.setAttribute("class", inputBoxStyle);
    inputBox.setAttribute("type", "url");
    inputBox.required = true;
    inputBox.setAttribute("pattern", "https?:\/\/[^\s/$.?#].[^\s]*");
    inputContainer === null || inputContainer === void 0 ? void 0 : inputContainer.appendChild(inputBox);
});
getStatusBtn === null || getStatusBtn === void 0 ? void 0 : getStatusBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
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
    console.log("values from inputUrls:", inputUrls);
    console.log("before try-catch");
    let res = null;
    try {
        res = yield fetchURLS(inputUrls);
        // //TODO: handle all the inputs
    }
    catch (err) {
        console.log("Error in fetchURLs", err);
        alert("something has gone wrong...");
    }
    console.log("out of try-catch...");
    if (res != null) {
        res.forEach((element) => {
            addTableRow(element);
        });
    }
    console.log("at end of function body...");
}));
// function to fetch array of urls
function fetchURLS(input_urls) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("call to fetchURLS...");
        let options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                urls: input_urls
            }),
            //adds 5 second timeout
            signal: AbortSignal.timeout(2000),
        };
        const vercelHanlderUrl = "https://url-status-checker.vercel.app/api/check-urls";
        const response = yield fetch(vercelHanlderUrl, options);
        // console.log("status",response.status)
        if (!response.ok) {
            if (response.status == 404) {
                throw new Error("404 error");
            }
            else if (response.status == 500) {
                throw new Error("Server error");
            }
            else if (response.status == 408) {
                throw new Error("Timeout error");
            }
            else {
                throw new Error("Network response was not ok");
            }
        }
        else {
            const data = yield response.json();
            return data;
        }
    });
}
function addTableRow(data) {
    console.log("called addTableRow");
    let tableBody = document.getElementById("urlTable");
    let newRow = document.createElement("tr");
    newRow.className = "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600";
    let col1 = document.createElement('td');
    let div1 = document.createElement('div'); // div for styling purposes
    let div1Inner = document.createElement('div');
    col1.className = "flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white";
    div1.className = "ps-3";
    div1Inner.className = "text-xl font-semibold";
    div1Inner.textContent = data.url;
    div1.appendChild(div1Inner);
    col1.appendChild(div1);
    let col2 = document.createElement('td');
    col2.className = "text-xl px-6 py-4";
    col2.textContent = data.status;
    let col3 = document.createElement('td');
    col3.className = "px-6 py-4";
    let div3 = document.createElement('div');
    div3.className = "flex items-center";
    let div3Inner = document.createElement('div');
    div3Inner.className = "h-2.5 w-2.5 rounded-full bg-green-500 me-2";
    div3.appendChild(div3Inner);
    col3.appendChild(div3);
    newRow.appendChild(col1);
    newRow.appendChild(col2);
    newRow.appendChild(col3);
    tableBody === null || tableBody === void 0 ? void 0 : tableBody.appendChild(newRow);
    console.log("should have added new row....");
}
