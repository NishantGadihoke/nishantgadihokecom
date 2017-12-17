var app = angular.module('mainApp', ['ui.router', 'ngAnimate']);

app.run(function ($rootScope, $state, $window, $location) {
	$rootScope.$on("$stateChangeSuccess", function (event, currentState, previousState) {
		window.scrollTo(0, 0);
	});
});

app.filter("trust", function($sce) {
	return function (htmlCode){
		return $sce.trustAsHtml(htmlCode);
	};
});

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

	$stateProvider
	.state('home', {
		url: '/',
	  	templateUrl: 'home.html',
	})
    .state('press', {
		url: '/press',
	  	templateUrl: 'press.html',
        cache: false,
	  	controller: 'pressController'
	})
    .state('work', {
		url: '/work/:project',
		templateUrl: function (attrs) { return 'work/' + attrs.project + '.html'; },
		controller: 'workController'
	})

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
});

app.controller('randomProjectController', function ($scope, $sce, Projects) {
	$scope.projects = Projects.getList();
    $scope.randomProject = $scope.projects[Math.floor(Math.random() * ($scope.projects.length - 1))];
});

app.controller('projectListController', function ($scope, $sce, Projects) {
	$scope.projects = Projects.getList();
});

app.controller('workController', function ($scope, $sce, Projects) {

});



app.controller('pressController', function ($scope, $sce) {

});

app.service('Projects', function ($stateParams) {
	return {
		getList: function () {
			var projectList = [
				{
					id: 1,
					name: "agastya",
					title: "Agastya",
					roleList: [ "interaction design", "development" ],
					role: "Interaction Design &amp; Development",
                    intro: "A widget that can make any website accessible.",
                    color: "#6BB9F0"
				},
				{
					id: 2,
					name: "minet",
					title: "MINET X",
					roleList: [ "interaction design" , "development", "branding" ],
					role: "Interaction Design & Development",
                    intro: "Delhi-NCR&rsquo;s premier technology event.",
                    color: "#6699ee"

				},
				{
					id: 3,
					name: "shravan",
					title: "Shravan",
					roleList: [ "interaction design", "OS development" ],
					role: "Interaction Design",
                    intro: "The world&rsquo;s first end-to-end accessible smartphone.",
                    color: "#3B4CA5"

				},
				{
					id: 4,
					name: "indikala",
					title: "Indikala",
					roleList: [ "branding", "graphic design" ],
					role: "Branding",
                    intro: "Asia&rsquo;s favourite shop for Indian handicrafts.",
                    color: "#ebdead"

				},
				{
					id: 5,
                    name: "project_element",
					title: "Project Element",
					roleList: [ "interaction design", "development", "branding" ],
					role: "Interaction Design &amp; Development",
                    intro: "An initiative to help students find their passion.",
                    color: "#C2A96B"

				},
                {
					id: 6,
                    name: "baymax",
					title: "Baymax",
					roleList: [ "interaction design", "app development" ],
					role: "Interaction Design &amp; Development",
                    intro: "A personal healthcare companion for everyone.",
                    color: "#9B844C"
				},
                {
					id: 7,
					name: "naari",
					title: "Naari",
					roleList: [ "interaction design", "app development" ],
					role: "Interaction Design &amp; Development",
                    intro: "An end-to-end period healthcare companion.",
                    color: "#E26A6A"

				},
                {
					id: 8,
					name: "bharathacks",
					title: "Bharathacks",
					roleList: [ "branding", "development" ],
					role: "Branding &amp; Development",
                    intro: "North India&rsquo;s largest hackathon.",
                    color: "#C53F46"

				},
                {
					id: 9,
					name: "safai",
					title: "Saf.ai",
					roleList: [ "research", "app development" ],
					role: "Research &amp; Development",
                    intro: "An app to help you clean, using AI.",
                    color: "#B22F23"

				},
                {
					id: 10,
					name: "apollo",
					title: "Apollo",
					roleList: [ "interaction design", "chatbot development" ],
					role: "Interaction Design &amp; Development",
                    intro: "A chatbot for all your travel-related needs.",
                    color: "#2ecc71"

				},
                {
					id: 11,
					name: "a4e",
					title: "Art4Education",
					roleList: [ "branding", "development" ],
					role: "Branding &amp; Development",
                    intro: "A non-profit raising funds through art and design.",
                    color: "#1abc9c"

				},
                {
					id: 12,
					name: "bira",
					title: "Bira",
					roleList: [ "product design" ],
					role: "Product Design",
                    intro: "Currently in progress.",
                    color: "#aaa",
					disabled: true
				},
			];
			for (i = 0; i < projectList.length; i++) {
				if (!projectList[i].preview) {
					projectList[i].preview = '/assets/img/projects/' + projectList[i].name + "/preview.png";
                    projectList[i].highlight = '/assets/img/projects/' + projectList[i].name + "/highlight.png";
				}
				if (!projectList[i].url) {
					projectList[i].url = '/work/' + projectList[i].name;
				}
			}
			return projectList;
		}
	};
});

$(window).on("load", function() {
	$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
		console.log(123)
	    if (
	        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
	        location.hostname == this.hostname
	    ) {
	        var target = $(this.hash);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	        if (target.length) {
	            event.preventDefault();
	            $('html, body').animate({
	                scrollTop: target.offset().top
	            }, 1000);
	        }
	    }
	});
});
