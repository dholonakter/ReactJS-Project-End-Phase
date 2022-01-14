import axios from 'axios';

const usersUrl = 'http://localhost:3002/products';


export const getProducts = async (id) => {
    id = id || '';
    return await axios.get(`${usersUrl}/${id}`);
}

export const addProduct = async (product) => {
    return await axios.post(`${usersUrl}/add`, product);
}

export const deleteProduct = async (id) => {
    return await axios.delete(`${usersUrl}/${id}`);
}

export const editProdcut = async (id, product) => {
    return await axios.put(`${usersUrl}/${id}`, product)
}

// export const GetProductById = async (id) => {
//     return await axios.get
// }