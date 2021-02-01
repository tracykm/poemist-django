import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core"
import React, { useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { useLoginUserMutation } from "src/queries/autogenerate/hooks"

export default function LoginDialog() {
  const handleClose = () => history.push("/")
  const [formState, setFormState] = useState({
    username: "tracy",
    password: "password",
  })
  const [loginInUserMutation] = useLoginUserMutation()
  const location = useLocation()
  const history = useHistory()
  const showLogin = location.search.includes("showLogin")
  return (
    <Dialog open={showLogin}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          loginInUserMutation({ variables: formState }).then((res) => {
            const { token } = res.data.tokenAuth
            localStorage.setItem("token", token)
            handleClose()
          })
        }}
      >
        <DialogTitle>Login</DialogTitle>
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
