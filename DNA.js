var DNA = function(){
  this.genes = [];
  //Assign random genes (Vectors);
  for(var i =0;i<=lifespan;i++){
    this.genes[i]=p5.Vector.random2D();
    this.genes[i].setMag(random(0,maxSpeed));
  }

  this.crossover = function(partnerDNA){
    var newDNA = new DNA();

    //roll a coin for midpoint
    var midpoint = Math.floor(random(lifespan));
    for(var i=0;i<=lifespan;i++){
      if(i<midpoint){
        newDNA.genes[i]=this.genes[i];
      }else{
        newDNA.genes[i]=partnerDNA.genes[i];
      }
    }


    return newDNA;
  }

  this.mutate = function(mutationRate){
    for(var i =0;i<this.genes.length;i++){
      if(random(1)<mutationRate){
        this.genes[i]=p5.Vector.random2D();
        this.genes[i].setMag(random(0,maxSpeed));
      }
    }
  }

}
