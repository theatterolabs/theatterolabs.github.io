
var jsonObj = "";
var targetIndex;
var ground;
var markerRoot;
var scene;
var targetH;
var targetW;

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//readTextFile('docs/youaugment.json', function (text) {
//    jsonObj = JSON.parse(text);
//});

function startYouAugment(targetName){
	
	var cameraParam = new ARCameraParam();
        cameraParam.onload = function () {
	
            var canvas = document.getElementById('renderCanvas');
            
            var engine = new BABYLON.Engine(canvas, true);
			engine.setSize(640, 480);
			
            scene = new BABYLON.Scene(engine);
            scene.useRightHandedSystem = true;
			scene.clearColor = new BABYLON.Color4(0,0,0,0.0000000000000001);
				
			var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(0, 0, 0), scene);
			camera.setPosition(new BABYLON.Vector3(0, 0, 0.001));
			camera.noRotationConstraint=true;
            camera.attachControl(canvas, true);
			
            // create a basic light, aiming 0,1,0 - meaning, to the sky
            var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1, 2, 1), scene);
			light.specular = new BABYLON.Color3(0, 0, 0);
			light.groundColor = new BABYLON.Color3(1, 1, 1);
			
			markerRoot = new BABYLON.AbstractMesh('markerRoot', scene);
            markerRoot.markerMatrix = new Float64Array(12);

			var	arController = new ARController(320, 240, cameraParam);
			
			var targetId = findIndexByKeyValue(jsonObj.youaugment.app[0].target, "targetname", targetName);
			
			var targetFile="";
			
			if(targetId != ""){
			   targetFile = getValues(jsonObj.youaugment.app[0].target[targetId], 'file');
			}
			else 
				alert("Target is not defined.");
			
		if(targetFile != ""){
			arController.loadNFTMarker('data/' + targetFile[0].toString().replace(".jpg", "").replace(".png", "").replace(".gif", ""), function(markerId) {				
				
				var video = document.getElementById('video');	
		
				var constraints = window.constraints = {
					audio: false,
					video: {facingMode:"environment"}
				};

				function handleSuccess(stream) {
					video.srcObject = stream;
					document.getElementById('loadingDiv').style.color='yellow';
				}

				navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess);
				
				addArObjects(targetId);
				
				markerRoot.isVisible = false;
					
				arController.addEventListener('getNFTMarker', function(ev) {
					if (markerRoot) {
						markerRoot._worldMatrix.m = ev.data.matrix;
						markerRoot.isVisible = true;
						markerRoot.getChildMeshes().forEach(function (mesh) {
							if(mesh.name!='target')
								mesh.isVisible = true;
						});						
					}
				});
												
				var orientation=null;
					
				function tick() {
					requestAnimationFrame(tick);
						
					if (window.matchMedia("(orientation: portrait)").matches && orientation != 'portrait') {
						orientation='portrait';
						arController.orientation = 'portrait';
						ground.position.x = 127;
						ground.position.y = 96 * targetH / 481;
						ground.scaling.x = targetW / 54;
						ground.scaling.z = targetH / (29.5 * targetH / 345);
						camera.upVector = new BABYLON.Vector3(-1, 0, 0);
					}else if (window.matchMedia("(orientation: landscape)").matches && orientation != 'landscape') {
						orientation='landscape';
						arController.orientation = 'landscape';
						ground.position.x = 82.5;
						ground.position.y = 63 * targetH / 481;
						ground.scaling.x = targetW / 47;
						ground.scaling.z = targetH / (26 * targetH / 345);
						camera.upVector = new BABYLON.Vector3(0, 0, 0);
					}
						
					markerRoot.isVisible = false;
					markerRoot.getChildMeshes().forEach(function (mesh) {
						mesh.isVisible = false;
					});
					
					arController.process(video);
						
					scene.render();
				}
				tick();	
				document.getElementById('loadingDiv').style.display='none';
			});	
		}			
            camera.freezeProjectionMatrix(BABYLON.Matrix.FromArray(arController.getCameraMatrix()));
					
	
        };
        cameraParam.load('data/camera_para.dat');
}

function addArObjects(tIndex) {
	targetIndex = tIndex;
	var targetFile = getValues(jsonObj.youaugment.app[0].target[targetIndex], 'file');
	var targetWidth = getValues(jsonObj.youaugment.app[0].target[targetIndex], 'width');
	var targetHeight = getValues(jsonObj.youaugment.app[0].target[targetIndex], 'height');
	if (targetFile[0] != '') {
		addTarget(targetFile[0], targetWidth[0], targetHeight[0]);
	}
    var imagesArray = getValues(jsonObj.youaugment.app[0].target[targetIndex].image, 'file');
    var imagesIdArray = getValues(jsonObj.youaugment.app[0].target[targetIndex].image, 'id');
    for (i = 0; i < imagesArray.length; i++) {
        if (imagesArray[i] != '') addImage(imagesIdArray[i], imagesArray[i], '', false);
    }
    var videosArray = getValues(jsonObj.youaugment.app[0].target[targetIndex].video, 'file');
    var videosIdArray = getValues(jsonObj.youaugment.app[0].target[targetIndex].video, 'id');
	var videosTransArray = getValues(jsonObj.youaugment.app[0].target[targetIndex].video, 'transparent');
    for (i = 0; i < videosArray.length; i++) {
        if (videosArray[i] != '') addVideo(videosIdArray[i], videosArray[i], videosTransArray[i]);
    }
    var threeDArray = getValues(jsonObj.youaugment.app[0].target[targetIndex].model, 'file');
    var threeDIdArray = getValues(jsonObj.youaugment.app[0].target[targetIndex].model, 'id');
    for (i = 0; i < threeDArray.length; i++) {
        if (threeDArray[i] != '') add3D(threeDIdArray[i], threeDArray[i], '', false);
    }
    var textIdArray = getValues(jsonObj.youaugment.app[0].target[targetIndex].text, 'id');
    var textArray = getValues(jsonObj.youaugment.app[0].target[targetIndex].text, 'content');
    var textColorArray = getValues(jsonObj.youaugment.app[0].target[targetIndex].text, 'fontColor');
    var textBgColorArray = getValues(jsonObj.youaugment.app[0].target[targetIndex].text, 'backColor');
    for (i = 0; i < textArray.length; i++) {
        if (textArray[i] != '') addText(textIdArray[i], textArray[i], textColorArray[i], textBgColorArray[i], '', false);
    }
	
	canvasClick();
}

function addTarget(targetfile, targetimgwidth, targetimgheight) {
	//var targetmat = new BABYLON.StandardMaterial("targetMaterial", scene);
	//tex1 = new BABYLON.Texture("data/" + targetfile, scene);
	//targetmat.diffuseTexture = tex1;
	targetH = targetimgheight;
	targetW = targetimgwidth;
	
	ground = BABYLON.Mesh.CreateGround("target", 20, 20, 1, scene);
	ground.rotation.x = -Math.PI / 2;
	ground.position.x = 82.5;
	ground.position.y = 63 * targetimgheight / 481;
	
	var gridMaterial = new BABYLON.StandardMaterial("Grid Material", scene);
	gridMaterial.wireframe = false;
	ground.material = gridMaterial;
	ground.material.specularColor = new BABYLON.Color3(0, 0, 0);
	ground.receiveShadows = false;	
	ground.scaling.x = targetimgwidth / 47;
	ground.scaling.z = targetimgheight / (26 * targetimgheight / 345);
	
	//targetmat.backFaceCulling = false;
	//ground.material = targetmat;
	
	ground.parent = markerRoot;
};

function add3D(id, threeDfile, clickaction) {
    var positionX = 0.1, positionY = 0.1, positionZ = 0.1;
    var scaleX = 0.1, scaleY = 0.1, scaleZ = 0.1;
    var rotateX = 0, rotateY = 0, rotateZ = 0, rotateW = 0;

    var modelIndex = findIndexByKeyValue(jsonObj.youaugment.app[0].target[targetIndex].model, "id", id);
    positionX = jsonObj.youaugment.app[0].target[targetIndex].model[modelIndex].position.x;
    positionY = jsonObj.youaugment.app[0].target[targetIndex].model[modelIndex].position.y;
    positionZ = jsonObj.youaugment.app[0].target[targetIndex].model[modelIndex].position.z;
    scaleX = jsonObj.youaugment.app[0].target[targetIndex].model[modelIndex].scaling.x;
    scaleY = jsonObj.youaugment.app[0].target[targetIndex].model[modelIndex].scaling.y;
    scaleZ = jsonObj.youaugment.app[0].target[targetIndex].model[modelIndex].scaling.z;
    rotateX = jsonObj.youaugment.app[0].target[targetIndex].model[modelIndex].rotation.x;
    rotateY = jsonObj.youaugment.app[0].target[targetIndex].model[modelIndex].rotation.y;
    rotateZ = jsonObj.youaugment.app[0].target[targetIndex].model[modelIndex].rotation.z;
    rotateW = jsonObj.youaugment.app[0].target[targetIndex].model[modelIndex].rotation.w;
       
    BABYLON.SceneLoader.ImportMesh("", "data/", threeDfile, scene, function (newMeshes, particleSystems, skeletons) {
        // Set the target of the camera to the first imported mesh 
        for (i = 0; i < newMeshes.length; i++) {
            newMeshes[i].name = "model" + targetIndex + id;
        }
        var model = newMeshes[0];
        model.position = new BABYLON.Vector3(positionX, positionY, positionZ);
        model.scaling = new BABYLON.Vector3(scaleX, scaleY, scaleZ);
        model.rotationQuaternion = new BABYLON.Quaternion(rotateX, rotateY, rotateZ, rotateW);
		model.parent = ground;
		model.isVisible = false;
        scene.beginAnimation(skeletons[0], 0, 100, true, 1.0);
    });
};

function addVideo(id, videofile, istransparent) {
    var positionX = 0.1, positionY = 0.1, positionZ = 0.1;
    var scaleX = -0.5, scaleY = 0.3, scaleZ = 0.1;
    var rotateX = 0, rotateY = 0, rotateZ = 0, rotateW = 0;

    var videoIndex = findIndexByKeyValue(jsonObj.youaugment.app[0].target[targetIndex].video, "id", id);
    positionX = jsonObj.youaugment.app[0].target[targetIndex].video[videoIndex].position.x;
    positionY = jsonObj.youaugment.app[0].target[targetIndex].video[videoIndex].position.y;
    positionZ = jsonObj.youaugment.app[0].target[targetIndex].video[videoIndex].position.z;
    scaleX = jsonObj.youaugment.app[0].target[targetIndex].video[videoIndex].scaling.x;
    scaleY = jsonObj.youaugment.app[0].target[targetIndex].video[videoIndex].scaling.y;
    scaleZ = jsonObj.youaugment.app[0].target[targetIndex].video[videoIndex].scaling.z;
    rotateX = jsonObj.youaugment.app[0].target[targetIndex].video[videoIndex].rotation.x;
    rotateY = jsonObj.youaugment.app[0].target[targetIndex].video[videoIndex].rotation.y;
    rotateZ = jsonObj.youaugment.app[0].target[targetIndex].video[videoIndex].rotation.z;
    rotateW = jsonObj.youaugment.app[0].target[targetIndex].video[videoIndex].rotation.w;

    // Video plane
    var videoPlane = BABYLON.Mesh.CreatePlane("video" + targetIndex + id, 20, scene);
    //videoPlane.rotation.z = Math.PI / 2;
    videoPlane.position = new BABYLON.Vector3(positionX, positionY, positionZ);
    videoPlane.scaling = new BABYLON.Vector3(scaleX, scaleY, scaleZ);
    videoPlane.rotationQuaternion = new BABYLON.Quaternion(rotateX, rotateY, rotateZ, rotateW);
    // Video material
  
    var videoMat = new BABYLON.StandardMaterial("texVid", scene);
  
	//var videoMat = new BABYLON.CustomMaterial("video material", scene);
	
    const texture =  new BABYLON.VideoTexture("video", ["https://creator.youaugment.com:9000/api/camera/fromvideo/?videoName="+jsonObj.youaugment.username+"_app"+jsonObj.youaugment.app[0].appid+"/youaugment/www/data/"+videofile.replace(".mp4","")], scene, true);

	texture.getAlphaFromRGB = true;
	
	if(istransparent == "true"){
		        
		       // videoMat.Fragment_Before_FragColor('if(color.y > 0.45 && (color.x  < 0.25 ||  color.z < 0.25) ) discard; else { \
               // color.w = 1.; \
               // }\
               // ');
				
		        videoMat.diffuseTexture = texture;
		        videoMat.diffuseTexture.hasAlpha = true;
		        videoMat.opacityTexture = texture;
		        videoMat.opacityTexture.hasAlpha = true;
		        videoPlane.material = videoMat;
		        videoPlane.material.alpha = 5;

	} else {
		        videoMat.diffuseTexture = texture;
		        videoPlane.material = videoMat;
	}
	
	videoMat.backFaceCulling = false;
   
    videoPlane.scaling.x = scaleX;
	videoPlane.parent = ground;
	videoPlane.isVisible = false;
	
};

function addImage(id, imageFile, clickaction) {
    var positionX = 0.1, positionY = 0.1, positionZ = 0.1;
    var scaleX = -0.5, scaleY = 0.3, scaleZ = 0.1;
    var rotateX = 0, rotateY = 0, rotateZ = 0, rotateW = 0;

    var imageIndex = findIndexByKeyValue(jsonObj.youaugment.app[0].target[targetIndex].image, "id", id);
    positionX = jsonObj.youaugment.app[0].target[targetIndex].image[imageIndex].position.x;
    positionY = jsonObj.youaugment.app[0].target[targetIndex].image[imageIndex].position.y;
    positionZ = jsonObj.youaugment.app[0].target[targetIndex].image[imageIndex].position.z;
    scaleX = jsonObj.youaugment.app[0].target[targetIndex].image[imageIndex].scaling.x;
    scaleY = jsonObj.youaugment.app[0].target[targetIndex].image[imageIndex].scaling.y;
    scaleZ = jsonObj.youaugment.app[0].target[targetIndex].image[imageIndex].scaling.z;
    rotateX = jsonObj.youaugment.app[0].target[targetIndex].image[imageIndex].rotation.x;
    rotateY = jsonObj.youaugment.app[0].target[targetIndex].image[imageIndex].rotation.y;
    rotateZ = jsonObj.youaugment.app[0].target[targetIndex].image[imageIndex].rotation.z;
    rotateW = jsonObj.youaugment.app[0].target[targetIndex].image[imageIndex].rotation.w;

    // Image plane
    var imagePlane = BABYLON.Mesh.CreatePlane("image" + targetIndex + id, 20, scene);
    imagePlane.rotation = new BABYLON.Vector3(0, 0, 0); // Euler
    imagePlane.rotationQuaternion = null; // Quaternion
    imagePlane.position = new BABYLON.Vector3(positionX, positionY, positionZ);
    imagePlane.scaling = new BABYLON.Vector3(scaleX, scaleY, scaleZ);
    // Image material
    var imageMat = new BABYLON.StandardMaterial("texImg", scene);

    const texture = new BABYLON.Texture("data/" + imageFile, scene);
	imageMat.diffuseTexture = texture;
	imageMat.opacityTexture = texture;
	imageMat.backFaceCulling = false;
	imageMat.diffuseTexture.hasAlpha = true;
			
    //Applying materials
    imagePlane.material = imageMat;
    imagePlane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    imagePlane.rotationQuaternion = new BABYLON.Quaternion(rotateX, rotateY, rotateZ, rotateW);
    imagePlane.scaling.x = scaleX;
	imagePlane.parent = ground;
	imagePlane.isVisible = false;
};

function addText(id, textValue, textColor, bgColor, clickaction) {
    var positionX = 0.1, positionY = 0.1, positionZ = 0.1;
    var scaleX = -0.5, scaleY = -0.5, scaleZ = -0.5;
    var rotateX = 0, rotateY = 0, rotateZ = 0, rotateW = 0;

    var textIndex = findIndexByKeyValue(jsonObj.youaugment.app[0].target[targetIndex].text, "id", id);
    positionX = jsonObj.youaugment.app[0].target[targetIndex].text[textIndex].position.x;
    positionY = jsonObj.youaugment.app[0].target[targetIndex].text[textIndex].position.y;
    positionZ = jsonObj.youaugment.app[0].target[targetIndex].text[textIndex].position.z;
    scaleX = jsonObj.youaugment.app[0].target[targetIndex].text[textIndex].scaling.x;
    scaleY = jsonObj.youaugment.app[0].target[targetIndex].text[textIndex].scaling.y;
    scaleZ = jsonObj.youaugment.app[0].target[targetIndex].text[textIndex].scaling.z;
    rotateX = jsonObj.youaugment.app[0].target[targetIndex].text[textIndex].rotation.x;
    rotateY = jsonObj.youaugment.app[0].target[targetIndex].text[textIndex].rotation.y;
    rotateZ = jsonObj.youaugment.app[0].target[targetIndex].text[textIndex].rotation.z;
    rotateW = jsonObj.youaugment.app[0].target[targetIndex].text[textIndex].rotation.w;
  
    // Make a dynamic texture
    var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", { width: 1000, height: 1000 }, scene, true);
    dynamicTexture.hasAlpha = true;
    var textureContext = dynamicTexture.getContext();
    textureContext.save();
    textureContext.textAlign = "center";
    textureContext.font = "60px Calibri";
    // Some magic numbers
    var lineHeight = 60;
    var lineWidth = 950;
    var fontHeight = 53;
    var offset = 10; // space between top/bottom borders and actual text
    var text = textValue;
    var textHeight = fontHeight + offset;
    var numberOfLines = wrapText(textureContext, text, dynamicTexture.getSize().width / 2, textHeight, lineWidth, lineHeight);
    if (numberOfLines == 0) numberOfLines = 1;
    var labelHeight = numberOfLines * lineHeight + (offset * 2);
    var metrics = textureContext.measureText(textValue);
    var textWidth = metrics.width;
    if (textWidth > 950) textWidth = 1000;
    textureContext.restore();
    dynamicTexture.update(false);
    // Make a dynamic texture2
    var dynamicTexture2 = new BABYLON.DynamicTexture("DynamicTexture", { width: textWidth, height: labelHeight / 2 }, scene, true);
    dynamicTexture2.hasAlpha = true;
    var textureContext2 = dynamicTexture2.getContext();
    textureContext2.save();
    // Background
	if (bgColor != null && bgColor != "") {
		textureContext2.fillStyle = bgColor;
		textureContext2.fillRect(0, 0, dynamicTexture2.getSize().width, labelHeight * 2);
	} else {
		textureContext2.fillStyle = 'transparent';
		textureContext2.fillRect(0, 0, dynamicTexture2.getSize().width, labelHeight * 2);
	};
    // Text
    textureContext2.textAlign = "center";
    textureContext2.font = "48px Calibri";
    textureContext2.fillStyle = textColor;
    wrapText(textureContext2, text, (dynamicTexture2.getSize().width + 9) / 2, textHeight - 15, textWidth, lineHeight);
    textureContext2.restore();
    dynamicTexture2.update(false);
    // Text plane            
    var textPlane = BABYLON.Mesh.CreatePlane("text" + targetIndex + id, 10, scene);
    textPlane.position = new BABYLON.Vector3(positionX, positionY, positionZ);
    textPlane.scaling = new BABYLON.Vector3(scaleX, scaleY, scaleZ);
    textPlane.scaling.y = scaleY;
    textPlane.rotationQuaternion = new BABYLON.Quaternion(rotateX, rotateY, rotateZ, rotateW);
  
    var textMat = new BABYLON.StandardMaterial("texText", scene);
	textMat.diffuseTexture = dynamicTexture2;
	textMat.opacityTexture = dynamicTexture2;
	textMat.diffuseTexture.hasAlpha = true;
	textMat.opacityTexture.hasAlpha = true;
    textMat.backFaceCulling = false;
    textPlane.material = textMat;
    textPlane.material.specularColor = new BABYLON.Color3(0, 0, 0);
	textPlane.parent = ground;
	textPlane.isVisible = false;
};

		function canvasClick() {
			var canvas = document.getElementById('renderCanvas');
		    canvas.addEventListener("click", function (evt, pickResult) {
		        //offsetX/Y are not implemented on FireFox
		        //var offsetX = (evt.offsetX || evt.clientX - $(evt.target).offset().left + window.pageXOffset);
		        //var offsetY = (evt.offsetY || evt.clientY - $(evt.target).offset().top + window.pageYOffset);
		        pickResult = scene.pick(scene.pointerX, scene.pointerY);
		        this.pickResult = pickResult;
		        // if the click hits the ground object, we change the impact position
		        if (this.pickResult.pickedMesh) {   
		            myPickedMesh = this.pickResult.pickedMesh.name;

		                if (myPickedMesh.indexOf("model") >= 0) {
		                    var meshIndex = findIndexByKeyValue(jsonObj.youaugment.app[0].target[targetIndex].model, 'name', myPickedMesh);
		                    var hyperlink = jsonObj.youaugment.app[0].target[targetIndex].model[meshIndex].hyperlink;
		                    if (hyperlink != "")
		                        window.open(hyperlink, '_blank', '');
		                } else if (myPickedMesh.indexOf("image") >= 0) {
		                    var meshIndex = findIndexByKeyValue(jsonObj.youaugment.app[0].target[targetIndex].image, 'name', myPickedMesh);
		                    var hyperlink = jsonObj.youaugment.app[0].target[targetIndex].image[meshIndex].hyperlink;
		                    if (hyperlink != "")
		                        window.open(hyperlink, '_blank', '');
		                } else if (myPickedMesh.indexOf("text") >= 0) {
		                    var meshIndex = findIndexByKeyValue(jsonObj.youaugment.app[0].target[targetIndex].text, 'name', myPickedMesh);
		                    var hyperlink = jsonObj.youaugment.app[0].target[targetIndex].text[meshIndex].hyperlink;
		                    if (hyperlink != "")
		                        window.open(hyperlink, '_blank', '');
		                }
		            
		        }
		    })
		    };
		
function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
};

function findIndexByKeyValue(obj, key, value) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i] != null)
            if (obj[i][key] == value) {
                return i;
            }
    }
    return null;
};

function wrapText(context, text, x, y, maxWidth, lineHeight) {
	var words = text.split(' ');
	var line = '';
	var numberOfLines = 1;

	for (var n = 0; n < words.length; n++) {
		var testLine = line + words[n] + ' ';
		var metrics = context.measureText(testLine);
		var testWidth = metrics.width;

		if (testWidth > maxWidth && n > 0) {
		    context.fillText(line, x, y);
		    line = words[n] + ' ';
		    y += lineHeight;
		    numberOfLines++;
		}
		else {
		    line = testLine;
		}
	}
		    
	context.fillText(line, x, y);
	return numberOfLines;
};