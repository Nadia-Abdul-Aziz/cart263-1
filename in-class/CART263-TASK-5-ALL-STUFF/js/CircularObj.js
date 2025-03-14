/** TASK 1:(Drawing Board A) -
    *  1: animate the circle object(s) somehow/anyhow.. (there may be more than one)
    * You can use the mouse coordinates - the canvas ALREADY has event listeners for mouse click and mouse move
    * implemeneted, as well as the proper mouseX and mouseY (NO need to add)
    * -> ensure that any properties that are changed by the circle object occur in the update method already provided,
    * and use the member properties provided (you may add new ones ... or not :)
    * 2: add new circle objects (different sizes, positions, colors) to the canvas (board A) using some form of user interaction
    * 3: remove new circle objects from the canvas (board A) using some other form of user interaction 
    * Please for this exercise - do not add any new shapes other than the circular object...
    * 
    */

class CircularObj {
  constructor(x, y, radius, f_color, s_color, context) {
    // We write instructions to set up a Flower here
    // Position and size information
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fill_color = f_color;
    this.stroke_color = s_color;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2; //full rotation
    this.context = context;
    this.vx = 0.2;
    this.vy = 0.2;
  }

  display() {
    this.context.fillStyle = this.fill_color;
    this.context.strokeStyle = this.stroke_color;
    this.context.beginPath();
    this.context.arc(
      this.x,
      this.y,
      this.radius,
      this.startAngle,
      this.endAngle,
      true
    );
    this.context.fill();
    this.context.lineWidth = 2;
    this.context.closePath();
    this.context.stroke();
    this.update();
  }


  update() {

    this.x += this.vx;
    this.y += this.vy;

    if (this.x > this.context.canvas.width - this.radius || this.x < this.radius) this.vx *= -1;
    if (this.y > this.context.canvas.height - this.radius || this.y < this.radius) this.vy *= -1;

    requestAnimationFrame(() => this.update());

  }

  //checking if mouse coordinates are in the circle
  containsPoint(mouseX, mouseY) {
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    return dx * dx + dy * dy <= this.radius * this.radius;

  }
}

function animate() {
  // request another frame
  requestAnimationFrame(animate);
}



