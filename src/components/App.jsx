import React, { Component } from 'react';
import { nanoid } from 'nanoid'
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

    componentDidMount() {
    console.log('componentDidMount');
    let localContacts = [];
    if (localStorage.getItem('localContacts')) {
      localContacts = JSON.parse(localStorage.getItem('localContacts'));
    }
    if (localContacts.length !== 0) {
      this.setState({ contacts: localContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state) {
      localStorage.setItem('localContacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddContact = ({ name, number }) => {
    const { contacts } = this.state;
    
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert(`${name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
        }));
  };

  handleRemoveContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleChangeFilter = (e) => this.setState({ filter: e.currentTarget.value });;

  handleFilterContacts = () => {
    const { filter, contacts } = this.state;
    const filterToLowerCase = filter.toLowerCase()

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterToLowerCase)
    );
  };


  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.handleFilterContacts();

    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleAddContact} />
        <h2>Contacts</h2>
        <div>All contacts: {contacts.length}</div>
        <Filter value={filter} onChange={this.handleChangeFilter} />
        <ContactList
          contacts={visibleContacts}
          onRemoveContact={this.handleRemoveContact}
        />
      </>
    );
  }
}

export default App;