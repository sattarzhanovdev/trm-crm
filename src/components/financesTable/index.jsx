import React from 'react'
import c from './workers.module.scss'
import { periods } from '../../utils'

const FinancesTable = () => {
  const [ month, setMonth ] = React.useState()
  const [ period, setPeriod ] = React.useState(1)

  React.useEffect(() => {
    const date = new Date()
    const month = date.toLocaleString('ru', { month: 'long' })
    setMonth(month.slice(0, 1).toUpperCase() + month.slice(1))
  }, [])

  return (
    <div className={c.workers}>
      <div className={c.table}>
        <table>
          <thead>
            <tr>
              <th>Время</th>
              <th>Наименование</th>
              <th>Количество</th>
              <th>
                Прайс по итогу
                <button>
                  + Добавить
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className={c.date}>
                  Март 14
                </div>
              </td>
              <td>Филлер</td>
              <td>4</td>
              <td>72 000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FinancesTable
