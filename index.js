const contacts = require("./contacts");
const { program } = require("commander");

program
  .option("-a, --action, <type>")
  .option("-i, --id, <type>")
  .option("-n, --name, <type>")
  .option("-e, --email, <type>")
  .option("-p, --phone, <type>");

program.parse();

const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allList = await contacts.listContacts();
      return console.table(allList);
    case "get":
      const contactById = await contacts.getContactById(id);
      return console.table(contactById);
    case "add":
      const addContact = await contacts.addContact({ name, email, phone });
      return console.table(addContact);
    case "remove":
      const removeContact = await contacts.removeContact(id);
      return console.table(removeContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(options);
