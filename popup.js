document.addEventListener('DOMContentLoaded', function() {
  var address = "http://localhost:4567/api/v1/facts";
  var random_id = (Math.floor(Math.random() * (1000 - 1 + 1)) + 1).toString();
  var selectedText = "";

  chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
  }, function(selection) {
    selectedText =  selection[0];
  });

  var checkPageButton = document.getElementById('checkPage');

  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {

      var data = {
        title: tab.url,
        paragraph: selectedText,
        fact_id: random_id
      };

      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", address, true);
      xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      xhttp.send(JSON.stringify(data));
    });
  }, false);
}, false);
