var context, controller, rectangle, loop, score=0;

document.getElementById("score").innerHTML=score;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 300;
context.canvas.width = 700;

rectangle = {

  height:32,
  jumping:true,
  width:32,
  x:200, // center of the canvas
  x_velocity:0,
  y:0,
  y_velocity:0

};
coin={
  x:Math.floor(Math.random() * (700-250)+250),
  y:100
};



controller = {

  left:false,
  right:false,
  up:false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// left key
        controller.left = key_state;
      break;
      case 38:// up key
        controller.up = key_state;
      break;
      case 39:// right key
        controller.right = key_state;
      break;

    }

  }

};
var coincolor="yellow";
var coincatch=0;
var obsw=Math.floor(Math.random() * (70-20)+20);
var obsh=Math.floor(Math.random() * (80-20)+20);
var temp=0;




loop = function() {
  mysound=document.getElementById("mysound");
  gameover=document.getElementById("gameover");
  document.getElementById("score").innerHTML=score;


if(rectangle.x<132&&rectangle.x>100&&temp==0&&rectangle.y+32>164-obsh){
  gameover.play();
  
  setTimeout(() => {
    alert("Your Score is "+score);
    window.location.reload();
  }, 10);

temp=1;
}
if(rectangle.x+obsw<132&&rectangle.x+obsw>100&&temp==0&&rectangle.y+32>164-obsh){
  gameover.play();
  setTimeout(() => {
    alert("Your Score is "+score);
    window.location.reload();
  }, 10);
  temp=1;
}



if(((coin.x-10<132&&coin.x-10>100)||(coin.x+10<132&&coin.x+10>100))&&coincatch==0&&(coin.y+10>rectangle.y&&coin.y-10<rectangle.y+32)){
  coincatch=1;
  coincolor="#202020";
  score++;
mysound.play();
}



  if (controller.up && rectangle.jumping == false) {

    rectangle.y_velocity -= 30;
    rectangle.jumping = true;

  }

  if (controller.left) {

    rectangle.x_velocity += 0;
    coin.x_velocity += 0;
  }

  if (controller.right) {

    rectangle.x_velocity -= 0.5;
    coin.x_velocity -= 0.5;
  }

  rectangle.y_velocity += 1.5;// gravity
  rectangle.x += rectangle.x_velocity;
  coin.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;
  rectangle.x_velocity *= 0.9;// friction
  rectangle.y_velocity *= 0.9;// friction

  // if rectangle is falling below floor line
  if (rectangle.y > 180 - 16 - 32) {

    rectangle.jumping = false;
    rectangle.y = 180 - 16 - 32;
    rectangle.y_velocity = 0;

  }

  // if rectangle is going off the left of the screen
  if (rectangle.x < -32) {
obsw=Math.floor(Math.random() * (60-20)+20);
obsh=Math.floor(Math.random() * (70-20)+20);
    rectangle.x = 700;

  } else if (rectangle.x > 700) {// if rectangle goes past right boundary

    rectangle.x = -32;

  }

  if (coin.x < -32) {
    coin.y=Math.floor(Math.random() * (70-20)+20);
        coin.x = 700;
        coincatch=0;
        coincolor="yellow";
    
      } else if (coin.x > 700) {// if rectangle goes past right boundary
    
        coin.x = -32;
    
      }

  context.fillStyle = "#202020";
  context.fillRect(0, 0, 700, 300);// x, y, width, height
  context.fillStyle = "green";// hex for red
  context.beginPath();
  context.rect(100, rectangle.y, rectangle.width, rectangle.height);
  context.fill()
  context.fillStyle = "red";// hex for red
  context.beginPath();
  context.rect(rectangle.x,164-obsh,obsw,obsh);
  context.fill();
  context.strokeStyle = "#202830";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, 164);
  context.lineTo(700, 164);
  context.stroke();
  context.fillStyle = coincolor;
  context.beginPath();
  context.arc(coin.x, coin.y, 10, 0, 2 * Math.PI);
  context.fill();
  

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);