<?php
   // Call inputs values
   $name = $_POST["name"];
   $email = $_POST["email"];
   $affair = $_POST["affair"];
   $message = $_POST["message"];

   // Email data
   $select = $_POST["select-sector"];

   $emailMessage = "De: $name  \n";
   $emailMessage .= "E-mail: $email \n";
   $emailMessage .= "Asunto: $affair \n";
   $emailMessage .= "Mensaje: $message";

   // Aditional Headers
   $aditionalHeaders = "From: $email \r\n";
   $aditionalHeaders .= "Bcc: <fgonzalezberro@gmail.com> \r\n";

   //Send Email
   $mail = @mail($select, $affair, $emailMessage, $aditionalHeaders);

   if($mail){
      echo '<div style= "height: 100vh; width:100%; display: flex; flex-direction: column; align-items:center; justify-content: center;"><p style="border: 2px solid #0c82c6; color: #0c82c6; padding: 5% 10%; margin-bottom: 2%;"> El email se envío correctamente</p> <a href="index.html"> <button style= "padding: 10px 20px; border: 2px solid #0c82c6; background-color: #0c82c6; color: #fff; cursor: pointer;">Volver al sitio</button></a></div>';
   }
   else{
      echo "<p>No se pudo envíar el email, compruebe que se hayan completado todos los campos y vuelva a intentar.</p>";
    }
?>
