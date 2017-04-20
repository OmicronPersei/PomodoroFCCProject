/*global $, jQuery*/

function PomodoroTimeSelector(domID) {
  "use strict";
  
  //The DOM element to which we will write our HTML to.
  var mDOMID = domID;
  
  //Callback when a button is clicked.
  //First parameter is the action string.
  this.buttonClickCallback = undefined;
  
  var oThis = this;
  
  //Render the view.
  var html = "";
  html += "<div class='pomodoroTimeSelector'>";
  html += "  <table>";
  html += "	<tr>";
  html += "	  <td><button class='btn btn-default decrementMinuteButton' action='decrement'>-</button></td>";
  html += "	  <td><button class='btn btn-default minuteDisplayButton' action='start'>N/A mins</button></td>";
  html += "	  <td><button class='btn btn-default incrementMinuteButton' action='increment'>+</button></td>";
  html += "	</tr>";
  html += "  </table>";
  html += "</div>";
  $("#" + mDOMID).html(html);
  
  $("#" + mDOMID).on("click", ".btn", function(e) {
    var action = e.target.parentElement.getAttribute("action");
    if (action) {
      oThis.buttonClickCallback(action);
    }
  });
  
  this.setMinuteDisplay = function(minutes) {
    $("#" + mDOMID + " .minuteDisplayButton").html(minutes + " mins");
  };
}