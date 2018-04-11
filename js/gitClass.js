class Git {

    constructor() {
        this.bindEvents();
        this.myChart;
    }

    // fetch repos
    fetchRepos(user) {
        let self = this;
        $("#repo-list").html('');

        let users = new Users();
        // need a full_name and description
        users.getUserRepos(user, repos => {
            // display repos using full name, description and link
            if (repos.length == 0) {

                // just using alert() to avoid additional implementation of modal boxes. 
                alert("No User found or User doesn't have any repositories! Please try again.");
                return false;
            }
            self.displayRepos(repos);
        });
    }
    // display repos
    displayRepos(repos) {
        // build html for each repo
        let self = this;
        let html = "";

        for (let obj in repos) {
            let repo = repos[obj];
            html += "<li class='m2'>";
            html += "<a class='block' data-name='" + repo.full_name + "'>" + repo.full_name + "</a>";
            html += "</li>";
        } 
        
        $("#repo-list").html(html);
        self.bindClickEvents();
    }
    // fetch contibutors
    fetchContributors(name) {
        let self = this;
        // fetch contributors by passing full name parameter
        let repos = new Repos();
        repos.getContributors(name, contributors => {
           
            let data = [];
            let labels = [];
            for (let obj in contributors) {
                let c = contributors[obj];

                data.push(c.contributions);
                labels.push(c.login);

            }
            let dataset = {
                label: "Contributions",
                data: data
            };
            self.drawGraph(dataset, labels)
        });
    }
    // draw graph
    drawGraph(dataset, labels) {
        let self = this;
        let ctx = $("#myChart");  

        // simple chartjs bar chart
        
        // make sure that only one instance of the chart exist
        if (typeof self.myChart == 'object') {
            self.myChart.clear();
            self.myChart.destroy();
        }  

        self.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [dataset]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });

        self.openModal();
    }
    // binds
    bindEvents() {
        let self = this;

        // bind search button
        $('.btn-search').bind("click", function() {
            let user = $('.search').val().trim().toLowerCase();
            if ( user != "") {
                self.fetchRepos(user);
            }
        });

        // bind modal events
        $('span.close').bind("click", function(){
            self.closeModal();
        });
        
    }

    // bind events for the list of repos
    bindClickEvents() {
        let self = this;
        $('#repo-list a').unbind("click").bind("click", function() {
            let name = $(this).attr("data-name");
            self.fetchContributors(name);
        });
    }

    // modal box methods
    openModal() {
        $('.modal').css('display', 'block');
    }

    closeModal() {
        $('.modal').css('display', 'none');
    }
}