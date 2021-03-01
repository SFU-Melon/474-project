import { Route } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import Error from '../pages/Error';

export default function ProtectedRoutes({
  component: Component,
  template,
  ...rest
}) {
  const { user, setUser } = useUserContext();

  const switchRoute = () => {
    switch (template) {
      case 'accessibleAfterLogin':
        return user ? (
          <Route
            {...rest}
            render={(props) => {
              return <Component {...props} />;
            }}
          />
        ) : (
          <Route
            render={() => {
              return <Error msg={'User not logged in'} />;
            }}
          />
        );

      case 'accessibleBeforeLogin':
        return !user ? (
          <Route
            {...rest}
            render={(props) => {
              return <Component {...props} />;
            }}
          />
        ) : (
          <Route
            render={() => {
              return <Error msg={'User already logged in'} />;
            }}
          />
        );
    }
  };
  return <>{switchRoute()}</>;
}
