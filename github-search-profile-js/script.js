const API_URL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getUser('florinpop17')

async function getUser(username){
    const resp = await fetch(API_URL + username)
    const respData = await resp.json();

    createUserCard(respData);

    getRepos(username);
}

async function getRepos(username){
    const resp = await fetch(API_URL + username +'/repos')
    const respData = await resp.json();

    addReposToCard(respData);
}

function createUserCard(user){

    const cardHTML = `
    <div class="card">
        <div class="img-container">
            <img class="avatar" src="${user.avatar_url}" alt="${user.name}"/>
        </div>
        <div class="profile-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul class="info">
                <li><strong>Followers:</strong>${user.followers}</li>
                <li><strong>Following:</strong>${user.following}</li>
                <li><strong>Repos:</strong>${user.public_repos}</li>
            </ul>
            <h4>Repos:</h4>
            <div class="repos" id="repos"> </div>
        </div>
    </div>
    `;

    main.innerHTML = cardHTML
}

function addReposToCard(repos){
    const reposEl = document.getElementById('repos');
    
    repos
    .sort((a, b) => b.stargazers_count -a.stargazers_count)
    .slice(0, 11)
    .forEach(repo =>{
        const repoEl = document.createElement('a')
        repoEl.classList.add('repo')

        repoEl.href = repo.html_url;
        repo.target = "_blank"
        repoEl.innerText = repo.name

        reposEl.appendChild(repoEl)
    })
}

form.addEventListener('submit', (e)=> {
    e.preventDefault();
     
    // user pega o valor do input
    const user = search.value

    if(user){
        getUser(user);

        // Reseta o valor do input
        search.value = ""
    }
})