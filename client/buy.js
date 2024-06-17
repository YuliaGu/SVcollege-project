const getSummery = async() => {
    let products = document.getElementById('products')
    let price = document.getElementById('price')

    let email = localStorage.getItem("email")

    let res = await fetch('/buySummery', {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'post',
        body: JSON.stringify({
            email: email
        })
    })

    let data = await res.json()

    let counter = 0
    let sum = 0
    for(let i = 0; i < data.productsList.length; i++){
        counter++
        sum += Number(data.productsList[i].price)
    }

    products.textContent = "Total Products: " + counter
    price.textContent = "Total Price: " + sum
}

const disconnect = async() => {
    let email = localStorage.getItem("email")

    let res = await fetch('/disconnect', {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'post',
        body: JSON.stringify({
            email: email
        })
    })

    let data = await res.json()

    if(data.message == 'Order removed from pending'){
        localStorage.removeItem("email")
        location.href = '/'
    }
    else if(data.message == 'Error') alert("Error")
}