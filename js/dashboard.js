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
});
