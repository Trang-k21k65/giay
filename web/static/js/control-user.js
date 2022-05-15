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