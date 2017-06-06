var Game = function(lifespan, teamsize, attackersEvolving, opponentEvolving, mutationRate) {
  this.opponents = new Team(false, opponentEvolving, teamsize);
  this.attackers = new Team(true, attackersEvolving, teamsize);
  this.counter = 0;
  this.generationCounter = 1;
  this.score = [0, 0];
  this.mRate = mutationRate;

  this.draw = function() {
    this.opponents.draw();
    this.attackers.draw();
  }

  this.update = function() {
    if (this.counter < lifespan) {
      this.opponents.update(this.counter);
      this.attackers.update(this.counter, this.opponents.player);
      this.counter++;
      var livingOpponents = this.opponents.getAlive();
      livingOpponentsP.html("Living Opponents: " + livingOpponents);
      if (livingOpponents == 0) {
        this.end();
      }
      timeLeftP.html("Frames Left: " + (lifespan - this.counter));
    } else {
      this.end();
    }
  }

  this.evolve = function() {
    this.opponents.evolve(this.mRate);
    this.attackers.evolve(this.mRate);
    this.counter = 0;
    this.generationCounter++;
    generationP.html(this.generationCounter + ". generation");
    loop();
  }

  this.end = function() {
    noLoop();
    if (this.opponents.getAlive() > 0) {
      this.score[1]++;
      gameP.html("OPPONENTS WON! Attackers:Opponents " + this.score[0] + ":" + this.score[1]);
    } else {
      this.score[0]++;
      gameP.html("ATTACKERS WON! Attackers:Opponents " + this.score[0] + ":" + this.score[1]);

    }
    this.evolve();
  }

}
