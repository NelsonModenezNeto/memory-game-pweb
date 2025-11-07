<?php
    class User {
        private $id;
        private $name; 
        private $birthday;
        private $phone;
        private $email;
        private $username;
        private $cpf;
        private $password;

        public function __construct($name, $birthday, $phone, $email, $username, $cpf, $password){
            $this->name = $name;
            $this->birthday = $birthday;
            $this->phone = $phone;
            $this->email = $email;
            $this->username = $username;
            $this->cpf = $cpf;
            $this->password = $password;
        }

        public function getId() { return $this->id; }
        public function getName() { return $this->name; }
        public function getBirthday() { return $this->birthday; }
        public function getPhone() { return $this->phone; }
        public function getEmail() { return $this->email; }
        public function getUsername() { return $this->username; }
        public function getCpf() { return $this->cpf; }
        public function getPassword() { return $this->password; }
    }
?>