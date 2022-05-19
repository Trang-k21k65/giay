function clickEdit(type) {
    document.getElementById(type).style.display = 'none';
    document.getElementById('edit' + type).style.display = 'block';
}

function closeEdit(type) {
    document.getElementById(type).style.display = 'block';
    document.getElementById('edit' + type).style.display = 'none';
}

function clickChangePsw() {
    document.getElementById('editpsw').style.display = 'block';
}

function closeChangePsw() {
    document.getElementById('editpsw').style.display = 'none';
}

function savePsw() {
    let psw = document.getElementById('new-psw');
    let regex = new RegExp(psw.pattern);
    if (regex.test(psw.value)) {
        document.getElementById('editpsw').style.display = 'none';
    }
}