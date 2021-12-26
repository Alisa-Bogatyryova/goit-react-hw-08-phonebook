import { useState } from 'react';
import shortid from 'shortid';
import Container from './components/Container/Container';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContactPhone = (name, number) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} уже есть в списке ваших контактов`);
      return;
    }

    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts(prevState => [...prevState, contact]);
  };

  const deleteContact = contactID => {
    setContacts(contacts.filter(({ id }) => id !== contactID));
  };

  const changeFilter = filter => {
    setFilter(filter);
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter),
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Container>
        <ContactForm addContactPhone={addContactPhone} />
          <h2>Contacts</h2>
        {contacts.length > 1 && (
          <Filter value={filter} onChange={changeFilter} />
        )}
        {contacts.length > 0 ? (
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={deleteContact}
          />
        ) : (
          <p>Your phonebook is empty. Please add contact.</p>
        )}
    </Container>
  );
};

export default App;