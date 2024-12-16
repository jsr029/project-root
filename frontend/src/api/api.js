import axios from 'axios';

<<<<<<< HEAD
const API = axios.create({ baseURL: 'https://project-root-backend.vercel.app/api' })
=======
const API = axios.create({ 
  baseURL: 'https://project-root-backend.vercel.app/api'
});

>>>>>>> bae2ac7c0f99fc6379620cb6db865f4993009a58
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

// Authentication
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);

// Projects
export const getProjects = () => API.get('/projects');
export const createProject = (newProject) => API.post('/projects', newProject);
export const updateProject = (id, updatedProject) => API.patch(`/projects/${id}`, updatedProject);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

// Users
export const getUsers = () => API.get('/users');
export const createUser = (newUser) => API.post('/users', newUser);
export const updateUser = (id, updatedUser) => API.patch(`/users/${id}`, updatedUser);
export const deleteUser = (id) => API.delete(`/users/${id}`);

export const getProjectById = (id) => API.get(`/projects/${id}`);
