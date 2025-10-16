import { Game } from "../../globals/game.js";
import { saveGameConfig } from '../../globals/config.js'

const selectLogin = document.getElementById('select-login');
const selectRegister = document.getElementById('select-register');
const selectLogin2 = document.getElementById('select-login2');
const selectRegister2 = document.getElementById('select-register2');
const contentLogin = document.querySelector('.content-login');

selectRegister.addEventListener('click', function () {
    selectRegister.classList.add('active');
    selectRegister2.classList.add('active');
    selectLogin.classList.remove('active');
    selectLogin2.classList.remove('active');
    contentLogin.classList.remove('login-active');
    contentLogin.classList.add('register-active');
});

selectLogin2.addEventListener('click', function () {
    selectLogin2.classList.add('active');
    selectLogin.classList.add('active')
    selectRegister.classList.remove('active');
    selectRegister2.classList.remove('active');
    selectRegister2.classList.add('login-active');
    contentLogin.classList.remove('register-active');
});


const btnLogin = document.getElementById('login');
btnLogin.addEventListener('click', function () {
    //Efetuar login
    let username = document.getElementById('usernameLogin').value
    let password = document.getElementById('passwordLogin').value

    const game = new Game({
        username: username,
        tableSize: 4,
    });

    saveGameConfig(game)

    window.location.href = '/pages/home/home.html';
})

const btnRegister = document.getElementById('register');
btnRegister.addEventListener('click', function () {
    //Efetuar Register
    let username = document.getElementById('usernameRegister').value
    let password = document.getElementById('passwordRegister').value

    const game = new Game({
        username: username,
        tableSize: 4,
    });

    saveGameConfig(game)

    window.location.href = '/pages/home/home.html';
})