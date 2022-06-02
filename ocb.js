 let coin_r = document.querySelector("#coin_r");
let coin_l = document.querySelector("#coin_l");
let delayInMilliseconds = 1000
let points = document.getElementById('points');
let play = document.getElementById('play');
let play_btn = document.getElementById('play_btn');

let three = document.getElementById('three');
let two = document.getElementById('two');
let one = document.getElementById('one');

let video = document.getElementById('video');

function hidePlay() {
  play.style.display = 'none';
  setTimeout(function() {
  countdown();
}, 500);
}

<!-- Countdown -->
function countdown() {
   three.style.display = 'block';
  setTimeout(function() {
  three.style.display = 'none';
    countdown2();
}, 1000);
}

function countdown2() {
   two.style.display = 'block';
  setTimeout(function() {
  two.style.display = 'none';
    countdown3();
}, 1000);
}

function countdown3() {
   one.style.display = 'block';
  setTimeout(function() {
  one.style.display = 'none';
    videoControl();
}, 1000);
}
<!-- End Countdown -->

<!-- Video Control -->
function videoControl() {
   video.play();
  
  setTimeout(function() {
  one.style.display = 'none';
    video.pause();
   
}, 30000);
}

<!-- End Video Control -->

<!-- Coin Control-->

<!--End Coin Control -->




// Coin Right  
AFRAME.registerComponent('random-delay1', {
        init: function (el) {
            // this.el points to the element the component is placed on 
            var el = this.el;
            let min1 = 0;
            let max1 = 3000;
          
            // initial animation
             //setAnimation(min1, max1)
           
               
         
          
          

            function setAnimation(min1, max1) {
                // generates a random number between the set min and max
                let delay1 = Math.floor(Math.random() * (max1 - min1 + 1)) + min1;
                let animation1 = `property: position; delay: ${delay1}; from: 50 0 -500; to: 50 0 0; dur: 2000; easing: linear; `
                
                // updating the animation component with the .setAttribute function
               
                //code
                el.setAttribute('visible', true)
           
                el.setAttribute('animation', animation1)
                
                
            }
                      
                      
            el.addEventListener('animationcomplete', () => {
                setAnimation(min1, max1)
            });
           el.addEventListener('click', () => {
                  coin_r.setAttribute('visible',false)
                points.style.display = "block";
               setTimeout(function() {
                points.style.display = "none";
               }, 500);

            });
            setAnimation(min1, max1)
        }
    });


// End of Coin Right



// Coin Left

AFRAME.registerComponent('random-delay2', {
        
        schema: {
            target : { type : "selector"}
        },
        
        init: function (el) {
            // this.el points to the element the component is placed on 
            var el = this.el;
            let min2 = 0;
            let max2 = 3000;
            // initial animation
             //
           
         
            setAnimation(min2, max2)
        
          

            function setAnimation(min2, max2) {
                // generates a random number between the set min and max
                let delay2 = Math.floor(Math.random() * (max2 - min2 + 1)) + min2;
                let animation2 = `property: position; delay: ${delay2}; from: -50 0 -500; to: -50 0 0; dur: 2000; easing: linear; `
                
                // updating the animation component with the .setAttribute function
            
               
                      el.setAttribute('visible', true)
           
                      el.setAttribute('animation', animation2)
           
             
             }
                          
            el.addEventListener('animationcomplete', () => {
                setAnimation(min2, max2)
            });
           el.addEventListener('click', () => {
                  coin_l.setAttribute('visible',false)
                points.style.display = "block";
               setTimeout(function() {
                points.style.display = "none";
               }, 500);

            });
            setAnimation(min2, max2)
             
        }
    });

// End of Coin Left