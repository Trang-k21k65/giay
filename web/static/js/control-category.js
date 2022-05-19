var classic = ['man', 'woman', 'sport', 'fashion'];

function loadProductByClaasify(classify) {
    document.getElementById(classify).style.borderBottom = '2.5pt solid black';
    fetch("/products/classify/" + classify)
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
    fetch("/products/brand/" + brand)
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
    fetch("/products")
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
            '<span class="bg-danger text-block">' + product.tag + '%</span>' +
            '<img class="card-img-top mt-3" src="'+ product.image.split('\n')[0] + '" alt="' + product.id + '" style="width:100%">' +
            '<div class="my-3">' +
            '<h4 class="hidden-text">' + product.name + '</h4>' +
            '<span class=" text-secondary"><del>' + (product.sellPrice * (1 + product.tag / 100)).toFixed(0) +'<ins>đ</ins></del></span>'+
            '<span class="text-danger" style="font-size: 20px"> ' + product.sellPrice.toLocaleString("vi") + '<ins>đ</ins></span>' +
            '<p class="text-secondary text-end" >Đã bán ' + product.consume + '</p>' +
            '</div>' +
            '</a>'+
            '</div>';
    }
    return innerHtml;
}

function loadProductSearch(name) {
    fetch("/products/search/" + name)
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
    let url = '';
    if (name != '') {
        url = "/products/search/" + name;
    } else {
        if (classic.includes(classify))
            url = "/products/classify/" + classify;
        else
            url = "/products/brand/" + classify;
    }
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            reset();
            if (type == 'asc') {
                products.sort(function (a, b) {
                    return a.sellPrice - b.sellPrice;
                })
                document.getElementById('sort').innerText = 'Giá từ thấp đến cao';
                document.getElementById('sort').style.backgroundColor = "#ee4d2d";
                document.getElementById('sort').style.color = "white";
                document.getElementById('sort').style.borderColor = "#ee4d2d";
            } else
            if (type == "desc") {
                products.sort(function (a, b) {
                    return b.sellPrice - a.sellPrice;
                })
                document.getElementById('sort').innerText = 'Giá từ cao đến thấp';
                document.getElementById('sort').style.backgroundColor = "#ee4d2d";
                document.getElementById('sort').style.color = "white";
                document.getElementById('sort').style.borderColor = "#ee4d2d";

            } else
            if (type == "ban-chay") {
                products.sort(function (a, b) {
                    return b.consume - a.consume;
                })
                document.getElementById('ban-chay').style.backgroundColor = "#ee4d2d";
                document.getElementById('ban-chay').style.color = "white";
                document.getElementById('ban-chay').style.borderColor = "#ee4d2d";
            } else
            if (type == 'moi-nhat') {
                products.sort(function (a, b) {
                    a = Date.parse(a.importDate);
                    b = Date.parse(b.importDate);
                    return b - a;
                })
                document.getElementById('moi-nhat').style.backgroundColor = "#ee4d2d";
                document.getElementById('moi-nhat').style.color = "white";
                document.getElementById('moi-nhat').style.borderColor = "#ee4d2d";
            }
            document.getElementById('products').innerHTML = innerHTML(products);
        })
        .catch(function (err) {
            console.log('error');
        })
}

function reset() {
    document.getElementById('ban-chay').style.backgroundColor = "#f8f9fa";
    document.getElementById('ban-chay').style.color = "black";
    document.getElementById('ban-chay').style.borderColor = "#f8f9fa";
    document.getElementById('moi-nhat').style.backgroundColor = "#f8f9fa";
    document.getElementById('moi-nhat').style.color = "black";
    document.getElementById('moi-nhat').style.borderColor = "#f8f9fa";
    document.getElementById('sort').innerText = 'Giá';
    document.getElementById('sort').style.backgroundColor = "#f8f9fa";
    document.getElementById('sort').style.color = "black";
    document.getElementById('sort').style.borderColor = "#f8f9fa";
}
