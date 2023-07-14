// TODO: Add the possibility to add an offset for animations, 
// using a data-attribute.
// I.E.: data-anim-offset="2"

/**********************************
*********** INIT ANIMS ************
**********************************/

$e(document, 'DOMContentLoaded', function() {
    if (window.innerWidth >= 0) {
        requestAnimationFrame(startAnims);
        requestAnimationFrame(function() {
            $each($all('.media-object:not(.alt):not(.glide__slide) img.racing'), function(el) {
                slideElementOnScroll(el, 'left');
            });
            $each($all('.media-object.alt:not(.glide__slide) img.racing'), function(el) {
                slideElementOnScroll(el, 'right');
            });
        });
    }
});
    
$e(window, 'scroll', function() {
    if (window.innerWidth >= 0) {
        requestAnimationFrame(startAnims);
        requestAnimationFrame(function() {
            $each($all('.media-object:not(.alt):not(.glide__slide) img.racing'), function(el) {
                slideElementOnScroll(el, 'left');
            });
            $each($all('.media-object.alt:not(.glide__slide) img.racing'), function(el) {
                slideElementOnScroll(el, 'right');
            });
        });
    }
});

/**********************************
********* ONE SHOT ANIMS **********
**********************************/

// Adds animation classes to selected elements
/*
    Example input:
    let animations = {
        '#hero > p:first-of-type': 'slideInLeft',
        '#numbers em > span': 'js-number'
    }
*/
function addAnimClasses(animations) {
    for (let selector in animations) {
        let elements = document.querySelectorAll(selector);
        let animationClass = animations[selector];
        elements.forEach(function(element) {
            element.classList.add('anim', animationClass);
        });
    }
}

function startAnims() {
    /* Window bottom Y position */
    let scrollY = (window.pageYOffset + window.innerHeight);
    let bodyTop = document.body.getBoundingClientRect().top;
  
    /* Starts animations by adding the .running class when the Window bottom
      is in the middle of the element */
    $each($all('.anim'), function(el) {
      let offset = el.clientHeight / 2;
      let posY = (el.getBoundingClientRect().top - bodyTop) + offset - getTranslateY(el);
  
      if (scrollY >= posY) {
        jsAnims(el);
            
        if (el.classList.contains('anim')) {
            el.classList.add('running');
            el.classList.remove('anim');
        }
      }
    });
}

// Insert javascript animations here
function jsAnims(el) {
    if (el.classList.contains('js-number')) {
        if (el.classList.contains('running'))
            return;

        animateNumber(el, 1500);
    }
}

// Animates a number from zero
function animateNumber(el, duration) {
    let currentValue = 0;
    let endValue = parseInt(el.innerHTML);
    let stepTime = 20; // Interval in milliseconds
    let increment = endValue / (duration / stepTime);
    let timer = setInterval(function() {
        currentValue += increment;
        el.innerHTML = Math.round(currentValue);
        if ((increment > 0 && currentValue >= endValue) || (increment < 0 && currentValue <= endValue)) {
            clearInterval(timer);
            el.innerHTML = endValue;
        }
    }, stepTime);
}

/**********************************
******* SCROLL-BASED ANIMS ********
**********************************/

function slideElementOnScroll(element, dir, targetPositionRatio = 0.75) {
    // Temporarily reset the transform property to get the current dimensions and position
    element.style.transform = '';
  
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
  
    let startX;
    let translateX;
  
    if (dir === 'left') {
        startX = -rect.right / 2;
    } else if (dir === 'right') {
        startX = (window.innerWidth - rect.left) / 2;
    }
  
    const elementTopInView = rect.top >= 0;
    const elementBottomInView = rect.bottom <= windowHeight;
    const elementPastTarget = rect.top <= windowHeight * targetPositionRatio;
  
    if (elementTopInView && elementBottomInView) {
        const progress = (rect.bottom - windowHeight * targetPositionRatio) / (windowHeight * (1 - targetPositionRatio));
        translateX = startX * Math.max(0, Math.min(1, progress));
    } else if (elementPastTarget) {
        translateX = 0;
    } else {
        translateX = startX;
    }
  
    element.style.transform = `translateX(${translateX}px)`;
}

/**********************************
******* UTILITARY FUNCTIONS *******
**********************************/

/* Lets the browser decide when do execute a function */
var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

function getTranslateY(obj)
{
    if(!window.getComputedStyle) return;
    var style = getComputedStyle(obj),
        transform = style.transform || style.webkitTransform || style.mozTransform;
    var mat = transform.match(/^matrix3d\((.+)\)$/);
    if(mat) return parseFloat(mat[1].split(', ')[13]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
}

function getTranslateX(obj) {
    if (!window.getComputedStyle) return;
    var style = getComputedStyle(obj),
      transform = style.transform || style.webkitTransform || style.mozTransform;
    var mat = transform.match(/^matrix3d\((.+)\)$/);
    if (mat) return parseFloat(mat[1].split(', ')[12]);
    mat = transform.match(/^matrix\((.+)\)$/);
    return mat ? parseFloat(mat[1].split(', ')[4]) : 0;
}