import Route from "./Route.js";

//Définir ici vos routes

export const allRoutes = [

    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/reservation", "Reservation", "/pages/reservation.html"),
    new Route("/signin", "Connexion", "/pages/auth/signin.html"),
    new Route("/signup", "Inscription", "/pages/auth/signup.html"),
    new Route("/account", "Mon Compte", "/pages/auth/account.html")];

//Le titre s'affiche comme ceci : Route.titre - websitename

export const websiteName = "ECORIDE";