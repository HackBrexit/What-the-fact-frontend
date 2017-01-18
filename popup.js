document.addEventListener('DOMContentLoaded', function() {
  var address = "http://138.68.148.244:8000/api/";
  var selectedText = "";
 
  chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
  }, function(selection) {
    selectedText =  selection[0];
    document.getElementById('selectedText').innerHTML = selectedText;

     var text = document.getElementById('selectedText').innerHTML;
    if (text.length == 0) {
      document.getElementById('submitFields').style.display = "none";
    } else {
      document.getElementById('startApp').style.display = "none";
      document.getElementById('submitFields').style.display = "block";
      window.scrollTo(0, document.body.scrollHeight);
    }
  });

  var closeApp = document.getElementById('close-app');
  closeApp.addEventListener('click',function(){
    window.close();
  });

  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {
 
    chrome.tabs.getSelected(null, function(tab) {

      var user_question = document.getElementById('question').value;
      var user_email = document.getElementById('user_email').value;

      var data = "user_question="+user_question+"&user_email="+user_email+"&questionable_fact="+selectedText+"&questionable_fact_url="+tab.url;
    
      var xhttp = new XMLHttpRequest();
        xhttp.open("POST", address, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(data); 
      });

    document.getElementById('submitFields').style.display = "none";
    document.getElementById('end').style.display = "block";
  }, false);
}, false);

