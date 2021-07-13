// selecting the corresponding ids from admin.ejs
let createForm = document.querySelector('.create-post-form');
let createTitle = document.querySelector('#create-title');
let createCountry = document.querySelector('#create-country');
let createImageURL = document.querySelector('#create-image-url');
let createCost = document.querySelector('#create-cost');
let createText = document.querySelector('#create-text');  

createForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let text = createText.value;

    fetch('/posts', {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            title : createTitle.value,
            country: createCountry.value,
            imageURL : createImageURL.value,
            cost:createCost.value,
            text:text,
            description: text.substring(0,100)+'.... '  // To take first 100 letters of the text string and adding it to description
        })
    }).then((response) => response.text()).then((data) => window.history.go()); // window.history.go() automatically reloads and adds newly added data to admin page
})
