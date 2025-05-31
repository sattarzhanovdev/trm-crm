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
              workers && workers.map((item, i) => (
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{item.name}</td>
                  <td>{leads && leads.filter(lead => lead.appointed_worker === item.id).length}</td>
                  <td>{leads && leads.filter(lead => lead.appointed_worker === item.id && lead.status === 'Ожидание').length}</td>
                  <td>{leads && leads.filter(lead => lead.appointed_worker === item.id && lead.status === 'Обрабатывается').length}</td>
                  <td>{leads && leads.filter(lead => lead.appointed_worker === item.id && lead.status === 'Обработан').length}</td>
                  <td>{leads && leads.filter(lead => lead.appointed_worker === item.id && lead.status === 'Отмена').length}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WorkersBenefit
