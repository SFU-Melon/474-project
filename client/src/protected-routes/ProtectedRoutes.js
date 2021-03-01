import { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import Error from '../pages/Error';

export default function ProtectedRoutes({
  component: Component,
  template,
  ...rest
}) {
  const { user } = useUserContext();
  // const [isLoading, setIsLoading] = useState(true);

  // I can't use Redirect for the first case bc the it reads states slowly -> Any ways around this?
  // -> What happens if we don't use await in context? Bad idea?
  // -> Or "isLoading" useState in UserContext?
  const switchRoute = () => {
    switch (template) {
      case 'accessibleAfterLogin':
        return (
          <Route
            {...rest}
            render={(props) => {
              return user ? (
                <Component {...props} />
              ) : (
                <Error msg={'Not logged in'} />
              );
            }}
          />
        );

      case 'accessibleBeforeLogin':
        return (
          <Route
            {...rest}
            render={(props) => {
              return !user ? (
                <Component {...props} />
              ) : (
                <Redirect
                  to={{
                    pathname: '/',
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

  // useEffect(() => {
  //   if (isLoading) {
  //     setIsLoading(false);
  //   }
  // }, [user]);

  // return <>{isLoading ? '...Loading' : switchRoute()}</>;
  return <>{switchRoute()}</>;
}
