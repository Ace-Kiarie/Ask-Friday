APIKEY = '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'; 
const PostUrl = 'https://api.openai.com/v1/chat/completions'
const submitBtn = document.querySelector('#submit');
const outPutElement = document.querySelector('#output');
const inputElement = document.querySelector('input');
const historyElement = document.querySelector('.history');
const btnElement = document.querySelector('button');
let loadInterval;

const changeInput = (value) => {
    const inputElement = document.querySelector('input');
    inputElement.value = value
}

// const loaderAnimate = (element) => {
//     element.textContent = "";

//     loadInterval = setInterval(() => {
//         element,textContent += ".";

//         if(element.textContent === '.....'){
//             element.textContent = '';
//         }
//     }, 300)
// }

const getMessage =  async () => {
    const options = {
        method: "POST",
        headers:{
            "Authorization": `Bearer ${APIKEY}`,
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: inputElement.value}],
            max_tokens: 150
        })
    }
    try{
        const response = await fetch(PostUrl, options);
        const data = await response.json();
        outPutElement.textContent = data.choices[0].message.content;
        if(data.choices[0].message.content && inputElement.value) {
            const pElement = document.createElement('p');
            pElement.textContent = inputElement.value;
            pElement.addEventListener('click', () => changeInput( pElement.textContent))
            historyElement.append(pElement);
        }

    } catch (error){
        console.log(error);
    }
}

const getMessageE = (e) => {
    if(e.code === "Enter"){
        getMessage()
    }
}

window.onload = () =>{
    document.addEventListener("keydown", getMessageE);
}

submitBtn.addEventListener('click', getMessage);

const clearInput = () => {
    inputElement.value = "";
}

btnElement.addEventListener('click', clearInput);