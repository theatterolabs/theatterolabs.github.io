if(!Detector.webgl) Detector.addGetWebGLMessage();

var worker = new Worker("js/tracker_worker.js");

// Starts the tracker webworker
worker.postMessage({'cmd': 'start'}); 

worker.addEventListener('message', function(e) {
  switch(e.data.cmd) {
	  case 'onRuntimeInitilized':
			onRuntimeInitialized();
			break;
	  case 'drawProcessedFrame':
			drawProcessedFrame(e.data.img_data);
			break;
	  case 'onPoseUpdate': {
			frameProcessed = true;
		  
			if(e.data.available){
				onPoseUpdate(e.data.available, e.data.viewMatrixArray);
			} else {
				onPoseUpdate(e.data.available, null);
			}
			break;
		}
  }
}, false);



// Compute a fitting or a covering scale for the renderer inside the body
// that is considering the aspect ratio of the camera
var W = window.innerWidth;
var H = window.innerHeight;

/*if(isMobile){
	var ratio = window.devicePixelRatio || 1;
	W = screen.width * ratio;
	H = screen.height * ratio;
}*/

const SCALE_X = W / CAM_W;
const SCALE_Y = H / CAM_H;
const SCALE_TO_FIT = Math.min(SCALE_X, SCALE_Y);
const SCALE_TO_COVER = Math.max(SCALE_X, SCALE_Y);	
			     
				     				     
// Renderer size
// Change to scaleToCover or scaleToFit
const RENDERER_W = CAM_W * SCALE_TO_COVER;
const RENDERER_H = CAM_H * SCALE_TO_COVER;

const RENDERER_HALF_W = Math.floor(RENDERER_W / 2);
const RENDERER_HALF_H = Math.floor(RENDERER_H / 2);

// Time at which the model is displayed after tracking was lost
var TIME_VISIBLE_OFF_TRACK = 1000; // ms

// Html elements to work on
var container;

// THREE.js loaders
var manager, mtlLoader, objLoader ;

// Elements to control video stream
var video, videoImageContext, videoTexture;

// Objects to render the scene/s
var orthoCam, perspCam, orthoScene, perspScene, renderer;

var rotationTimestampThen = new Date().getTime();
var rotationSpeed = 1;

var spotlight;

var modelToRender = null;

var ctr = 0, trackingLost = false;

var moduleInitialized = false;
var windowLoaded = false; 

var videoLoaded = false;

var frameProcessed = true;

// Show OpenCV debug output
var debug = false;


function onRuntimeInitialized() {	
	moduleInitialized = true;
	startIfReady();
}

function startIfReady(){
	if(moduleInitialized && windowLoaded)
		start();
}

// method gets called, when site finished loading
function start(){
	console.log("Start!");
    init();
    window.requestAnimationFrame(animate);
}

// initialize ThreeJS Environment and Video-Stream
function init(){
	
	// Setup tracker camera parameters
	worker.postMessage({'cmd': 'setCameraIntrinsics', 'cam_f': CAM_F, 'cam_p_x': CAM_P_X, 
							'cam_p_y': CAM_P_Y, 'distcoeffs': CAM_DIST_COEFFS,
							'cam_w': CAM_W, 'cam_h': CAM_H});
							
	// Setup marker parameters
	worker.postMessage({'cmd': 'setMarkerWorldSize', 'obj_m_w': OBJ_M_W, 'obj_m_h': OBJ_M_H});
		
    // get all important control elements
    container = document.getElementById('container');
	container.width = W;
	container.height = H / 1.3333333333;


    // init renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( RENDERER_W, RENDERER_H );
    renderer.setClearColor("#000000");
    renderer.autoClear = false;
    container.appendChild(renderer.domElement);

    // init cam for model
    perspCam = new THREE.PerspectiveCamera(CAM_VFOV, CAM_ASPECT, 0.00001, 10000);
    perspCam.position.set(0, 0, 0);
    
   
    // init cam for video stream
    orthoCam = new THREE.OrthographicCamera(-RENDERER_HALF_W, RENDERER_HALF_W, RENDERER_HALF_H, -RENDERER_HALF_H, -10000, 10000);
    orthoCam.position.set(0, 0, 0);

    // init scenes
    orthoScene = new THREE.Scene();
    perspScene = new THREE.Scene();
	
    // construct scenes
    perspScene.add(perspCam);
    orthoScene.add(orthoCam);
    
    if(debug){
		var axesHelper = new THREE.AxesHelper( 0.291 );
		perspScene.add(axesHelper);
	}
    
    //var light = new THREE.DirectionalLight(0xffffff, 3);
    var light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light
    light.position.set(0.1, 0.3, -0.1);
	perspScene.add( light );

    spotlight = new THREE.DirectionalLight(0xffffff, 0.2);
	spotlight.position.set(0, 1, 0);
	perspScene.add(spotlight);
	
    light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(0, 0.5, -0.5).normalize();
    light.lookAt(0,0,1);
    //orthoScene.add(light);
    
    loadModel();
    initVideoStream();

}

// Method to load a model as *.obj file  //tree/treecorrect-pointing-y
function loadModel(modelPath = "models/wasm-logo/WASM_Logo"){
    
    if(modelToRender)
        perspScene.remove(modelToRender);
    
    modelToRender = null;

    // init manager to load models
    manager = new THREE.LoadingManager();

    mtlLoader = new THREE.MTLLoader(manager);
    objLoader = new THREE.OBJLoader(manager);
    
    // load texture files with material files
    mtlLoader.load( modelPath.concat('.mtl'), function( materials ) {

        materials.preload();


        objLoader.setMaterials( materials );
       
        objLoader.load( modelPath.concat('.obj'), function ( object ) {
			object.position.set(OBJ_M_W/2, OBJ_M_H/2, 0);
			object.scale.set(0.08, 0.08, 0.08);
			
			object.rotation.set(-Math.PI/2, 0, 0);
			
            modelToRender = object;
			
			//spotlight.lookAt(modelToRender.position);

			perspScene.add(object);
			
        }, // called when loading is in progresses
        function ( xhr ) {
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
        });
    });

}

let videoStart;

// method to set up the webcam stream
function initVideoStream(){
    
    // create an element where the video image will be painted
    var videoImage = document.createElement('canvas');
    videoImage.width = container.width;
    videoImage.height = container.height;
    
	/*var resolution = document.createElement("p");
	var width = document.createTextNode("width: " + container.width + "x");
	var height = document.createTextNode("height: " + container.height);
	
	resolution.appendChild(width);
	resolution.appendChild(height);
	
	document.body.appendChild(resolution);*/
	
    //container.appendChild(videoImage);

    // Get the context to paint in the cnavas slement
    videoImageContext = videoImage.getContext('2d');
    // Background color if no video present
    videoImageContext.fillStyle = '#000000';
    videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

    // Video texture that gets updated to display the video
    videoTexture = new THREE.Texture(videoImage);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    // Three.js elements to make the video visable
    var videoMaterial = new THREE.MeshBasicMaterial({
        map: videoTexture,
        overdraw: true
    });
    var videoGeometry = new THREE.PlaneGeometry(RENDERER_W,RENDERER_H);
    var videoMesh = new THREE.Mesh(videoGeometry, videoMaterial);
    videoMesh.position.set(0, 0, 0);
    orthoScene.add(videoMesh);
    
    // Create OpenCV image output for debugging
    var output;
    if(debug){
		output = document.createElement('canvas');
		output.id = "output";
		container.appendChild(output);
	}

    // Create a video element to retreive the video stream
    video = document.createElement('video');

	/////
	/*video.muted= true;
	video.loop = true;
	video.autoplay = true;

	var source = document.createElement("source");
	source.src = "scene.webm";
	source.type = "video/webm";

	video.appendChild(source);
	if(video){
		// adjust the size of the drawing canvas and start the video
		video.onloadedmetadata = function(e) {
			videoImage.width = this.videoWidth;
			videoImage.height = this.videoHeight;
			
			if(debug){
				output.width = this.videoWidth;
				output.height = this.videoHeight;
			}
			
			video.play();
			onVideoLoaded();
		};

		video.width = container.width;
		video.height = container.height;
	}*/
	/////
	
    // init video stream
     var videoConstraints = {
        audio: false,
		video: {
		  width: CAM_W,
		  //height: CAM_H,
		  aspectRatio: 1.333333333,
		  frameRate: 30,
		  facingMode: "environment"
		}
      };

	// Hacks for Mobile Safari
	video.setAttribute("playsinline", true);
	video.setAttribute("controls", true);
	setTimeout(() => {
		video.removeAttribute("controls");
	});

	//startButton = document.getElementById('startButton');
	videoStart = () => {startVideo(videoConstraints, video, videoImage)};
	container.addEventListener('click', videoStart);
}

function startVideo(constraints, video, videoImage){
	container.removeEventListener('click', videoStart);
	navigator.mediaDevices.getUserMedia(constraints)
		.then(function(stream) {
			if(video){
				video.srcObject = stream;

				// adjust the size of the drawing canvas and start the video
				video.onloadedmetadata = function(e) {

					videoImage.width = container.width;
					videoImage.height = container.height;

					if(debug){
						output.width = this.videoWidth;
						output.height = this.videoHeight;
					}

					video.play();

					onVideoLoaded();
				};
				
				video.width = CAM_W;
				video.height = CAM_H;
				container.width = CAM_W;
				container.height = CAM_H;
			}
		})
		.catch(function(err) {
		  console.log(err.name + ": " + err.message);
		});
}

var trackingLostTimestamp;

function onPoseUpdate(available, viewMatrixArray) {
	// Get pose update
	if(available) {
		modelToRender.visible = true;
		setCameraPose(viewMatrixArray);	

		trackingLost = false;
	} else {
		//modelToRender.visible = false;
		if(!trackingLost){
			trackingLost = true;
			trackingLostTimestamp = new Date().getTime();
			setTimeout(setModelVisibility, TIME_VISIBLE_OFF_TRACK);
		}
	}
	
	// Update video texture
	if (videoTexture) {
		videoTexture.needsUpdate = true;
	}
}

function setModelVisibility(){
	if(trackingLost){
		var now = new Date().getTime();
		if(now - trackingLostTimestamp >= TIME_VISIBLE_OFF_TRACK) {	
			modelToRender.visible = false;
		}
	}
}

function onVideoLoaded() {
	videoLoaded = true;
}

function rotateModel(){
	var rotationTimestampNow = new Date().getTime();
	//modelToRender.rotation.y += (rotationTimestampNow - rotationTimestampThen) / 1000 * rotationSpeed;
	rotationTimestampThen = rotationTimestampNow;
}

// endless loop to render the scene continously
function animate() {
	if(modelToRender){
		//rotateModel();
		render();
	}
	window.requestAnimationFrame(animate);
}

function setCameraPose(pose){
	perspCam.matrix.fromArray(pose);
	
	perspCam.matrix.decompose (
		perspCam.position,
		perspCam.quaternion,
		perspCam.scale
	);
}

function trackFrame() {
	
	// Acquire a video frame from the video element
	var img_data = videoImageContext.getImageData(0, 0, CAM_W, CAM_H);

	// Post to tracker worker if no frame is currently about being processed
	if(frameProcessed) {
		worker.postMessage({'cmd': 'processFrame', 'img_data': img_data});
		frameProcessed = false;
	}
};

// method to coordinate the rendering process
function render() {        
    renderer.clear();
    
    // Update video image
    videoImageContext.drawImage(video, 0, 0);
    
    if(videoLoaded) {
		if(trackingLost && isMobile){
			//limit detection step
			if(ctr++ == 3) {
				trackFrame();
				ctr = 0;
			}
		} else {
			trackFrame();
		}
	}

    // Render first scene into texture
    renderer.render(orthoScene, orthoCam);

    // Reset z buffer
    renderer.clearDepth();

    // Render model infront
    renderer.render(perspScene, perspCam);
}

function drawProcessedFrame(img_data){
	if(debug && output != null){
		// Render to viewport
		output.getContext("2d").putImageData(img_data, 0, 0);
	}
}

window.onload = function() {
	console.log("onload");
	windowLoaded = true;
	startIfReady();
}
