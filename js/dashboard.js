// Loading document
$(document).ready(() =>{
  $("body").css("overflow-y","scroll");

  let storageRef;
  const newsDbRef = firebase.database().ref();

  // Text editor
  $("#news-description").Editor();

  // Upload News-Image button
  $("#news-image-2-btn").click(() =>{
    $("#news-image").click();
  });

  // DatePicker Function
  $("#news-date").datepicker();

  $("#news-update-btn").click(() =>{
    uploadImageToStorage();
  });

  // Upload Image to Firebase Storage
  function uploadImageToStorage(){

    // The image to upload
    let uploadImageToStorage = document.getElementById("news-image").files[0];

    // Storage root reference
    storageRef = firebase.storage().ref();

    // Function to upload image
    let uploadTask = storageRef.child("newsImages/" + uploadImageToStorage.name).put(uploadImageToStorage);

    uploadTask.on('state_changed',

    // View Upload Progress
    function(snapshot){
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }

	     // Show Progress BAR
       $("#progress-bar").show();
       document.querySelector(".progress-bar").style.width = progress + "%";

    }, function(error) {
      // Show errors if unsuccessful upload
      $("#progress-bar").hide();
      alert("No se pudo subir correctamente la imagen");
    }, function() {
      // Show successful uploads on complete
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        createNodeInFireBase(uploadImageToStorage.name , downloadURL);
        $("#progress-bar").hide();

		    // Clean inputs
        setTimeout(function(){
		      window.location.href="dashboard.html";
        },500);
      });
    });

    // Charge DB (News Node)
    function createNodeInFireBase(imageName, url){
      let newsTitle = $("#news-title").val();
      let newsDate = $("#news-date").val();
      let newsContent = $("#news-description").Editor("getText");

      newsDbRef.push({
        name: imageName,
        url: url,
        title: newsTitle,
        date: newsDate,
        content: newsContent
      });
    }
  }
});
