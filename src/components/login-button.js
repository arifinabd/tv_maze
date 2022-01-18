import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Icon } from "semantic-ui-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <Button animated onClick={() => loginWithRedirect()}>
        <Button.Content visible>
          <Icon name="sign in" />
        </Button.Content>
        <Button.Content hidden>Log in</Button.Content>
      </Button>
    )
  );
};

export default LoginButton;
