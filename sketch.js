//node feature vars
var unit;
var count;
var mods = [];
var diameter;
var effectors1 = []; var effectors2 = []; var effectors3 = []; var effectors4 = [];
//page feature vars
var button1; var button2; var button3;
var slider; var pRewire; var sliderLabel; var sliderLabel2;
var slider2; var sliderLabel3; var button5; var input;
//node position vars
var radialShiftFactor = [];  var shiftSelect = []; var h = 1;
var cx; var randShiftX; var randShiftY; var cy; var rad; var r;
var shiftRange = count/2; var index;

function setup() {
  createCanvas(600, 600);
  frameRate(15);
  background(255);

	slider = createSlider(0.6, 1, -1, 0.0005); 
    slider.position(120, 100);	
	  slider.style('width', '150px');

	sliderLabel = createElement('h2', 'Local');
	  sliderLabel.position(slider.x-62, slider.y-21);	 

	sliderLabel2 = createElement('h2', 'Global');
	  sliderLabel2.position(slider.x+157, slider.y-21);	 
  
  label = createElement('h2', 'Click on a Node')
  label.position(slider.x, slider.y-75);
	
	button1 = createButton('-Rewire-');
  	button1.position(slider.x+45, slider.y+25);
  	button1.mousePressed(makeGraph);   
	
	button2 = createButton('All Nodes ON');
    button2.position(slider.x+30, slider.y+75);
  	button2.mousePressed(allNodesON); 



  unit = 60;
  count = (width / unit) * (height / unit);
  cx = width/2;
  cy = height/2;
  rad = TWO_PI/count;
  r = width/2-width/24;
  
  shiftRange = count/2;

  //var g = slider2.value();
  for (var z = 0; z<shiftRange; z++){
      radialShiftFactor[z] = h;
      h = h - 0.7/shiftRange;
      }
  for (var n = 0; n<count; n++){
      shiftSelect[n] = int(random(radialShiftFactor.length));
      //radialShiftFactor.length-1));
      }
  reset();
    
} 

function reset(){
 var index = 0;
  //unit = input.value();//25;//int(slider2.value());
  //diameter = slider2.value();
 
	for (var y = 0; y < count; y++) {
  		var shift = radialShiftFactor[shiftSelect[y]];
  		var xPos1 = cx + ((shift*r)*cos(rad*index));
  		var yPos1 = cy + ((shift*r)*sin(rad*index)); 
      		mods[index] = new Module(xPos1, yPos1, index, 0, 
               		//node,      effectorSign
                   	0, -1 + (int(random(2)) * 2),
                   	0, -1 + (int(random(2)) * 2), 
                   	0, -1 + (int(random(2)) * 2), 
                   	0, -1 + (int(random(2)) * 2), 
                	//diameter, tempState
                    	unit/2, 0); 
      		index++;
	  			}
  //pRewire++;
   }

function makeGraph() {

for (var j=0; j<mods.length; j++){
  mods[j].drawEdges(); 
  mods[j].rewireEdges(); 
  mods[j].recordEffectors();
  mods[j].s = 0;
       }
  //sortEffectors();
}    

function draw() {
    
background(255);


 for (var r=0; r<count; r++){
    mods[r].display();
    mods[r].tempState();
       }       

 for (var n=0; n<count; n++){
    mods[n].update();  
       }            

if(slider.value() != pRewire){	
	pRewire = slider.value();
  makeGraph();
  //sortEffectors();
  //reset();
	}
}


function activate(){
var targetNode = int(random(count));

if(mods[targetNode].s==0){
mods[targetNode].s = 1;   
 	} else {
	activate();
		}
} 

function allNodesON(){
for(var n=0; n<count; n++){
mods[n].s=1;
	}

}

function mousePressed(){
  for(var n=0; n<count; n++){
 var d = dist(mouseX, mouseY, mods[n].xPos, mods[n].yPos);
      if(d<10){
        mods[n].s = 1;   
              }
 }
}

function sortEffectors(){
var shiftSelect = [];
var allEffectors = effectors1.concat(effectors2, effectors3, effectors4);
var freq = {};
var i = allEffectors.length;
  for(var i; i>-1; i--){
    var value = allEffectors[i];
    freq[value] == null?freq[value]=1:freq[value]++;
          }
  for (var value in freq){
    shiftSelect.push(value);
          }    
        //  reset();

}

function Module(_xOffset, _yOffset, _nodeID, _sign, _node1, _eSign1, _node2, _eSign2, _node3, _eSign3, _node4, _eSign4, _size, _s) {
    this.xPos = _xOffset;
    this.yPos = _yOffset;
    
    this.nodeNum = _nodeID;
    this.s = _sign;
    
    this.effectorNode_1 = _node1; 
    this.effectorSign_1 = _eSign1;
    this.effectorNode_2 = _node2;
    this.effectorSign_2 = _eSign2;
    this.effectorNode_3 = _node3;
    this.effectorSign_3 = _eSign3;
    this.effectorNode_4 = _node4;
    this.effectorSign_4 = _eSign4;
    
    this.diameter = _size;
    this.s1 = _s;

  }    

Module.prototype.drawEdges = function(){
this.diameter = unit/2;

if(this.nodeNum==0){ 
     this.effectorNode_1 = mods[mods.length-1];
     this.effectorNode_2 = mods[this.nodeNum+1];
     this.effectorNode_3 = mods[mods.length-2];
     this.effectorNode_4 = mods[this.nodeNum+2];
               } else if (this.nodeNum==mods.length-1){
                     this.effectorNode_1 = mods[this.nodeNum-1];
                     this.effectorNode_2 = mods[0];
                     this.effectorNode_3 = mods[this.nodeNum-2];
                     this.effectorNode_4 = mods[1];
                     }
                 else if (this.nodeNum==1){
                     this.effectorNode_1 = mods[0];
                     this.effectorNode_2 = mods[2];
                     this.effectorNode_3 = mods[mods.length-1];
                     this.effectorNode_4 = mods[3];              
                      }
                 else if (this.nodeNum==mods.length-2){
                     this.effectorNode_1 = mods[mods.length-3];
                     this.effectorNode_2 = mods[mods.length-1];
                     this.effectorNode_3 = mods[mods.length-4];
                     this.effectorNode_4 = mods[0];
                      } else {
                         this.effectorNode_1 =  mods[this.nodeNum-1];
                         this.effectorNode_2 = mods[this.nodeNum+1];
                         this.effectorNode_3 = mods[this.nodeNum-2];
                         this.effectorNode_4 = mods[this.nodeNum+2];
                             }          
}

Module.prototype.rewireEdges = function(){
  var pRewire = 1.6-slider.value();
  if(random(1)>pRewire){
    this.effectorNode_1 = mods[int(random(count))];
        }
  if(random(1)>pRewire){
    this.effectorNode_2 = mods[int(random(count))];
        }
  if(random(1)>pRewire){
    this.effectorNode_3 = mods[int(random(count))];
        }
  if(random(1)>pRewire){
    this.effectorNode_4 = mods[int(random(count))];
        }
}

Module.prototype.recordEffectors = function() {
  
  effectors1[this.nodeNum] = this.effectorNode_1;
  effectors2[this.nodeNum] = this.effectorNode_2;
  effectors3[this.nodeNum] = this.effectorNode_3;
  effectors4[this.nodeNum] = this.effectorNode_4;
}

Module.prototype.display = function() {   
randShiftX = random(-unit/55, unit/55);
randShiftY = random(-unit/55, unit/55);
   fill(250*this.s, 250*this.s, 0);
   stroke(0, 0, 0);
   strokeWeight(this.diameter/50);
   ellipse(this.xPos+randShiftX, this.yPos+randShiftY, this.diameter, this.diameter);   
      
/*for(r=0; r<3; r++)
{
      if(this.effectorSign_[r]>0){
           strokeWeight(this.diameter/30);
           line(this.xPos, this.yPos, this.effectorNode_[r].xPos, this.effectorNode_[r].yPos);

      } else {
           stroke('red');
     strokeWeight(this.diameter/30);
       line(this.xPos, this.yPos, this.effectorNode_[r].xPos, this.effectorNode_[r].yPos);
         ellipse(this.xPos, this.yPos, this.diameter/10, this.diameter/10);
        }
}*/
   
   if (this.effectorSign_1>0)
   {
    stroke('blue');  
    strokeWeight(this.diameter/30);
    line(this.xPos+randShiftX, this.yPos+randShiftY, this.effectorNode_1.xPos, this.effectorNode_1.yPos);
 
 } 
   
   else 
       {
     stroke('red');
     strokeWeight(this.diameter/30);
       line(this.xPos+randShiftX, this.yPos+randShiftY, this.effectorNode_1.yPos);
         ellipse(this.xPos+randShiftX, this.yPos+randShiftY, this.diameter/10, this.diameter/10);
         
       }
       
    if (this.effectorSign_2>0)
   {    
      stroke('blue');  
      strokeWeight(this.diameter/30);
      line(this.xPos+randShiftX, this.yPos+randShiftY, this.effectorNode_2.xPos, this.effectorNode_2.yPos);

   }  else 
       {
     stroke('red');
      strokeWeight(this.diameter/30);
        line(this.xPos+randShiftX, this.yPos+randShiftY, this.effectorNode_2.xPos, this.effectorNode_2.yPos);
         ellipse(this.xPos+randShiftX, this.yPos+randShiftY, this.diameter/10, this.diameter/10);
       }
       
         if (this.effectorSign_3>0)
   {    
      stroke('blue');  
      strokeWeight(this.diameter/30);
      line(this.xPos+randShiftX, this.yPos+randShiftY, this.effectorNode_3.xPos, this.effectorNode_3.yPos);

   }  else 
       {
     stroke('red');
      strokeWeight(this.diameter/30);
        line(this.xPos+randShiftX, this.yPos+randShiftY, this.effectorNode_3.xPos, this.effectorNode_3.yPos);
         ellipse(this.xPos+randShiftX, this.yPos+randShiftY, this.diameter/10, this.diameter/10);
       }
       
         if (this.effectorSign_4>0)
   {    
      stroke('blue');  
      strokeWeight(this.diameter/30);
      line(this.xPos+randShiftX, this.yPos+randShiftY, this.effectorNode_4.xPos, this.effectorNode_4.yPos);

   }  else 
       {
     stroke('red');
      strokeWeight(this.diameter/30);
        line(this.xPos, this.yPos, this.effectorNode_4.xPos, this.effectorNode_4.yPos);
         ellipse(this.xPos+randShiftX, this.yPos+randShiftY, this.diameter/10, this.diameter/10);
       }
 fill(0, 0, 0); 
}
 
Module.prototype.tempState = function(){
  this.s1 = this.s;
  }
 
Module.prototype.update = function(){

if((this.effectorNode_1.s1 * this.effectorSign_1) + (this.effectorNode_2.s1 * this.effectorSign_2) + (this.effectorNode_3.s1 * this.effectorSign_3) + (this.effectorNode_4.s1 * this.effectorSign_4) > 0) 
      {
    this.s = 1;
      } 
  else if((this.effectorNode_1.s1 * this.effectorSign_1) + (this.effectorNode_2.s1 * this.effectorSign_2)+(this.effectorNode_3.s1 * this.effectorSign_3) + (this.effectorNode_4.s1 * this.effectorSign_4) < 0) 
      {
    this.s = 0;
      } 
  else if((this.effectorNode_1.s1 * this.effectorSign_1) + (this.effectorNode_2.s1 * this.effectorSign_2)+(this.effectorNode_3.s1 * this.effectorSign_3) + (this.effectorNode_4.s1 * this.effectorSign_4) == 0) 
      {
    this.s = this.s1;
      }

if(this.s == 1){
    this.diameter = (unit/2)+10;
   } else {
    this.diameter = unit/2;
   }


function reWire() {

for (var j=0; j<mods.length; j++)   {
  mods[j].drawEdges(); 
       }

for (var p=0; p<mods.length; p++)   {
   mods[p].rewireEdges(); 
       }
   } 


}