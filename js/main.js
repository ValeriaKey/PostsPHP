let id = null;

async function getPosts() {
    let res = await fetch('https://kolossova20.thkit.ee/PhpJson/posts');
    let posts = await res.json();

    document.querySelector('.post-list').innerHTML = '';
    
    posts.forEach((post) => {
        document.querySelector('.post-list').innerHTML += 
        `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">
                    ${post.title}
                </h5>
                <p class="card-text">
                    ${post.body}
                </p>
                <a href="#" class="btn btn-outline-danger btn-block" onclick="removePost(${post.id})">
                    Delete
                </a>
            </div>
        </div>
        `;
    });

}

async function addPost() {
    console.log('addPost()');
    let title = document.getElementById('title').value,
    body = document.getElementById('body').value;
    
    
    let formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);

    const res = await fetch('https://kolossova20.thkit.ee/PhpJson/posts', {
        method: 'POST',
        body: formData
    });

    const data = await res.json();

    if(data.status === true) {
        await getPosts();
        document.getElementById('title').value = "",
        document.getElementById('body').value = ""
        
    }
}


async function removePost(id) {
    const res = await fetch(`https://kolossova20.thkit.ee/PhpJson/posts/${id}`, {
     method: 'DELETE'
    }); 
    const data = await res.json();

    if(data.status === true) {
        await getPosts();
        
    }  
}

getPosts();