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
    if(document.getElementById("hdnOn").value == 1)	arr.push({s:sum/len, time : Date.now()});
  }

  
  function getPulse() {	 
		var len = arr.length;
		var peakcount = 0;
		var flag = 1;
		
	  for(var i=21;i<arr.length-18;i++){
		  
		  flag = 1;
		  for(var j = i-20;j<i;j++) {
			  if(arr[j].s > arr[i].s) flag = 0;		  
		  }
		  for(var j = i+1;j<i+16 && j<len;j++) {
			  if(arr[j].s >= arr[i].s) flag = 0;		  
		  }  
		  
		  if(flag == 1){
			  peakcount++;
			  i+=16;
		  }
	  }

	  document.getElementById("bpmFinal").innerHTML='p:' + peakcount.toFixed(0);
	  arr=[];
  }
  
addEventListener("DOMContentLoaded", initialize);
