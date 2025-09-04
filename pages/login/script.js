const selectLogin = document.getElementById('select-login')
const selectRegister = document.getElementById('select-register')

selectLogin.addEventListener('click', function() {
    selectLogin.classList.add('active')
    selectRegister.classList.remove('active')
})

selectRegister.addEventListener('click', function() {
    selectRegister.classList.add('active')
    selectLogin.classList.remove('active')
})