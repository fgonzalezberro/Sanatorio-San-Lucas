// Loading document
$(document).ready(() =>{

  // Set the initial btn status
  let btnStatus = true;

  // Transform 'News Textarea' in a Editable textarea
  $(".news-content").Editor();

  // Set Sidebar animation's
  $(".dashboard-btn").click(() =>{
    // Execute this function if btnStatus is true in Desktop Version
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

    // Execute this function if btnStatus is false in Desktop Version
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

  $('.dashboard-btn-2').click(() =>{
    $('.mobile-navbar').slideToggle(1000);
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
  $(".remove-news-opt").click(() => changeDashSection('.remove-news-section'));
  $(".change-password-opt").click(() => changeDashSection('.change-password-section'));

  // Open Input 'file' when the usr click the element 'Charge Image Button'
  $(".charge-image-button").click(() =>{
    $("#news-input-file").click();
  });

  // Datepicker function
  $(".news-date").datepicker(); // When the usr click in 'Date input' the Datepicker is Open

  // Capture the Input Type element
  const inputFileType = document.getElementById('news-input-file');
  // Capture Cahrge Image Button
  const chargeImgBtn = document.querySelector('.charge-image-button');

  // When de image is upload or status change
  inputFileType.addEventListener('change', ()=>{
    chargeImgBtn.innerHTML = `
                              <i class="fas fa-check-circle" style="color: #C0E189"></i>
                              <p> Imagen cargada correctamente </p>
                             `;
  });

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

     alert('Se ah añadido correctamente la noticia');

     window.location.href = 'dashboard.html';
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
        // Show progress bar
       $("#progress-bar").show();
       document.querySelector(".progress-bar").style.width = progress + "%";

    }, function(error) {
        $("#progress-bar").hide();
        alert('No se pudo subir la noticia.');
        window.location.href = 'dashboard.html';
    }, function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        $("#progress-bar").hide();
        createNodeInDataBase(imageToUpload.name , downloadURL);
      });
    });
  });

  // Recover Data Base info
  recoverNewsList();

  function recoverNewsList(){
    let dataBaseRef = firebase.database().ref();

    dataBaseRef.on("value", function(snapshot){
      let showData = snapshot.val();
      let newsList = "";


      // Iterate all tables in DB
      for(var key in showData){
        newsList += `
                    <tr>
                    <td>`+showData[key].title+`</td>
                    <td>`+key+`</td>
                    <td>`+showData[key].date+`</td>
                    <td><i class="fas fa-trash-alt `+key+`" value="`+key+`"></i></td>
                   </tr>
                   `;
      }

      // Show the news in news-main section
      $('tbody').html(newsList);

      $('.fa-trash-alt').click(function(){
        deleteNew($(this)[0]);
      });
    });
  }

  // Delete news function
  const deleteNew = (e) =>{
    let dataBaseRef = firebase.database();
    let newToDelete = e.getAttribute('value');

    dataBaseRef.ref("/"+newToDelete).remove();

    alert('Noticia borrada correctamente');
  }

  // Log out Firebase sesion
  $(".log-out-opt").click(() =>{
    firebase.auth().signOut()
    .then(() =>{
      alert('Se cerro la sesion correctamente');
      window.location.href = 'login.html';
    })
    .catch(() =>{
      alert('No se pudo cerrar la sesion correctamente');
    })
  });
});
