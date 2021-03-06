
function loadItems() {
    document.getElementById('item').innerHTML = '';
    fetch("/cart")
        .then(function (response) {
            return response.json();
        })
        .then(function (cart) {
            let s = '';
            let sum = 0;
            for (let i of cart) {
                sum += i.quantityOrdered * i.sellPrice;
                s +='<div class="cart-item"><div class="cart-img">' +
                    '<img class="card-img" src="' + i.product.image.split('\n')[0] + '" alt="' + i.product.id + ' width:"100%;"/></div>' +
                    '<div class="item-detail"><input type="hidden" id= "productId" name="product_id" value="{{' + i.product.id + '}}"><p>'+ i.product.name +
                    '<br><input id= "productSize" type="hidden" name="size" value"{{' + i.size + '}}">Size: ' + i.size +
                    '<br>Giá thành: ' + i.sellPrice.toLocaleString("vi") + 'đ</p></div>' +
                    '<div class="cart-quantity"><div class="row gx-0">' +
                    '<div class="col border"><button class="btn btn-light" type="button" id="' + i.product.id + i.size + '-"' + 'style="width: 100%;" onclick="clickChoose(this.id)">-</button></div>' +
                    '<div class="col border"><input class="btn btn-light" style="width: 100%; font-size: 20px" id="' + i.product.id + i.size + '-quantity" name="qty" value="' + i.quantityOrdered +  '" onkeypress="changeQuantity(this.id)"></div>' +
                    '<div class="col border"><button class="btn btn-light" type="button" id="' + i.product.id + i.size + '+"' + 'style="width: 100%;" onclick="clickChoose(this.id)">+</button></div>' +
                    '</div></div><div class="cart-price"><p id="' + i.product.id + i.size + '-price">' + (i.quantityOrdered*i.sellPrice).toLocaleString("vi") + 'đ</p></div>' +
                    '<div class="sp"><div class="row gx-0"><div class="col border"><button class="btn btn-light" type="button" id="' + i.product.id + i.size + '" onclick="deleteProductFromCart(this.id)">Xóa</button></div></div></div></div>';
            }
            if (sum == 0) {
                document.getElementById('fee').innerHTML = '0';
                document.getElementById('sum').innerHTML = '0';
                document.getElementById('totalprice').innerHTML = '0';
            } else {
                document.getElementById('sum').innerHTML = sum.toLocaleString("vi") + "đ";
                document.getElementById('fee').innerHTML = '15.000đ';
                let f = document.getElementById('fee').innerHTML;
                document.getElementById('totalprice').innerHTML = (sum + parseFloat(f) * 1000).toLocaleString("vi") + "đ";
            }
            document.getElementById('item').innerHTML = s;
        })
        .catch(function (err) {
            console.log(err);
        })
}

function loadInfo() {
    fetch("/cart/user-info")
        .then(function (response) {
            return response.json();
        })
        .then(function (user) {
            if (user.address !== null) {
                document.getElementById('fullName').value = user.fullname;
                document.getElementById('phoneNumber').value = user.phone;
                document.getElementById('address').value = user.address;
            }
        })
}

function clickChoose(type) {
    fetch("/cart")
        .then(function (response) {
            return response.json();
        })
        .then(function (cart) {
            for (let i of cart) {
                if ((i.product.id + i.size + '-') == type) {
                    let quantity = document.getElementById(i.product.id + i.size + '-quantity').value;
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
                    updateCart(i.product.id, i.size, quantity);
                    loadItems();
                    break;
                } else if ((i.product.id + i.size + '+') == type) {
                    let quantity = document.getElementById(i.product.id + i.size + '-quantity').value;
                    quantity = parseInt(quantity);
                    for (let j of i.product.sizes) {
                        if (j.size == i.size) {
                            if (quantity < j.quantityInStock) {
                                quantity++;
                            } else {
                                alert("Chỉ còn " + j.quantityInStock + " sản phẩm trong kho");
                                quantity = j.quantityInStock;
                            }
                            break;
                        }
                    }
                    updateCart(i.product.id, i.size, quantity);
                    loadItems();
                    break;
                }
            }
        })
}

function changeQuantity(id) {
    fetch('/cart')
        .then(function (response) {
            return response.json();
        })
        .then(function (cart) {
            for (let p of cart) {
                if (p.product.id + p.size + '-quantity' == id) {
                    let quantity = document.getElementById(id).value;
                    let quantityOfSize = 0;
                    for (let s of p.product.sizes) {
                        if (s.size == p.size) {
                            quantityOfSize = s.quantityInStock;
                            break;
                        }
                    }
                    if (quantity > quantityOfSize) {
                        alert("Chỉ còn " + quantityOfSize + " sản phẩm trong kho")
                        document.getElementById(id).value = quantityOfSize;
                        quantity = quantityOfSize;
                    }
                    updateCart(p.product.id, p.size, quantity);
                    loadItems();
                    break;
                }
            }
        })
}

function updateCart(productId, size, quantity) {
    let formData = new FormData();
    formData.append('product_id', productId);
    formData.append('size', size);
    formData.append('qty', quantity);
    fetch("/cart/update", {
        method: "POST",
        body: formData
    })
        .then(function (response) {
            return response.text();
        })
}

function deleteProduct(productId, size) {
    let formData = new FormData();
    formData.append('product_id', productId);
    formData.append('size', size);
    fetch("/cart/delete", {
        method: "POST",
        body: formData
    })
        .then(function (response) {
            return response.text();
        })
}

function deleteProductFromCart(p) {
    fetch("/cart")
        .then(function (response) {
            return response.json();
        })
        .then(function (cart) {
            for (let i of cart) {
                if ((i.product.id + i.size) == p) {
                    let ans = window.confirm("Bạn có muốn xóa sản phẩm này không?");
                    if (ans) {
                        deleteProduct(i.product.id, i.size);
                        loadItems();
                    }
                    break;
                }
            }
        })
}

function addOrder(orderId) {
    let formData = new FormData();
    formData.append('order_id', orderId);
    fetch("/cart/order", {
        method: "POST",
        body: formData
    })
        .then(function (response) {
            return response.text();
        })
}

function getUserInfo(fullName, address, phoneNumber) {
    let formData = new FormData();
    formData.append('fullname', fullName);
    formData.append('address', address);
    formData.append('phone', phoneNumber);
    fetch("/cart/user-info", {
        method: "POST",
        body: formData
    })
        .then(function (response) {
            return response.text();
        })
}