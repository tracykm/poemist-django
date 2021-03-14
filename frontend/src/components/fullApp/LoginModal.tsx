import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  IconButton,
} from "@material-ui/core"
import React, { useState } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import {
  useLoginUserMutation,
  useCreateUserMutation,
  GetCurrentUserDocument,
} from "src/queries/autogenerate/hooks"
import { FaTimes } from "react-icons/fa"

export default function LoginDialog() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  })
  const [loginInUserMutation, { error: loginError }] = useLoginUserMutation({
    refetchQueries: [{ query: GetCurrentUserDocument }],
  })
  const [createUserMutation, { error: signUpError }] = useCreateUserMutation({
    refetchQueries: [{ query: GetCurrentUserDocument }],
    // errorPolicy: "ignore",
  })
  const location = useLocation()
  const history = useHistory()
  const handleClose = () => history.push(history.location.pathname)
  const showLogin = location.search.includes("showLogin")
  const showSignUp = location.search.includes("showSignUp")
  return (
    <Dialog open={showLogin || showSignUp} onClose={handleClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          let createPromise: Promise<any> = Promise.resolve()
          if (showSignUp) {
            createPromise = createUserMutation({
              variables: formState,
            })
          }
          createPromise
            .then(() =>
              loginInUserMutation({ variables: formState }).then((res) => {
                const { token } = res.data.tokenAuth
                localStorage.setItem("token", token)
                // TODO - hack to get the "refetchQueries" to trigger after the localStorage.setItem
                window.setTimeout(() => {
                  loginInUserMutation({ variables: formState })
                }, 100)
                handleClose()
              }),
            )
            .catch((res) => {
              console.warn(res)
            })
        }}
      >
        <DialogTitle>
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1 }}>{showLogin ? "Login" : "Sign Up"}</div>
            <IconButton size="small" onClick={handleClose}>
              <FaTimes />
            </IconButton>
          </div>
        </DialogTitle>
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
            <Link to="?showSignUp" component={MuiLink}>
              Sign Up
            </Link>
          ) : (
            <Link to="?showLogin" component={MuiLink}>
              Login
            </Link>
          )}
          <Typography color="error">
            {signUpError?.message?.includes("UNIQUE")
              ? "Username already taken"
              : signUpError?.message}
            {loginError?.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
