// Disable double-tap
let drags = new Set() //set of all active drags
document.addEventListener("touchmove", function(event){
  if(!event.isTrusted)return //don't react to fake touches
  Array.from(event.changedTouches).forEach(function(touch){
    drags.add(touch.identifier) //mark this touch as a drag
  })
})
document.addEventListener("touchend", function(event){
  if(!event.isTrusted)return
  let isDrag = false
  Array.from(event.changedTouches).forEach(function(touch){
    if(drags.has(touch.identifier)){
      isDrag = true
    }
    drags.delete(touch.identifier) //touch ended, so delete it
  })
  if(!isDrag && document.activeElement == document.body){
    //note that double-tap only happens when the body is active
    event.preventDefault() //don't zoom
    event.stopPropagation() //don't relay event
    event.target.focus() //in case it's an input element
    event.target.click() //in case it has a click handler
    event.target.dispatchEvent(new TouchEvent("touchend",event))
    //dispatch a copy of this event (for other touch handlers)
  }
})

// Setting up to phone (size=2) or computer mode (size=3)
var width = $(window).width();
var oldsize = 2;
var newsize = 2;
if (width < 1000) {
  $(".mySlides img, .myMobileSlides img").each(function(index){
    var src = $(this).attr("src");
    var photoName = src.substr(-9, 9);  
    //console.log("- than 1000");
    //console.log(width);    
    $(this).attr("src", "img/mobile/"+photoName);     
  }) 
  $(".slideshow-container").addClass("phonemaxwidth");
  $(".canOpen").removeClass( "canOpen" ).addClass( "cannotOpen" );      
  $(".myMobileSlides").addClass( "mySlides" );  
  newsize = 2;    
}                                                          
else{ 
  var width = $(window).width();
  $(".mySlides img, .myMobileSlides img").each(function(index){
    var src = $(this).attr("src")
    var photoName = src.substr(-9, 9);      
    //console.log("+ than 1000");
    //console.log(width);
    $(this).attr("src", "img/"+photoName);  
  })  
  $(".slideshow-container").removeClass("phonemaxwidth");        
  $(".cannotOpen").addClass( "canOpen" ).removeClass( "cannotOpen" );         
  $(".myMobileSlides").removeClass( "mySlides" );  
  newsize = 3;                                          
} 
oldsize = newsize;

// Calling showSlides function
var slideIndex = 1;
showSlides(slideIndex);

// ???????????????????????????
const target = document.getElementsByClassName("open");

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
  checkOpen();
  $('.toOpen').scrollTop(0);
  var opened = document.getElementsByClassName("open");
  while (opened.length)
  opened[0].className = opened[0].className.replace(/\bopen\b/g, "");
  var downdiv = document.querySelector(".down");
  downdiv.classList.remove("activated")
}

// Go to certain page controls
function startSlides(n) {
  showSlides(slideIndex = n);
  checkOpen();
  $('.toOpen').scrollTop(0);
  var opened = document.getElementsByClassName("open");
  while (opened.length)
  opened[0].className = opened[0].className.replace(/\bopen\b/g, "");
  var downdiv = document.querySelector(".down");
  downdiv.classList.remove("activated")
}

// ???????????????????????????
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slides[slideIndex-1].classList.add("active");
  $('.toOpen').scrollTop(0);
  var opened = document.getElementsByClassName("open");
  while (opened.length)
  opened[0].className = opened[0].className.replace(/\bopen\b/g, "");
  var downdiv = document.querySelector(".down");
  downdiv.classList.remove("activated")
}

// Check if the current page can open, then shows down button
function checkOpen() {
    var currentslide = document.querySelector(".active")
    if (currentslide.classList.contains("canOpen")){document.getElementById("down").classList.add("visible");}
    else{document.getElementById("down").classList.remove("visible");}
}

// Show open pages
function openDown() {
    var currentslide = document.querySelector(".active")
    var downdiv = document.querySelector(".down")
    if (currentslide.classList.contains("un")) {
        var imagetoopen = document.querySelector(".one");
        if (imagetoopen.classList.contains("open")) {imagetoopen.classList.remove("open"); downdiv.classList.remove("activated")}
        else {imagetoopen.classList.add("open"); downdiv.classList.add("activated")}
    }
    if (currentslide.classList.contains("deux")) {
        var imagetoopen = document.querySelector(".two");
        if (imagetoopen.classList.contains("open")) {imagetoopen.classList.remove("open"); downdiv.classList.remove("activated")}
        else {imagetoopen.classList.add("open"); downdiv.classList.add("activated")}
    }
    if (currentslide.classList.contains("trois")) {
        var imagetoopen = document.querySelector(".three");
        if (imagetoopen.classList.contains("open")) {imagetoopen.classList.remove("open"); downdiv.classList.remove("activated")}
        else {imagetoopen.classList.add("open"); downdiv.classList.add("activated")}
    }
    if (currentslide.classList.contains("quatre")) {
        var imagetoopen = document.querySelector(".four");
        if (imagetoopen.classList.contains("open")) {imagetoopen.classList.remove("open"); downdiv.classList.remove("activated")}
        else {imagetoopen.classList.add("open"); downdiv.classList.add("activated")}
    }
    if (currentslide.classList.contains("cinq")) {
        var imagetoopen = document.querySelector(".five");
        if (imagetoopen.classList.contains("open")) {imagetoopen.classList.remove("open"); downdiv.classList.remove("activated")}
        else {imagetoopen.classList.add("open"); downdiv.classList.add("activated")}
    }

}

// On window resize, checks if phone or computer mode is needed and applies it
$(window).resize(function(){     
  var width = $(window).width();

  if (width < 1000) {
    newsize = 2;
  }                                                          
  else{
    newsize = 3;                                         
  }   

  if (newsize != oldsize) {
    $(".active").removeClass( "active" );
    startSlides(1);
  }

  if (width < 1000) {
    $(".mySlides img, .myMobileSlides img").each(function(index){
      var src = $(this).attr("src");
      var photoName = src.substr(-9, 9);      
      $(this).attr("src", "img/mobile/"+photoName); 
    }) 
    $(".slideshow-container").addClass("phonemaxwidth");
    $(".canOpen").removeClass( "canOpen" ).addClass( "cannotOpen" );      
    $(".myMobileSlides").addClass( "mySlides" );  
  }                                                          
  else{
    $(".mySlides img, .myMobileSlides img").each(function(index){
      var src = $(this).attr("src")
      var photoName = src.substr(-9, 9);      
      $(this).attr("src", "img/"+photoName); 
    })   
    $(".slideshow-container").removeClass("phonemaxwidth");       
    $(".cannotOpen").addClass( "canOpen" ).removeClass( "cannotOpen" );         
    $(".myMobileSlides").removeClass( "mySlides" );                                        
  }   

  //console.log(width)
  //console.log("newsize =");
  //console.log(newsize);
  //console.log("oldsize =");
  //console.log(oldsize);
  oldsize = newsize;
  checkOpen();                                                     
}); 

