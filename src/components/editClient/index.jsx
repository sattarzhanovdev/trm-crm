import React from 'react'
import c from './add.module.scss'
import { Icons } from '../../assets/icons'
import { InputMask } from '@react-input/mask';
import { API } from '../../api';
import { Components } from '..';  

const EditClient = ({setActive}) => {
  const [count, setCount] = React.useState(1);
  const [workers, setWorkers] = React.useState(null);
  const [countSells, setCountSell] = React.useState(1);
  const [active, setActiveState] = React.useState(false);
  const [type, setType] = React.useState('');
  const [appointments, setAppointments] = React.useState(null);
  const [data, setData] = React.useState({
    full_name: '',
    phone_number: '',
    appointed_worker: '',
    payment: '',
    status: '',
  });

  const clientId = localStorage.getItem('clientId');

  React.useEffect(() => {
    API.getClientById(clientId)
      .then(res => {
        setData({
          full_name: res.data.full_name,
          phone_number: res.data.phone_number,
          appointed_worker: res.data.appointed_worker || '',
          payment: res.data.payment || '',
          status: res.data.status || ''
        });
      })

    API.getWorkers()
      .then(res => {
        setWorkers(res.data);
      });
  }, []);
  
  const handleAddClient = async () => {
    try{
      API.updateClient(clientId, data)
        .then(res => {
          if (res.status === 200) {
            setActive(false);
            window.location.reload();
          }
        });
    }catch{
      
    }
  }

  const handleDelete = async () => {
    try {
      const ask = window.confirm("Вы уверены, что хотите удалить этого клиента?");
      if (ask) {
        const response = await API.deleteClient(clientId);
        if (response.status === 200) {
          setActive(false);
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  }

  const statusList = ['Ожидание', 'Обрабатывается', 'Обработан', 'Отмена', 'Принимает решение', 'Перезвон', 'Недозвон', 'Частичная оплата', 'Рассрочки', 'Фейк', 'Закрыто не реализовано'];


  return (
    <div className={c.add}>
      <div className={c.client}>
        <h2>Изменение клиента</h2>
        <form>
          <div>
            <span>Имя клиента</span>
            <input
              type="text"
              placeholder="Введите имя клиента"
              value={data?.full_name}
              onChange={(e) =>
                setData((prev) => ({ ...prev, full_name: e.target.value }))
              }
            />
          </div>
          <div>
            <span>Номер телефона</span>
            <input
              placeholder="Введите номер телефона"
              value={data?.phone_number}
              onChange={(e) =>
                setData((prev) => ({ ...prev, phone_number: e.target.value }))
              }
            />
          </div>
          <div>
            <span>Оплата</span>
            <input
              type="text"
              placeholder="Введите сумму оплаты"
              value={data?.payment}
              onChange={(e) =>
                setData((prev) => ({ ...prev, payment: e.target.value }))
              }
            />
          </div>
          <div>
            <span>Менеджер</span>
            <select
              value={data?.appointed_worker}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  appointed_worker: e.target.value,
                }))
              }
            >
              <option value="">Выберите менеджера</option>
              {workers ?
                workers.map((worker) => (
                  <option key={worker.id} value={worker.id}>
                    {worker.name}
                  </option>
                )) : null}
            </select>
          </div>
        </form>
      </div>
  
      <div className={c.res}>
        <div className={c.left}>
          <h1>
            К оплате: {data.payment} сом
          </h1>

          <select onChange={(e) => setData((prev) => ({ ...prev, status: e.target.value }))} value={data.status}>
            {statusList.map((status, idx) => (
              <option key={idx} value={status}>
                {status}
              </option>
            ))}
          </select>

        </div>
        <div className={c.right}>
          <button onClick={() => setActive(false)}>Отменить</button>
          <button onClick={() => handleAddClient()}>
            <img src={Icons.addGreen} alt="add" />
            Изменить
          </button>
          <button onClick={() => handleDelete(false)}>Удалить</button>
        </div>
      </div>

      {active ? (
        <Components.AddTime type={type} setActive={setActiveState} />
      ) : null}
    </div>
  );
}

export default EditClient


