import axios from "axios";
const baseUrl = 'http://localhost:3001/persons';

const getContacts = () => {
    let request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const createContact = (newContact) => {
    let request = axios.post(baseUrl, newContact);
    return request.then(response => response.data);
}

const updateContact = (id, newContact) => {
    let request = axios.put(`${baseUrl}/${id}`, newContact);
    return request.then(response => response.data);
}

const deleteContact = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

export default { getContacts, createContact, deleteContact, updateContact };