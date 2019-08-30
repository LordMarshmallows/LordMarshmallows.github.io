(function(){
var audio, play, src, arr, context, positionX=3,bottom=1050,bitLenght=3.8,widthLine=10,

circles=[];
var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    
    w = canvas.width = innerWidth,
    h = canvas.height = innerHeight,
audio=document.getElementById("audio");
play=document.getElementById("play");
var gradient = ctx.createLinearGradient(0, 0, 0, bottom);
gradient.addColorStop("0", 'rgb(255,22,130,1)');

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
    /*ctx.arc(this.x,this.y,5,0,Math.PI*2,);
    ctx.closePath();
    ctx.fillStyle='rgb(255,22,130)';
    ctx.fill();*/
    
    }
}

play.onclick=function(){
    if(!context){
        preparation();
    }
    if(audio.paused){
        audio.play();
        
        loop();
        play.src="image/faceStop.png";
       
    }else{
        audio.pause();
        play.src="image/facePlay.png";
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
        }
       /* arr = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(arr);
        
        if (canvas.getContext){
           
            
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'rgba(255, 40, 40, '+100+')';
            ctx.filter = "none";
            let x=0;
            ctx.beginPath();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for(let i=0;i<1200;i+=10){
                
           
            
            
            ctx.arc(i,1050-arr[x]*3.3,3.5,0,Math.PI*2,true); 
            ctx.moveTo(i,1050-arr[x]*3.3);
          
           
           
            
            x++;
        }
        ctx.closePath();
        ctx.stroke();*/
        
       
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
        for(var i = 0 ; i < 96 ; i++){
            circles.push(new Circle);
        circles[i].draw();
    }
    }
    function init(){
        initialization();
        
      
       
 
 
       
        

        
    }

    init();
   
}())




/*for(let i=0;i<1200;i+=10){
                
    ctx.lineWidth = '2';
    ctx.strokeStyle = 'rgba(255, 40, 40, '+100+')';
    ctx.filter = "none";
    ctx.beginPath();
    
    ctx.arc(i,1050-arr[x]*3.3,3.5,0,Math.PI*2,true); 
    
  
    ctx.closePath();
   
    ctx.stroke();*/