import AppHome from "./views/AppHome";
import Login from "./views/login/Login";
import Pokemon from "./views/pokemon/Pokemon";

const routes = [
  {
    path: "/login",
    exact: true,
    name: "Login",
    component: Login,
    secure: false,
  },

  { path: "/home", name: "Home", component: AppHome, secure: true },

  // Pokemons
  {
    path: "/pokemon",
    exact: true,
    name: "Pokemon",
    component: Pokemon,
    secure: true,
  }
];

export default routes;
