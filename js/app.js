$(document).ready(() =>{
  // Set Time To Hide "Loading" Section
  setTimeout(()=>{
    $(".loading").slideUp();
    $("body").css("overflow-y","scroll");
  }, 500);

  // Mobile Menu Button Slide Up & Down
  let state = true;
  $("#menu-btn").click(() =>{
    if(state == true){
      $("nav ul").slideDown();
      state = false;
    }
    else{
      $("nav ul").slideUp();
      state = true;
    }
  });

  // Back to index button
  $("#back-to-index").click(() =>{
    $(".main").slideUp();
    $(".main").empty();
    window.location.href="../index.html";
  });

  // Load Telephone Section
  $(".telephone-button").click(() =>{
    $("body").css("overflow-y","hidden");
    $(".main").slideDown();
    $(".main").css("display","block");
    $(".main").load("../components/telephone.html");
    $(".hide-and-show").hide();
  });

  // Load Institutional Section
  $(".institutional-btn").click(() =>{
    $("body").css("overflow-y","hidden");
    $(".main").slideDown();
    $(".main").css("display","block");
    $(".main").load("../components/institutional.html");
    $(".hide-and-show").hide();
  });

  // Load User services section
  $(".user-services-btn").click(() =>{
    $("body").css("overflow-y","hidden");
    $(".main").slideDown();
    $(".main").css("display","block");
    $(".main").load("../components/user-services.html");
    $(".hide-and-show").hide();
  });

  // Load medic staff section
  $(".medic-staff-btn").click(() =>{
    $("body").css("overflow-y","hidden");
    $(".main").slideDown();
    $(".main").css("display","block");
    $(".main").load("../components/medic-staff.html");
    $(".hide-and-show").hide();
  });

  // Load Teaching Committee section
  $(".teaching-committee-btn").click(() =>{
    $("body").css("overflow-y","hidden");
    $(".main").slideDown();
    $(".main").css("display","block");
    $(".main").load("../components/teaching-committee.html");
    $(".hide-and-show").hide();
  });

  // Show and Hide User services options
  $(".coberturas-medicas-btn").click(() =>{
    $(".cobertura-medica-section").slideToggle();
  });

  $(".servicios-medicos-btn").click(() =>{
    $(".servicios-medicos-section").slideToggle();
  });

  $(".cuestionario-pre-quirurgico-btn").click(() =>{
    $(".cuestionario-pre-quirurgico-section").slideToggle();
  });

  $(".consentimiento-quirurgico-btn").click(() =>{
    $(".consentimiento-quirurgico-section").slideToggle();
  });

  $(".constancia-obstetrica-btn").click(() =>{
    $(".constancia-obstetrica-section").slideToggle();
  });

  $(".preguntas-frecuentes-btn").click(() =>{
    $(".preguntas-frecuentes-section").slideToggle();
  });

  // Redirect to other services WebSites
  $("#argus-btn").click(() =>{
    window.location.href = "https://www.argus.com.ar/";
  });

  $("#hidalgo-btn").click(() =>{
    window.location.href = "https://www.laboratoriohidalgo.com/";
  });

  $("#omar-center-btn").click(() =>{
    window.location.href = "http://www.centromedicomartinyomar.com/";
  });

  const dataBase = firebase.database().ref();
  let carouselArr = [];
  let carouselArrTitle = [];

  // Recover Data Base info
  chargeHospitalCarousel();

  function chargeHospitalCarousel(){
    dataBase.on("value", function(snapshot){
      let showData = snapshot.val();

      // Iterate all tables in DB
      for(var key in showData){
       carouselArr.push(showData[key].url);
       carouselArrTitle.push(showData[key].title);
      }
    });
   }

  let i = 0;

  console.log(carouselArr);

  setInterval(function(){

    if(i < carouselArr.length){
      $(".hospital-carousel-image").attr('src' , `${carouselArr[i]}`);
      $(".hospital-carousel-title").html(`${carouselArrTitle[i]}`);
    }else{
      i = 0;
      $(".hospital-carousel-image").attr('src' , `${carouselArr[i]}`);
      $(".hospital-carousel-title").html(`${carouselArrTitle[i]}`);
    }

    i++;
  },3000);

  $(".hospital-cover-carousel").click(() =>{
    window.location.href = "../components/news.html";
  });

});
