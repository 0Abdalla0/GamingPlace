let username = document.querySelector("#username")
let password = document.querySelector("#password")
let email = document.querySelector("#email")
let signUpBtn = document.querySelector("#sign_up")

signUpBtn.addEventListener("click",function(e)
{
    e.preventDefault()
    if (username.value === "" || password.value === "" || email.value === "")
    {
        alert("FILL THE MISSING DATA!!")
    }
    else
    {
        localStorage.setItem("username",username.value)
        localStorage.setItem("password",password.value)
        localStorage.setItem("email",email.value)
        setTimeout(()=>{
            window.location="signIn.html"
        },1000)
    }
    
})