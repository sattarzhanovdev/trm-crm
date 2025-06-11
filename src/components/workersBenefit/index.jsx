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

  const statusList = ['Ожидание', 'Обрабатывается', 'Обработан', 'Отмена', 'Принимает решение', 'Перезвон', 'Недозвон', 'Частичная оплата', 'Рассрочки', 'Фейк', 'Закрыто не реализовано'];

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
              {
                statusList.map((status, index) => (
                  <th key={index}>{status}</th>
                ))
              }
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
                    <td data-label="В ожидании"> {filteredLeads.filter(l => l.status === 'Ожидание').length} </td>
                    <td data-label="В обработке"> {filteredLeads.filter(l => l.status === 'Обрабатывается').length} </td>
                    <td data-label="Успешно"> {filteredLeads.filter(l => l.status === 'Обработан').length} </td>
                    <td data-label="База зин"> {filteredLeads.filter(l => l.status === 'Отмена').length} </td>
                    <td data-label="Принимает решение"> {filteredLeads.filter(l => l.status === 'Принимает решение').length} </td>
                    <td data-label="Перезвон"> {filteredLeads.filter(l => l.status === 'Перезвон').length} </td>
                    <td data-label="Недозвон"> {filteredLeads.filter(l => l.status === 'Недозвон').length} </td>
                    <td data-label="Частичная оплата"> {filteredLeads.filter(l => l.status === 'Частичная оплата').length} </td>
                    <td data-label="Рассрочки"> {filteredLeads.filter(l => l.status === 'Рассрочки').length} </td>
                    <td data-label="Фейк"> {filteredLeads.filter(l => l.status === 'Фейк').length} </td>
                    <td data-label="Закрыто не реализовано"> {filteredLeads.filter(l => l.status === 'Закрыто не реализовано').length} </td>
                  </tr>
                );
              })
            }
            <tr>
              <td></td>
              <td></td>
              <td>Сумма: {leads?.length} лидов</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WorkersBenefit
