const inputText = document.getElementById("input");
const paraEl = document.getElementById("para");
const meaningcontainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");


inputText.addEventListener("keyup", (e) => {
    // console.log(e.target.value);
    // console.log(e.key);

    if(e.target.value && e.key === "Enter"){
        fetchAPI(e.target.value)
    }
})


async function fetchAPI(word){
    try {
        paraEl.innerText = `Searching the meaning of the ${word}`;
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        paraEl.style.display = "none";
        // console.log(data);
        if(data.title){
            meaningcontainerEl.style.display = "block";
            titleEl.innerText = word;
            meaningEl.innerText = "N/A";
            audioEl.style.display = "none";
        }else{
            paraEl.style.display = "none";
            meaningcontainerEl.style.display = "block";
            titleEl.innerText = data[0].word; 
            meaningEl.innerText = data[0].meanings[0].definitions[0].definition;
            audioEl.src = data[0].phonetics[0].audio;
    }
    

    } catch (error) {
        paraEl.innerText = "An error happend, try again later"
    }
}