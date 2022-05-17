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
    fetch("http://127.0.0.1:5050/products/details/" + id)
        .then(function (response) {
            return response.json();
        })
        .then(function (product) {
            let p = product[0];
            document.getElementById('image-product').src = p.image;
            document.getElementById('image1').src = p.image;
            document.getElementById('name').innerText = p.name;
            document.getElementById('price').innerHTML = p.sellPrice.toLocaleString("vi") + '<ins>đ</ins>';

            var size_inner_html = ''
            let total = 0;
            for (let s of p.sizes) {
                size_inner_html += '<input type="radio" id="size' + s.size + '" class="btn-check" name="size" value="' + s.size + '" onclick="clickSize(' + s.size + ')">' +
                                    '<label class="btn btn-outline-dark my-1 me-1" for="size' + s.size + '">' + s.size + '</label>';
                total += s.quantityInStock;
            }
            document.getElementById('size').innerHTML = size_inner_html;
            document.getElementById('quantityInStock').innerText = total + ' sản phẩm có sẵn';

            let description = p.description.split('.');
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
    fetch("http://127.0.0.1:5050/products/details/" + document.getElementById('productID').innerText)
        .then(function (response) {
            return response.json();
        })
        .then(function (product) {
            let p = product[0];
            for (let s of p.sizes) {
                if (s.size == size) {
                    document.getElementById('quantityInStock').innerText = s.quantityInStock + ' sản phẩm có sẵn';
                    if (document.getElementById('number').value  > s.quantityInStock) {
                        document.getElementById('number').value = s.quantityInStock;
                    }
                }
            }
        })
}

