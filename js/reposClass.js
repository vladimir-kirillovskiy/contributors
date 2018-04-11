class Repos {
    // get list of all contributers 
    getContributors(name, callback) {
        $.getJSON("https://api.github.com/repos/" + name + "/contributors", function(data) {
            callback(data);
        });
    }
}