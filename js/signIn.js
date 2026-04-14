let username = document.querySelector("#username")
let password = document.querySelector("#password")
let signInBtn = document.querySelector("#sign_in")

let getUsername = localStorage.getItem("username")
let getPassword = localStorage.getItem("password")

signInBtn.addEventListener("click",function (e) {
    e.preventDefault()

    if (username.value === "" || password.value ==="") {
        alert("Fill The Missing Data !")
    }
    else
    {
        if(getUsername&& username.value.trim() === getUsername.trim() && getPassword && getPassword.trim() === password.value)
        {
            setTimeout( () => {
                window.location = "index.html"
            } , 1000)
        }
        else
        {
            alert("Wrong Username Or Password !!!")
        }
    }
})
