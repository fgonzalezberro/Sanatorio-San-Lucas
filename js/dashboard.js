// Loading document
$(document).ready(() =>{

  // Set the initial btn status
  let btnStatus = true;

  // Transform 'News Textarea' in a Editable textarea
  $(".news-content").Editor(); 

  // Set Sidebar animation's
  $(".dashboard-btn").click(() =>{
    // Execute this function if btnStatus is true
    const openSidebar = () =>{
      $(".side-bar").css({
        'width': '250px'
      });

      setTimeout(() =>{
        $(".dashboard-options").css({
          'display': 'flex'
        });
      },250);

      btnStatus = false;
    }

    // Execute this function if btnStatus is false
    const closeSidebar = () =>{
      $(".side-bar").css({
        'width': '90px'
      });

      $(".dashboard-options").css({
        'display': 'none'
      });

      btnStatus = true;
    }

    // Evaluate the state of the button
    return btnStatus == true ? openSidebar() : closeSidebar();
  });

  // Show and Hide 'Dashboard' sections
  const changeDashSection = (classSection) =>{
    $(".dashboard-main").children('div , h2').hide();
    $(".dashboard-main").css('padding' , '0');
    $(classSection).css({
      'display': 'flex',
      'flex-direction' : 'column',
      'justify-content' : 'center',
      'align-items' : 'center'
    });
  }

  $(".add-news-opt").click(() => changeDashSection('.add-news-section'));

  // Open Input 'file' when the usr click the element 'Charge Image Button'
  $(".charge-image-button").click(() =>{
    $("#news-input-file").click();
  });

  // Datepicker function
  $(".news-date").datepicker(); // When the usr click in 'Date input' the Datepicker is Open

  // Capture the Input Type element
  const inputFileType = document.getElementById('news-input-file');

  // This function upload all data in firebase DB
  $(".add-new-btn").click(() =>{
    // Prevent Default Action
    $("form").submit((e) =>{
      e.preventDefault();
    });

   // Set Firebase References
   let storageRef = firebase.storage().ref();
   let dataBaseRef = firebase.database().ref();

   // Create a node in data base with the inputs info
   const createNodeInDataBase = (imageName, imageURL) =>{
     let newsTitle = $(".news-title").val();
     let newsDate = $(".news-date").val();
     let newsContent = $(".news-content").Editor('getText');

     dataBaseRef.push({
       name: imageName,
       url: imageURL,
       title: newsTitle,
       date: newsDate,
       content: newsContent
     });
   }

   // Define the image to upload in the storage
   const imageToUpload = inputFileType.files[0];
   // Upload Image
   let uploadTask = storageRef.child('newsImages/' + imageToUpload.name).put(imageToUpload);

    // Upload storage handler
    uploadTask.on('state_changed', function(snapshot){
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
    }, function(error) {
        console.log(error);
    }, function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        createNodeInDataBase(imageToUpload.name , downloadURL);
      });
    });
  });
});
