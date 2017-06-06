var Player = function(isAttacker) {
  this.acc = createVector(0, 0);
  this.lifespan = 1;
  this.catched = 1;
  this.isAlive = true;
  this.fitness = null; //normalized Fitness
  //this.i = i;

  this.dna = new DNA();
  //Player gets his starting Position
  if (isAttacker) {
    this.vel = createVector(0, 0.1);
    this.startPos = createVector(w / 2, 1 / 4 * h);
    //this.startPos = createVector((i+1)*(w/(teamsize+1)),1/4*h);
  } else {
    this.vel = createVector(0, -0.1);
    this.startPos = createVector(w / 2, 3 / 4 * h)
    //  this.startPos = createVector((i+1)*(w/(teamsize+1)),3/4*h);
  }

  this.pos = this.startPos.copy();

  this.show = function() {
    //Ellipse will be drawn at the player pos with 7px radius
    if (this.isAlive) {
      ellipse(this.pos.x, this.pos.y, 7);
    }
  }

  this.update = function(counter) {
    if (this.isAlive) {
      this.acc.add(this.dna.genes[counter + 1]);
      this.vel.add(this.acc);
      this.vel.limit(maxSpeed);
      this.pos.add(this.vel);
      this.acc.setMag(0);
      this.boundaries();
      this.lifespan++;
    }
  }

  this.boundaries = function() {
    //checks if the boundary is hit and leaves the Player there
    if (this.pos.x < 0) {
      this.pos.x = 0;
    } else if (this.pos.x > w) {
      this.pos.x = w;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
    } else if (this.pos.y > h) {
      this.pos.y = h;
    }
  }

  this.checkCatched = function(opponents) {
    for (var i = 0; i < opponents.length; i++) {
      if (opponents[i].isAlive) {
        if (p5.Vector.sub(opponents[i].pos, this.pos).mag() <= 7) {
          opponents[i].isAlive = false;
          this.catched++;
        }
      }
    }
  }

  this.reset = function() {
    this.pos = this.startPos.copy();
    this.vel.setMag(0);
    this.acc.setMag(0);
    this.isAlive = true;
    this.catched = 1;
    this.lifespan = 1;
  }


}
