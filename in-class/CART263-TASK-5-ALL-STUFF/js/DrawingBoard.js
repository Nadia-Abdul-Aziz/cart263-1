class DrawingBoard {
  /* Constructor */
  constructor(canvas, context, drawingBoardId) {
    this.canvas = canvas;
    this.context = context;
    this.objectsOnCanvas = [];
    let self = this;
    this.drawingBoardId = drawingBoardId;
    //each element has a mouse clicked and a mouse over
    this.canvas.addEventListener("click", function (e) {
      self.clickCanvas(e);
    });

    this.canvas.addEventListener("mousemove", function (e) {
      self.overCanvas(e);
    });
  }

  overCanvas(e) {
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);
    console.log(this.mouseOffsetX, this.mouseOffsetY);
    if (this.drawingBoardId === "partA") {
      console.log("in A")
      // Check if the mouse is over a circle
      for (let i = this.objectsOnCanvas.length - 1; i >= 0; i--) {
        let obj = this.objectsOnCanvas[i];
        if (obj instanceof CircularObj && obj.containsPoint(this.mouseOffsetX, this.mouseOffsetY)) {
          this.objectsOnCanvas.splice(i, 1); // Remove the circle (w3 schools we love youuuu)
          this.display(); // Redraw the canvas
          break; // Exit the loop
        }
      }
    }
    if (this.drawingBoardId === "partB") {
      console.log("in B")
    }
    if (this.drawingBoardId === "partC") {
      console.log("in C")
    }
    if (this.drawingBoardId === "partD") {
      console.log("in D")
      this.objectsOnCanvas[0].updatePositionRect(this.mouseOffsetX, this.mouseOffsetY);
    }
  }

  clickCanvas(e) {
    // console.log("clicked");
    this.canvasBoundingRegion = this.canvas.getBoundingClientRect();
    this.mouseOffsetX = parseInt(e.clientX - this.canvasBoundingRegion.x);
    this.mouseOffsetY = parseInt(e.clientY - this.canvasBoundingRegion.y);

    //differentiate which canvas
    //you can remove the console.logs ///
    if (this.drawingBoardId === "partA") {
      console.log("in A");

      //respawn circle in new location when clicked
      let radius = 20;
      let color = `yellow`;
      let circle = new CircularObj(this.mouseOffsetX, this.mouseOffsetY, radius, color, "black", this.context);
      this.addObj(circle);
      this.display();
    }
    if (this.drawingBoardId === "partB") {
      console.log("in B")
    }
    if (this.drawingBoardId === "partC") {
      console.log("in C")
    }
    if (this.drawingBoardId === "partD") {
      console.log("in D")
      function getRandomColour() {
        var letters = '0123456789ABCDEF';
        var colour = '#';
        for (let i = 0; i < 6; i++) {
          colour += letters[Math.floor(Math.random() * 16)]
        }
        return colour;
      }

      this.objectsOnCanvas[0].changeColor(getRandomColour());
    }
  }
  /* method to add obj to canvas */
  addObj(objToAdd) {
    this.objectsOnCanvas.push(objToAdd);
  }

  /* method to add display objects on canvas */
  display() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].display();
    }
  }

  /* method to add animate objects on canvas */
  animate() {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.objectsOnCanvas[i].update();
      this.objectsOnCanvas[i].display();
    }
  }

  run(videoElement) {
    for (let i = 0; i < this.objectsOnCanvas.length; i++) {
      this.objectsOnCanvas[i].update(videoElement);
      this.objectsOnCanvas[i].display();
    }

  }
}
