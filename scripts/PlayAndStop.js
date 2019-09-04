(function(){
var audio, play,helmet, src, arr, context, positionX=3,bottom=1050,bitLenght=3.8,widthLine=10,

circles=[];
var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    
    w = canvas.width = innerWidth,
    h = canvas.height = innerHeight,
audio=document.getElementById("audio");
play=document.getElementById("helmet");

var gradient = ctx.createLinearGradient(0, 0, 0, bottom);
gradient.addColorStop("0", 'rgb(255,22,130,1)');
helmet=document.getElementById("helmet").style;
gradient.addColorStop("1", 'rgba(255,22,130,0)');
document.querySelector('body').appendChild(canvas);

window.onresize = function(){
    w = canvas.width = innerWidth,
    h = canvas.height = innerHeight; 
   
    initialization(); 
}

class Circle{
    constructor(){
        this.x=positionX;
        this.y=bottom;
        positionX=positionX+widthLine*2;
    }
    draw(){
   
    ctx.lineWidth = widthLine;
    ctx.strokeStyle =  gradient;
    ctx.beginPath();
    ctx.moveTo(this.x,bottom);
    ctx.lineTo(this.x,this.y);
    ctx.closePath();
    ctx.stroke();

    
    }
}

play.onclick=function(){
    if(!context){
        preparation();
    }
    if(audio.paused){
        audio.play();
        
        loop();
        play.src="image/helmetStop.png";
       
    }else{
        audio.pause();
        play.src="image/helmetPlay.png";
       
        loop();
    }
}

function preparation(){
    context=new AudioContext();
    analyser=context.createAnalyser();
    src=context.createMediaElementSource(audio);
    src.connect(analyser);
    
    analyser.connect(context.destination);
    
    }

    


    function loop(){
        if(audio.ended){
            audio.src="musik/1.mp3";
            audio.play();
        }
        if(!audio.paused){
            window.requestAnimationFrame(loop);
        }
        arr = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(arr);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(var i in circles){
            circles[i].y=bottom-arr[i]*bitLenght;
            circles[i].draw();
            if(arr[40]>70){
            helmet.height=(arr[40]/6)+"%";
            helmet.width=window.width/100*(arr[40]/9);
            helmet.left
        }
        }
      
       
    }
    function initialization(){
        widthLine= document.documentElement.clientWidth/(192);   
        positionX=3;
        circles=[];
        bottom=document.documentElement.clientHeight;
        gradient = ctx.createLinearGradient(0, 0, 0, bottom);
        gradient.addColorStop("0", 'rgb(255,22,130,1)');
        gradient.addColorStop("1", 'rgba(255,22,130,0)');
        bitLenght=document.documentElement.clientHeight/284,2105;
        for(var i = 0 ; i < 100 ; i++){
            circles.push(new Circle);
        circles[i].draw();
    }
    }
        initialization();     
   
}())
