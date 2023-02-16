const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  const results = JSON.parse(contacts);
  return results;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const getContact = contacts.find((contact) => contact.id === id);
  return getContact || null;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
