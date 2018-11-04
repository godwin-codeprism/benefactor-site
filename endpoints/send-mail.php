<?php
    require_once('vendor/autoload.php');
    $trdata = $_POST["myData"];

    $Email = new PHPMailer;

    $Email -> isSMTP();

    $Email -> SMTPAuth = true;

    //$Email -> SMTPDebug = 2;

    $Email -> Host = 'sg2plcpnl0172.prod.sin2.secureserver.net';

    $Email -> Username = 'godwin@godwinvc.com';

    $Email -> Password = 'reyasesino_22';

    $Email -> SMTPSecure = 'ssl';

    $Email -> Port = '465';


    $Email -> From = "godwin@godwinvc.com";

    $Email -> FromName = "BENEFACTOR LOGISTICS LIMITED";

    $Email -> addReplyTo('godwin@godwinvc.com','BENEFACTOR LOGISTICS LIMITED');

    // $Email -> AddAddress ('benefactorlogistics@gmail.com','BENEFACTOR LOGISTICS LIMITED');
    $Email -> AddAddress ('benefactorlogistics@gmail.com','BENEFACTOR LOGISTICS LIMITED');


    $Email -> Subject = "New Quick quote to Benefactor Logistics";

    $Email -> Body = '<body style="margin:0px auto;"><h3>Quick Quote from Benefactor</h3><table width="100%" style="font-family: calibri;font-size: 18px;text-align: center;border: 1px solidcornflowerblue;"><thead style="height: 50px;background: cornflowerblue;color: white;"><tr style="text-align:center"><th>Sno</th><th>Info Type</th><th>Info</th></tr></thead><tbody> '.$trdata.' </tbody></table></body>';
    $Email->IsHTML(true); 

    //echo !extension_loaded('openssl')?"Not Available <br/>":"Available <br/>";

    if($Email->send()){
        echo 'ok';
    }else{
        echo $Email->ErrorInfo;
    }
?>