function keyPressed(e) {
  var srcElement = e.target; // get the element that fired the onkeydown function
  var dataset = false;
  var selectList = false;
  var next = "";
  var prev = "";
  if (srcElement.dataset) {
    console.log("Inside");
    // can we use HTML5 dataset?
    dataset = true; // remember for later
    // is this an element for which we care
    if (srcElement.dataset.selectlist == "true") {
      selectList = true;
    }
  } else {
    // can't use HTML5 dataset, use getAttribute
    if (srcElement.getAttribute("data-selectlist") == "true") {
      selectList = true;
    }
  }
  // is it a select element and the user pressed either up arrow or down arrow
  if (selectList && (e.keyCode == "38" || e.keyCode == "40")) {
    // get the next and prev navigation options for this element
    console.log("clicked");
    if (dataset) {
      next = srcElement.dataset.next;
      prev = srcElement.dataset.prev;
    } else {
      next = srcElement.getAttribute("data-next");
      prev = srcElement.getAttribute("data-prev");
    }
    // up arrow was pressed and a prev element is defined
    if (e.keyCode == "38" && prev != "") {
      document.getElementById(prev).focus();
    }
    // down arrow was pressed and a next element is defined
    if (e.keyCode == "40" && next != "") {
      document.getElementById(next).focus();
    }
    // don't do native processing of the up or down arrow (page scrolling)
    e.preventDefault;
  }
}
document.onkeydown = keyPressed;
