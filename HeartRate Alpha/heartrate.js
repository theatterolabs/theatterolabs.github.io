var video, width, height, context, bpm;
var arrHistogram = []; arrPulses = [];
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

	//get R G B 
    for (var i = 0, j = 0; j < len; i++, j += 4) {
      sum += data[j] + data[j+1] + data[j+2] + data[j+3]; //considering alpha
    }
	
    arrHistogram.push({ bright : sum/len, time : Date.now() });
    while (arrHistogram.length>320) {arrHistogram.shift();}
    
	//calculate max and min
    var max = arrHistogram[0].bright;
    var min = arrHistogram[0].bright;
    arrHistogram.forEach(function(v) {
      if (v.bright>max) max=v.bright;
      if (v.bright<min) min=v.bright;
    });
    // thresholds for bpm
    var lo = min*0.6 + max*0.4;
    var hi = min*0.4 + max*0.6;
    var pAvg = 0, pCount = 0;
    
		
				
	// calculate the bpm
    var isHigh = undefined;
    var PrevHigh = undefined;
    var PrevLow = undefined;
    arrHistogram.forEach(function(v, x) {
      if (isHigh!=true && v.bright>hi) {
        isHigh = true;
        PrevLow = x;
      }
      if (isHigh!=false && v.bright<lo) {
        if (PrevHigh !== undefined && PrevLow !== undefined) {
          pAvg += arrHistogram[x].time-arrHistogram[PrevHigh].time;
          pCount++;
        }
        isHigh = false;
        PrevHigh = x;
      }
    });
	
    if (pCount) {
      var pulseRate = 60000 / (pAvg / pCount);
	  
	  if(pulseRate>40 && pulseRate<120 && document.getElementById("hdnOn").value == 1) {
			arrPulses.push({pulse: pulseRate});
		  }
	  bpm.innerHTML = pulseRate.toFixed(0)+" BPM";
    
    } else {
      bpm.innerHTML = "-- BPM";
    }
  }

  function getPulse(err){
	  var s=0;
	  arrPulses.forEach(function(v){s+=v.pulse;});
	  document.getElementById("bpmFinal").innerHTML = (Math.round(s/arrPulses.length)+Math.round(err)) + " BPM";
	  arrPulses = [];
  }
  
addEventListener("DOMContentLoaded", initialize);
