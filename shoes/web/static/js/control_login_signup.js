function openPage(type) {
    if (type=="login") {
        document.getElementById("login").style.display = "block";
        document.getElementById("signup").style.display = "none";
        document.getElementById("tab-login").style.borderTop = "5px solid #04AA6D";
        document.getElementById("tab-login").style.background = "white";
        document.getElementById("tab-signup").style.borderTop = "0";
        document.getElementById("tab-signup").style.background = "#efefef";
    } else {
        document.getElementById("login").style.display = "none";
        document.getElementById("signup").style.display = "block";
        document.getElementById("tab-login").style.borderTop = "0";
        document.getElementById("tab-login").style.background = "#efefef";
        document.getElementById("tab-signup").style.borderTop = "5px solid #04AA6D";
        document.getElementById("tab-signup").style.background = "white";
    }
}

function checkPsw() {
    document.getElementById("noti-incorrect").style.display = "block";
}

function checkPswMatch() {
    var psw = document.getElementById("pswSignup");
    var repeatPsw = document.getElementById("re-pswSignup");
    if (psw.value != repeatPsw.value) {
        repeatPsw.style.background = "rgba(255,200,200,0.8)";
    } else {
        repeatPsw.style.background = "rgba(200,255,200,0.8)";
    }
}