
// Thay bằng số lượng
var numtext = 1;
// Thay bằng giá tiền sp
var price = "400.000";
var p = parseFloat(price);
// Tính tổng số tiền sp
function totalPay() {
    document.getElementById('quantity').innerText = numtext;
    document.getElementById('tPrice').innerText = price + "đ";
    var pLenght = document.getElementById('pay').rows.length - 1;
    var tp = 0;
    for (var i = 0; i < pLenght; i++) {
            var y = document.getElementById('pay').rows[i].cells.item(1).innerText;
            tp += parseFloat(y);
    }
    document.getElementById('pay').rows[pLenght].cells.item(1).innerText = tp.toLocaleString("vi") + ".000đ";
}

function clickChoose(type) {
    numtext = document.getElementById('quantity').innerText;
    var num = parseInt(numtext);
    if (type == 0) {
        if (num > 0) {
            num--;
        } else {
            num = 0;
        }
    } else {
        if (num < 5) {
            num++;
        } else {
            num = 5;
        }
    }
    let s = (p*num).toLocaleString("vi") + ".000";
    document.getElementById('tPrice').innerText = s + "đ";
    document.getElementById('quantity').innerText = num;
}