const getAllOrders = async() => {
    let res = await fetch('/allMadeOrders')
    let data = await res.json()

    let body = document.getElementsByTagName('body')
    for(let i = 0; i < data.length; i++){
        let newDiv = document.createElement('div')
        newDiv.id = data[i].email

        let divLabel = document.createElement('label')
        divLabel.htmlFor = data[i].email
        let userProductsList = []
        for(let j = 0; j < data[i].productsList.length; j++){
            userProductsList.push(" " + data[i].productsList[j].name + ' - ' + data[i].productsList[j].price)
        }

        divLabel.appendChild(document.createTextNode(data[i].email + ': ' + userProductsList))
        newDiv.append(divLabel)

        let br = document.createElement('br')

        body[0].append(newDiv)
        body[0].append(br)

        if(data.message == 'All orders') location.href = '/all'
    }
}









// const getAllOrders = async() => {
//     let res = await fetch('/all', {
//         headers: {
//             "Content-Type": "application/json"
//         },
//         method: 'post',
//         body: JSON.stringify({
//         })
//     })

//     let data = res.json()
//     let body = document.getElementsByTagName('body')
//     for(let i = 0; i < data.length; i++){
//         let newDiv = document.createElement('div')
//         newDiv.id = data[i].name

//         let divLabel = document.createElement('label')
//         divLabel.htmlFor = data[i].name
//         divLabel.appendChild(document.createTextNode(data[i].name + ' - ' + data[i].price))
//         newDiv.append(divLabel)

//         let br = document.createElement('br')

//         body[0].append(newDiv)
//         body[0].append(br)
//     }
// }