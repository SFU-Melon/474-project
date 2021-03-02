import { Route, Redirect } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import Error from "../pages/Error";

export default function ProtectedRoutes({
  component: Component,
  template,
  ...rest
}) {
  const { user } = useUserContext();

  const switchRoute = () => {
    switch (template) {
      case "accessibleAfterLogin":
        return (
          <Route
            {...rest}
            render={(props) => {
              return user ? (
                <Component {...props} />
              ) : (
                <Error msg={"Not logged in"} />
              );
            }}
          />
        );

      case "accessibleBeforeLogin":
        return (
          <Route
            {...rest}
            render={(props) => {
              return !user ? (
                <Component {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: "/",
                    state: {
                      from: props.location,
                    },
                  }}
                />
              );
            }}
          />
        );
    }
  };

  return <>{switchRoute()}</>;
}
