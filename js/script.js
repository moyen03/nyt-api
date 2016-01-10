
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

    });

    return false;
};

$('#form-container').submit(loadData);
