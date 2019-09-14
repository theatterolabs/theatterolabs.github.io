				/*********** Code for face deformation *********/
			    var faceDeform = function() {
			        var vid2 = document.getElementById('DeformVid');
					var overlay2 = document.getElementById('overlay2');
			        var overlayCC2 = overlay2.getContext('2d');
			        var webgl_overlay2 = document.getElementById('webgl');
					
					var constraints = window.constraints = {
						audio: false,
						video: {facingMode:"user"}
					};

					function handleSuccess(stream) {
						vid2.srcObject = stream;
					}

					navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess);

					var vid_width2 = vid2.width;
			        var vid_height2 = vid2.height;	
	  							       
			        // canvas for copying videoframes to
			        var videocanvas2 = document.createElement('CANVAS');
					videocanvas2.width = vid_width2;
					videocanvas2.height = vid_height2;
				
					window.addEventListener('resize', resize, false);
					window.addEventListener('orientationchange', resize, false);
					resize();
 
					function resize() {
						if(window.innerHeight > window.innerWidth){
							vid_width2 = 300;
							vid_height2 = 400;
						}else{
							vid_width2 = 400;
							vid_height2 = 300;
						}
							vid2.width = vid_width2;
							vid2.height = vid_height2;
							videocanvas2.width = vid_width2;
							videocanvas2.height = vid_height2;
							overlay2.width = vid_width2;
							overlay2.height = vid_height2;
							webgl_overlay2.width = vid_width2;
							webgl_overlay2.height = vid_height2;
					}
					
			        // check whether browser supports webGL
			        var webGLContext2;
			        if (window.WebGLRenderingContext) {
			            webGLContext2 = webgl_overlay2.getContext('webgl') || webgl_overlay2.getContext('experimental-webgl');
			            if (!webGLContext2 || !webGLContext2.getExtension('OES_texture_float')) {
			                webGLContext2 = null;
			            }
			        }
			        if (webGLContext2 == null) {
			            alert("Your browser does not seem to support WebGL. Unfortunately this face mask example depends on WebGL, so you'll have to try it in another browser. :(");
			        }

			        var proportion2 = vid_width2 / vid_height2;
			        vid_width2 = Math.round(vid_height2 * proportion2);
			        vid2.width = vid_width2;
			        overlay2.width = vid_width2;
			        webgl_overlay2.width = vid_width2;
			        videocanvas2.width = vid_width2;
			        webGLContext2.viewport(0, 0, webGLContext2.canvas.width, webGLContext2.canvas.height);

			        var animationRequest2;
			        var positions2;

			        var fd = new faceDeformer();
			        fd.init(webgl_overlay2);

			        var ctrack2 = new clm.tracker();
			        ctrack2.init(pModel);
			        ctrack2.start(vid2);

			        var mouth_vertices = [
                        [44, 45, 61, 44],
                        [45, 46, 61, 45],
                        [46, 60, 61, 46],
                        [46, 47, 60, 46],
                        [47, 48, 60, 47],
                        [48, 59, 60, 48],
                        [48, 49, 59, 48],
                        [49, 50, 59, 49],
                        [50, 51, 58, 50],
                        [51, 52, 58, 51],
                        [52, 57, 58, 52],
                        [52, 53, 57, 52],
                        [53, 54, 57, 53],
                        [54, 56, 57, 54],
                        [54, 55, 56, 54],
                        [55, 44, 56, 55],
                        [44, 61, 56, 44],
                        [61, 60, 56, 61],
                        [56, 57, 60, 56],
                        [57, 59, 60, 57],
                        [57, 58, 59, 57],
                        [50, 58, 59, 50],
			        ];

			        var extendVertices = [
                        [0, 71, 72, 0],
                        [0, 72, 1, 0],
                        [1, 72, 73, 1],
                        [1, 73, 2, 1],
                        [2, 73, 74, 2],
                        [2, 74, 3, 2],
                        [3, 74, 75, 3],
                        [3, 75, 4, 3],
                        [4, 75, 76, 4],
                        [4, 76, 5, 4],
                        [5, 76, 77, 5],
                        [5, 77, 6, 5],
                        [6, 77, 78, 6],
                        [6, 78, 7, 6],
                        [7, 78, 79, 7],
                        [7, 79, 8, 7],
                        [8, 79, 80, 8],
                        [8, 80, 9, 8],
                        [9, 80, 81, 9],
                        [9, 81, 10, 9],
                        [10, 81, 82, 10],
                        [10, 82, 11, 10],
                        [11, 82, 83, 11],
                        [11, 83, 12, 11],
                        [12, 83, 84, 12],
                        [12, 84, 13, 12],
                        [13, 84, 85, 13],
                        [13, 85, 14, 13],
                        [14, 85, 86, 14],
                        [14, 86, 15, 14],
                        [15, 86, 87, 15],
                        [15, 87, 16, 15],
                        [16, 87, 88, 16],
                        [16, 88, 17, 16],
                        [17, 88, 89, 17],
                        [17, 89, 18, 17],
                        [18, 89, 93, 18],
                        [18, 93, 22, 18],
                        [22, 93, 21, 22],
                        [93, 92, 21, 93],
                        [21, 92, 20, 21],
                        [92, 91, 20, 92],
                        [20, 91, 19, 20],
                        [91, 90, 19, 91],
                        [19, 90, 71, 19],
                        [19, 71, 0, 19]
			        ]

			        function drawGridLoop() {
			            // get position of face
			            positions2 = ctrack2.getCurrentPosition();

			            overlayCC2.clearRect(0, 0, vid_width2, vid_height2);
			            if (positions2) {
			                // draw current grid
			                ctrack2.draw(overlay2);
			            }
			            // check whether mask has converged
			            var pn = ctrack2.getConvergence();
			            if (pn < 0.4) {
			                drawMaskLoop();
			            } else {
			                requestAnimFrame(drawGridLoop);
			            }
			        }

			        function drawMaskLoop() {
			            videocanvas2.getContext('2d').drawImage(vid2, 0, 0, videocanvas2.width, videocanvas2.height);

			            var pos = ctrack2.getCurrentPosition();

			            if (pos) {
			                // create additional points around face
			                var tempPos;
			                var addPos = [];
			                for (var i = 0; i < 23; i++) {
			                    tempPos = [];
			                    tempPos[0] = (pos[i][0] - pos[62][0]) * 1.3 + pos[62][0];
			                    tempPos[1] = (pos[i][1] - pos[62][1]) * 1.3 + pos[62][1];
			                    addPos.push(tempPos);
			                }
			                // merge with pos
			                var newPos = pos.concat(addPos);

			                var newVertices = pModel.path.vertices.concat(mouth_vertices);
			                // merge with newVertices
			                newVertices = newVertices.concat(extendVertices);

			                fd.load(videocanvas2, newPos, pModel, newVertices);

			                var parameters = ctrack2.getCurrentParameters();
			                for (var i = 6; i < parameters.length; i++) {
			                    parameters[i] += ph['component ' + (i - 3)];
			                }
			                positions2 = ctrack2.calculatePositions(parameters);

			                overlayCC2.clearRect(0, 0, vid_width2, vid_height2);
			                if (positions2) {
			                    // add positions from extended boundary, unmodified
			                    newPos = positions2.concat(addPos);
			                    // draw mask on top of face
			                    fd.draw(newPos);
			                }
			            }
			            animationRequest2 = requestAnimFrame(drawMaskLoop);
			        }

			        /********** parameter code *********/

			        var pnums = pModel.shapeModel.eigenValues.length - 2;
			        var parameterHolder = function () {
			            for (var i = 0; i < pnums; i++) {
			                this['component ' + (i + 3)] = 0;
			            }
			            this.presets = 0;
			        };

			        var ph = new parameterHolder();

			        var presets = {
			            "unwell": [0, 0, 0, 0, 0, 0, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			            "inca": [0, 0, -9, 0, -11, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0],
			            "cheery": [0, 0, -9, 9, -11, 0, 0, 0, 0, 0, 0, 0, -9, 0, 0, 0, 0, 0],
			            "dopey": [0, 0, 0, 0, 0, 0, 0, -11, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0],
			            "longface": [0, 0, 0, 0, -15, 0, 0, -12, 0, 0, 0, 0, 0, 0, -7, 0, 0, 5],
			            "lucky": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -4, 0, -6, 12, 0, 0],
			            "overcute": [0, 0, 0, 0, 16, 0, -14, 0, 0, 0, 0, 0, -7, 0, 0, 0, 0, 0],
			            "aloof": [0, 0, 0, 0, 0, 0, 0, -8, 0, 0, 0, 0, 0, 0, -2, 0, 0, 10],
			            "evil": [0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, -8],
			            "artificial": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11, 0, -16, 0, 0, 0, 0, 0],
			            "none": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			        };

			        /********** defaults code **********/

			        this.switchDeformedFace=function(val) {
			            //var split = ph.presets.split(",");

			            for (var i = 0; i < pnums; i++) {
			                ph['component ' + (i + 3)] = presets[val][i];
			            }
			        }

			        for (var i = 0; i < pnums; i++) {
			            ph['component ' + (i + 3)] = presets['unwell'][i];
			        }

			        this.start = function () {
						console.log("Face Deformation Started.");
			            drawGridLoop();		            
			        }

			        this.stop = function () {              			            
			            cancelRequestAnimFrame(animationRequest2);
			            overlayCC2.clearRect(0, 0, vid_width2, vid_height2);
			            fd.clear();
			        }
			    }

var fd = new faceDeform();
fd.start();