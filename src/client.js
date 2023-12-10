import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";
export const USERS_API = `${BASE_API}/api/users`;
export const BOOKS_API = `${BASE_API}/api/books`;
export const COMPANIES_API = `${BASE_API}/api/companies`;
export const OPEN_LIBRARY_API = 'https://openlibrary.org/search.json'

const request = axios.create({
  withCredentials: true,
});

export const signin = async (credentials) => {
  const response = await request.post( `${USERS_API}/signin`, credentials );
  return response.data;
};

export const account = async () => {
    const response = await request.post(`${USERS_API}/account`);
    return response.data;
};

export const updateUser = async (user) => {
  const response = await request.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const findAllUsers = async () => {
  const response = await request.get(`${USERS_API}`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await request.post(`${USERS_API}`, user);
  return response.data;
};

export const findUserById = async (id) => {
  const response = await request.get(`${USERS_API}/${id}`);
  return response.data;
};

export const deleteUser = async (user) => {
  const response = await request.delete(
    `${USERS_API}/${user._id}`);
  return response.data;
};

export const signup = async (credentials) => {
  const response = await request.post(
    `${USERS_API}/signup`, credentials);
  return response.data;
};

export const signout = async () => {
  const response = await request.post(`${USERS_API}/signout`);
  return response.data;
};

export const findBookByKey = async (key) => {
  const response = await request.get(`${BOOKS_API}/${key}`);
  return response.data;
};

export const findAllBooks = async () => {
  const response = await request.get(`${BOOKS_API}`);
  return response.data;
};

export const createBook = async (book) => {
  const response = await request.post(`${BOOKS_API}`, book);
  return response.data;
};

export const deleteBook = async (book) => {
  const response = await request.delete(
    `${BOOKS_API}/${book._id}`);
  return response.data;
};

export const updateBook = async (book) => {
  const response = await request.put(`${BOOKS_API}/${book._id}`, book);
  return response.data;
};

export const queryOpenLibrary = async (query) => {
  const response = await axios.get(`${OPEN_LIBRARY_API}?${query}`);
  return response;
}

export const addCompany = async (company) => {
  const response = await request.post(`${COMPANIES_API}`, company);
  return response.data;
}

export const updateCompany = async (company) => {
  const response = await request.put(`${COMPANIES_API}/${company._id}`, company);
  return response.data;
}

export const deleteCompany = async (company) => {
  const response = await request.delete(
    `${COMPANIES_API}/${company._id}`);
  return response.data;
}

export const findAllCompanies = async () => {
  const response = await request.get(`${COMPANIES_API}`);
  return response.data;
}

export const findCompanyById = async (id) => {
  const response = await request.get(`${COMPANIES_API}/${id}`);
  return response.data;
}