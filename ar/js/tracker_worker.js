if( 'function' === typeof importScripts) {
	
	var pose_ptr, frame_bytes;
	
	// Camera intrinsics
	var cam_f, cam_p_x, cam_p_y, distcoeffs;
	
	var cam_w, cam_h;
	
	// Marker size
	var obj_m_w, obj_m_h;
	
	// Show OpenCV debug output
	var debug = true;
	
	// Load the wasm generated glue code
	importScripts('tracker_wasm.js');
	  
	addEventListener('message', onMessage);

	function onMessage(e) { 
		switch(e.data.cmd){
			case "processFrame":
				processFrame(e.data.img_data);
				break;
			case "setCameraIntrinsics":
				setCameraIntrinsics(e.data.cam_f, e.data.cam_p_x, e.data.cam_p_y, 
										e.data.distcoeffs, e.data.cam_w, e.data.cam_h);
				break;
			case "setMarkerWorldSize":
				setMarkerWorldSize(e.data.obj_m_w, e.data.obj_m_h);
				break;
		}
	}   
	
	// Overrides for the generated emcc script, module gets redifined later
	Module.onRuntimeInitialized = function() {
		console.log("Loading module!");
		
		// Init tracker modul
		Module._initialize(debug);
										   	
		// Get static pose pointer from module
		pose_ptr = Module._get_camera_pose_ptr();
		
		// Let pointer point to 64bit floats through devision by 8 (bytes) as bit-shift equivalent
		pose_ptr = pose_ptr >> 3;
		console.log("Finished loading module!");
		
		postMessage({'cmd': 'onRuntimeInitilized'});
	}; 
	
	function setCameraIntrinsics(cam_f, cam_p_x, cam_p_y, distcoeffs, cam_w, cam_h){
		var distcoeffsPtr = Module._malloc(distcoeffs.length * distcoeffs.BYTES_PER_ELEMENT);
		Module.HEAPF64.set(distcoeffs, distcoeffsPtr >> 3);
		
		Module._set_camera_intrinsics(cam_f, cam_p_x, cam_p_y, distcoeffsPtr);
		
		this.cam_w = cam_w;
		this.cam_h = cam_h;
	}
	
	function setMarkerWorldSize(obj_m_w, obj_m_h){
		Module._set_marker_world_size(obj_m_w, obj_m_h);
	}
	

	function arrayToHeap(pixelArray) {
		var numBytes = pixelArray.length * pixelArray.BYTES_PER_ELEMENT;
		var ptr = Module._malloc(numBytes);
		heapBytes = Module.HEAPU8.subarray(ptr, ptr + numBytes);
		heapBytes.set(pixelArray);
		return heapBytes;
	}
		
	function processFrame(img_data){
		
		if (!frame_bytes) {
			frame_bytes = arrayToHeap(img_data.data);
		}
		else if (frame_bytes.length !== img_data.data.length) {
			Module._free(heapBytes.byteOffset);
			frame_bytes = arrayToHeap(img_data.data);
		}
		else {
			frame_bytes.set(img_data.data);
		}

		// Perform operation on copy, no additional conversions needed, direct pointer manipulation
		// results will be put directly into the output param.
		Module._track_frame(cam_w, cam_h, frame_bytes.byteOffset, frame_bytes.byteOffset);

		// Get pose update
		if(Module._is_camera_pose_available() && pose_ptr) {
			var viewMatrixF64 = Module.HEAPF64.subarray(pose_ptr, pose_ptr+16);
			var viewMatrixArray =  Array.prototype.slice.call(viewMatrixF64);
			
			postMessage({'cmd': 'onPoseUpdate', 'available': true, 'viewMatrixArray': viewMatrixArray}); 
		} else {
			postMessage({'cmd': 'onPoseUpdate', 'available': false});
		}


		if(debug) {
			// copy output to ImageData
			img_data.data.set(frame_bytes);
			postMessage({'cmd': 'drawProcessedFrame', 'img_data': img_data});
		}
	}
}




