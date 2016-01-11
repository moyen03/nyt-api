
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street+" , "+city;

    $greeting.text("So, you want to live "+ address + "?");

    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location='+ address +'';

    $body.append('<img class="bgimg" src="'+streetviewUrl+'">');


    $.getJSON();

    var nytJsonUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?';
    var key = '807ca6ba8b743032a03e02720b331446:5:73977843';
    var nytcompleteUrl = nytJsonUrl + 'q=' + city + '&api-key=' + key + '';

    $.getJSON( nytcompleteUrl, function( data ) {
      $nytHeaderElem.text("New York time articles about the " + city);
      var allArticles = data.response.docs;
      for (var i =0; i < allArticles.length; i++) {
        var eachArticle = allArticles[i];

      $nytElem.append('<li class="eacharticle">'+
        '<a href="'+eachArticle.web_url+'">'+eachArticle.headline.main+'</a>'+
       '<p>'+eachArticle.snippet+'</p>'+
        '</li>');
  }

    }).error(function(e){
        $nytHeaderElem.text('New York Times article could not be loaded');
    });


 // Your Wikipedia AJAX request goes here
    var  wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json&callback=wikiCallback';

    // error handeling
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("Failed to get Wiki resources");
    }, 9000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        // jsonp: "callback",
        success: function( response ) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href=" ' + url + ' "> '+
                    articleStr + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);
