const mailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const btnSigninSubmit = document.getElementById("btnSignin");
const signinForm = document.getElementById("signinForm");

btnSigninSubmit.addEventListener("click", checkCredentials);

function checkCredentials(){
    const dataform = new FormData(signinForm);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    const raw = JSON.stringify({
        "email" : dataform.get("email"),
        "password" : dataform.get("password"),
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiUrl+"login", requestOptions)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else{
                mailInput.classList.add("is-invalid");
                passwordInput.classList.add("is-invalid");
            }
        })
        .then(result => {
            const token = result.apiToken;
            setToken(token);
            //placer ce token en cookie
            setCookie(RoleCookieName, result.roles[0], 7);
            window.location.replace("/");
        })
        .catch(error => console.log('error', error));
    }