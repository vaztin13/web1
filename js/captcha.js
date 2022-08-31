function captchaLoad() {

    let btnRefresh = document.getElementById("refreshButton");
    let statusTxt = document.getElementById("status_text");
    let checkBtn = document.getElementById("captcha_check_button")

    btnRefresh.onclick = function () {
        Captcha();
    }

    checkBtn.onclick = function () {
        ValidCaptcha();
    }

    function Captcha() {
        let randomCharacter = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
        for (let i = 0; i < 6; i++) {
            var a = randomCharacter[Math.floor(Math.random() * randomCharacter.length)];
            var b = randomCharacter[Math.floor(Math.random() * randomCharacter.length)];
            var c = randomCharacter[Math.floor(Math.random() * randomCharacter.length)];
            var d = randomCharacter[Math.floor(Math.random() * randomCharacter.length)];
            var e = randomCharacter[Math.floor(Math.random() * randomCharacter.length)];
            var f = randomCharacter[Math.floor(Math.random() * randomCharacter.length)];
        }
        // espacios para mejor legibilidad de los caracteres
        let code = a + ' ' + b + ' ' + c + ' ' + d + ' ' + e + ' ' + f;
        document.getElementById("mainCaptcha").innerHTML = code
        document.getElementById("mainCaptcha").value = code
    }


    Captcha(); //al abrir la pagina ejecuta el captcha

    function ValidCaptcha() {
        let string1 = removeSpaces(document.getElementById('mainCaptcha').value);
        let string2 = removeSpaces(document.getElementById('txtInput').value);
        if (string1 === string2) {
            statusTxt.innerText = "Bien! No eres un robot :)";
            document.querySelector('#status_text').className = 'captcha_pass'
            console.log("Que haces mirando consola? Si ya sé que no sos un robot")
        }
        else {
            statusTxt.innerText = "No te preocupes, equivocarse tambien es de humanos...";
            document.querySelector('#status_text').className = 'captcha_failed'
            console.log("Acá no hay nada para ver, resolvé bien el captcha")
            Captcha()
        }
    }

    // remueve espacios
    function removeSpaces(string) {
        return string.split(' ').join('');
    }
}