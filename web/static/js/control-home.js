function loadNewProducts() {
    fetch("http://127.0.0.1:5050/home/new-product")
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            document.getElementById('new-product').innerHTML = innerHTML(products);
        })
        .catch(function (err) {
            console.log('error');
        })
}

function loadBestSelling() {
    fetch("http://127.0.0.1:5050/home/best-selling")
        .then(function (response) {
            return response.json();
        })
        .then(function (products) {
            document.getElementById('best-selling').innerHTML = innerHTML(products);
        })
        .catch(function (err) {
            console.log('error');
        })
}

function innerHTML(products) {
    let inner = '';
    for (let product of products) {
        inner += '<div class="col">' +
            '<a href="/products/' + product.id + '" class="text-decoration-none text-black">' +
            '<img class="card-img-top mt-3" src="'+ product.image + '" alt="' + product.id + '" style="width:100%">' +
            '<div class="text-center mt-3">' +
            '<h4>' + product.name + '</h4>' +
            '<h5>' + product.sellPrice.toLocaleString("vi") + '<ins>đ</ins></h5>' +
            '</div>' +
            '</a>'+
            '</div>';
    }
    return inner;
}

