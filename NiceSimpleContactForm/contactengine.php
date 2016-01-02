<?php

$EmailFrom = "BROOKE BURNSIDE.COM";
$EmailTo = "brburnsidedesign@gmail.com";
$Subject = "YOU HAVE NEW MAIL FROM YOUR WEBSITE";
$Name = Trim(stripslashes($_POST['Name']));
$Tel = Trim(stripslashes($_POST['Tel']));
$Email = Trim(stripslashes($_POST['Email']));
$Message = Trim(stripslashes($_POST['Message']));


$validationOK=true;
if (!$validationOK) {
  print "<meta http-equiv=\"refresh\" content=\"0;URL=./NiceSimpleContactForm/error.htm\">";
  exit;
}


$Body = "";
$Body .= "Name: ";
$Body .= $Name;
$Body .= "\n";
$Body .= "Tel: ";
$Body .= $Tel;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $Email;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $Message;
$Body .= "\n";


$success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");


if ($success){
  print "<meta http-equiv=\"refresh\" content=\"0;URL=NiceSimpleContactForm/contactthanks.php\">";
}
else{
  print "<meta http-equiv=\"refresh\" content=\"0;URL=NiceSimpleContactForm/error.htm\">";
}
?>
