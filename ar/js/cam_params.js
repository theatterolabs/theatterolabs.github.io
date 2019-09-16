const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);	

// Camera parameters
var CAM_W = 320; // px
var CAM_H = 240; // px
var CAM_F = 3.1832750333622789e+02; // px
var CAM_P_X = 1.5273683902679531e+02; // px
var CAM_P_Y = 1.1422374971424500e+02; // px
var CAM_DIST_COEFFS = new Float64Array([ 1.2797846489859788e-01, -2.5297063618341920e-01,
									      -3.0014047276444166e-03, -5.0002222534361570e-03,
									       1.6168575470805638e-01
									     ]);	
// Mobile camera parameters					     
if(isMobile) {
	CAM_W = 320; // px old: 240 px
	CAM_H = 240; // px old: 320 px
	CAM_F = 3.1832750333622789e+02; // px
	CAM_P_X = CAM_W / 2; // px
	CAM_P_Y = CAM_H / 2; // px
	CAM_DIST_COEFFS = new Float64Array([ 0, 0, 0, 0, 0 ]);
}
									     							    								     
// Marker dimensions
const OBJ_M_W = 0.260; // m
const OBJ_M_H = 0.147; // m
//const OBJ_M_W = 0.226; // m
//const OBJ_M_H = 0.292; // m

const RAD2DEG = 57.29577951308232;

const CAM_VFOV = 2 * Math.atan(0.5 * CAM_H / CAM_F) * RAD2DEG;
const CAM_ASPECT = CAM_W / CAM_H;