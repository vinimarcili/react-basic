import { FormEvent, useState } from 'react'
import ListItem from '../ListItem/ListItem'
import Input from '../Input/Input'
import Button from '../Button/Button'
import './TodoList.css'

const TodoList = () => {
  const [list, setList] = useState<string[]>([])
  const [newItem, setNewItem] = useState('')

  const onRemove = (i: number) => {
    setList((oldList) => {
      return oldList.filter((_, oldIndex) => oldIndex !== i)
    })
  }

  const addItem = (event: FormEvent<HTMLFormElement>, value: string) => {
    event.preventDefault()

    if (!value) {
      return
    }

    setList((oldList) => {
      return [...oldList, value]
    })
    setNewItem('')
  }

  let listHTMLElement = (
    <p>Nenhum item adicionado</p>
  )

  if (list?.length) {
    listHTMLElement = (
      <ul>
        {
          list.map((item, index) => {
            return (
              <ListItem key={index} index={index} onRemove={onRemove}>
                {item}
              </ListItem>
            )
          })
        }
      </ul>
    )
  }

  return (
    <>
      {listHTMLElement}
      <form className='wrapper' onSubmit={(e) => addItem(e, newItem)}>
        <Input label='Adicionar Item' placeholder='Ex: Lavar louça' name='add-item' id='add-item' onChange={(e) => setNewItem(e.currentTarget.value)} value={newItem} />
        <Button type='submit' disabled={!newItem}>
          +
        </Button>
      </form>
    </>
  )
}

export default TodoList