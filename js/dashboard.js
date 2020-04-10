// Loading document
$(document).ready(() =>{
  // Set the initial btn status
  let btnStatus = true;

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
});

// Open Input 'file'
$(".charge-image-button").click(() =>{
  $("#news-input-file").click();
});

// Datepicker function
$(".news-date").datepicker(); // When the usr click in 'Date input' the Datepicker is Open
