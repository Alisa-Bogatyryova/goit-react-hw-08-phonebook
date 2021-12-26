import api from 'axios';

api.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  remove() {
    api.defaults.headers.common.Authorization = '';
  },
};

export async function registerUser(credentials) {
  const { data } = await api.post('/users/signup', credentials);
  token.set(data.token);
  return data;
}

export async function loginUser(credentials) {
  const { data } = await api.post('/users/login', credentials);
  token.set(data.token);
  return data;
}

export async function logOutUser() {
  await api.post('/users/logout');
  token.remove();
}

export async function CheckCurrentUser(currentToken) {
  token.set(currentToken);
  const { data } = await api.get('/users/current');
  return data;
}

export async function fetchContacts() {
  const { data } = await api.get(`/contacts`);
  return data;
}

export async function addContact(contact) {
  const { data } = await api.post('/contacts', contact);
  return data;
}

export async function deleteContact(contactId) {
  const { data } = await api.delete(`/contacts/${contactId}`);
  return data;
}

export async function updateContact({ id, name, number }) {
  const { data } = await api.patch(`/contacts/${id}`, { name, number });
  return data;
}