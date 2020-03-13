<?php
    $todo = $_POST['todo']; 

        if ($todo == "show")  { 
            $ch = curl_init();

            curl_setopt($ch, CURLOPT_URL, "https://zyciejestpiekne.eu/lista-marzen/");
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            $server_output = curl_exec($ch);
    
            curl_close ($ch);
            $doc = new DOMDocument();
            libxml_use_internal_errors(true);
            $doc->loadHTML($server_output);
            libxml_clear_errors();
            $html = $doc->saveHTML();

            if (!$doc) {
                echo 'Error while parsing the document';
                exit;
            }
            
            $s = simplexml_import_dom($doc);

            $result = $s->xpath('//li');
            print_r(json_encode($result));
        }

       if ($todo == "add") {
            $base = 'mysql:dbname=phpprojekt;host=localhost';
            $root = 'root';
            $password = '';

            try {
                $db = new PDO($base, $root, $password);
                $db->exec("set names utf8");
            
                    $text = $_POST['text']; 
                    $nick = $_POST['nick']; 
                    
                    $query = "INSERT into `lista` values ('','$nick','$text')";
                    $result = $db->query($query);
            } 
            
            catch (PDOException $e) {
                echo 'Connection failed: ' . $e->getMessage();
            }
        }

        if($todo == "addAccount") {
            $nick = $_POST['nick']; 
            $mail = $_POST['mail']; 
            $password = $_POST['password']; 
            $passwordP = password_hash($password, PASSWORD_DEFAULT);


            try {
                $db = new PDO('mysql:dbname=phpprojekt;host=localhost', 'root', '');
                $db->exec("set names utf8");

                //nick zajety
                $query = "SELECT * FROM loginy WHERE nick = '$nick'";
                $result = $db->query($query);
                $row = $result->fetch(PDO::FETCH_ASSOC);
                    
                //wolny nick
                if( ! $row){
                        //sprawdzam mail - zajęty
                        $query = "SELECT * FROM loginy WHERE mail = '$mail'";
                        $result = $db->query($query);
                        $row2 = $result->fetch(PDO::FETCH_ASSOC);

                    if( ! $row2) {
                        //sprawdzam mail - regex
                        $mailEx = '/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/';
                        
                        if (preg_match($mailEx, $mail) === 1) {
                            echo("Added");
                            $query = "INSERT into `loginy` values ('','$nick','$passwordP','$mail')";
                            $result = $db->query($query);
                        }
                        else {
                            echo("Błąd - nieprawidłowy format maila");
                        }
                    }
                    else {
                        echo("Błąd - mail zajęty");
                    }

                }
                else {
                    //ZNALEZIONY
                    echo("Błąd - nick zajęty");
                }
                
            } 
            
            catch (PDOException $e) {
                echo 'Connection failed: ' . $e->getMessage();
            }

        }

        if ($todo == "login") {
            $base = 'mysql:dbname=phpprojekt;host=localhost';
            $root = 'root';
            $password = '';

            try {
                $db = new PDO($base, $root, $password);
                $db->exec("set names utf8");
            
                    $nick = $_POST['nick']; 
                    $password = $_POST['password']; 

                    $query = "SELECT `password` FROM loginy WHERE nick = '$nick' ";
                    $result = $db->query($query); 
                    $row = $result->fetch(PDO::FETCH_ASSOC);
                    $hash = $row['password'];

                    if (password_verify($password, $hash)) {
                        $query2 = "SELECT * FROM lista WHERE name = '$nick'";
                        $result2 = $db->query($query2); 

                        $tab = array();
                        while ($row2 = $result2->fetch(PDO::FETCH_ASSOC)) {
                            array_push($tab, $row2);
                        }

                        echo (json_encode($tab));
    
                    } else {
                        echo 'Bad';
                    }
            } 
            
            catch (PDOException $e) {
                echo 'Connection failed: ' . $e->getMessage();
            }
        }


        if ($todo == "done") {
            $base = 'mysql:dbname=phpprojekt;host=localhost';
            $root = 'root';
            $password = '';

            try {
                $db = new PDO($base, $root, $password);
                $db->exec("set names utf8");
            
                    $text = $_POST['text']; 
                    $nick = $_POST['nick']; 
                    
                    $query = "INSERT into `done` values ('','$nick','$text')";
                    $result = $db->query($query);
            } 
            
            catch (PDOException $e) {
                echo 'Connection failed: ' . $e->getMessage();
            }
        }

        
        if ($todo == "basket") {
            $base = 'mysql:dbname=phpprojekt;host=localhost';
            $root = 'root';
            $password = '';

            try {
                $db = new PDO($base, $root, $password);
                $db->exec("set names utf8");
            
                $nick = $_POST['nick']; 
                $done = array();

                $query = "SELECT * FROM done WHERE nick = '$nick'";
                $result = $db->query($query); 

                while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                    array_push($done, $row);
                }

                echo (json_encode($done));

            } 
            
            catch (PDOException $e) {
                echo 'Connection failed: ' . $e->getMessage();
            }
        }

        
        if ($todo == "getDone") {
            $base = 'mysql:dbname=phpprojekt;host=localhost';
            $root = 'root';
            $password = '';

            try {
                $db = new PDO($base, $root, $password);
                $db->exec("set names utf8");
            
                $nick = $_POST['nick']; 
                $done = array();

                $query = "SELECT * FROM done WHERE nick = '$nick'";
                $result = $db->query($query); 

                while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                    array_push($done, $row);
                }

                echo (json_encode($done));

            } 
            
            catch (PDOException $e) {
                echo 'Connection failed: ' . $e->getMessage();
            }
        }




?>