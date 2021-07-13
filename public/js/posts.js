// For Displaying posts on Client side

async function getPosts(){
    return await fetch('/posts')
                    .then((response)=> response.json())
                    .then((data)=> data);
}