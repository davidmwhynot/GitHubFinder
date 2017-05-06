$(document).ready(function() {
  $('#searchUser').on('keyup', function(e) {
    var username = e.target.value

    // make request to Github

    $.ajax({
      url: 'https://api.github.com/users/' + username,
      data: {
        client_id: 'f660b58c843e714abcba',
        client_secret: '3e73b1dfecc170dbd7c52dd7336f617819df052c'
      }
    }).done(function(user) { // some ES6??? shit goin on here figure out wtf that is
      $.ajax({
        url: 'https://api.github.com/users/' + username + '/repos',
        data: {
          client_id: 'f660b58c843e714abcba',
          client_secret: '3e73b1dfecc170dbd7c52dd7336f617819df052c',
          sort: 'created: asc'
        }
      }).done(function(repos) {
        $.each(repos, function(index, repo) {
          $('#repos').append(`
            <div class="well">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${repo.description}
                </div>
                <div class="col-md-3">
                  <span class="label label-default">Forks: ${repo.forks_count}</span>
                  <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                  <span class="label label-success">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-default">View Repo</a>
                </div>
              </div>
            </div>
            `);
        });
      });
      $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img src="${user.avatar_url}" class="thumbnail avatar">
                <a target="_blank" class="btn btn-primary" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-9">
                <span class="label label-default">Public Repos: ${user.public_repos}</span>
                <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                <span class="label label-success">Followers: ${user.followers}</span>
                <span class="label label-info">Following: ${user.following}</span>
                <br>
                <br>
                <ul class="list-group">
                  <li class="list-group-item">Company: ${user.company}</li>
                  <li class="list-group-item">Website/blog: ${user.blog}</li>
                  <li class="list-group-item">Location: ${user.location}</li>
                  <li class="list-group-item">Member Since: ${user.created_at}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>
        `)
    });
  });
});
