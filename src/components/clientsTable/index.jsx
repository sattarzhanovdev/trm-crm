import React from 'react';
import c from './workers.module.scss';
import { periods } from '../../utils';
import { Icons } from '../../assets/icons';
import { API } from '../../api';
import { Components } from '..';

const ClientsTable = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const [clients, setClients] = React.useState(null);
  const [active, setActive] = React.useState(false);
  const [editActive, setEditActive] = React.useState(false);
  const [selectedWeek, setSelectedWeek] = React.useState(5); // 5 — Весь месяц
  const [selectedWorker, setSelectedWorker] = React.useState('Все'); // 5 — Весь месяц
  const [selectedMonthIndex, setSelectedMonthIndex] = React.useState(currentMonth);
  const [selectedYear, setSelectedYear] = React.useState(currentYear);
  const [workers, setWorkers] = React.useState(null);
  const [selectedStatus, setSelectedStatus] = React.useState('Все');

  const monthList = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const yearList = [2024, 2025];

  React.useEffect(() => {
    API.getClients()
      .then(res => {
        setClients(res.data);
      });

    API.getWorkers()
      .then(res => {
        setWorkers(res.data);
      })
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('ru-RU', { month: 'long' });
    return `${day} ${month}`;
  };

  const getWeekNumber = (dateStr) => {
    const day = new Date(dateStr).getDate();
    if (day >= 1 && day <= 7) return 1;
    if (day >= 8 && day <= 14) return 2;
    if (day >= 15 && day <= 21) return 3;
    if (day >= 22) return 4;
    return null;
  };

  const statusList = ['Ожидание', 'Обрабатывается', 'Обработан', 'Отмена', 'Принимает решение', 'Перезвон', 'Недозвон', 'Частичная оплата', 'Рассрочки', 'Фейк', 'Закрыто не реализовано'];

  const filteredClients = clients?.filter(client =>
    (selectedWorker === 'Все' || client.appointed_worker === Number(selectedWorker)) &&
    (selectedStatus === 'Все' || client.status === selectedStatus)
  );

  return (
    <div className={c.workers}>
      <div className={c.title}>
        <div className={c.left}>
          <button onClick={() => setActive(true)}>
            + Добавить
          </button>
          <div className={c.search}>
            <img src={Icons.search} alt="search" />
            <input type="text" placeholder="Найти клиентов" />
          </div>
        </div>
        <div className={c.right}>
          <div className={c.date}>
            {/* <span>{monthList[selectedMonthIndex]} {selectedYear}</span> */}
            <select
              value={selectedWorker}
              onChange={(e) => setSelectedWorker(e.target.value)}
            >
              <option value={"Все"} selected>Все</option>
              {workers && workers.map((item, idx) => (
                <option key={idx} value={item.id}>{item.name}</option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value={"Все"} selected>Все</option>
              {statusList && statusList.map((item, idx) => (
                <option key={idx} value={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={c.table}>
        <table>
          <thead>
            <tr>
              <th><img src={Icons.edit} alt="edit" /></th>
              <th>Ф.И.О клиента</th>
              <th>Телефон</th>
              <th>Менеджер</th>
              <th>Прайс по итогу</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredClients) && filteredClients.length > 0 ? (
              filteredClients.slice().reverse().map(item => (
                <tr key={item.id}>
                  <td data-label="Редактировать" onClick={() => {
                    localStorage.setItem('clientId', item.id);
                    setEditActive(true);
                  }}>
                    <img src={Icons.edit} alt="edit" />
                  </td>
                  <td data-label="Ф.И.О клиента" className={c.name}>{item.full_name}</td>
                  <td data-label="Телефон">{item.phone_number}</td>
                  <td data-label="Менеджер">
                    {workers && workers.find(worker => worker.id === item.appointed_worker)?.name || '—'}
                  </td>
                  <td data-label="Прайс по итогу">{item.payment}</td>
                  <td data-label="Статус">
                    <div className={
                      item.status === 'Ожидание' ? c.todo :
                      item.status === 'Обрабатывается' ? c.doing :
                      item.status === 'Обработан' ? c.done : c.cancel
                    }>
                      {
                        item.status === 'Ожидание' ? 
                        'В ожидании' :
                        item.status === 'Обрабатывается' ?
                        'В обработке' :
                        item.status === 'Обработан' ?
                        'Успешно' :
                        item.status === 'Отмена' ?
                        'База зин' :
                        item.status
                      }
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td data-label="Редактировать"><img src={Icons.edit} alt="edit" /></td>
                <td data-label="Ф.И.О клиента" colSpan={5}>Клиентов нет</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {active && <Components.AddClient setActive={setActive} />}
      {editActive && <Components.EditClient setActive={setEditActive} />}
    </div>
  );
};

export default ClientsTable;
