function loadItemDetail(status) {
    document.getElementById('details').innerHTML = '';
    if (status == 'Đang giao') {
        document.getElementById('shipping').style.borderBottom = '2.5pt solid black';
        document.getElementById('shipped').style.borderBottom = '0';
        document.getElementById('ordered').style.borderBottom = '0';
    } else if (status == 'Đã nhận') {
        document.getElementById('shipped').style.borderBottom = '2.5pt solid black';
        document.getElementById('shipping').style.borderBottom = '0';
        document.getElementById('ordered').style.borderBottom = '0';
    } else if (status == 'Đặt hàng') {
        document.getElementById('ordered').style.borderBottom = '2.5pt solid black';
        document.getElementById('shipping').style.borderBottom = '0';
        document.getElementById('shipped').style.borderBottom = '0';
    }
    fetch("/orders/" + status)
        .then(function (response) {
            return response.json();
        })
        .then(function (order) {
            let s = '';
            for (let j of order) {
                s +='<div class="mx-auto order">';
                for (let i of j.order_details) {
                    s +='<div class="cart-item"><div class="cart-img">' +
                        '<img class="card-img" src="' + i.product.image.split('\n')[0] + '" alt="' + i.product.id + ' width:"100%;"/></div>' +
                        '<div class="item-detail"><p">'+ i.product.name + '<br>' +
                        'Size: ' + i.size + '<br>Giá thành: ' + i.sellPrice.toLocaleString("vi") + 'đ' + '</p></div>' + '<div class="cart-quantity" style="width:200px;"></div>' +
                        '<div class="cart-quantity"><div class="row gx-0" style="text-align: right; font-size: 20px;">x ' + i.quantityOrdered + '</div></div>' +
                        '<div class="cart-price"><p>' + (i.quantityOrdered*i.sellPrice).toLocaleString("vi") + 'đ</p></div></div>';
                }
                s += '<div class="cart-item" style="border:none;text-decoration:underline;"><div class="sp">Thời gian đặt hàng</div><div class="sp" style="text-align: right">' + j.orderDate + '</div></div>';
                if (status == 'Đang giao') {
                    s +='<div class="cart-item" style="border:none;text-decoration:underline;"><div class="sp">Thời gian giao hàng dự kiến</div><div class="sp" style="text-align: right">' + j.shippedDate + '</div></div></div>';
                } else if (status == 'Đã nhận') {
                    s +='<div class="cart-item" style="border:none;text-decoration:underline;"><div class="sp">Thời gian nhận hàng</div><div class="sp" style="text-align: right">' + j.shippedDate + '</div></div></div>';
                } else if (status == 'Đặt hàng') {
                    s +='<div class="cart-item" style="border:none;text-decoration:underline;"><div class="sp">Thời gian giao hàng dự kiến</div><div class="sp" style="text-align: right">' + j.shippedDate + '</div></div></div>';
                }
            }
            document.getElementById('details').innerHTML = s;
        })
        .catch(function (err) {
            console.log(err);
        })
}