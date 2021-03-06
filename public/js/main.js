// File for Main Page of website
// The articles are displayed in following format

let callMeForm = document.querySelector('.call-me-form');

document.addEventListener('DOMContentLoaded',async function(){
    let posts = await getPosts();
    let articles = document.querySelector('.articles');
    articles.innerHTML='';
    posts.forEach((post)=> {
        let postHTML = `
        <div class="col-lg-4 col-xs-12 col-sm-12 col-md-6  mt20">
            <div class="card effects">
                <img src="${post.imageURL}" alt="${post.title}" class="card-img">
                <div class="card-body">
                    <h4>${post.title}</h4>
                    <p class="card-text">${post.description}</p>
                    <a href="/sight?id=${post.id}" class="btn btn-primary">Details</a>
                </div>
            </div>
        </div>`
        articles.insertAdjacentHTML('beforeend',postHTML);
    })
});


// For the call back requests
callMeForm.addEventListener('submit',function(e) {
    e.preventDefault();
    let phoneInp = callMeForm.querySelector('input');
    fetch('/callback-requests' ,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            phoneNumber: phoneInp.value
        })
    }).then((resp) =>resp.text()).then(() => alert('We will call you back asap'));
})
