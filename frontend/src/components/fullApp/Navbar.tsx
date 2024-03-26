import { NavLink } from "react-router-dom"
import PoemistLogo from "src/components/fullApp/Logo"
import NavbarDiv from "./NavbarDiv"
import { useHistory } from "react-router-dom"
import LoginModal from "./LoginModal"
import Dropdown from "../universal/Dropdown"
import { FaAngleDown } from "react-icons/fa"
import { useGetCurrentUserQuery } from "src/queries/autogenerate/hooks"

const LogInOut = ({ toggleShowLogin }: { toggleShowLogin: () => void }) => (
  <span>
    {/* eslint-disable-next-line */}
    <a onClick={toggleShowLogin} data-test="signUpLink">
      Sign Up
    </a>
  </span>
)

function Navbar() {
  const history = useHistory()
  const [{ data }] = useGetCurrentUserQuery()
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
            <span style={{ display: "flex" }}>
              <NavLink
                activeClassName="active"
                to={`/user/${currentUser.id}`}
                data-test="profileLink"
              >
                Profile
              </NavLink>

              <Dropdown
                openLabel={<FaAngleDown />}
                openStyle={{
                  color: "white",
                  display: "inline",
                  minWidth: 5,
                  paddingTop: 0,
                }}
                items={[
                  {
                    label: "Logout",
                    onClick: () => {
                      localStorage.clear()
                      window.location.reload()
                    },
                  },
                ]}
              />
            </span>
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
