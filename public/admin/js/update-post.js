// selecting the corresponding ids from admin.ejs

{
    let articlesBlock = document.querySelector('.articles');
    let updateForm = document.querySelector('.update-post-form');
    let titleInp = document.querySelector('#update-title');
    let updateCountry = document.querySelector('#update-country');
    let updateCost = document.querySelector('#update-cost');
    let textArea = document.querySelector('#update-text');
    let id;

    articlesBlock.addEventListener('click', async function(e){
        if(e.target.classList.contains('btn-edit')){
            id = e.target.parentNode.parentNode.querySelector('.id').value;
            let postInfo =await fetch('/posts/'+id)
                        .then((resp)=>resp.json())
                        .then((data)=>data)
            
            titleInp.value = postInfo.title;
            updateCountry.value = postInfo.country;
            updateCost.value = postInfo.cost;
            textArea.value = postInfo.text;

            let articlesTab = document.getElementById('v-pills-articles');
            articlesTab.classList.remove('show');
            articlesTab.classList.remove('active');
            let updateTab = document.getElementById('v-pills-update-post');
            updateTab.classList.add('show');
            updateTab.classList.add('active');
       }
    })
    updateForm.addEventListener('submit',function(e){
        e.preventDefault();
        fetch('/posts/'+id ,{
            method:'PUT',
            headers:{
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({
                title : titleInp.value,
                text : textArea.value,
                cost: updateCost.value,
                country : updateCountry.value,
                description: textArea.value.substring(0,100)+'...'
            })
        }).then((resp)=>resp.text())
        .then(()=>window.history.go());
    })

}