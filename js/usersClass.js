class Users {
    // get list of repositories for given user name
    getUserRepos(name, callback) {
        $.getJSON("https://api.github.com/users/" + name + "/repos", function(data) {
            console.log("data", data);
            callback(data);
        });
    }
}