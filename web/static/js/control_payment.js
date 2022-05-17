
function totalPay() {
    var f = document.getElementById('fee').innerHTML;
    fetch("http://127.0.0.1:5050/cart")
        .then(function (response) {
            return response.json();
        })
        .then(function (cart) {
            var s = 0;
            for (let i of cart) {
                s += i.quantityOrdered*i.sellPrice;
            }
            document.getElementById('sum').innerHTML = s.toLocaleString("vi") + "đ";
            document.getElementById('totalprice').innerHTML = (s + parseFloat(f)*1000).toLocaleString("vi") + "đ";
        })
}

function loadItems() {
    fetch("http://127.0.0.1:5050/cart")
        .then(function (response) {
            return response.json();
        })
        .then(function (cart) {
            var s = '';
            for (let i of cart) {
                s +='<div class="cart-item"><div class="cart-img">' + 
                    '<img class="card-img" src="' + i.product.image + '" alt="' + i.product.id + ' width:"100%;"/></div>' +  
                    '<div class="item-detail"><p id="name" style="line-height: 0.3;">'+ i.product.name + '</p>' +
                    'Size: ' + i.size + '<br>Giá thành: ' + i.sellPrice.toLocaleString("vi") + 'đ' + '</p></div>' +
                    '<div class="cart-quantity"><div class="row gx-0">' + 
                    '<div class="col border"><button class="btn btn-light" type="button" style="width: 100%;" onclick="clickChoose(0)">-</button></div>' +
                    '<div class="col border"><button class="btn btn-light" type="button" style="width: 100%;" id="quantity">' + i.quantityOrdered + '</button></div>' +
                    '<div class="col border"><button class="btn btn-light" type="button" style="width: 100%;" onclick="clickChoose(1)">+</button></div>' +
                    '</div></div><div class="cart-price"><p id="tPrice">' + (i.quantityOrdered*i.sellPrice).toLocaleString("vi") + 'đ</p></div></div>'; 
            }
            document.getElementById('item').innerHTML = s;
        })
        .catch(function (err) {
            console.log(err);
        })
}

function clickChoose(type) {
    fetch("http://127.0.0.1:5050/cart")
        .then(function (response) {
            return response.json();
        })
        .then(function (cart) {
            for (let i of cart) {
                if (i.product.name == document.getElementById('name').innerHTML) {
                    if (type == 0) {
                        if (i.quantityOrdered > 1) {
                            
                        } else if (i.quantityOrdered == 1) {
                            var ans = confirm('Bạn chắc chắn muốn xóa sản phẩm khỏi giỏ hàng?');
                            if (ans) {
                                
                            } else {
                                
                            }
                        }
                    } else {
                        if (i.quantityOrdered + 1 < 5) {
                            
                        } else {
                            
                        }
                    }
                    document.getElementById('tPrice').innerHTML = (i.quantityOrdered*i.sellPrice).toLocaleString("vi") + "đ";
                    document.getElementById('quantity').innerHTML = i.quantityOrdered;
                }
            }
            
        })
}
