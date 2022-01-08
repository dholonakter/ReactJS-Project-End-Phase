<?php
/* register your client at https://api.fhict.nl/Documentation/RequestAccess
 * copy this file to login_config.php
 * fill in the right values
 * try it!
 */
session_start();
if($_SESSION['ingelogd'] !== true){
  header('Location: login.php');
}

define('DEBUG_MODE',true); //If true, set display errors to all.
define('OPENID_SERVER','https://identity.fhict.nl'); //The url of the login server. Defaults to https://tas.fhict.nl/identity
define('FHICT_CLIENT_ID','i383988-fhictradeb'); // will be provided to you, when you register your client
define('FHICT_CLIENT_SECRET','Kpn0XzoYqtr3A42QZTKnCPLjTR3r7IDWmzTeZqkx'); // will be provided to you, when you register your client
define('FHICT_SCOPES','openid profile email roles'); // space delimited list of registered scopes, defaults to 'openid profile'


?>
