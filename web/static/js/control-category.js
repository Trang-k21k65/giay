var classic = ['man', 'woman', 'sport', 'fashion'];

function loadProductByClaasify(classify) {
    document.getElementById(classify).style.borderBottom = '2.5pt solid black';
    fetch("http://127.0.0.1:5050/products/classify/" + classify)
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            document.getElementById('products').innerHTML = innerHTML(products);
        })
        .catch(function (err) {
            console.log('error');
        })
}

function loadProductByBrand(brand) {
    fetch("http://127.0.0.1:5050/products/brand/" + brand)
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            document.getElementById('products').innerHTML = innerHTML(products);
        })
        .catch(function (err) {
            console.log('error');
        })
}

function loadProductByType(type) {;
    if (classic.includes(type)) {
        loadProductByClaasify(type);
    } else {
        loadProductByBrand(type);
    }
}

function loadProducts() {
    fetch("http://127.0.0.1:5050/products")
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            var ht = '';
            for (let product of products) {
                ht += '<div class="col">' +
                    '<a href="/products/' + product.id + '" class="text-decoration-none text-black">' +
                    '<img class="card-img-top mt-3" src="'+ product.image + '" alt="' + product.id + '" style="width:100%">' +
                    '<div class="text-center">' +
                    '<h4>' + product.name + '</h4>' +
                    '<h5>' + product.sellPrice.toLocaleString("vi") + '<ins>đ</ins></h5>' +
                    '</div>' +
                    '</a>'+
                    '</div>';
            }
            document.getElementById('products').innerHTML = ht;
        })
        .catch(function (err) {
            console.log('error');
        })
}

function innerHTML(products) {
    let innerHtml = '';
    for (let product of products) {
        innerHtml += '<div class="col">' +
            '<a href="/products/' + product.id + '" class="text-decoration-none text-black">' +
            '<img class="card-img-top mt-3" src="'+ product.image + '" alt="' + product.id + '" style="width:100%">' +
            '<div class="text-center mt-3">' +
            '<h4>' + product.name + '</h4>' +
            '<h5>' + product.sellPrice.toLocaleString("vi") + '<ins>đ</ins></h5>' +
            '</div>' +
            '</a>'+
            '</div>';
    }
    return innerHtml;
}

function loadProductSearch(name) {
    fetch("http://127.0.0.1:5050/products/search/" + name)
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            document.getElementById('products').innerHTML = innerHTML(products);
        })
        .catch(function (err) {
            console.log('error');
        })
}

function clickSort(type){
    //alert(classify);
    //alert(name);
    let url = '';
    if (name != '') {
        url = "http://127.0.0.1:5050/products/search/" + name;
    } else {
        if (classic.includes(classify))
            url = "http://127.0.0.1:5050/products/classify/" + classify;
        else
            url = "http://127.0.0.1:5050/products/brand/" + classify;
    }
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            if (type == 'asc') {
                products.sort(function (a, b) {
                    return a.sellPrice - b.sellPrice;
                })
                document.getElementById('sort').innerText = 'Giá từ thấp đến cao';
            } else {
                products.sort(function (a, b) {
                    return b.sellPrice - a.sellPrice;
                })
                document.getElementById('sort').innerText = 'Giá từ cao đến thấp';
            }
            document.getElementById('products').innerHTML = innerHTML(products);
        })
        .catch(function (err) {
            console.log('error');
        })
}
