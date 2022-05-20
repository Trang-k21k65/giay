
function loadItems() {
    fetch("http://127.0.0.1:5050/cart")
        .then(function (response) {
            return response.json();
        })
        .then(function (cart) {
            let f = document.getElementById('fee').innerHTML;
            let sum = 0;
            let s = '';
            for (let i of cart) {
                sum += i.quantityOrdered * i.sellPrice;
                s +='<div class="cart-item"><div class="cart-img">' + 
                    '<img class="card-img" src="' + i.product.image + '" alt="' + i.product.id + ' width:"100%;"/></div>' +  
                    '<div class="item-detail"><p>'+ i.product.name + '<br>Size: ' + i.size + '<br>Giá thành: ' + i.sellPrice.toLocaleString("vi") + 
                    'đ' + '</p></div>' + '<div class="cart-quantity"><div class="row gx-0">' + 
                    '<div class="col border"><button class="btn btn-light" type="button" id="' + i.product.id + '-"' + 'style="width: 100%;" onclick="clickChoose(this.id)">-</button></div>' +
                    '<div class="col border"><button class="btn btn-light" type="button" style="width: 100%;" id="' + i.product.id + '-quantity">' + i.quantityOrdered + '</button></div>' +
                    '<div class="col border"><button class="btn btn-light" type="button" id="' + i.product.id + '+"' + 'style="width: 100%;" onclick="clickChoose(this.id)">+</button></div>' +
                    '</div></div><div class="cart-price"><p id="' + i.product.id + '-price">' + (i.quantityOrdered*i.sellPrice).toLocaleString("vi") + 'đ</p></div></div>'; 
            }
            document.getElementById('item').innerHTML = s;
            document.getElementById('sum').innerHTML = sum.toLocaleString("vi") + "đ";
            document.getElementById('totalprice').innerHTML = (sum + parseFloat(f)*1000).toLocaleString("vi") + "đ";
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
            let f = document.getElementById('fee').innerHTML;
            let sum = 0;
            for (let i of cart) {
                if ((i.product.id + '-') == type) {
                    let quantity = document.getElementById(i.product.id + '-quantity').innerHTML;
                    quantity = parseInt(quantity);
                    if (quantity > 1) {
                        quantity--;
                    } else if (quantity == 1) {
                        var ans = confirm('Bạn chắc chắn muốn xóa sản phẩm khỏi giỏ hàng?');
                        if (ans) {
                            quantity = 0;
                        } else {
                            quantity = 1;
                        }
                    }
                    document.getElementById(i.product.id + '-price').innerHTML = (quantity*i.sellPrice).toLocaleString("vi") + "đ";
                    document.getElementById(i.product.id + '-quantity').innerHTML = quantity;
                } else if ((i.product.id + '+') == type) {
                    let quantity = document.getElementById(i.product.id + '-quantity').innerHTML;
                    quantity = parseInt(quantity);
                    if (quantity + 1 < 5) {
                        quantity++;
                    } else {
                        quantity = 5;
                    }
                    document.getElementById(i.product.id + '-price').innerHTML = (quantity*i.sellPrice).toLocaleString("vi") + "đ";
                    document.getElementById(i.product.id + '-quantity').innerHTML = quantity;
                } 
                let num = document.getElementById(i.product.id + '-quantity').innerHTML;
                num = parseInt(num);
                sum += num * i.sellPrice;
            } 
            document.getElementById('sum').innerHTML = sum.toLocaleString("vi") + "đ";
            document.getElementById('totalprice').innerHTML = (sum + parseFloat(f)*1000).toLocaleString("vi") + "đ";
        })
}
