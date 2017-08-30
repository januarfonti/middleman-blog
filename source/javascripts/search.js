var lunrIndex = null;
var lunrData  = null;
// Download index data
$.ajax({
  url: "/search.json",
  cache: false,
  method: 'GET',
  success: function(data) {
    lunrData = data;
    lunrIndex = lunr.Index.load(lunrData.index);
  }
});

$(document).ready(function () {
  var duckduckgosearch = $('#duckduckgo-fallback-search');
  duckduckgosearch.hide();

  $('input#search').on('keyup', function () {
    // Get query
    var query = $(this).val();
    // Search for it
    var result = lunrIndex.search(query);
    // Output it
    var searchresults = $('.searchresults');
    var resultcount = $('#result-count');
    if (result.length === 0) {
      // Hide results
      searchresults.hide();
      resultcount.hide();
      if (query.length == 0) {
        duckduckgosearch.hide();
      } else {
        duckduckgosearch.show()
      }
    } else {
      // Show results
      resultcount.html('results: ' + result.length);
      searchresults.empty();
      for (var item in result) {
        // A result only gives us a reference to a document
        var ref = result[item].ref;
        // Using the reference get the document
        var doc = lunrData.docs[ref];
        // Get the section of the site
        var group = " <span class='badge'>" + doc.group + '</span>';
        var searchitem = '<a class="list-group-item" href="' + doc.url + '">' + doc.title + group + '</a>';
        searchresults.append(searchitem);
      }
      searchresults.show();
    }
  });
});