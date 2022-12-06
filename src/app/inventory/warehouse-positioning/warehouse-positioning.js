function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  Point.prototype.equal = function(p) {
      return  (this.x == p.x && this.y == p.y); 
  }

  Point.prototype.toString = function() {
      return "(" + this.x +"," + this.y +")";
  }

  Point.prototype.drawRect = function(ctx) {
       ctx.beginPath();
       ctx.rect(this.x-3, this.y-3, 6, 6); 
       ctx.stroke();
  }

  Point.prototype.near = function(p) {  
       return (p.x >= this.x-3 && p.x <= this.x+3 && p.y >= this.y-3 && p.y <= this.y+3 );  
  }

  Point.convert= function(obj){
      return (new Point(obj.x,obj.y));  
  }
  
  //---------------------Activiity-----------------------------------
  function Rack(organised,name,x, y, cellWidth, cellHeight, fromcol, tocol, deep, toprowtype, 
          isnumbered, txtxcor, txtycor,txtangle, txtfont, iscargo) {
    this.organised = organised;
    this.name = name;
    this.xcor = x;
    this.ycor = y;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.fromcol = fromcol;
    this.tocol = tocol;  
    
    this.deep = deep;
    this.toprowtype = toprowtype;
    this.isnumbered = isnumbered; 
    
    this.txtxcor = txtxcor;
    this.txtycor = txtycor;
    this.txtangle = txtangle;
    this.txtfont = txtfont;
    this.iscargo = iscargo;
  } 

  Rack.prototype.draw = function(ctx) {   
      ctx.lineWidth = 0.5 ;
      if (this.organised) { 
          var fontSize = ctx.font;
          ctx.font = '8px Arial'; 	
          if (this.isnumbered) {
              for(var i = this.fromcol; i <= this.tocol; i++) { 
                  ctx.fillText(i, this.xcor + (i - this.fromcol) * this.cellWidth, this.ycor);  
              } 
          }  
          ctx.font = fontSize; 
          
          var col = this.tocol - this.fromcol+1;
          // to draw vertical lines
          ctx.beginPath();
          ctx.lineWidth = 1;
          for(var i = this.fromcol; i <= this.tocol; i++) {  
              if (i % 3 == 1) {				
                  ctx.moveTo(this.xcor + (i - this.fromcol) * this.cellWidth, this.ycor);
                  ctx.lineTo(this.xcor + (i - this.fromcol) * this.cellWidth, this.ycor + this.deep * this.cellHeight);				
              }
          } 
          ctx.moveTo(this.xcor + (this.tocol +1 - this.fromcol) * this.cellWidth, this.ycor);
          ctx.lineTo(this.xcor + (this.tocol +1 - this.fromcol) * this.cellWidth, this.ycor + this.deep * this.cellHeight);
          ctx.stroke();
          // to draw horizontal lines
          if (this.toprowtype == 1 && this.deep == 2) {
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.moveTo(this.xcor , this.ycor);
              ctx.lineTo(this.xcor + col * this.cellWidth, this.ycor);
              ctx.stroke(); 
          }
          if (this.toprowtype == 2 && this.deep == 2) {
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.moveTo(this.xcor , this.ycor+ 2 * this.cellHeight);
              ctx.lineTo(this.xcor + col * this.cellWidth, this.ycor + 2 * this.cellHeight);
              ctx.stroke(); 
          }
           for(var j = 0; j <= this.deep; j++) { 
              ctx.beginPath();
              ctx.lineWidth = 1;
              ctx.moveTo(this.xcor , this.ycor+ j * this.cellHeight);
              ctx.lineTo(this.xcor + col * this.cellWidth, this.ycor + j * this.cellHeight);
              ctx.stroke();
          }  
      }
      else {  
          ctx.strokeRect(this.xcor,this.ycor, this.cellWidth, this.cellHeight);  
      }	
      drawText(ctx, this.txtxcor, this.txtycor,this.txtangle, this.txtfont, this.name);  
  }

  var canvas;
  var ctx;
  var racks = [];
  function getConfiguration(){
    canvas = document.getElementById("myCanvas");
   // canvas.addEventListener('click', mouseClickListener, false);
  //  canvas.addEventListener("mousedown", mouseDownListener, false); 
   // canvas.addEventListener("mouseup", mouseUpListener, false); 
   // canvas.addEventListener("mousemove", mouseMoveListener, false);
    ctx = canvas.getContext("2d");
  ctx.lineWidth = .5; 
  var rackstring = '[{"organised":true,"name":"N","xcor":370,"ycor":100,"cellWidth":11,"cellHeight":11,"fromcol":1,"tocol":36,"deep":2,"toprowtype":1,"isnumbered":true,"txtxcor":345,"txtycor":115,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"S4","xcor":60,"ycor":110,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":75,"txtycor":140,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"R4","xcor":110,"ycor":110,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":125,"txtycor":140,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"S3","xcor":60,"ycor":160,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":75,"txtycor":190,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":true,"name":"D","xcor":436,"ycor":440,"cellWidth":11,"cellHeight":11,"fromcol":1,"tocol":30,"deep":2,"toprowtype":2,"isnumbered":true,"txtxcor":411,"txtycor":450,"txtangle":0,"txtfont":16,"iscargo":true},{"organised":false,"name":"Q4","xcor":160,"ycor":110,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":175,"txtycor":140,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"P4","xcor":210,"ycor":110,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":225,"txtycor":140,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"O4","xcor":260,"ycor":110,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":275,"txtycor":140,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"R3","xcor":110,"ycor":160,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":125,"txtycor":190,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"Q3","xcor":160,"ycor":160,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":175,"txtycor":190,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"P3","xcor":210,"ycor":160,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":225,"txtycor":190,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"O3","xcor":260,"ycor":160,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":275,"txtycor":190,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":true,"name":"M","xcor":370,"ycor":150,"cellWidth":11,"cellHeight":11,"fromcol":1,"tocol":36,"deep":2,"toprowtype":2,"isnumbered":true,"txtxcor":345,"txtycor":160,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":true,"name":"L","xcor":370,"ycor":172,"cellWidth":11,"cellHeight":11,"fromcol":1,"tocol":36,"deep":2,"toprowtype":1,"isnumbered":false,"txtxcor":345,"txtycor":182,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":true,"name":"N","xcor":780,"ycor":100,"cellWidth":11,"cellHeight":11,"fromcol":37,"tocol":87,"deep":2,"toprowtype":1,"isnumbered":true,"txtxcor":null,"txtycor":null,"txtangle":0,"txtfont":null,"iscargo":true},{"organised":true,"name":"K","xcor":370,"ycor":222,"cellWidth":11,"cellHeight":11,"fromcol":1,"tocol":36,"deep":2,"toprowtype":2,"isnumbered":true,"txtxcor":345,"txtycor":232,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":true,"name":"J","xcor":370,"ycor":242,"cellWidth":11,"cellHeight":11,"fromcol":1,"tocol":36,"deep":2,"toprowtype":1,"isnumbered":false,"txtxcor":345,"txtycor":252,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":true,"name":"I","xcor":370,"ycor":285,"cellWidth":11,"cellHeight":11,"fromcol":1,"tocol":36,"deep":1,"toprowtype":1,"isnumbered":true,"txtxcor":345,"txtycor":285,"txtangle":0,"txtfont":14,"iscargo":true},{"organised":true,"name":"G","xcor":370,"ycor":335,"cellWidth":11,"cellHeight":11,"fromcol":1,"tocol":36,"deep":2,"toprowtype":1,"isnumbered":true,"txtxcor":345,"txtycor":345,"txtangle":0,"txtfont":15,"iscargo":true},{"organised":true,"name":"F","xcor":370,"ycor":380,"cellWidth":11,"cellHeight":11,"fromcol":1,"tocol":36,"deep":2,"toprowtype":2,"isnumbered":true,"txtxcor":345,"txtycor":390,"txtangle":0,"txtfont":18,"iscargo":true},{"organised":true,"name":"E","xcor":370,"ycor":402,"cellWidth":11,"cellHeight":11,"fromcol":1,"tocol":36,"deep":2,"toprowtype":1,"isnumbered":false,"txtxcor":345,"txtycor":412,"txtangle":0,"txtfont":18,"iscargo":true},{"organised":true,"name":"C","xcor":436,"ycor":462,"cellWidth":11,"cellHeight":11,"fromcol":1,"tocol":30,"deep":2,"toprowtype":1,"isnumbered":false,"txtxcor":411,"txtycor":472,"txtangle":0,"txtfont":18,"iscargo":true},{"organised":true,"name":"B","xcor":436,"ycor":510,"cellWidth":11,"cellHeight":11,"fromcol":1,"tocol":30,"deep":1,"toprowtype":1,"isnumbered":true,"txtxcor":411,"txtycor":520,"txtangle":0,"txtfont":16,"iscargo":true},{"organised":true,"name":"A","xcor":436,"ycor":521,"cellWidth":11,"cellHeight":11,"fromcol":1,"tocol":30,"deep":1,"toprowtype":1,"isnumbered":false,"txtxcor":411,"txtycor":531,"txtangle":0,"txtfont":18,"iscargo":true},{"organised":false,"name":"S1","xcor":60,"ycor":300,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":75,"txtycor":330,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"R2","xcor":110,"ycor":250,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":125,"txtycor":280,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"Q2","xcor":160,"ycor":250,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":175,"txtycor":280,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"P2","xcor":210,"ycor":250,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":225,"txtycor":280,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"O2","xcor":260,"ycor":250,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":275,"txtycor":280,"txtangle":0,"txtfont":18,"iscargo":true},{"organised":false,"name":"S2","xcor":60,"ycor":250,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":75,"txtycor":280,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"R1","xcor":110,"ycor":300,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":125,"txtycor":330,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"Q1","xcor":160,"ycor":300,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":175,"txtycor":330,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"P1","xcor":210,"ycor":300,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":225,"txtycor":330,"txtangle":0,"txtfont":18,"iscargo":true},{"organised":false,"name":"PATH","xcor":60,"ycor":210,"cellWidth":250,"cellHeight":40,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":160,"txtycor":240,"txtangle":0,"txtfont":18,"iscargo":true},{"organised":true,"name":"M","xcor":780,"ycor":150,"cellWidth":11,"cellHeight":11,"fromcol":37,"tocol":87,"deep":2,"toprowtype":2,"isnumbered":true,"txtxcor":null,"txtycor":null,"txtangle":0,"txtfont":null,"iscargo":true},{"organised":true,"name":"L","xcor":780,"ycor":172,"cellWidth":11,"cellHeight":11,"fromcol":37,"tocol":87,"deep":2,"toprowtype":1,"isnumbered":false,"txtxcor":null,"txtycor":null,"txtangle":0,"txtfont":null,"iscargo":true},{"organised":true,"name":"K","xcor":780,"ycor":222,"cellWidth":11,"cellHeight":11,"fromcol":37,"tocol":87,"deep":2,"toprowtype":2,"isnumbered":true,"txtxcor":null,"txtycor":null,"txtangle":0,"txtfont":null,"iscargo":true},{"organised":true,"name":"J","xcor":780,"ycor":242,"cellWidth":11,"cellHeight":11,"fromcol":37,"tocol":87,"deep":2,"toprowtype":1,"isnumbered":false,"txtxcor":null,"txtycor":null,"txtangle":0,"txtfont":null,"iscargo":true},{"organised":true,"name":"H","xcor":780,"ycor":298,"cellWidth":11,"cellHeight":11,"fromcol":37,"tocol":87,"deep":1,"toprowtype":1,"isnumbered":false,"txtxcor":null,"txtycor":null,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":true,"name":"G","xcor":780,"ycor":335,"cellWidth":11,"cellHeight":11,"fromcol":37,"tocol":87,"deep":2,"toprowtype":1,"isnumbered":true,"txtxcor":null,"txtycor":null,"txtangle":0,"txtfont":null,"iscargo":true},{"organised":true,"name":"F","xcor":780,"ycor":380,"cellWidth":11,"cellHeight":11,"fromcol":37,"tocol":87,"deep":2,"toprowtype":2,"isnumbered":true,"txtxcor":null,"txtycor":null,"txtangle":0,"txtfont":null,"iscargo":true},{"organised":true,"name":"E","xcor":780,"ycor":402,"cellWidth":11,"cellHeight":11,"fromcol":37,"tocol":87,"deep":2,"toprowtype":1,"isnumbered":false,"txtxcor":null,"txtycor":null,"txtangle":0,"txtfont":null,"iscargo":true},{"organised":true,"name":"D","xcor":780,"ycor":440,"cellWidth":11,"cellHeight":11,"fromcol":31,"tocol":81,"deep":2,"toprowtype":2,"isnumbered":true,"txtxcor":null,"txtycor":null,"txtangle":0,"txtfont":null,"iscargo":true},{"organised":true,"name":"C","xcor":780,"ycor":462,"cellWidth":11,"cellHeight":11,"fromcol":31,"tocol":81,"deep":2,"toprowtype":1,"isnumbered":false,"txtxcor":null,"txtycor":null,"txtangle":0,"txtfont":null,"iscargo":true},{"organised":true,"name":"B","xcor":780,"ycor":510,"cellWidth":11,"cellHeight":11,"fromcol":31,"tocol":81,"deep":1,"toprowtype":1,"isnumbered":true,"txtxcor":null,"txtycor":null,"txtangle":0,"txtfont":null,"iscargo":true},{"organised":true,"name":"A","xcor":780,"ycor":521,"cellWidth":11,"cellHeight":11,"fromcol":31,"tocol":81,"deep":1,"toprowtype":1,"isnumbered":false,"txtxcor":null,"txtycor":null,"txtangle":0,"txtfont":null,"iscargo":true},{"organised":true,"name":"H","xcor":370,"ycor":298,"cellWidth":11,"cellHeight":11,"fromcol":1,"tocol":36,"deep":1,"toprowtype":1,"isnumbered":false,"txtxcor":345,"txtycor":308,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":true,"name":"I","xcor":780,"ycor":285,"cellWidth":11,"cellHeight":11,"fromcol":37,"tocol":87,"deep":1,"toprowtype":1,"isnumbered":true,"txtxcor":null,"txtycor":null,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"SF2","xcor":490,"ycor":630,"cellWidth":100,"cellHeight":60,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":505,"txtycor":660,"txtangle":0,"txtfont":20,"iscargo":false},{"organised":false,"name":"SF3","xcor":610,"ycor":630,"cellWidth":100,"cellHeight":60,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":625,"txtycor":660,"txtangle":0,"txtfont":20,"iscargo":false},{"organised":false,"name":"SF4","xcor":730,"ycor":630,"cellWidth":100,"cellHeight":60,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":745,"txtycor":660,"txtangle":0,"txtfont":20,"iscargo":false},{"organised":false,"name":"SF5","xcor":850,"ycor":630,"cellWidth":100,"cellHeight":60,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":865,"txtycor":660,"txtangle":0,"txtfont":20,"iscargo":false},{"organised":false,"name":"SF6","xcor":970,"ycor":630,"cellWidth":100,"cellHeight":60,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":985,"txtycor":660,"txtangle":0,"txtfont":20,"iscargo":false},{"organised":false,"name":"MAIN GATE","xcor":10,"ycor":160,"cellWidth":30,"cellHeight":140,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":20,"txtycor":170,"txtangle":1.5707963267948966,"txtfont":20,"iscargo":true},{"organised":false,"name":"O1","xcor":260,"ycor":300,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":275,"txtycor":330,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"W2","xcor":370,"ycor":20,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":380,"txtycor":50,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"W3","xcor":530,"ycor":20,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":540,"txtycor":50,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"W4","xcor":690,"ycor":20,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":700,"txtycor":50,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"W5","xcor":850,"ycor":20,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":860,"txtycor":50,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"W6","xcor":1010,"ycor":20,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":1020,"txtycor":50,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"E1","xcor":210,"ycor":550,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":220,"txtycor":580,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"E2","xcor":370,"ycor":550,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":380,"txtycor":580,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"E3","xcor":530,"ycor":550,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":540,"txtycor":580,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"E4","xcor":690,"ycor":550,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":700,"txtycor":580,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"E5","xcor":850,"ycor":550,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":860,"txtycor":580,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"E6","xcor":1010,"ycor":550,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":1020,"txtycor":580,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"OFFICE","xcor":250,"ycor":450,"cellWidth":60,"cellHeight":60,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":255,"txtycor":480,"txtangle":0,"txtfont":14,"iscargo":true},{"organised":false,"name":"INS","xcor":130,"ycor":630,"cellWidth":100,"cellHeight":60,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":145,"txtycor":660,"txtangle":0,"txtfont":20,"iscargo":false},{"organised":false,"name":"Z","xcor":1390,"ycor":50,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":1410,"txtycor":85,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"REEFER","xcor":250,"ycor":630,"cellWidth":80,"cellHeight":60,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":250,"txtycor":660,"txtangle":0,"txtfont":20,"iscargo":false},{"organised":false,"name":"STP","xcor":10,"ycor":630,"cellWidth":100,"cellHeight":60,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":true,"txtxcor":25,"txtycor":660,"txtangle":0,"txtfont":20,"iscargo":false},{"organised":false,"name":"Y","xcor":1390,"ycor":130,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":1410,"txtycor":165,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"X","xcor":1390,"ycor":210,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":1410,"txtycor":245,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"W","xcor":1390,"ycor":290,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":1410,"txtycor":325,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"V","xcor":1390,"ycor":370,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":1410,"txtycor":405,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"U","xcor":1390,"ycor":450,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":1410,"txtycor":485,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"T","xcor":1390,"ycor":530,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":1410,"txtycor":565,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"SF1","xcor":370,"ycor":630,"cellWidth":100,"cellHeight":60,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":385,"txtycor":660,"txtangle":0,"txtfont":20,"iscargo":false},{"organised":false,"name":"SF7","xcor":1090,"ycor":630,"cellWidth":100,"cellHeight":60,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":1120,"txtycor":660,"txtangle":0,"txtfont":20,"iscargo":false},{"organised":false,"name":"STF","xcor":1210,"ycor":630,"cellWidth":100,"cellHeight":60,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":1235,"txtycor":660,"txtangle":0,"txtfont":20,"iscargo":false},{"organised":false,"name":"W1","xcor":210,"ycor":20,"cellWidth":50,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":220,"txtycor":50,"txtangle":0,"txtfont":20,"iscargo":true},{"organised":false,"name":"MAK","xcor":1390,"ycor":610,"cellWidth":60,"cellHeight":50,"fromcol":null,"tocol":null,"deep":null,"toprowtype":null,"isnumbered":false,"txtxcor":1395,"txtycor":645,"txtangle":0,"txtfont":20,"iscargo":true}]';
   var racks1 = JSON.parse(rackstring);
   for(var index in racks1){
        var rack = racks1[index];
        var txtDirection = 0;
        if(rack.txtDirection == 'Top to Bottom'){
            txtDirection = Math.PI / 2;
        }else if(rack.txtDirection == 'Left to Right'){
            txtDirection = 0;
        }else if(rack.txtDirection == 'Bottom to Top'){
            txtDirection = -Math.PI / 2;
        }
        racks.push(new Rack(rack.organised ,rack.name, rack.xcor, rack.ycor, rack.cellWidth, rack.cellHeight, 
                rack.fromcol, rack.tocol, rack.deep, rack.toprowtype, rack.isnumbered, rack.txtxcor, rack.txtycor, 
                txtDirection, rack.txtfont, rack.iscargo)); 
    }
   initialise();
  }
 function initialise(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);   
    for (var i = 0; i < racks.length; i++) {
        racks[i].draw(ctx); 
    } 	   
  } 
  var corner1 = null; var corner2 = null; 
  function markRack(ctx, inv, color) {
    var position = inv.location_id;
    var isorganised = inv.is_organised;
    var iscargo = inv.iscargo;
    var rackname = position;
    var io = '';
    var col = '';
    if(isorganised){
        rackname = position.substr(0,1);
        io = position.substr(1,1);	
        col = parseInt(position.substr(2,2));  
    }
    var rack = null;
    for (var i = 0; i < racks.length; i++) {
        var b = racks[i]; 
        if (isorganised && b.name == rackname &&  b.fromcol <= col && col <= b.tocol){ 		  
            rack = b;
        }else if(!isorganised && b.name == rackname){
            rack = b;
        }
    }
    
    if ((isorganised && rack)) {
         var fillStyle = ctx.fillStyle; 
         ctx.fillStyle = color;
         col = col - rack.fromcol;  
         var row = (rack.toprowtype == 1 ? io : io % 2 +1 ) - 1;
         ctx.fillRect((rack.xcor + col * rack.cellWidth)+2,  (rack.ycor+ row * rack.cellHeight)+2, rack.cellWidth - 1, rack.cellHeight - 1); 
         ctx.fillStyle = fillStyle;		 
    }else if (!isorganised && rack) {
         var fillStyle = ctx.fillStyle; 
         ctx.fillStyle = color;
         ctx.fillRect(rack.xcor, rack.ycor, rack.cellWidth-1, rack.cellHeight-1); 
         //ctx.fillStyle = "#fff"; 
         ctx.fillStyle = "black";
         ctx.font = '20px Arial';
         var rackname = "";
         if(iscargo){
             rackname = rack.name;
         }else{
             rackname = rack.name+"("+inv.rlevel+")";
         }
         ctx.fillText(rackname, rack.txtxcor, rack.txtycor);
    }
}  
  
function drawText(ctx,x,y, angle, fontsize, txt) {
    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(angle);
    ctx.textAlign = 'left';
    ctx.font = fontsize + 'px Arial';
    ctx.fillText(txt, 0, 0);
    ctx.restore(); 
}
 
function drawTextwithBorder(ctx,x,y, w, h, angle, fontsize, txt) {
    ctx.save();
//									ctx.lineWidth = "2"; 
    ctx.strokeStyle = "green";
    ctx.strokeRect(x,y, w, h);	
    ctx.translate(x+w/2,y+h/2);
    ctx.rotate(angle);
    ctx.textAlign = 'center';
    ctx.font = fontsize + 'px Arial';
    ctx.fillText(txt, 0, 0);
    ctx.restore(); 
} 

function GetPosition(event)  { 
    var x = new Number();
    var y = new Number(); 
    if (event.x != undefined && event.y != undefined)
    {
      x = event.x;
      y = event.y;
    }
    else // Firefox method to get the position
    {
      x = event.clientX + document.body.scrollLeft +  document.documentElement.scrollLeft;
      y = event.clientY + document.body.scrollTop +  document.documentElement.scrollTop;
    }
    var rect = canvas.getBoundingClientRect();
    var currX  = x - rect.left;
    var currY  = y - rect.top;

    return(new Point(currX, currY));  
} 

var xpos = 0;
var ypos = 0;
function mouseMoveListener(event) {
    var pos = GetPosition(event);
    xpos = Math.round(pos.x);
    ypos = Math.round(pos.y);
}

function mouseClickListener(event){

    var pos = GetPosition(event);  
    var rack = null;
    for (var i = 0; i < racks.length; i++) {
       var b = racks[i]; 
        if (((pos.x >= b.xcor) && (pos.x <= b.xcor + (b.tocol - b.fromcol +1) * b.cellWidth))  &&
            ((pos.y >= b.ycor) && (pos.y <= b.ycor + b.deep * b.cellHeight))
           ) {
           rack = b;
        }
    } 
    
    if (rack == null) {
        for (var i = 0; i < racks.length; i++) {
               var b = racks[i]; 
                    if((pos.x >= b.xcor) && (pos.x <= b.xcor+b.cellWidth) && (pos.y >= b.ycor) && (pos.y <= b.ycor + b.cellHeight)){
                         rack = b;
                    }
            } 
    }
    if ((Math.abs(corner1.x - corner2.x) < 2 && Math.abs(corner1.y - corner2.y) < 2)) {
        if (rack && rack.organised) {	  
            var col = rack.fromcol + Math.floor((pos.x - rack.xcor) / rack.cellWidth);		 
            var row = Math.ceil((pos.y - rack.ycor) / rack.cellHeight);	 
            var io = (rack.toprowtype == 1 ? row : row % 2 +1 ); 
            var loc = rack.name+ io + ('0'+col).slice(-2);
            //$scope.rLevelDialog($scope, $http, loc, ngDialog, logger, $rootScope, $stateParams, $state, 'O', rack.iscargo);
        }else if(rack && !rack.organised){
            var loc = rack.name;
          //  $scope.rLevelDialog($scope, $http, loc, ngDialog, logger, $rootScope, $stateParams, $state, 'UO', rack.iscargo);
        }
    }
}

function mouseDownListener(event) {
    corner1 = GetPosition(event);
}

function mouseUpListener(event) {
    var pos = GetPosition(event);
    if (corner1) {
        corner2 = pos;
    }
    if (corner1 && corner2) {
        //$scope.initialise();
       // $scope.drawRack();
        //$scope.drawEquipment();
        if (!(Math.abs(corner1.x - corner2.x) < 2 && Math.abs(corner1.y - corner2.y) < 2)) {
            drawRect(corner1, corner2);
        }
    }
}

function drawRect(corner1, corner2) {    
    var x1,y1, x2,y2;
    
    if (corner1.x <  corner2.x) {
        x1=corner1.x; x2=corner2.x;
    }
    else {
        x1 =corner2.x; x2=corner1.x;
    }
    if (corner1.y <  corner2.y) {
        y1=corner1.y; y2=corner2.y;
    }
    else {
        y1 =corner2.y; y2=corner1.y;
    } 
    
    for (var i = 0; i < racks.length; i++) {
        var b = racks[i]; 
        if (b.organised){
            //var row = b.row;
            var row = 6;
            if(y1 > b.ycor && y1 < b.ycor + b.deep * b.cellHeight){
                y1 = Math.min(y1, b.ycor);  
            }
            if(y2 > b.ycor && y2 < b.ycor + b.deep * b.cellHeight){
                y2 = Math.max(y2, b.ycor + b.deep * b.cellHeight);
            }
        }		 
    }    
}
function Rack(organised,name,x, y, cellWidth, cellHeight, fromcol, tocol, deep, toprowtype, 
    isnumbered, txtxcor, txtycor,txtangle, txtfont, iscargo) {
    this.organised = organised;
    this.name = name;
    this.xcor = x;
    this.ycor = y;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.fromcol = fromcol;
    this.tocol = tocol;  

    this.deep = deep;
    this.toprowtype = toprowtype;
    this.isnumbered = isnumbered; 

    this.txtxcor = txtxcor;
    this.txtycor = txtycor;
    this.txtangle = txtangle;
    this.txtfont = txtfont;
    this.iscargo = iscargo;
} 

Rack.prototype.draw = function(ctx) {   
    ctx.lineWidth = 0.5 ;
    if (this.organised) { 
        var fontSize = ctx.font;
        ctx.font = '8px Arial'; 	
        if (this.isnumbered) {
            for(var i = this.fromcol; i <= this.tocol; i++) { 
                ctx.fillText(i, this.xcor + (i - this.fromcol) * this.cellWidth, this.ycor);  
            } 
        }  
        ctx.font = fontSize; 
        
        var col = this.tocol - this.fromcol+1;
        // to draw vertical lines
        ctx.beginPath();
        ctx.lineWidth = 1;
        for(var i = this.fromcol; i <= this.tocol; i++) {  
            if (i % 3 == 1) {				
                ctx.moveTo(this.xcor + (i - this.fromcol) * this.cellWidth, this.ycor);
                ctx.lineTo(this.xcor + (i - this.fromcol) * this.cellWidth, this.ycor + this.deep * this.cellHeight);				
            }
        } 
        ctx.moveTo(this.xcor + (this.tocol +1 - this.fromcol) * this.cellWidth, this.ycor);
        ctx.lineTo(this.xcor + (this.tocol +1 - this.fromcol) * this.cellWidth, this.ycor + this.deep * this.cellHeight);
        ctx.stroke();
        // to draw horizontal lines
        if (this.toprowtype == 1 && this.deep == 2) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(this.xcor , this.ycor);
            ctx.lineTo(this.xcor + col * this.cellWidth, this.ycor);
            ctx.stroke(); 
        }
        if (this.toprowtype == 2 && this.deep == 2) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(this.xcor , this.ycor+ 2 * this.cellHeight);
            ctx.lineTo(this.xcor + col * this.cellWidth, this.ycor + 2 * this.cellHeight);
            ctx.stroke(); 
        }
        for(var j = 0; j <= this.deep; j++) { 
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.moveTo(this.xcor , this.ycor+ j * this.cellHeight);
            ctx.lineTo(this.xcor + col * this.cellWidth, this.ycor + j * this.cellHeight);
            ctx.stroke();
        }  
    }
    else {  
        ctx.strokeRect(this.xcor,this.ycor, this.cellWidth, this.cellHeight);  
    }	
    drawText(ctx, this.txtxcor, this.txtycor,this.txtangle, this.txtfont, this.name);  
}