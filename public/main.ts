

console.log("hello from main.ts");
//Getting necessary DOM elements
let addInputBtn = document.getElementById("addInputBtn");
let getStatusBtn = document.getElementById("getStatusBtn");

let inputContainer = document.getElementById("inputContainer");

//Button event listeners
addInputBtn?.addEventListener("click", () => {
  console.log("addInputButton clicked");
  let inputBoxStyle =
    "urlInput border text-xl border-gray-700 rounded-full bg-gray-100 w-90 h-12 block";
  let inputBox = document.createElement("input");
  inputBox.setAttribute("class", inputBoxStyle);
  inputBox.setAttribute("type", "url");
  inputBox.required = true;
  inputBox.setAttribute("pattern", "https?:\/\/[^\s/$.?#].[^\s]*");
  inputContainer?.appendChild(inputBox);
});

getStatusBtn?.addEventListener("click", async() => {
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
  try{
    let res = await fetchURLS(inputUrls)
    console.log("result after async call ",res)
    console.log("done....")
    
  }
  catch(err){
    console.log("Error in fetchURLs",err)
    alert("something has gone wrong...")
  }
  console.log("out of try-catch...")

});

// function to fetch array of urls
async function fetchURLS(input_urls:string[]){
  console.log("call to fetchURLS...")
  let options = {
      method:'POST',
      headers:{
          'Content-type': 'application/json',
      },
      body:JSON.stringify({
          urls:input_urls
      }),
      //adds 5 second timeout
   
      signal:AbortSignal.timeout(2000),
      
  }
  const vercelHanlderUrl = "https://url-status-checker.vercel.app/api/check-urls"
  const response = await fetch(vercelHanlderUrl,options)
  console.log("status",response.status)
  if (!response.ok){
    if(response.status ==404){
      throw new Error("404 error")
    }
    else if(response.status==500){
      throw new Error("Server error")
    }
    else if(response.status==408){
      throw new Error("Timeout error")
    }
    else{
      throw new Error("Network response was not ok")
    }
  }
  else{
    const data = await response.json()
    console.log("data", data)
    return data
  }
}
