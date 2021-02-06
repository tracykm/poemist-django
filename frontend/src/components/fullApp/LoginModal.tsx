import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core"
import React, { useState } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import {
  useLoginUserMutation,
  useCreateUserMutation,
} from "src/queries/autogenerate/hooks"

export default function LoginDialog() {
  const handleClose = () => history.push("/")
  const [formState, setFormState] = useState({
    username: "tracy",
    password: "password",
  })
  const [loginInUserMutation] = useLoginUserMutation()
  const [createUserMutation] = useCreateUserMutation()
  const location = useLocation()
  const history = useHistory()
  const showLogin = location.search.includes("showLogin")
  const showSignUp = location.search.includes("showSignUp")
  return (
    <Dialog open={showLogin || showSignUp}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          let createPromise: Promise<any> = Promise.resolve()
          if (showSignUp) {
            createPromise = createUserMutation({ variables: formState })
          }
          createPromise.then(() => {
            loginInUserMutation({ variables: formState }).then((res) => {
              const { token } = res.data.tokenAuth
              localStorage.setItem("token", token)
              handleClose()
            })
          })
        }}
      >
        <DialogTitle>{showLogin ? "Login" : "Sign Up"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            fullWidth
            value={formState.username}
            onChange={(e) =>
              setFormState((arg) => ({ ...arg, username: e.target.value }))
            }
          />
          <TextField
            type="password"
            margin="dense"
            label="Password"
            fullWidth
            value={formState.password}
            onChange={(e) =>
              setFormState((arg) => ({ ...arg, password: e.target.value }))
            }
          />
          {showLogin ? (
            <Link to="?showSignUp">Sign Up</Link>
          ) : (
            <Link to="?showLogin">Login</Link>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
