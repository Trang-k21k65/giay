function clickImgItem(type) {
    document.getElementById('image-product').src = document.getElementById(type).src;
}

function clickMinus() {
    if (document.getElementById("number").value > 1)
        document.getElementById("number").value--;
}

function clickPlus() {
    let quantityInStock = parseInt(document.getElementById('quantityInStock').innerText.split(' ')[0], 10);

    if (document.getElementById("number").value < quantityInStock)
        document.getElementById("number").value++;
}


function load(id) {
    fetch("/products/details/" + id)
        .then(function (response) {
            return response.json();
        })
        .then(function (product) {
            let p = product[0];
            let images = p.image.split('\n');
            document.getElementById('image-product').src = images[0];

            for (let i = 0; i < images.length; i++) {
                document.getElementById('image' + i).src = images[i];
                document.getElementById('image' + i).removeAttribute("hidden");
            }

            document.getElementById('name').innerText = p.name;
            let oldPrice = (p.sellPrice * (1 + p.tag / 100)).toFixed(0);
            document.getElementById('old-price').innerHTML = '<del>' + oldPrice +'<ins>đ</ins></del>';
            document.getElementById('price').innerHTML = p.sellPrice.toLocaleString("vi") + '<ins>đ</ins>';

            var size_inner_html = ''
            let total = 0;
            for (let s of p.sizes) {
                size_inner_html += '<input checked="checked" type="radio" id="size' + s.size + '" class="btn-check" name="size" value="' + s.size + '" onclick="clickSize(' + s.size + ')">' +
                                    '<label class="btn btn-outline-dark my-1 me-1" for="size' + s.size + '">' + s.size + '</label>';
                total += s.quantityInStock;
            }
            document.getElementById('size').innerHTML = size_inner_html;
            document.getElementById('quantityInStock').innerText = total + ' sản phẩm có sẵn';

            let description = p.description.split('\n');
            let description_inner_html = '';
            for (let d of description) {
                if (d != '') {
                    description_inner_html += '<li>' + d + '</li>'
                }
            }
            document.getElementById('description').innerHTML = description_inner_html;
        })
}

function clickSize(size) {
    fetch("/products/details/" + document.getElementById('productID').value)
        .then(function (response) {
            return response.json();
        })
        .then(function (product) {
            let p = product[0];
            for (let s of p.sizes) {
                if (s.size == size) {
                    document.getElementById('quantityInStock').innerText = s.quantityInStock + ' sản phẩm có sẵn';
                    if (document.getElementById('number').value > s.quantityInStock) {
                        document.getElementById('number').value = s.quantityInStock;
                    }
                }
            }
        })
}


function addToCart(productId, size, quantity) {
    let formData = new FormData();
    formData.append('product_id', productId);
    formData.append('size', size);
    formData.append('qty', quantity);
    fetch("/addcart", {
        method: "POST",
        body: formData
    })
        .then(function (response) {
            return response.text();
        })
        .then(function (message) {
            if (message == 'Success') {
                document.getElementById('message').innerText = 'Sản phẩm đã được thêm vào giỏ hàng thành công';
                document.getElementById('img-message').src = '../static/image/tick.png'
            } else {
                document.getElementById('message').innerText = message;
                document.getElementById('img-message').src = '../static/image/x.png'
            }
            document.getElementById('message-box').style.display = 'block';
            setTimeout(function () {
                $('#message-box').fadeOut('fast');
            }, 3000);
        })
}