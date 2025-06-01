import React from 'react'
import c from './workers.module.scss'
import { periods } from '../../utils'
import { API } from '../../api'

const WorkersBenefit = () => {
  const [ leads, setLeads ] = React.useState(null)
  const [ workers, setWorkers ] = React.useState(null)

  React.useEffect(() => {
    API.getWorkers()
      .then(res => setWorkers(res.data))

    API.getClients()
      .then(res => {
        setLeads(res.data)
      })
  }, [])

  return (
    <div className={c.workers}>
      <div className={c.title}>
        <h1>
          Количество обработок сотрудников 
        </h1>
      </div>
      <div className={c.table}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Данные сотрудников</th>
              <th>Количество лидов</th>
              <th>Ожидание</th>
              <th>Обрабатывается</th>
              <th>Обработан</th>
              <th>Отмена</th>
            </tr>
          </thead>
          <tbody>
            {
              workers && workers.map((item, i) => {
                const filteredLeads = leads?.filter(lead => lead.appointed_worker === item.id) || [];
                return (
                  <tr key={i}>
                    <td data-label="#"> {i + 1} </td>
                    <td data-label="Данные сотрудников"> {item.name} </td>
                    <td data-label="Количество лидов"> {filteredLeads.length} </td>
                    <td data-label="Ожидание"> {filteredLeads.filter(l => l.status === 'Ожидание').length} </td>
                    <td data-label="Обрабатывается"> {filteredLeads.filter(l => l.status === 'Обрабатывается').length} </td>
                    <td data-label="Обработан"> {filteredLeads.filter(l => l.status === 'Обработан').length} </td>
                    <td data-label="Отмена"> {filteredLeads.filter(l => l.status === 'Отмена').length} </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WorkersBenefit
