var w = 800;
var h = 400;
//var opponentEvolving = true;
//var attackersEvolving = true;
//var lifespan = 30*60; //30sec for 50 Frames
var lifespan;
//var teamsize = 10; // Player per Team
var teamsize;
var maxSpeed = 5;
var g;
var timeLeftP;
var avgOpponentFitnessP;
var generationP;
var livingOpponentsP;
var gameP;
var mutationSlider;
var playersSlider;
var oEvolveCheck;
var aEvolveCheck;
var lifespanSlider;
var startButton;
var dia;



function setup() {
  var can = createCanvas(w, h);
  can.parent("gamediv");
  timeLeftP = createP("<table style='border:1px;'><tr><td>MutationRate (0-1)</td><td>Teamsize(1-30)</td><td>Lifespan (10-120sec)</td></tr></table>");
  mutationSlider = createSlider(0, 100, 1); //Mutationrate 0-1
  playersSlider = createSlider(1, 30, 10, 1); //1-30 Players per Game
  lifespanSlider = createSlider(10, 120, 30, 1); //Lifespan in seconds (~60Frames)
  aEvolveCheck = createCheckbox("Attackers Evolving?", false);
  oEvolveCheck = createCheckbox("Opponents Evolving?", false);
  startButton = createButton("START Simulation");
  startButton.mousePressed(start);
  timeLeftP.parent("stats");
  mutationSlider.parent("stats");
  playersSlider.parent("stats");
  lifespanSlider.parent("stats");
  aEvolveCheck.parent("stats");
  oEvolveCheck.parent("stats");
  startButton.parent("stats");
  noLoop();
}

function start() {
  //create things related to Game
  lifespan = lifespanSlider.value() * 60;
  teamsize = playersSlider.value();
  g = new Game(lifespan, teamsize, aEvolveCheck.checked(), oEvolveCheck.checked(), mutationSlider.value() / 100);
  timeLeftP.html("Frames left: ");
  avgOpponentFitnessP = createP("");
  avgOpponentFitnessP.parent("stats");
  generationP = createP("1. generation");
  generationP.parent("stats");
  livingOpponentsP = createP("");
  livingOpponentsP.parent("stats");
  gameP = createP("Attackers:Opponents 0:0");
  gameP.parent("stats");
  //Hide things from Start-Menu
  mutationSlider.hide();
  playersSlider.hide();
  lifespanSlider.hide();
  aEvolveCheck.hide();
  oEvolveCheck.hide();
  startButton.hide();
  //Display Chart
  dia = new Diagram();
  //Start Loop
  loop();
}

function draw() {
  background(211, 211, 211);
  g.draw();
  g.update();
}
