/*global $ APIKEY*/
$(document).ready(function() {
	$.ajax({
		method: "GET",
		url: "https://newsapi.org/v2/sources",
		data: {
			category: "business",
			country: "us",
			language: "en",
			apiKey: APIKEY
		},
		success: function(data) {
			if (data.status == "ok") {
				console.log(data);
				for (var i = 0; i < data.sources.length; i++) {
					var source = document.createElement("OPTION");
					source.setAttribute("value", data.sources[i].id)
					source.innerHTML = data.sources[i].name;
					document.getElementById('selection').appendChild(source);
				}
			}
		}
	})
	$('#source').submit(function(event) {
		event.preventDefault();
		// alert(document.getElementById("selection").value);
		$.ajax({
			method: "GET",
			url: "https://newsapi.org/v2/top-headlines",
			data: {
				sources: document.getElementById('selection').value,
				apiKey: APIKEY
			},
			success: function(headseeker) {
				if (headseeker.status == "ok") {
					console.log(headseeker);
					for (var i = 0; i < headseeker.articles.length; i++) {
						var headlinesPlease = document.createElement("DIV");
						headlinesPlease.innerHTML = headseeker.articles[i].title;
						var descrip = document.createElement("P");
						descrip.innerHTML = headseeker.articles[i].description;
						document.getElementById('source').appendChild(headlinesPlease);
						document.getElementById('source').appendChild(descrip);
					}
				}
			}
		})
	});
})