let order = []

/*
async function updateOrder(){
    let storedOrder = JSON.parse(localStorage.getItem('pendingOrder'))
    order = []
    if(storedOrder){
        order = storedOrder
        localStorage.removeItem('pendingOrder')
        // localStorage.setItem('pendingOrder', JSON.stringify([]))
    }
    // localStorage.removeItem('pendingOrder')
    // let email = localStorage.getItem('email')
    
    // let res = await fetch('/getUpdatedOrder', {
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     method: 'post',
    //     body: JSON.stringify({
    //         email: email,
    //     })
    // })

    // let data = res.json()
    // if(data.length != 0){
    //     order = [...data.productsList]
    // }
}
*/

function addToOrder(name, price, div){
    // updateOrder()
    div.style.backgroundColor = 'darkorchid'

    order.push({
        name,
        price
    })
    setTimeout(() => {div.style.backgroundColor = 'plum'}, 250)
}

function addFormElements(array){
    let form = document.getElementById('productsForm')

    for(let i = 0; i < array.length; i++){
        let newDiv = document.createElement('div')
        newDiv.id = array[i].name
        newDiv.addEventListener('click', () => {addToOrder(array[i].name, array[i].price, newDiv)})
        
        let divLabel = document.createElement('label')
        divLabel.htmlFor = array[i].name
        divLabel.appendChild(document.createTextNode(array[i].name + ' - ' + array[i].price))
        newDiv.append(divLabel)

        let br = document.createElement('br')
        br.id = 'br'
        
        form.append(newDiv)
        form.append(br)
    }

    let submitInput = document.createElement('input')
    submitInput.id = 'submit'
    submitInput.type = 'submit'
    submitInput.value = 'Buy'
    form.append(submitInput)
}

function removeFormElements(array){
    let form = document.getElementById('productsForm')
    for(let i = 0; i < array.length; i++){
        let divToRemove = document.getElementById(array[i].name)
        form.removeChild(divToRemove)
        let br = document.getElementById('br')
        form.removeChild(br)
    }
    let submitInput = document.getElementById('submit')
    form.removeChild(submitInput)
}

const loadProductsFromDB = async() => {
    let res = await fetch('/getProductsList')
    let data = await res.json()

    addFormElements(data)
    // order = []
}

const moveToSummery = async() => {
    let email = localStorage.getItem("email")

    let res = await fetch('/buy', {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'post',
        body: JSON.stringify({
            email: email,
            productsList: order
        })
    })

    let data = await res.json()
    if(data.message == 'Order submited') location.href = '/buySummery'
}

async function sort(){
    let form = document.getElementById('productsForm')
    let sortOption = document.getElementById('sortDropDown').value

    if(searchedArray.length !== 0){
        removeFormElements(searchedArray)
        searchedArray = []
    }

    let res = await fetch('/getProductsList')
    let data = await res.json()

    if(sortOption === 'random'){
        if(form.childNodes.length > 1) removeFormElements(data)
        addFormElements(data)
    }
    if(sortOption === 'byName'){
        let sortedByName = data.sort(function(name1, name2){
            const firstName = name1.name.toUpperCase()
            const secondName = name2.name.toUpperCase()
            if (firstName > secondName) return 1
            if (firstName < secondName) return -1 
            return 0
          })

          if(form.childNodes.length > 1) removeFormElements(data)
          addFormElements(sortedByName)
    }
    if(sortOption === 'byPrice'){
        let sortedByPrice = data.sort(
            (price1, price2) => {
                if(price1.price > price2.price) return 1
                if(price1.price < price2.price) return -1
                return 0
            }) 

            if(form.childNodes.length > 1) removeFormElements(data)
            addFormElements(sortedByPrice)
    }
}

let searchedArray = []

async function search(){
    let searchInputValue = document.getElementById('searchInput').value.toUpperCase()

    let res = await fetch('/getProductsList')
    let data = await res.json()

    if(searchedArray.length === 0) removeFormElements(data)
    else if(searchedArray.length > 0){
        removeFormElements(searchedArray)
        searchedArray = []
    }

    for(let i = 0; i < data.length; i++){
        upperCaseData = data[i].name.toUpperCase()
        if(upperCaseData.includes(searchInputValue)) searchedArray.push(data[i])
    }

    addFormElements(searchedArray)
}




