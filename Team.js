var Team = function(isAttacker, isEvolving, teamsize){
  this.player = [];
  for(var i = 0; i<teamsize; i++){
    this.player.push(new Player(i,isAttacker));
  }
  this.isEvolving = isEvolving;

  this.draw = function(){
    noStroke();
    if(isAttacker){
      //Attackers will be drawn red
      fill(255,0,0);
    }else{
      //Opponents will be drawn green
      fill(0,255,0);
    }
    for(var i = 0; i<this.player.length;i++){
      this.player[i].show();
    }
  }

  this.update = function(counter,opp){
    for(var i = 0; i<this.player.length;i++){
      this.player[i].update(counter);
      if(isAttacker){
        this.player[i].checkCatched(opp);
      }
    }
  }

  this.getAlive = function(){
    var sum = 0;
    for(var i =0; i<this.player.length; i++){
        if(this.player[i].isAlive){
          sum ++;
        }
    }
    return sum;
  }

  this.evolve = function(mutationRate){
    this.nomFitness();
    if(this.isEvolving){
      var newPlayers = [];
      for(var i =0; i<teamsize;i++){
        var partnerA = this.choosePlayer();
        var partnerB = this.choosePlayer();
        newPlayers[i] = new Player(i,isAttacker);
        newPlayers[i].dna = partnerA.dna.crossover(partnerB.dna);
        newPlayers[i].dna.mutate(mutationRate);
      }
      this.player = newPlayers;
    }else{
      for(var i =0; i<this.player.length;i++){
        this.player[i].reset();
      }
    }
  }

  this.nomFitness = function(){
    if(isAttacker){
      var outputsum = 0;
      var sum =0;
      for(var i=0;i<this.player.length;i++){
        outputsum+=this.player[i].catched;
        this.player[i].catched *= this.player[i].catched;
        sum+=this.player[i].catched;
      }
      for(var i=0;i<this.player.length;i++){
        this.player[i].fitness = this.player[i].catched/sum;
      }
    }else{
      var sum = 0;
      var outputsum=0;
      for(var i=0;i<this.player.length;i++){
        outputsum+=this.player[i].lifespan;
          this.player[i].lifespan *= this.player[i].lifespan;
        sum+=this.player[i].lifespan;
      }
      for(var i=0;i<this.player.length;i++){
        this.player[i].fitness = this.player[i].lifespan/sum;
      }
      avgOpponentFitnessP.html("Avg Opponent Lifespan: " + (outputsum-teamsize)/teamsize);
    }
  }

  this.choosePlayer = function(){
    var x = random(1);
    for(var i =0;i<this.player.length;i++){
      x -= this.player[i].fitness;
      if(x<=0){
        return this.player[i];
      }
    }
  }
}
