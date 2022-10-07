import { useState } from "react"

export const useSidepanel = (open = false) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return { isOpen, handleOpen, handleClose }

}