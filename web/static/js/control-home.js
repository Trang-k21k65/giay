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
            '<span class="bg-danger text-block">' + product.tag + '%</span>' +
            '<img class="card-img-top mt-3" src="'+ product.image.split('\n')[0] + '" alt="' + product.id + '" style="width:100%">' +
            '<div class="my-3">' +
            '<h4>' + product.name + '</h4>' +
            '<span class=" text-secondary"><del>' + (product.sellPrice * (1 + product.tag / 100)).toFixed(0) +'<ins>đ</ins></del></span>'+
            '<span class="text-danger" style="font-size: 20px"> ' + product.sellPrice.toLocaleString("vi") + '<ins>đ</ins></span>' +
            '<p class="text-secondary text-end" >Đã bán ' + product.consume + '</p>' +
            '</div>' +
            '</a>'+
            '</div>';
    }
    return inner;
}

