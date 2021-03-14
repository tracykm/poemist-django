import { useState } from "react"
import { Button, ButtonProps, Menu, MenuItem } from "@material-ui/core"

export default function Dropdown({
  openLabel = "Select",
  items = [],
  openStyle = {},
}: {
  openLabel?: string | JSX.Element
  items: { label: string; onClick?: () => void }[]
  openStyle: ButtonProps["style"]
}) {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={openStyle}
      >
        {openLabel}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {items.map((item) => (
          <MenuItem
            onClick={() => {
              item.onClick?.()
              handleClose()
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
