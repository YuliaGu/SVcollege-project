// async function userMessage(){
//     let email = localStorage.getItem('email')

//     let res = await fetch('/getUserInfo', {
//         headers: {
//             "Content-Type": "application/json"
//         },
//         method: 'post',
//         body: JSON.stringify({
//             email: email,
//         })
//     })

//     let data = await res.json()

//     let userName = data.name

//     let userGreeting = document.getElementById('userGreeting')
//     userGreeting.textContent = "Hello " + userName
// }

// async function chooseOrderToUpdate(email, array, div){
//     div.style.backgroundColor = 'darkorchid'
//     localStorage.setItem('pendingOrder', JSON.stringify(array))
//     // let result = await fetch('/updatedOrder', {
//     //     headers: {
//     //         "Content-Type": "application/json"
//     //     },
//     //     method: 'post',
//     //     body: JSON.stringify({
//     //         email: email,
//     //         productsList: array
//     //     })
//     // })

//     // let data = result.json()

//     setTimeout(() => {div.style.backgroundColor = 'plum'}, 250)

//     let res = await fetch('/removePendingOrder', {
//         headers: {
//             "Content-Type": "application/json"
//         },
//         method: 'post',
//         body: JSON.stringify({
//             email: email,
//         })
//     })
    
//     location.href = '/productsList'
// }

// async function yes(){
//     let containerDiv = document.getElementById('container')
//     let divToRemove = document.getElementById('pendingDiv')
//     containerDiv.removeChild(divToRemove)

//     let email = localStorage.getItem('email')

//     let res = await fetch('/pendingOrders', {
//         headers: {
//             "Content-Type": "application/json"
//         },
//         method: 'post',
//         body: JSON.stringify({
//             email: email,
//         })
//     })
//     let data = await res.json()

//     let form = document.getElementById('pendingOrdersForm')

//     for(let i = 0; i < data.length; i++){
//         let newDiv = document.createElement('div')
//         newDiv.id = data[i].email
//         newDiv.addEventListener('click', () => {chooseOrderToUpdate(email, data[i].productsList, newDiv)})
        
//         let divLabel = document.createElement('label')
//         divLabel.htmlFor = data[i].email
//         let orderArray = data[i].productsList
//         for(let i = 0; i < orderArray.length; i++){
//             divLabel.appendChild(document.createTextNode(orderArray[i].name + ' - ' + orderArray[i].price))
//         }
//         newDiv.append(divLabel)

//         let br = document.createElement('br')
//         br.id = 'br'
        
//         form.append(newDiv)
//         form.append(br)
//     }

//     // location.href = '/pendingOrders'
// }

// function no(){
//     let email = localStorage.getItem('email')
//     // localStorage.clear()
//     // localStorage.setItem('email', email)
//     // localStorage.removeItem('pendingOrder')
//     // localStorage.setItem('pendingOrder', JSON.stringify([]))
//     location.href = '/productsList'
// }       