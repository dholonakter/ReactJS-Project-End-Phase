<?
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");

$host = "studmysql01.fhict.local";
$user = "dbi383988";
$pass = "passw0rd";
$dbname = "dbi383988";

$connection = mysqli_connect($host, $user, $pass, $dbname);
$method = $_SERVER['REQUEST_METHOD'];
if(!$connection){
    die("Connection failed: ". mysqli_connect_error());
}

function GenerateSalt(){
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $salt = '';

    for ($i = 0; $i < 16; $i++) {
        $index = rand(0, strlen($characters) - 1);
        $salt .= $characters[$index];
    }
   return $salt;
}

function ValidateInput($input){
    $input = preg_replace(array('/s(.*)e(.*)l(.*)e(.*)c(.*)t/i', '/d(.*)e(.*)l(.*)e(.*)t(.*)e/i', '/u(.*)p(.*)d(.*)a(.*)t(.*)e/i', '/u(.*)n(.*)i(.*)o(.*)n/i','/u(.*)n(.*)h(.*)e(.*)x/i', '/<(.*)s(.*)c(.*)r(.*)i(.*)p(.*)t(.*)/i'), '', $input);
    $input = str_replace(array('=', '"', ';', "'", '/', '%', '|', '(', ')'), '', $input);
    $input = htmlspecialchars($input);
    return $input;
}

switch ($method){
    case 'POST':   
        if(isset($_POST["register_user"])){//$_POST[""] is posted through axios POST using FormData
            $f_name = ValidateInput($_POST['f_name']);
            $l_name = ValidateInput($_POST['l_name']);
            $email = ValidateInput($_POST['email']);
            $salt = GenerateSalt();
            $password = md5($_POST['password'].$salt);
            $phone = $_POST['phone'];
            $street = ValidateInput($_POST['street']);
            $state = ValidateInput($_POST['statee']);
            $post = ValidateInput($_POST['post']);
            $country = ValidateInput($_POST['country']);  
            $sql = "INSERT INTO `address`(`street_name`, `state`, `postal_code`, `country`) VALUES ('".$street."','".$state."','".$post."','".$country."')";
            $result = mysqli_query($connection, $sql);
            
            $sqlSelect = "SELECT MAX(id) AS add_id FROM address";
            $selectResult = mysqli_query($connection, $sqlSelect);    
            $add_id = 0;

            if (mysqli_num_rows($selectResult) > 0) {
                while($row = mysqli_fetch_assoc($selectResult)) {
                    $add_id = $row['add_id'];
                }
            } 
            
            $sql = "INSERT INTO `user`(`firstname`, `lastname`, `email_address`, `password`, `phone_number`, `address_id`) VALUES ('".$f_name."','".$l_name."','".$email."','".$password."','".$phone."', '".$add_id."')";
            $result = mysqli_query($connection, $sql); 

            $sqlSelect = "SELECT MAX(id) AS u_id FROM user";
            $result = mysqli_query($connection, $sqlSelect);
            $u_id = 0;

            if (mysqli_num_rows($result) > 0) {
                while($row = mysqli_fetch_assoc($result)) {
                    $u_id = $row['u_id'];
                }
            }

            $sql3 = "INSERT INTO `salt_table`(`id`, `salt`) VALUES ('".$u_id."','".$salt."')";
            $res3 = mysqli_query($connection, $sql3);

            echo $u_id .", ".$f_name .", ".$l_name.", ". $email.", ".  $password.", ". $phone.", ".$street.", ". $state.", ". $post.", ". $country;
        }
        else if(isset($_POST["login_user"])){
            $email = $_POST['email'];
            $password = md5($_POST['password']);
            $sql = "SELECT id, firstname, lastname, email_address, phone_number, user_rating, address_id FROM user WHERE email_address = '".$email."' and password='".$password."'";
            $result = mysqli_query($connection, $sql);
            $data = mysqli_fetch_object($result);
            $count = mysqli_num_rows($result);
            if($count >= 1){
                echo json_encode($data);
            }
            else{
                echo null;
            }
        } 
        else if(isset($_POST["session"])){
            $sql = "INSERT INTO `session`(`created`, `user_id`) VALUES (NOW(),".$_POST['user_id'].")";
            $result = mysqli_query($connection, $sql);
            echo "session added". $_POST['timestamp'].$_POST['user_id'];
        }
        else {    
            echo 'post data is empty';
        }
        break;
    case 'GET':
        if(isset($_GET['get_from'])){ //the $_GET['get'] value gets assigned using axios get where th e$_GET('get') value gets assigned through the url?get=value, where value = $_GET('get');
            $sql = "SELECT * FROM ".$_GET['get_from']; //the url?get=user would in this case become $_GET('get') returns user
            $result = mysqli_query($connection, $sql);
            if(!$id) echo '[';
            for($i=0; $i<mysqli_num_rows($result); $i++){  
                echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));  
            } 
            if(!$id) echo ']';
        }
        else if(isset($_GET['user_email'])){
            $sql = "SELECT * FROM user WHERE email_address = '".$_GET['user_email']."'";
            $result = mysqli_query($connection, $sql);
            echo json_encode(mysqli_fetch_object($result));
        }
        else if(isset($_GET['get_address'])){
            $sql = "SELECT * FROM address WHERE id = '".$_GET['get_address']."'";
            $result = mysqli_query($connection, $sql);
            echo json_encode(mysqli_fetch_object($result));
        }
        break;
    }

//$result = mysqli_query($connection, $sql);
// if($method =='POST'){
//     echo $result;
// }
// else if($method =='GET'){
//     echo $result;
// }

//$result = mysqli_query($connection, $sql);
$connection->close();
?>


