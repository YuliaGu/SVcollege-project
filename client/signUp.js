const signUp = async() => {
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    let res = await fetch('/signUp', {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'post',
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    })
    let data = await res.json()
    if(data.message == 'New user added') location.href = '/'
    else if(data.message == 'Email already exists') alert('Email already exists, try again')
}