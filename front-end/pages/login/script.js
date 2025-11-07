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
btnLogin.addEventListener('click', async function () {
    const API_URL = "http://localhost/memory-game-pweb/back-end"

    let email = document.getElementById('emailLogin').value
    let password = document.getElementById('passwordLogin').value

    if (!email || !password) {
        alert('Por favor, preencha usuário e senha.');
        return;
    }

    const body = {
        email: email,
        password: password
    }


    const header = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {

        const response = await fetch(`${API_URL}/login`, header);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.user);

        const game = new Game({
            name: data.user.name,
            phoneNumber: data.user.phone,
            email: data.user.email,
            tableSize: 4,
        });

        saveGameConfig(game)
        window.location.href = '/front-end/pages/home/home.html';

    } catch(error)  {
        console.error('Erro ao logar:', error);
    }

})

const btnRegister = document.getElementById('register');
btnRegister.addEventListener('click', async function () {

    const API_URL = "http://localhost/memory-game-pweb/back-end"

    let name = document.getElementById('nameRegister').value
    let birthdayInput = document.getElementById('birthdayRegister').value
    let phone = document.getElementById('phoneRegister').value
    let email = document.getElementById('emailRegister').value
    let username = document.getElementById('usernameRegister').value
    let cpf = document.getElementById('cpfRegister').value
    let password = document.getElementById('passwordRegister').value
    let passwordConfirm = document.getElementById('passwordConfirmRegister').value

    let birthday = new Date(birthdayInput).toISOString().slice(0, 19).replace('T', ' ');

    if (!name || !birthday || !phone || !email || !username || !cpf || !password || !passwordConfirm) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (password !== passwordConfirm) {
        alert('As senhas não coincidem.');
        return;
    }

    const body = {
        name: name,
        birthday: birthday,
        phone: phone,
        email: email,
        username: username,
        cpf: cpf,
        password: password
    }

    const header = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        const response = await fetch(`${API_URL}/register`, header);

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

         const game = new Game({
            name: data.user.name,
            phoneNumber: data.user.phone,
            email: data.user.email,
            tableSize: 4,
        });

        saveGameConfig(game);
        window.location.href = '/front-end/pages/home/home.html';

    } catch (error) {
        console.error('Erro ao registrar:', error);
    }
})