import React from 'react'
import c from './workers.module.scss'
import { API } from '../../api'
import { Components } from '..'

const ExpensesTable = () => {
  const [ month, setMonth ] = React.useState()
  const [ period, setPeriod ] = React.useState(1)
  const [ data, setData ] = React.useState(null)
  const [ active, setActive ] = React.useState(false)

  React.useEffect(() => {
    const date = new Date()
    const month = date.toLocaleString('ru', { month: 'long' })
    setMonth(month.slice(0, 1).toUpperCase() + month.slice(1))
  }, [])

  React.useEffect(() => {
    API.getExpenses()
      .then(res => setData(res.data.reverse()))
  }, [])

  return (
    <div className={c.workers}>
      <div className={c.table}>
        <table>
          <thead>
            <tr>
              <th>Наименование</th>
              <th>Количество</th>
              <th>Добавлено за сегодня</th>
              <th>
                Израсходовано за сегодня
                <button onClick={() => setActive(true)}>
                  + Добавить
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              data && data.map(item => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.amount}</td>
                  <td>{item.quantity} {item.unit === 'единица' ? 'единиц' : item.unit}</td>
                  <td>5 единиц</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {
        active ?
        <Components.AddExpense setActive={setActive} /> :
        null
      }
    </div>
  )
}

export default ExpensesTable
