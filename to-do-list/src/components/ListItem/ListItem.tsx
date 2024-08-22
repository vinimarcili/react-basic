import { PropsWithChildren } from "react"
import Button from "../Button/Button"
import './ListItem.css'

interface ListItemProps extends PropsWithChildren {
  onRemove: (index: number) => void
  index: number
}


const ListItem = ({ index, children, onRemove }: ListItemProps) => {
  return (
    <li>
      {index + 1}. {children}
      <Button onClick={() => onRemove(index)}>
        X
      </Button>
    </li>
  )
}

export default ListItem