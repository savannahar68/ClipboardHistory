$(document).ready(function () {
  console.log("Inside");
  var myTable = document.getElementById("myTable")
  console.log(myTable);
  myTable.onkeydown = function (event) {
    var numberOfCells = document.getElementById('myTable').getElementsByTagName("td").length;
    if (event.keyCode == 37) {
      console.log('left');
      document.getElementById(event.target.id).blur()
      var currentfocus = event.target.id.split('');
      currentfocus.splice(currentfocus.length - 1, 1, +currentfocus[currentfocus.length - 1] - 1);
      var newfocus = currentfocus.join('');
      document.getElementById(newfocus).focus()
    }

    ////////////
    else if (event.keyCode == 39) {
      console.log('right');
      document.getElementById(event.target.id).blur()
      var currentfocus = event.target.id.split('');
      currentfocus.splice(currentfocus.length - 1, 1, +currentfocus[currentfocus.length - 1] + 1);
      var newfocus = currentfocus.join('');
      document.getElementById(newfocus).focus()
    }
    ////////////

    else if (event.keyCode == 38) {
      console.log('up');
      document.getElementById(event.target.id).blur()
      var currentfocus = event.target.id.split('');
      currentfocus.splice(2, 1, +currentfocus[2] - 1);
      var newfocus = currentfocus.join('');
      document.getElementById(newfocus).focus();
    }
    else if (event.keyCode == 40) {
      console.log('down');
      document.getElementById(event.target.id).blur()
      var currentfocus = event.target.id.split('');
      currentfocus.splice(2, 1, +currentfocus[2] + 1);
      var newfocus = currentfocus.join('');
      document.getElementById(newfocus).focus();
    }
  };
});