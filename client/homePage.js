const checkUser = async() => {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    //Email validation

    localStorage.setItem("email", email)

    let res = await fetch('/productsList', {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'post',
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    let data = await res.json()
    if(data.message == 'User does not exists, please sign up'){
        alert('User does not exist, please sign up')
        location.href = '/signUp'
    }
    else if(data.message == 'Incorrect password, try again'){
        alert('Incorrect password, try again')
        location.href = '/'
    }
    else if(data.message == 'User found') location.href = '/productsList'
    else if(data.message == 'User has a pending order'){
        location.href = '/pendingOreders'
    }
 }

 const signUp = async() => {
    let res = await fetch('/signUp')
    location.href = '/signUp'
 }