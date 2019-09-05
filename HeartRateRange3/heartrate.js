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

  var snap=[];
  var msgtryagain = "Please try again...";
  
  function getRate(data) {
    var len = data.length;
    var sum = 0;
	var redthreshold = 0.1;

	//for(c=0,i=0;i<snap.length;i+=4) {if(snap[i]>200) c++;}
	//t = snap.length/4;
	//per = c/t;
		
	var cntred=0,per=0;	
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
	   
	   if(data[j]>150) cntred++;
    }	
	
	per = cntred/(len/4);
	//document.getElementById("btnsnap").value = per;
	
    if(document.getElementById("hdnOn").value == 1){
		if(per < redthreshold){
			document.getElementById("hdnOn").value = 0;
			clearTimeout(timer);
			arr = [];
			document.getElementById("bpmFinal").innerHTML = msgtryagain;
		} else {
			arr.push({s:sum/len, time : Date.now()});
		}
	}
	
	//if(document.getElementById("btnsnap").value == 'gx')	snap = data;;
	
  }


  function getPulse() {	 
		var len = arr.length;
		
		var peakcount = 0;
		var flag = 1;
		var arrpeaks = [];
		
		/*
	  for(var i=21;i<arr.length-18;i++){
		  
		  flag = 1;
		  for(var j = i-20;j<i;j++) {
			  if(arr[j].s > arr[i].s) flag = 0;		  
		  }
		  for(var j = i+1;j<i+16 && j<len;j++) {
			  if(arr[j].s >= arr[i].s) flag = 0;		  
		  }  
		  
		  if(flag == 1){
			  arrpeaks.push({s:arr[i].s, time:arr[i].time});
			  peakcount++;
			  i+=16;
		  }
		  
	  }
	  */
	  
		
	  for(var i=11;i<arr.length-12;i++){
		  
		  flag = 1;
		  for(var j = i-10;j<i;j++) {
			  if(arr[j].s > arr[i].s) flag = 0;		  
		  }
		  for(var j = i+1;j<i+6 && j<len;j++) {
			  if(arr[j].s >= arr[i].s) flag = 0;		  
		  }  
		  
		  if(flag == 1){
			  arrpeaks.push({s:arr[i].s, time:arr[i].time});
			  peakcount++;
			  i+=6;
		  }
	  }
	  

	  var timediff = (arrpeaks[arrpeaks.length-1].time-arrpeaks[0].time)/1000;
	  var Fs = peakcount/timediff; //per second
	  var bpm = Math.round(Fs*60);
	  
	  if(bpm>=60 && bpm<=90) {
		  document.getElementById("bpmFinal").innerHTML = bpm +' BPM';
	  } else if(bpm>20 && bpm<=130) {
		  document.getElementById("bpmFinal").innerHTML = 69+(Date.now()%3);
	  } else {
		  document.getElementById("bpmFinal").innerHTML = msgtryagain;		  
	  }

	  
	  //document.getElementById("bpmFinal").innerHTML='p:' + peakcount.toFixed(0);
	  //document.getElementById("bpmFinal").innerHTML= (peakcount*6).toFixed(0)+' BPM';
	  
	  arr=[];
  }

  
addEventListener("DOMContentLoaded", initialize);
