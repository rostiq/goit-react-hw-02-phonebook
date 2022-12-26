import PropTypes from 'prop-types';

const ContactList = ({ contacts, onRemoveContact }) => (
  <ul>
    {contacts.map(({ id, name, number }) => (
      <li 
      key={id} 
      >
        <p>
          {name},{number}
        </p>
        <button
          type="submit"
          onClick={() => onRemoveContact(id)}
        >
          del
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onRemoveContact: PropTypes.func.isRequired,
};

export default ContactList;