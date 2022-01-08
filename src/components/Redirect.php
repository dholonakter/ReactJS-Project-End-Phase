<?php
/* -------------------------------------------------------------------
 * You can use this page to login a user with the FHICT OpenID Server.
 * Be sure you copy the login_config.php.sample to login_config.php
 * and provide the right values.
 * You can request these at https://tas.fhict.nl/api/v1/
 *
 */

// Load the config file
require(__DIR__.'/login_config.php');

if(DEBUG_MODE == true){
  ini_set('display_errors', '1');
  error_reporting(-1);
}

// You'll need to download phpseclib and add it to your include path
// Add phpseclib to the include path http://phpseclib.sourceforge.net/
// Add the OpenIDConnectClient also to the path
// This is a modified version of https://github.com/jumbojett/OpenID-Connect-PHP
set_include_path(get_include_path().PATH_SEPARATOR.'./lib/phpseclib0.3.10'.PATH_SEPARATOR.'./lib/OpenID-Connect-PHP');

// Include the openID client
require "OpenIDConnectClient.php";

// Create a new client
$oidc = new OpenIDConnectClient("https://identity.fhict.nl/","i383988-fhictradeb","Kpn0XzoYqtr3A42QZTKnCPLjTR3r7IDWmzTeZqkx");

// Add the right scopes
$oidc->addScope(explode(" ",FHICT_SCOPES));

// The actual authentication request happens here.
// The user will be redirected to our OpenID server.
// Be sure to handle user denied requests!
$oidc->authenticate();

// We need to start the session before we can put data in it.
session_start();

// Save some information in a session
// (given the right permission) you can find which information you can request here
// https://tas.fhict.nl/identity/.well-known/openid-configuration
$_SESSION['name'] = $oidc->requestUserInfo('name');
$_SESSION['username'] = $oidc->requestUserInfo('preferred_username');
$_SESSION['email'] = $oidc->requestUserInfo('email'); // needs 'email' scope
$_SESSION['roles'] = $oidc->requestUserInfo('role'); // needs 'roles' scope

// Add extra info to the session
$_SESSION['ingelogd'] = true;

// Redirect back to the page we wanted to login too.
header('Location: index.php');
?>
