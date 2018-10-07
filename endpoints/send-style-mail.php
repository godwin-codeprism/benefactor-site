<?php
    require_once('vendor/autoload.php');
    $data = json_decode($_POST["myData"]);;
    $Name = $data -> Name;
    $Home_address = $data -> Home_address;
    $Mobile_number = $data -> Mobile_number;


    $Email = new PHPMailer;

    $Email -> isSMTP();

    $Email -> SMTPAuth = false;

    //$Email -> SMTPDebug = 2;

    $Email -> Host = 'a2plcpnl0920.prod.iad2.secureserver.net';

    $Email -> Username = 'Info@cursivehomenumbers.com';

    $Email -> Password = 'Password1!';

    $Email -> SMTPSecure = 'ssl';

    $Email -> Port = '465';


    $Email -> From = "Info@cursivehomenumbers.com";

    $Email -> FromName = "Cursive home numbers";

    $Email -> addReplyTo('Info@cursivehomenumbers.comm','Cursive home numbers');

    $Email -> AddAddress ('gtacustomhomenumbers@gmail.com','Cursive home numbers');


    $Email -> Subject = "Style Generated";

    $Email -> Body = "<div style='background-color: white;width: 100%;height: 100%;box-shadow: 0 -25px 40px 0 rgba(0,0,0,.12);margin-top: -16px;display: flex;justify-content: center;align-items: center;'><div style='width: 90%;height: 90%;box-shadow: -1px 3px 4px rgba(0,0,0,0.22);background-color: #f2f2f2;padding: 1%;margin-top: 2%;font-family: calibri;border: 2px solid white;border-radius: 4px;font-size: 1.1em;'><p>New Inquiry From ".$Name.",</p><p><strong>Name: </strong>".$Name."</p><p><strong>Home Address: </strong>".$Home_address."</p><p><strong>Telephone Number: </strong>".$Mobile_number."</p><p></div></div>";

    $Email -> AltBody = "Name: ".$Name."<br/>Home Address: ".$Home_address."<br/>Telephone Number: ".$Mobile_number;

    //echo !extension_loaded('openssl')?"Not Available <br/>":"Available <br/>";

    if($Email->send()){
        echo 'ok';
    }else{
        echo 'error';
    }
?>