var puzzleManger;
puzzleManger = {
  sequenceArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  initialArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  transferringId: "",
  transferringParentId: "",
  currentElement: "",
  prev1: "",
  prev4: "",
  succ1: "",
  succ4: "",
  container: "",
  finished: true,
  dropZoneID: "",
  draggedElement: "",
  elementCounter: "",
  dropZoneIdContent: "",
  ramdomArray: [],
  init: function() {
    puzzleManger.addObservers();
  },
  addObservers: function() {
    puzzleManger.resetPuzzle();
    puzzleManger.eventHandlers();
  },
  shuffleArray: function(array) {
     var j ,temp;
    for (var i = array.length - 1; i > 0; i--) {
      j= Math.floor(Math.random() * (i + 1));
      console.log("i", i);
      console.log("j", j);
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  },
  resetPuzzle: function() {
    puzzleManger.ramdomArray = puzzleManger.shuffleArray(puzzleManger.sequenceArray)
    for (i = 0; i < puzzleManger.ramdomArray.length; i++) {
      document.getElementById(i + 1).innerHTML = puzzleManger.ramdomArray[i];
    }
  },
  finalState: function() {
    for (i = 0; i < puzzleManger.initialArray.length; i++) {
      document.getElementById(i + 1).innerHTML = puzzleManger.initialArray[i];
    }
  },
  eventHandlers: function() {
    document.getElementById("reset").onclick = function() {
      puzzleManger.resetPuzzle();
    }
    document.getElementById("finish").onclick = function() {
      puzzleManger.finalState();
    }

    document.getElementById("draggable").addEventListener("dragstart", puzzleManger.drag, false);
    
    puzzleManger.container = document.getElementsByClassName("container");
    for (var i = 0; i < puzzleManger.container.length; i++) {
      puzzleManger.container[i].addEventListener("drop", puzzleManger.drop, false);
      puzzleManger.container[i].addEventListener("dragover", puzzleManger.allowDrop, false);
    }
    
  },
  allowDrop: function(ev) {
    ev.preventDefault();

  },
  drag: function(ev) {
    puzzleManger.currentElement = ev.target.id
    
    //find the +-1 and +-4 div ID's 
    try {
      puzzleManger.prev1 = document.getElementById(puzzleManger.currentElement).parentNode.previousElementSibling.getAttribute("id");
	} catch (ex) {
      console.log("exception is :", ex);
    }
	try {
	puzzleManger.prev4 = document.getElementById(puzzleManger.currentElement).parentNode.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.getAttribute("id");
	} catch (ex) {
      console.log("exception is :", ex);
    }
	try {
      puzzleManger.succ1 = document.getElementById(puzzleManger.currentElement).parentNode.nextElementSibling.getAttribute("id");
	} catch (ex) {
      console.log("exception is :", ex);
    }
	try {
      puzzleManger.succ4 = document.getElementById(puzzleManger.currentElement).parentNode.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.getAttribute("id");
    } catch (ex) {
      console.log("exception is :", ex);
    }

    console.log("currentElement", puzzleManger.currentElement);
    ev.dataTransfer.setData("draggedElement", ev.target.id);
    puzzleManger.transferringId = ev.target.id;
    puzzleManger.transferringParentId = document.getElementById(puzzleManger.transferringId).parentNode.getAttribute("id");
    console.log("transferringParentId:", puzzleManger.transferringParentId);

  },
  drop: function(ev) {

    ev.preventDefault();
    puzzleManger.dropZoneID = ev.target.getAttribute("id");
    
    //use below code to check dropzone div position is +-1 or +-4 div
    if (!(puzzleManger.dropZoneID == puzzleManger.prev1 || puzzleManger.dropZoneID == puzzleManger.prev4 || puzzleManger.dropZoneID == puzzleManger.succ1 || puzzleManger.dropZoneID == puzzleManger.succ4)) {
      return;
    }
    puzzleManger.draggedElement = ev.dataTransfer.getData("draggedElement");
    console.log("event", ev.target);
    console.log("id", ev.target.getAttribute("id"));
    puzzleManger.dropZoneID = ev.target.getAttribute("id");
    puzzleManger.dropZoneIdContent = document.getElementById(puzzleManger.dropZoneID).innerHTML;

    document.getElementById(puzzleManger.dropZoneID).innerHTML = "";
    console.log("dropZoneIdContent", puzzleManger.dropZoneIdContent);
    ev.target.getAttribute("id").innerHTML = "";
    ev.target.appendChild(document.getElementById(puzzleManger.draggedElement));
    document.getElementById(puzzleManger.transferringParentId).innerHTML = puzzleManger.dropZoneIdContent;
    puzzleManger.finish();

  },
  finish: function() {
    var i = 0;
    for (i = 0; i < puzzleManger.ramdomArray.length; i++) {
      try {
        puzzleManger.elementCounter = document.getElementById(i + 1).innerHTML;
        if (puzzleManger.elementCounter != i + 1) {
          puzzleManger.finished = false;
        }
      } catch (ex) {
        console.log("elementCounterException:", ex);
      }
    }
    if (puzzleManger.finished == true) {
      alert("Congratulations!! You have successfully completed the Puzzle.");
    }

  }
}
puzzleManger.init();
