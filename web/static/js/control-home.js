function loadNewProducts() {
    fetch("/home/new-product")
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
    fetch("/home/best-selling")
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
        let oldPrice = (product.sellPrice / (100 - product.tag) / 10).toFixed(0) * 1000;
        inner += '<div class="col">' +
            '<a href="/products/' + product.id + '" class="text-decoration-none text-black">' +
            '<span class="bg-danger text-block">' + product.tag + '%</span>' +
            '<img class="card-img-top mt-3" src="'+ product.image.split('\n')[0] + '" alt="' + product.id + '" style="width:100%">' +
            '<div class="my-3">' +
            '<h4 class="hidden-text">' + product.name + '</h4>' +
            '<span class=" text-secondary"><del>' + oldPrice.toLocaleString("vi") +'<ins>đ</ins></del></span>'+
            '<span class="text-danger" style="font-size: 20px"> ' + product.sellPrice.toLocaleString("vi") + '<ins>đ</ins></span>' +
            '<p class="text-secondary text-end" >Đã bán ' + product.consume + '</p>' +
            '</div>' +
            '</a>'+
            '</div>';
    }
    return inner;
}

