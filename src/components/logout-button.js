import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Icon } from "semantic-ui-react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <Button
        animated
        onClick={() =>
          logout({
            returnTo: window.location.origin,
          })
        }
      >
        <Button.Content visible>Log out</Button.Content>
        <Button.Content hidden>
          <Icon name="sign-out" />
        </Button.Content>
      </Button>
    )
  );
};

export default LogoutButton;
