/*global $, jQuery, console*/

//The UI element and button click callbacks for the Pomodoro time selector display.
function PomodoroTimeSelectorDisplay(domID) {
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
    var action = e.target.getAttribute("action");
    if (action) {
      oThis.buttonClickCallback(action);
    }
  });
  
  this.setMinuteDisplay = function(minutes) {
    $("#" + mDOMID + " .minuteDisplayButton").html(minutes + " mins");
  };
}

//Functionality exposed by the UI of the PomodoroTimeSelectorDisplay
function PomodoroTimeSelector(domID) {
  "use strict";
  
  //Callback to start the pomodoro timer.  First parameter is the length
  //of the pomodoro in minutes.
  this.startPomodoroTimer = undefined;
  
  var mDOMID = domID;
  var oThis = this;
  
  var pomodoroUI = new PomodoroTimeSelectorDisplay(mDOMID);
  
  //Default minutes value
  var minutes = 25;
  
  //Set display to default value.
  pomodoroUI.setMinuteDisplay(minutes);
  
  pomodoroUI.buttonClickCallback = function(actionStr) {
    switch (actionStr) {
      case "decrement":
        minutes--;
        pomodoroUI.setMinuteDisplay(minutes);
        break;
        
      case "increment":
        minutes++;
        pomodoroUI.setMinuteDisplay(minutes);
        break;
        
      case "start":
        oThis.startPomodoroTimer(minutes);
        break;
    }
  };
}

function PomodoroUserControl(domID) {
  "use strict";
  
  var mDOMID = domID;
  
  var oThis = this;
  
  //Callback when a user clicks a button.  First parameter is the action string of the
  //button clicked.
  this.buttonClicked = undefined;
  
  //Render UI.
  var html = "";
  html += "<div class='pomodoroUserControl'>";
  html += "  <table>";
  html += "	  <tr>";
  html += "	    <td><button class='btn btn-default resetButton' action='reset'>Reset</button></td>";
  html += "	    <td><button class='btn btn-default hideShowButton' action='hide'>Hide</button></td>";
  html += "	   </tr>";
  html += "  </table>";
  html += "</div>";
  $("#" + mDOMID).html(html);
  
  $("#" + mDOMID + " .btn").on("click", function(e) {
    var action = e.target.getAttribute("action");
    
    if (action) {
      //Valid action.
      
      if (action === "hide")
    }
  });
  
}
$(document).ready(function () {
  //PomodoroTimeSelector testing
  
  "use strict";
  
//  var pTimeSelector = new PomodoroTimeSelector("display");
//  pTimeSelector.startPomodoroTimer = function(minutes) {
//    console.log("minutes: " + minutes);
//  };
  
  
});