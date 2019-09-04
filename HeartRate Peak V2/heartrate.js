var video, width, height, context, bpm;
var arr = [];
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

var constraints = {video: true, audio:false};

function initialize() {
navigator.mediaDevices.enumerateDevices().then(function(devices) {
  devices.forEach(function(device) {
    if (device.kind=="videoinput" /*&& constraints.video===true*/)
      constraints.video = { optional: [{sourceId: device.deviceId}, { fillLightMode: "on" }] };
  });
  initializeVideo();
}).catch(function(err) {
  console.log(err.name + ": " + err.message);
});
}
  
  
  function initializeVideo() {
    video = document.getElementById("video");
    width = video.width;
    height = video.height;
    var canvas = document.getElementById("canvasvideo");
    context = canvas.getContext("2d");

    bpm = document.getElementById("bpm");
    
    navigator.getUserMedia(constraints, startStream, function () {});
  }

  function startStream(stream) {
    video.srcObject = stream;
    video.play();
    requestAnimationFrame(draw);
  }

  function draw() {
    var frame = readFrame();
    if (frame) {
      getRate(frame.data);      	  
    }
    requestAnimationFrame(draw);
  }

  function readFrame() {
    try {
      context.drawImage(video, 0, 0, width, height);
    } catch (e) {
      return null;
    }

    return context.getImageData(0, 0, width, height);
  }

  
  function getRate(data) {
    var len = data.length;
    var sum = 0;

		
	//calculate rgb to hsv and get v value
    for (var i = 0, j = 0; j < len; i++, j += 4) {
       r= data[j]/255; g= data[j+1]/255; b= data[j+2]/255;
	   if(r>g)
		   cmax=r;
	   else if (g>b)
		   cmax=g;
	   else
		   cmax=b;
	   v=cmax*100;
	   sum += v; 
    }	
    if(document.getElementById("hdnOn").value == 1)	arr.push({s:sum/len, t : Date.now()});
  }


Array.prototype.stanDeviate = function(){
   var i,j,total = 0, mean = 0, diffSqredArr = [];
   for(i=0;i<this.length;i+=1){
       total+=this[i];
   }
   mean = total/this.length;
   for(j=0;j<this.length;j+=1){
       diffSqredArr.push(Math.pow((this[j]-mean),2));
   }
   return (Math.sqrt(diffSqredArr.reduce(function(firstEl, nextEl){
            return firstEl + nextEl;
          })/this.length));
};

Array.prototype.sum = function() {
    return this.reduce(function(a,b){return a+b;});
};


var real = [];
var standi = [];
var fftmag = [];
//const size = 512;
var size = 512;

function getPulse() {	 
	
	alert(arr.length);
	
	if(arr.length >= 512)
		size = 512;
	else if(arr.length >= 256)
		size = 256;
	else if(arr.length >= 128)
		size = 128;
  
  
	for(i=0;i<size;i++) {
		real[i] = arr[i].s;
	}
	
	timediff = (arr[size-1].t - arr[0].t)/1000;
	//timediff = 9.713//time diff in seconds
	
	
	var stddev = real.stanDeviate();  
	var mean = real.sum() / real.length;


	//standardize
	for(i=0;i<size;i++) {
		standi[i] = (real[i]-mean)/stddev;
	}

		
	var imaginary = new Array(real.length); 
	imaginary.fill(0);   

	transform(standi,imaginary);
  
	//abs complex
	for(i=0;i<size;i++) {
		fftmag[i] = (2/size)*(Math.sqrt((standi[i]*standi[i])+(imaginary[i]*imaginary[i])));
	}
  
    //find the peak from 0.5-2.5Hz. multiply that peak's frequency with 60s.
	var index = 0;
	var max = fftmag[0];
	for(i=0;i<size;i++) {
		if(fftmag[i]>=0.5 && fftmag[i]<=2.5 && fftmag[i]>max) {
			index = i+1;
			max = fftmag[i];
		}
		
	}
  
    fs=size/timediff; 
	fftfreq=index*(fs/size);
	bpm = fftfreq*60;
	
	  document.getElementById("bpmFinal").innerHTML= Math.round(bpm) +' BPM';
	  arr=[];
  
  }
  
addEventListener("DOMContentLoaded", initialize);