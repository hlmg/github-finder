const profileElement = document.getElementById('profile');
const searchUserElement = document.getElementById('searchUser');

async function fetchJson(url) {
  const response = await fetch(url);
  return response.json();
}

async function displayProfile(username) {
  const user = await fetchJson(`https://api.github.com/users/${username}`);
  const repos = await fetchJson(`https://api.github.com/users/${username}/repos?per_page=5&sort=created: asc`);

  profileElement.innerHTML = generateProfileHTML(user);
  profileElement.innerHTML += generateReposHTML(repos);
}

function generateProfileHTML(user) {
  return `
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
    <h3 class="page-heading mb-3">Latest Repos</h3>`;
}

function generateReposHTML(repos) {
  return repos.map(repo => `
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
  `).join('');
}

searchUserElement.addEventListener('keyup', (e) => {
  displayProfile(e.target.value);
});
