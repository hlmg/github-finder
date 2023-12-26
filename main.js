const profileEl = document.getElementById('profile');
const searchUserEl = document.getElementById('searchUser');

function getProfile(user) {
  return fetch(`https://api.github.com/users/${user}`)
}

function getRepos(user) {
  return fetch(`https://api.github.com/users/${user}/repos?per_page=5&sort=desc`)
}

async function findProfile(username) {
  const user = await getProfile(username)
    .then(data => data.json());

  profileEl.innerHTML = `
  <div class="card card-body mb-3">
    <div class="row">
      <div class="col-md-3">
        <img class="img-fluid mb-2" src="${user.avatar_url}">
        <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
      </div>
      <div class="col-md-9">
        <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
        <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
        <span class="badge badge-success">Followers: ${user.followers}</span>
        <span class="badge badge-info">Following: ${user.following}</span>
        <br><br>
        <ul class="list-group">
          <li class="list-group-item">Company: ${user.company}</li>
          <li class="list-group-item">Website/Blog: ${user.blog}</li>
          <li class="list-group-item">Location: ${user.location}</li>
          <li class="list-group-item">Member Since: ${user.created_at}</li>
        </ul>
      </div>
    </div>
  </div>
  <h3 class="page-heading mb-3">Latest Repos</h3>
  <div id="repos"></div>`;

  const reposEl = document.getElementById('repos');
  const repos = await getRepos(username)
    .then(data => data.json());


  repos.forEach(repo => {
    reposEl.innerHTML += `
      <div class="card card-body mb-2">
        <div class="row">
          <div class="col-md-6">
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          </div>
          <div class="col-md-6">
          <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
          <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
          <span class="badge badge-success">Forks: ${repo.forms_count}</span>
          </div>
        </div>
      </div>
    `
  })
}

searchUserEl.addEventListener('keyup', (e) => {
  findProfile(e.target.value);
})
