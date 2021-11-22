    <?php
        $link = mysqli_connect('localhost', 'username', 'motdepasse', 'icone');

        if (!$link) {
            die('Erreur de connexion');
      } else {
            echo 'Succès... ';
      }
    ?>