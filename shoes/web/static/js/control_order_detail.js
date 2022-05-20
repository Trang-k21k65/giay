function loadItemDetail(status) {
    if (status == 'shipping') {
        document.getElementById('shipping').style.borderBottom = '2.5pt solid black';
        document.getElementById('shipped').style.borderBottom = '0';
    } else if (status == 'shipped') {
        document.getElementById('shipped').style.borderBottom = '2.5pt solid black';
        document.getElementById('shipping').style.borderBottom = '0';
    }
    fetch("http://127.0.0.1:5050/cart")
        .then(function (response) {
            return response.json();
        })
        .then(function (cart) {
            var s = '';
            for (let i of cart) {
                s +='<div style="padding:15px 0;margin-top: 20px;border: 1px solid #ccc;"><div class="cart-item"><div class="cart-img">' + 
                    '<img class="card-img" src="' + i.product.image + '" alt="' + i.product.id + ' width:"100%;"/></div>' +  
                    '<div class="item-detail"><p style="line-height: 0.3;">'+ i.product.name + '</p>' +
                    'Size: ' + i.size + '<br>Giá thành: ' + i.sellPrice.toLocaleString("vi") + 'đ' + '</p></div>' + '<div class="cart-quantity" style="width:200px;"></div>' +
                    '<div class="cart-quantity"><div class="row gx-0" style="text-align: right;">x' + i.quantityOrdered + '</div></div>' +
                    '<div class="cart-price"><p>' + (i.quantityOrdered*i.sellPrice).toLocaleString("vi") + 'đ</p></div></div>' + 
                    '<div class="cart-item" style="border:none;text-decoration:underline;"><div class="sp">Thời gian đặt hàng</div><div class="sp" style="text-align: right">' + '24-05-2022</div></div>'; 
                if (status == 'shipping') {
                    s +='<div class="cart-item" style="border:none;text-decoration:underline;"><div class="sp">Thời gian giao hàng dự kiến</div><div class="sp" style="text-align: right">' + '24-05-2022</div></div>'+ 
                        '<div class="cart-item" style="border:none;text-decoration:underline;"><div class="sp" style="padding-top:10px;">Cập nhật</div><div class="sp" style="text-align: right"><button class="btn btn-choice" style="width:140px;">Đã nhận</button></div></div></div>';  
                } else if (status == 'shipped') {
                    s +='<div class="cart-item" style="border:none;text-decoration:underline;"><div class="sp">Thời gian nhận hàng</div><div class="sp" style="text-align: right">' + '24-05-2022</div></div></div>';
                }   
            }
            document.getElementById('details').innerHTML = s;   
        })
        .catch(function (err) {
            console.log(err);
        })   
}
