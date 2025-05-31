import React from 'react'
import c from './mainReport.module.scss'
import { Icons } from '../../assets/icons'
import { API } from '../../api'

const FinancesReport = () => {
  const [ expense, setExpense ] = React.useState(0)
  const [ expenseDatas, setExpenseDatas ] = React.useState(0)

  React.useEffect(() => {
    API.getDailyExpenses()
      .then(res => setExpense(res.data))

    API.getMonthlyData()
      .then(res => setExpenseDatas(res.data))
  }, [])

  return (
    <div className={c.reports}>
      <div className={c.card}>
        <div className={c.up}>
          <img src={Icons.date} alt="date" /> 
          <h3>Итого за сегодня</h3>
        </div>
        <div className={c.down}>
          <h1>{expense.added_today} наименований</h1>
        </div>
      </div>
      <div className={c.card}>
        <div className={c.up}>
          <img src={Icons.expenses} alt="expenses" />
          <h3>Расход за сегодня</h3>
        </div>
        <div className={c.down}>
          <h1>{expenseDatas?.daily_expense} сом</h1>
        </div>
      </div>
      <div className={c.card}>
        <div className={c.up}>
          <img src={Icons.document} alt="document" />
          <h3>Доход за месяц</h3>
        </div>
        <div className={c.down}>
          <h1>{expenseDatas?.monthly_profit} сом</h1>
        </div>
      </div>
    </div>
  )
}

export default FinancesReport
