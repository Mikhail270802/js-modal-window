let cars = [
    { id: 1, title: 'Corvette 2019', price: 1500000, img: 'https://cimg2.ibsrv.net/ibimg/hgm/1920x1080-1/100/678/2019-chevrolet-corvette-zr1-3zr_100678022.jpg' },
    { id: 2, title: 'Lexus GT3', price: 1200000, img: 'https://www.conceptcarz.com/images/Lexus/Lexus-RC-F_GT3-2017-image-007.jpg' },
    { id: 3, title: 'Mercedes AMG', price: 2000000, img: 'https://i.redd.it/myuierqgasoy.jpg' },
]



const toHtml = car =>
    `
<div class="col">
<div class="card">
    <img class="card-img-top" style="height: 300px; width: 500px;" src="${car.img}" alt="${car.title}">
    <div class="card-body">
        <h5 class="card-title">${car.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${car.id}">Watch</a>
        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${car.id}">Delete</a>
    </div>
</div>
    `

function render() {
    const html = cars.map(toHtml).join('')
    document.querySelector('#cars').innerHTML = html
}

render()

// Watch the product
const priceModal = $.modal({
    title: 'Product price',
    closable: true,
    widht: '400px',
    footerButtons: [
        {
            text: 'Close', type: 'primary', handler() {
                priceModal.close()
            }
        }
    ]
})

//Delete the product
//const confirmModal = $.modal({
//    title: 'Are you sure?',
//    closable: true,
//    widht: '400px',
//    footerButtons: [
//        {
//            text: 'Cancel', type: 'secondary', handler() {
//                confirmModal.close()
//            }
//        },
//        {
//            text: 'Delete', type: 'danger', handler() {
//                confirmModal.close()
//            }
//        }
//    ]
//})



document.addEventListener('click', event => {
    event.preventDefault()  // Grid remove
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id // Convert string to number by "+"


    if (btnType === 'price') {
        const car = cars.find(f => f.id === id)
        priceModal.setContent(`
        <p>Price on ${car.title}: <strong>${car.price}$</strong></p>
        `)
        priceModal.open()
    } else if (btnType === 'remove') {
        const car = cars.find(f => f.id === id)
        $.confirm({
            title: 'Are you sure?',
            content: `<p>You delete car: <strong>${car.title}</strong></p>`
        }).then(() => {
            cars = cars.filter(f => f.id !== id)
            render()
        }).catch(() => {
            console.log('Cancel')
        })
    }
})