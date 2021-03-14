import styled from "styled-components"
import { sizes } from "src/components/universal/_variables"
import Navbar from "src/components/fullApp/Navbar"
import { ErrorBoundary } from "../universal/ErrorBoundary"
// import ModalContainer from "src/components/login/ModalContainer"
// import 'reset-css/reset.css'

const AppDiv = styled.div`
  @media (max-width: 550px) {
    min-width: 550px;
    .poem {
      margin: 0.2em;
    }
    /* .close-up-poem-view {
      min-width: 550px;
    } */
  }
  .app {
    font-size: ${sizes.fontSizeBase};
    font-family: "Avenir Next", sans-serif;
  }

  .page-body {
    padding: ${sizes.spaceBase}px;
    margin-top: ${sizes.headerHeight}px;
    text-align: center;
  }

  .index-view {
    text-align: left;
  }

  .error {
    color: red;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-align: center;
  }

  a:hover {
    cursor: pointer;
  }
`

export default function AppWrapper({ children }) {
  return (
    <AppDiv>
      <Navbar />
      <ErrorBoundary>
        <div className="page-body">{children}</div>
      </ErrorBoundary>

      {/* <ModalContainer /> */}
    </AppDiv>
  )
}
