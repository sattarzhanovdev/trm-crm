import React from 'react'
import c from './mainReport.module.scss'
import { Icons } from '../../assets/icons'
import { API } from '../../api'

const MainReport = () => {
  const [ data, setData ] = React.useState(null)


  return (
    <div className={c.reports}>
      <div className={c.card}>
        <div className={c.up}>
          <img src={Icons.date} alt="date" />
          <h3>Оборот за месяц/Прибыль</h3>
        </div>
        <div className={c.down}>
          <h1>{data && data.monthly_revenue} / {data && data.monthly_profit}</h1>
          <button>Посмотреть</button>
        </div>
      </div>
      <div className={c.card}>
        <div className={c.up}>
          <img src={Icons.expenses} alt="expenses" />
          <h3>Расходы за месяц</h3>
        </div>
        <div className={c.down}>
          <h1>{data && data.monthly_expense}</h1>
          <button>Посмотреть</button>
        </div>
      </div>
      <div className={c.card}>
        <div className={c.up}>
          <img src={Icons.document} alt="document" />
          <h3>Клиентов за месяц</h3>
        </div>
        <div className={c.down}>
          <h1>{data && data.monthly_clients}</h1>
          <button>Посмотреть</button>
        </div>
      </div>
    </div>
  )
}

export default MainReport
