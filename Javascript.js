/*global $, jQuery, console, ProgressBar*/

//Determine if the supplied object is a jQuery object referring to
//exactly one DOM element.
//function isjQueryObjectSingular(obj) {
//  "use strict";
//  
//  if (obj === undefined) {
//    throw "Not a jQuery object.";
//  } else if (obj.length === 0) {
//    throw "No matching jQuery elements found.";
//  } else if (obj.length > 1) {
//    throw "More than one matching jQuery elements found.";
//  } else if (obj.length === 1) {
//    //This case is safe; don't throw, just return.
//    return;
//  } else {
//    throw "Unknown error";
//  }
//}

//The UI element and button click callbacks for the Pomodoro time selector display.
function PomodoroTimeSelectorDisplay(domElem) {
  "use strict";
  
  //The DOM element to which we will write our HTML to.
  var mDOMElem = domElem[0];
  
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
  mDOMElem.html(html);
  
  mDOMElem.on("click", ".btn", function(e) {
    var action = e.target.getAttribute("action");
    if (action) {
      oThis.buttonClickCallback(action);
    }
  });
  
  this.setMinuteDisplay = function(minutes) {
    mDOMElem.find(".minuteDisplayButton").html(minutes + " mins");
  };
}

//Functionality exposed by the UI of the PomodoroTimeSelectorDisplay
function PomodoroTimeSelector(domElem) {
  "use strict";
  
  //Callback to start the pomodoro timer.  First parameter is the length
  //of the pomodoro in minutes.
  this.startPomodoroTimer = undefined;
  
  var mDOMElem = domElem;
  var oThis = this;
  
  var pomodoroUI = new PomodoroTimeSelectorDisplay(mDOMElem);
  
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

function PomodoroActiveTimerControls(domElem) {
  "use strict";
  
//  isjQueryObjectSingular(domElem);
  
  var mDOMElem = domElem.hasOwnProperty("length") ? domElem[0] : domElem;
  
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
  html += "	    <td><button class='btn btn-default hideButton' action='hide'>Hide</button></td>";
  html += "	   </tr>";
  html += "  </table>";
  html += "</div>";
  mDOMElem.innerHTML = html;
  
  $(mDOMElem).on("click", ".btn", function(e) {
    var action = e.target.getAttribute("action");
    
    if (action) {
      //Valid action.
      
      //Call the callback function.
      oThis.buttonClicked(action);
    }
  });
  
}

function PomodoroTimeRemainingControls(domElem) {
  "use strict";
  
  var mDOMElem = domElem.hasOwnProperty("length") ? domElem[0] : domElem;
  
  var html = "";
  html += "<div>";
  html += "  <table>";
  html += "    <tr><td><div class='timeRemainingText' /></td></tr>";
  html += "    <tr><td><div class='activeTimerControls' /></td></tr>";
  html += "  </table>";
  html += "</div>";
  mDOMElem.innerHTML = html;
  
  var mTimeRemainingTextElem = $(mDOMElem).find(".timeRemainingText")[0];
  var mActiveTimerControlsElem = $(mDOMElem).find(".activeTimerControls")[0];
  
  var mActiveTimerControls = new PomodoroActiveTimerControls(mActiveTimerControlsElem);
  var oThis = this;
  this.buttonClickedCallback = undefined;
  mActiveTimerControls.buttonClicked = function(action) {
    if (oThis.buttonClickedCallback) {
      oThis.buttonClickedCallback(action);
    }
  };
  
  this.setTimeRemainingText = function(text) {
    mTimeRemainingTextElem.innerHTML = text;
  };
}

function PomodoroCircleDisplay(domElem) {
  "use strict";
  
//  isjQueryObjectSingular(domElem);
  
  var mDOMElem = domElem.hasOwnProperty("length") ? domElem[0] : domElem;
  var oThis = this;
  
  //Render the shell of our view.
  //CSS will take care of .timeSelectorDisplay being on top of .circle.
  var html = ""; 
  html += "<div class='circleDisplay'>";
  html += "  <div class='circle' />";
  html += "  <div class='timeSelectorDisplay' />";
  html += "</div>";
  $(mDOMElem).html(html);
  var mCircleElem = $(mDOMElem).find(".circle")[0];
  var mTimeSelectorDisplayElem = $(mDOMElem).find(".timeSelectorDisplay")[0];
  
  var mCircleProgress = new ProgressBar.Circle(mCircleElem);
  
  var mTimeSelectorDisplay = new PomodoroTimeRemainingControls(mTimeSelectorDisplayElem);
  
  var mSecondsRemaining = 0;
  var mTotalSeconds = 1;
  
  var getMinutesSecondsFormatted = function(seconds) {
    var minutes = 0;
    while (seconds >= 60) {
      minutes++;
      seconds -= 60;
    }
    
    return minutes + ":" + seconds;
  };
  
  var setDisplay = function() {
    var amountElapsed = (mTotalSeconds - mSecondsRemaining) / mTotalSeconds;
    
    mTimeSelectorDisplay.setTimeRemainingText(getMinutesSecondsFormatted(mSecondsRemaining));
    mCircleProgress.animate(amountElapsed);
  };
  
  this.setTotalTime = function(totalTimeInSeconds) {
    mTotalSeconds = totalTimeInSeconds;
  };
  
  this.setRemainingTime = function(secondsRemaining) {
    mSecondsRemaining = secondsRemaining;
    
    setDisplay();
  };
  
}

$(document).ready(function () {
  //PomodoroTimeSelector testing
  
  "use strict";
  
  
});