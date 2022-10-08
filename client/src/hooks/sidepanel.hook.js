import { useState } from "react"

function noop() {}

export const useSidepanel = ({ open = false, onClose = noop  }) => {
  const [isOpen, setIsOpen] = useState(open);

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    onClose();
    setIsOpen(false)
  }

  return { isOpen, handleOpen, handleClose }

}