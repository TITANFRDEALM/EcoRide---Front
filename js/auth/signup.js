//Implémenter le JS de ma page
const inputNom = document.getElementById("nom");
const inputPrenom = document.getElementById("prenom");
const inputTelephone = document.getElementById("telephone");
const inputEmail = document.getElementById("email");
const inputMotdepasse = document.getElementById("motdepasse");
const inputVerifMotdepasse = document.getElementById("verifmotdepasse");
const btnValidation = document.getElementById("btn-validation-inscription");
const formInscription = document.getElementById("formulaireInscription");

inputNom.addEventListener("keyup", validateForm); 
inputPrenom.addEventListener("keyup", validateForm);
inputTelephone.addEventListener("keyup", validateForm);
inputEmail.addEventListener("keyup", validateForm);
inputMotdepasse.addEventListener("keyup", validateForm);
inputVerifMotdepasse.addEventListener("keyup", validateForm);

btnValidation.addEventListener("click", InscrireUtilisateur);

//Function permettant de valider tout le formulaire
function validateForm(){
    const nomOK = validateRequired(inputNom);
    const prenomOK = validateRequired(inputPrenom);
    const telephoneOK = validateRequired(inputTelephone);
    const emailOK = validateMail(inputEmail);
    const motdepasseOK = validatePassword(inputMotdepasse);
    const verifMotdepasseOK = validateConfirmationPassword(inputMotdepasse, inputVerifMotdepasse);

    if(nomOK && prenomOK && telephoneOK && emailOK && motdepasseOK && verifMotdepasseOK){
        btnValidation.disabled = false;
    }
    else{
        btnValidation.disabled = true;
    }
}

function validatePassword(input){
    //Définir mon regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if(passwordUser.match(passwordRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}
function validateConfirmationPassword(inputPwd, inputConfirmPwd){
    if(inputPwd.value == inputConfirmPwd.value){
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;
    }
    else{
        inputConfirmPwd.classList.add("is-invalid");
        inputConfirmPwd.classList.remove("is-valid");
        return false;
    }
}

function validateMail(input){
    //Définir mon regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if(mailUser.match(emailRegex)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid"); 
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function validateRequired(input){
    if(input.value != ''){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;
    }
}

function InscrireUtilisateur(){
    const dataform = new FormData(formInscription);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    // Récupérer la date actuelle
    const currentDate = new Date().toISOString();

    const raw = JSON.stringify({
        "nom" : dataform.get("nom"),
        "prenom" : dataform.get("prenom"),
        "telephone" : dataform.get("telephone"),
        "mail" : dataform.get("mail"),
        "password" : dataform.get("motdepasse"),
        "updateAt" : currentDate  // Remplacer par la date actuelle
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(apiUrl+"registration", requestOptions)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else{
                alert("Erreur lors de l'inscription");
            }
        })
        .then(result => {
            alert("Bravo "+dataForm.get("prenom")+", vous êtes maintenant inscrit, vous pouvez vous connecter.");
            document.location.href="/signin";
        })
        .catch(error => console.log('error', error));
        }