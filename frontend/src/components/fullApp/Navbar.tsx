import React from "react"
import { NavLink } from "react-router-dom"
import PoemistLogo from "src/components/fullApp/Logo"
import NavbarDiv from "./NavbarDiv"
import { Select, MenuItem } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { useGetCurrentUserQuery } from "src/queries/autogenerate/hooks"
import LoginModal from "./LoginModal"

const LogInOut = ({ toggleShowLogin }: { toggleShowLogin: () => void }) => (
  <span>
    <a onClick={toggleShowLogin} data-test="signUpLink">
      Sign Up
    </a>
  </span>
)

function Navbar() {
  const history = useHistory()
  const { data } = useGetCurrentUserQuery()
  const currentUser = data?.current
  return (
    <div
      className="navbar"
      style={{ display: "inline-block", minWidth: 345, marginRight: "1rem" }}
    >
      <div />
      <ul className={"navbarMenu expanded"}>
        <li>
          <NavLink activeClassName="active" exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/about">
            About
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/new/write">
            Create
          </NavLink>
        </li>
        {currentUser && (
          <li>
            <NavLink
              activeClassName="active"
              to={`/user/${currentUser.id}`}
              data-test="profileLink"
            >
              Profile
            </NavLink>

            <Select labelId="demo-simple-select-label" id="demo-simple-select">
              <MenuItem onClick={() => history.push(`/user/${currentUser.id}`)}>
                {currentUser.username}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  localStorage.clear()
                  window.location.reload()
                }}
              >
                Logout
              </MenuItem>
            </Select>
          </li>
        )}

        {!currentUser && (
          <li>
            <LogInOut toggleShowLogin={() => history.push("?showLogin=true")} />
          </li>
        )}
      </ul>
    </div>
  )
}

export default function FullNav() {
  return (
    <NavbarDiv>
      <NavLink to="/" className="logo">
        <PoemistLogo />
      </NavLink>
      <Navbar />
      <LoginModal />
    </NavbarDiv>
  )
}
