$(document).ready(() =>{

  $("body").css("overflow-y","scroll");

  const dataBase = firebase.database().ref();

  // Recover Data Base info
  recoverDataBase();

  function recoverDataBase(){
    dataBase.on("value", function(snapshot){
      let showData = snapshot.val();
      let result = "";


      // Iterate all tables in DB
      for(var key in showData){
        result += `<div class="news-div">
                    <div class="date-label animated pulse infinite">`+showData[key].date+`</div>
                    <img class="news-title-image" src="`+showData[key].url+`"></img>
                    <h2>`+showData[key].title+`</h2>
                    <img class="news-title-image-content" src="`+showData[key].url+`"></img>
                    <div class="news-description">`+showData[key].content+`</div>
                   </div>`;
      }

      // Show the news in news-main section
      $(".news-main").html(result);


      // Expand News
      let status = "active";
      $(".news-div").click(function () {
        if( status == "active"){
          $(this).children(".news-title-image-content").slideDown();
          $(this).children(".news-description").slideDown();
          $(this).css("flex-direction","column");
          $(this).children(".news-title-image").hide();
          status = "inactive";
        }
        else{
          $(this).children(".news-title-image-content").slideUp();
          $(this).children(".news-description").slideUp();
          $(this).css("flex-direction","row");
          $(this).children(".news-title-image").show();
          status = "active";
        }
      });
    });
  }
});
