// Document ready
$(document).ready(function(){
  $("body").css("overflow-y","scroll");
});

// Firebase login access
document.getElementById("login-btn").addEventListener("click", ()=>{
  let email = $(".login-user").val();
  let pass = $(".login-password").val();
  console.log(email);

  // Check existent user
  firebase.auth().signInWithEmailAndPassword(email, pass).
   catch(function(error) {
   var errorCode = error.code;
   var errorMessage = error.message;
   console.log(errorCode)
   console.log(errorMessage);
   alert("No fue posible acceder");
 });

 // Action if user is logged in
 firebase.auth().onAuthStateChanged(function(user) {
   if (user) {
     // User is signed in.
     var displayName = user.displayName;
     var email = user.email;
     var emailVerified = user.emailVerified;
     var photoURL = user.photoURL;
     var isAnonymous = user.isAnonymous;
     var uid = user.uid;
     var providerData = user.providerData;
     alert("Accedio correctamente");

     window.location.href = "../dashboard.html"
   }
   else {
     // User is signed out.
   }
 });
});
