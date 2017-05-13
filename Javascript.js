/*global $, jQuery, console, ProgressBar*/

//The UI element and button click callbacks for the Pomodoro time selector display.
function PomodoroTimeSelectorDisplay(domElem) {
  "use strict";
  
  //The DOM element to which we will write our HTML to.
  var mDOMElem = domElem;
  
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
  $(mDOMElem).html(html);
  
  $(mDOMElem).on("click", ".btn", function(e) {
    var action = e.target.getAttribute("action");
    if ((action) && (oThis.buttonClickCallback)) {
      oThis.buttonClickCallback(action);
    }
  });
  
  this.setMinuteDisplay = function(minutes) {
    $(mDOMElem).find(".minuteDisplayButton").html(minutes + " mins");
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
        if (oThis.startPomodoroTimer) {
          oThis.startPomodoroTimer(minutes);
        }
        break;
    }
  };
}

function PomodoroActiveTimerControls(domElem) {
  "use strict";
  
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

function PomodoroHiddenTimerControls(domElem) {
  "use strict";
  
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
  html += "	    <td><button class='btn btn-default resetButton' action='show'>Show current timer</button></td>";
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

function PomodoroTimeRemainingControlsDisplay(domElem) {
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
  
  this.buttonClickedCallback = undefined;
  
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
  
  var mTimeSelectorDisplay = new PomodoroTimeRemainingControlsDisplay(mTimeSelectorDisplayElem);
  mTimeSelectorDisplay.buttonClickedCallback = function(action) {
    if (oThis.buttonClickedCallback) {
      oThis.buttonClickedCallback(action);
    }
  };
  
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

function PomodoroOneSecondSource() {
  "use strict";
  
  this.secondCallback = undefined;
  
  var oThis = this;
  
  //Start on instantiation
  var intervalTimer = setInterval(function() {
    if (oThis.secondCallback) {
      oThis.secondCallback();
    }
  }, 1000);
  
  this.stop = function() {
    clearInterval(intervalTimer);
  };
}

function PomodoroTimer(domElem) {
  "use strict";
  
  var html = "<div class='pomodoroContainer' />";
  $(domElem).html(html);
  
  var oThis = this;
  
  var mPomodoroContainer = $(domElem).find(".pomodoroContainer")[0];
  
  var mInitialUserEntryDisplay;
  var mCircleDisplay;
  var mHiddenTimerDisplay;
  var mTimerSource;
  var mTotalSeconds;
  var mSecondsRemaining;
  
  function displayInitialUserInput() {
    mInitialUserEntryDisplay = new PomodoroTimeSelector(mPomodoroContainer);
    
    mInitialUserEntryDisplay.startPomodoroTimer = function(minutes) {
      startTimer(minutes);
    };
  }
  
  function startTimer(minutes) {
    displayActiveTimer();
    
    mTotalSeconds = minutes * 60;
    mSecondsRemaining = mTotalSeconds;
    
    mCircleDisplay.setTotalTime(mTotalSeconds);
    mCircleDisplay.setRemainingTime(mTotalSeconds);
    
    if (mTimerSource !== undefined) {
      mTimerSource.secondCallback = null;
    }
    
    mTimerSource = new PomodoroOneSecondSource();
    mTimerSource.secondCallback = secondTick;
  }
  
  function secondTick() {
    mSecondsRemaining--;
    
    mCircleDisplay.setRemainingTime(mSecondsRemaining);
    
    if (mSecondsRemaining === 0) {
      mTimerSource.stop();
    }
  }
  
  function displayActiveTimer() {
    mCircleDisplay = new PomodoroCircleDisplay(mPomodoroContainer);
    mCircleDisplay.buttonClickedCallback = handleActiveTimerButtonPress;
  }
  
  function handleActiveTimerButtonPress(action) {
    switch (action) {
      case "reset":
        resetTimer();
        break;
        
      case "hide":
        //stuff
        break;
        
      default:
        //idk
        break;
    }
  }
  
  function handleHiddenTimerButtonPress(action) {
    //nothing yet
  }
  
  function resetTimer() {
    if (mTimerSource) {
      mTimerSource.stop();
    }
    displayInitialUserInput();
  }
  
  function hideCurrentTimer() {
    if (!(mHiddenTimerDisplay)) {
      mHiddenTimerDisplay = new PomodoroHiddenTimerControls(mPomodoroContainer);
      mHiddenTimerDisplay.buttonClicked = handleHiddenTimerButtonPress;
    }
  }
  
  //Display the initial display.
  displayInitialUserInput();
}

$(document).ready(function () {
  //PomodoroTimeSelector testing
  
  "use strict";
  var timer = new PomodoroTimer($(".display"));
  
  
  
});