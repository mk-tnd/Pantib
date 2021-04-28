import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import AddPost from "./pages/post/AddPost";
import Auth from "./pages/Auth";
import SignUp from "./components/auth/Register";
import Profile from "./pages/Profile";
import SinglePostPage from "./pages/post/SinglePostPage";
import { useContext } from "react";
import { Context } from "./contexts/ContextProvider";

function App() {
  const { isAuth } = useContext(Context);
  const privateRoutes = [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/profile",
      component: Profile,
    },
    {
      path: `/post/:pid`,
      component: SinglePostPage,
    },
    {
      path: "/addpost",
      component: AddPost,
    },
  ];

  const publicRoutes = [
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/",
      component: Auth,
    },

    {
      path: "/register",
      component: SignUp,
    },
  ];
  return (
    <BrowserRouter>
      <Switch>
        {isAuth &&
          privateRoutes.map((el, index) => (
            <Route key={index} exact path={el.path} component={el.component} />
          ))}
        {!isAuth &&
          publicRoutes.map((el, index) => (
            <Route key={index} exact path={el.path} component={el.component} />
          ))}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
