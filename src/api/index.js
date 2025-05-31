import axios from "axios";

export const API = {
  getClients: () => axios.get('/clients/clients/'),
  postClient: (data) => axios.post('/clients/clients/', data),
  updateClient: (id, data) => axios.put(`/clients/clients/${id}/`, data),
  deleteClient: (id) => axios.delete(`/clients/clients/${id}/`),
  getClientById: (id) => axios.get(`/clients/clients/${id}/`),
  getExpenses: () => axios.get('/clients/expenses/'),
  postExpenses: (data) => axios.post('/clients/expenses/', data),
  postStock: (data) => axios.post('/clients/stock/', data),
  getDailyExpenses: () => axios.get('/clients/expenses/stats/daily/'),
  getWorkers: () => axios.get('/clients/workers/'),
  getDailyClients: () => axios.get('/clients/today/'),
  getStocks: () => axios.get('/clients/stock/'),
  getMonthlyData: () => axios.get('/clients/stats/monthly/'),
  getStaffInfo: () => axios.get('/clients/stats/staff/'),
  getStaffInfoWeek: (week) => axios.get(`/clients/stats/staff/?week=${week}`),
  getCashInfo: () => axios.get('/clients/stats/cash-daily/')
}
