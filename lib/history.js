window.displayBoxIndex = -1;

$(document).ready(function (event) {
  console.log("focus");
  $("#display").focus();
  if (event.keyCode == 40) {
    Navigate(1);
  }
  if (event.keyCode == 38) {
    Navigate(-1);
  }
});

var Navigate = function (diff) {
  console.log("called");
  displayBoxIndex += diff;
  var oBoxCollection = $(".display_box");
  if (displayBoxIndex >= oBoxCollection.length) displayBoxIndex = 0;
  if (displayBoxIndex < 0) displayBoxIndex = oBoxCollection.length - 1;
  var cssClass = "display_box_hover";
  oBoxCollection.removeClass(cssClass).eq(displayBoxIndex).addClass(cssClass);
};
