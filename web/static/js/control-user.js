function clickEdit(type) {
    document.getElementById(type).hidden = 'hidden';
    document.getElementById('edit' + type).removeAttribute('hidden');
}

function closeEdit(type) {
    document.getElementById(type).removeAttribute('hidden');
    document.getElementById('edit' + type).hidden = 'hidden';
}

function clickChangePsw() {
    document.getElementById('editpsw').removeAttribute('hidden');
}

function closeChangePsw() {
    document.getElementById('editpsw').hidden = 'hidden';
}

function savePsw() {
    let psw = document.getElementById('new-psw');
    let regex = new RegExp(psw.pattern);
    if (regex.test(psw.value)) {
        document.getElementById('editpsw').style.display = 'none';
    }
}

function showButton(adminRole) {
    if (adminRole == 'False') {
        document.getElementById('admin').hidden = 'hidden';
    }
}