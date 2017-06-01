/*global $, jQuery, console, ProgressBar*/

//The UI element and button click callbacks for the Pomodoro time selector display.
function PomodoroTimeSelectorDisplay(domElem, titleString) {
  "use strict";
  
  //The DOM element to which we will write our HTML to.
  var mDOMElem = domElem;
  
  //Callback when a button is clicked.
  //First parameter is the action string.
  this.buttonClickCallback = undefined;
  
  var oThis = this;
  
  //Render the view.
  var html = "";
  html += "<div class='timeSelector'>";
  html += "	<div class='panel panel-default'>";
  html += "		<div class='panel-header'>" + titleString + "</div>";
  html += "		<div class='panel-body' >";
  html += "			<table>";
  html += "				<tr>";
  html += "					<td><button class='btn btn-default decrementMinuteButton' action='decrement'>-</button></td>";
  html += "					<td><button class='btn btn-default minuteDisplayButton'>N/A mins</button></td>";
  html += "					<td><button class='btn btn-default incrementMinuteButton' action='increment'>+</button></td>";
  html += "				</tr>";
  html += "			</table>";
  html += "		</div>";
  html += "	</div>";
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
function PomodoroTimeSelector(domElem, titleString, defaultTimeValue) {
  "use strict";
  
  var mDOMElem = domElem;
  var oThis = this;
  
  var pomodoroUI = new PomodoroTimeSelectorDisplay(mDOMElem, titleString);
  
  var minutes = (defaultTimeValue) ? defaultTimeValue : 1;
  
  this.getMinutes = function() {
    return minutes;
  };
  
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
    }
  };
}

function PomodoroInitialInputDisplay(domElem) {
  "use strict";
  
  var html = "";
  html += "<div class='initialInputDisplay'>";
  html += "	<table>";
  html += "		<tr><div class='row1' /></tr>";
  html += "		<tr><div class='row2' /></tr>";
  html += "   <tr><button class='btn btn-default startButton'>Start</button></tr>"
  html += "	</table>";
  html += "</div>";
  $(domElem).html(html);
  
  var oThis = this;
  
  var row1DomElem = $(domElem).find(".row1")[0];
  var row2DomElem = $(domElem).find(".row2")[0];
  
  //Callback for when the timer should start.
  this.startTimerCallback = undefined;
  
  var timerSelectorDisplay = new PomodoroTimeSelector(row1DomElem, "Timer", 25);
  var breakSelectorDisplay = new PomodoroTimeSelector(row2DomElem, "Break", 5);
  
  $(domElem).find(".startButton").on("click", function() {
    oThis.startTimerCallback(timerSelectorDisplay.getMinutes(), breakSelectorDisplay.getMinutes());
  });
}

//Buttons to be available during a Pomodoro timer, 
//when it is currently being shown.
function PomodoroActiveTimerControls(domElem) {
  "use strict";
  
  var mDOMElem = domElem.hasOwnProperty("length") ? domElem[0] : domElem;
  
  var oThis = this;
  
  //Callback when a user clicks a button.  First parameter is the action string of the
  //button clicked.
  this.buttonClicked = undefined;
  
  //Render UI.
  var html = "";
  html += "<div class='pomodoroUserControl'><div>";
  html += "  <table>";
  html += "	  <tr>";
  html += "	    <td><button class='btn btn-default resetButton' action='reset'>Reset</button></td>";
  html += "	    <td><button class='btn btn-default hideButton' action='hide'>Hide</button></td>";
  html += "	   </tr>";
  html += "  </table></div>";
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

//Buttons to be available during a Pomodoro timer,
//when the time remaining is currently hidden.
function PomodoroHiddenTimerControls(domElem) {
  "use strict";
  
  var mDOMElem = domElem.hasOwnProperty("length") ? domElem[0] : domElem;
  
  var oThis = this;
  
  //Callback when a user clicks a button.  First parameter is the action string of the
  //button clicked.
  this.buttonClicked = undefined;
  
  //Render UI.
  var html = "";
  html += "<div class='pomodoroUserControl'><div>";
  html += "  <table>";
  html += "	  <tr>";
  html += "	    <td><button class='btn btn-default resetButton' action='reset'>Reset</button></td>";
  html += "	    <td><button class='btn btn-default showButton' action='show'>Show current timer</button></td>";
  html += "	   </tr>";
  html += "  </table><div>";
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

//The UI elements of a currently running Pomodoro timer, including
//time remaining text and control buttons.
function PomodoroTimeRemainingControlsDisplay(domElem, titleText) {
  "use strict";
  
  var mDOMElem = domElem.hasOwnProperty("length") ? domElem[0] : domElem;
  
  var html = "";
  html += "<div>";
  html += "  <table>";
  html += "    <tr><td><div class='activeTimerTitle'>" + titleText + "</div></td></tr>";
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

//Time's up display
function PomodoroTimesUpDisplay(domElem) {
  "use strict";
  
  var mDOMElem = domElem.hasOwnProperty("length") ? domElem[0] : domElem;
  
  var html = "";
  html += "<div class='pomodoroTimesUpDisplay'>";
  html += "  <div class='text'>";
  html += "	    <p>Time's up!</p>";
  html += "	    <p>(click to reset)</p>";
  html += "   </div>";
  html += "</div>";
  $(mDOMElem).html(html);
  
  this.userClickedCallback = undefined;
  
  var oThis = this;
  
  $(mDOMElem).on("click", ".pomodoroTimesUpDisplay", function(e) {
    if (oThis.userClickedCallback) {
      oThis.userClickedCallback();
    }
  });
}

//Pomodoro time remaining circle display, including animated
//circle progress graphic and time remaining UI elements contained
//in PomodoroTimeRemainingControlsDisplay.
function PomodoroCircleDisplay(domElem, titleText, progressColor) {
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
  
  var mCircleProgress = new ProgressBar.Circle(mCircleElem, {
    strokeWidth: 10,
    color: progressColor,
    trailWidth: 3,
    trailColor: "#4c647c"
  });
  
  //Setup Circle style
  
  
  var mTimeSelectorDisplay = new PomodoroTimeRemainingControlsDisplay(mTimeSelectorDisplayElem, titleText);
  mTimeSelectorDisplay.buttonClickedCallback = function(action) {
    if (oThis.buttonClickedCallback) {
      oThis.buttonClickedCallback(action);
    }
  };
  
  var mSecondsRemaining = 0;
  var mTotalSeconds = 1;
  
  var padWithLeadingZeros = function(value, decimalLength) {
    var padded = value + "";
    
    while (padded.length < decimalLength) {
      padded = "0" + padded;
    }
    
    return padded;
  }
  
  var getMinutesSecondsFormatted = function(seconds) {
    var minutes = 0;
    while (seconds >= 60) {
      minutes++;
      seconds -= 60;
    }
    
    return padWithLeadingZeros(minutes, 2) + ":" + padWithLeadingZeros(seconds, 2);
  };
  
  var setDisplay = function(animate) {
    var amountElapsed = (mTotalSeconds - mSecondsRemaining + 1) / mTotalSeconds;
    
    mTimeSelectorDisplay.setTimeRemainingText(getMinutesSecondsFormatted(mSecondsRemaining));
    
    var animationOptions = 
    {
      duration: 1200,
      easing: "easeInOut"
    };
    
    if (animate !== undefined) {
      if (animate) {
        mCircleProgress.animate(amountElapsed, animationOptions);
      } else {
        mCircleProgress.set(amountElapsed);
      }
    } else {
      //Animate parameter not provided, assume we want to animate to the next value.
      mCircleProgress.animate(amountElapsed, animationOptions);
    }
    
  };
  
  this.setTotalTime = function(totalTimeInSeconds) {
    mTotalSeconds = totalTimeInSeconds;
  };
  
  this.setRemainingTime = function(secondsRemaining, animate) {
    mSecondsRemaining = secondsRemaining;
    
    setDisplay(animate);
  };
  
}

//Provides a callback every 1 s.
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
  
  var mTimerLength; //in minutes
  var mBreakLength; //in minutes
  
  var CurrentTimerType = {
    POMODORO: "Pomodoro",
    BREAK: "Break"
  };
  
  var mCurrentTimerType;
  
  var mTimerElapsedDisplay = null;
  
  function displayInitialUserInput() {
    mInitialUserEntryDisplay = new PomodoroInitialInputDisplay(mPomodoroContainer);
    
    mInitialUserEntryDisplay.startTimerCallback = function(timerLength, breakLength) {
      startPomodoroTimer(timerLength, breakLength);
    };
  }
  
  function startPomodoroTimer(timerLength, breakLength) {
    if ((timerLength > 0) && (breakLength > 0)) {
      mTimerLength = timerLength;
      mBreakLength = breakLength;
      
      mCurrentTimerType = CurrentTimerType.POMODORO;
      
      startTimer(mTimerLength);
    }
  }
  
  function startTimer(length) {
    mTimerElapsedDisplay = null;
    
    displayActiveTimer(true, length);
    
    if (mTimerSource !== undefined) {
      mTimerSource.secondCallback = null;
    }

    mTimerSource = new PomodoroOneSecondSource();
    mTimerSource.secondCallback = secondTick;
  }
  
  function displayActiveTimer(reset, length) {
    
    var circleTitleText = "N/A";
    var circleColor = "#FFF";
    
    switch (mCurrentTimerType) {
      case CurrentTimerType.BREAK:
        circleTitleText = "Break!";
        circleColor = "#F00";
        break;
        
      case CurrentTimerType.POMODORO:
        circleTitleText = "Pomodoro";
        circleColor = "#49d155";
        break;
    }
    
    mCircleDisplay = new PomodoroCircleDisplay(mPomodoroContainer, circleTitleText, circleColor);
    mCircleDisplay.buttonClickedCallback = handleActiveTimerButtonPress;
    
    if (length) {
      //Minutes were provided.  Set the total seconds of the timer.
      mTotalSeconds = length * 60;
    }
    
    mCircleDisplay.setTotalTime(mTotalSeconds);
    
    if (reset) {
      //Reset the time remaining.
      mSecondsRemaining = mTotalSeconds;
    }
    
    mCircleDisplay.setRemainingTime(mSecondsRemaining, reset);
  }
  
  function displayTimesUpDisplay() {
    mTimerElapsedDisplay = new PomodoroTimesUpDisplay(mPomodoroContainer);
    mTimerElapsedDisplay.userClickedCallback = function() {
      resetTimer();
    };
  }
  
  function secondTick() {
    mSecondsRemaining--;
    
    mCircleDisplay.setRemainingTime(mSecondsRemaining);
    
    if (mSecondsRemaining === 0) {
      mTimerSource.stop();
      
      switch (mCurrentTimerType) {
        case CurrentTimerType.POMODORO:
          mCurrentTimerType = CurrentTimerType.BREAK;
          startTimer(mBreakLength);
          break;
          
        case CurrentTimerType.BREAK:
          mCurrentTimerType = CurrentTimerType.POMODORO;
          startTimer(mTimerLength);
          break;
      }
    }
  }
  
  function displayHiddenTimerControls() {
    mHiddenTimerDisplay = new PomodoroHiddenTimerControls(mPomodoroContainer);
    mHiddenTimerDisplay.buttonClicked = handleHiddenTimerButtonPress;
  }
  
  function handleActiveTimerButtonPress(action) {
    switch (action) {
      case "reset":
        resetTimer();
        break;
        
      case "hide":
        displayHiddenTimerControls();
        break;
        
      default:
        //idk
        break;
    }
  }
  
  function handleHiddenTimerButtonPress(action) {
    switch (action) {
      case "show":
        displayActiveTimer(false);
        break;
        
      case "reset":
        resetTimer();
        break;
        
      default:
        //idk
        break;
    }
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