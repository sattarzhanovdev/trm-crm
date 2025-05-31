import React from 'react'
import c from './add.module.scss'
import { Icons } from '../../assets/icons'
import { InputMask } from '@react-input/mask';
import { API } from '../../api';
import { Components } from '..';  

const AddClient = ({setActive}) => {
  const [workers, setWorkers] = React.useState(null);
  const [active, setActiveState] = React.useState(false);
  const [type, setType] = React.useState('');
  const [data, setData] = React.useState({
    full_name: '',
    phone_number: '',
    appointed_worker: '',
    payment: '',
    status: '',
  });

  React.useEffect(() => {
    API.getWorkers()
      .then(res => {
        setWorkers(res.data);
      });
  }, []);

  
  const handleAddClient = async () => {
    try{
      API.postClient(data)
        .then(res => {
          if (res.status === 201) {
            setActive(false);
            window.location.reload();
          }
        });
      
    }catch{
      
    }
  }
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
              value={data.full_name}
              onChange={(e) =>
                setData((prev) => ({ ...prev, full_name: e.target.value }))
              }
            />
          </div>
          <div>
            <span>Номер телефона</span>
            <input
              placeholder="Введите номер телефона"
              value={data.phone_number}
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
              value={data.payment}
              onChange={(e) =>
                setData((prev) => ({ ...prev, payment: e.target.value }))
              }
            />
          </div>
          <div>
            <span>Менеджер</span>
            <select
              value={data.appointed_worker}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  appointed_worker: e.target.value,
                }))
              }
            >
              <option value="">Выберите менеджера</option>
              {workers &&
                workers.map((worker) => (
                  <option key={worker.id} value={worker.name}>
                    {worker.name}
                  </option>
                ))}
            </select>
          </div>
        </form>
      </div>
  
      <div className={c.res}>
        <div className={c.left}>
          <h1>
            К оплате: {data.payment} сом
          </h1>

          <form>
            <div>
              <input
                type="radio"
                id="Ожидание"
                name="status"
                value="Ожидание"
                checked={data.status === "Ожидание"}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, status: e.target.value }))
                }
              />
              <label htmlFor="Ожидание">Ожидание</label>
            </div>
            <div>
              <input
                type="radio"
                id="Обрабатывается"
                name="status"
                value="Обрабатывается"
                checked={data.status === "Обрабатывается"}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, status: e.target.value }))
                }
              />
              <label htmlFor="Обрабатывается">Обрабатывается</label>
            </div>
            <div>
              <input
                type="radio"
                id="Обработан"
                name="status"
                value="Обработан"
                checked={data.status === "Обработан"}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, status: e.target.value }))
                }
              />
              <label htmlFor="Обработан">Обработан</label>
            </div>
            <div>
              <input
                type="radio"
                id="Отмена"
                name="status"
                value="Отмена"
                checked={data.status === "Отмена"}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, status: e.target.value }))
                }
              />
              <label htmlFor="Отмена">Отмена</label>
            </div>
          </form>
        </div>
        <div className={c.right}>
          <button onClick={() => setActive(false)}>Отменить</button>
          <button onClick={() => handleAddClient()}>
            <img src={Icons.addGreen} alt="add" />
            Добавить клиента
          </button>
        </div>
      </div>

      {active ? (
        <Components.AddTime type={type} setActive={setActiveState} />
      ) : null}
    </div>
  );
}

export default AddClient


