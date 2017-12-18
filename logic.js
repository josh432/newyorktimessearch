//Variables
//search parameters
var authKey 	= 'b4496cb9f412477a900745d0d4dfd3c3';
var queryTerm 	= 0;
var numResults	 = 0;
var startYear 	= 0;
var endYear 	= 0;
var urlBase 	= "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;
var articleCounter  = 0;
//Functions

function runQuery(numArticles, queryURL) {
	//Ajax function
	$.ajax({url: queryURL, method: "GET"})
		.done(function(NYTdata){
			//clear well from previous search
			$('#wellSection').empty();

			for (var i = 0; i < numArticles; i++) {
				
				console.log(NYTdata.response.docs[i].headline.main);
				console.log(NYTdata.response.docs[i].section_name);
				console.log(NYTdata.response.docs[i].pub_date);
				console.log(NYTdata.response.docs[i].byline.original);
				console.log(NYTdata.response.docs[i].web_url);

				//start dumping to HTML here
				var wellSection = $('<div>');
				wellSection.addClass("well");
				wellSection.attr('id', 'articleWell-' + i);
				$('#wellSection').append(wellSection);

				//check if things exist
			//	if(NYTdata.response.docs[i].headline != 'null') {
			//		console.log(NYTdata.repsonse.docs[i].headline.main);
			//		$('#articleWell-' + i).append("<h3>" + NYTdata.response.docs[i].headline.main + "</h3>");
			//	}

			//	if (NYTdata.response.docs[i].byline && NYTdata.response.docs[i].byline.hasOwnProperty('original')) {
			//		console.log(NYTdata.response.docs[i].byline.original);
			//	}
				//attach content to appropriate well
				$('#articleWell-' + i).append("<h3>" + NYTdata.response.docs[i].headline.main + "</h3>")
				$('#articleWell-' + i).append("<h5>" + NYTdata.response.docs[i].section_name + "</h5>")
				$('#articleWell-' + i).append("<h5>" + NYTdata.response.docs[i].pub_date + "</h5>")
				$('#articleWell-' + i).append("<h5>" + NYTdata.response.docs[i].byline.original + "</h5>")
				$('#articleWell-' + i).append("<a href=" + NYTdata.response.docs[i].web_url + ">" + NYTdata.response.docs[i].web_url + "</a>")

			}
			

			console.log(queryURL);
			console.log(numArticles);
			console.log(NYTdata);

		})
}
//Main Process

$('#searchBtn').on('click', function(){
	queryTerm = $('#search').val().trim();
	

//Get Search Term 
	var newURL = urlBase + "&q=" + queryTerm;
	
//Get the number of Records
numResults = $('#numRecords').val();

//Get Start Year & End Year
	startYear = $('#startYear').val().trim();
	endYear = $('#endYear').val().trim();

	if (parseInt(startYear)){
		startYear = startYear + "0101";
		newURL = newURL + "&begin_date=" + startYear;

	}

	if (parseInt(endYear)) {
		endYear = endYear + "0101";
		newURL = newURL + "&end_date=" + endYear;
	}
//Date info to URL
	
	
//Send ajax newly assmbled URL
	runQuery(numResults, newURL);
	return false;
})

//1.Retrieve user input convert to variables
//2. Use variables to make ajax call tio NYT
//3. break down the NYT object into usable fields
//4. Dynamically generate content of HTML
//5. Dealing with edge cases (bugs)
