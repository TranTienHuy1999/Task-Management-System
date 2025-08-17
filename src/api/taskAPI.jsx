// src/api/taskAPI.jsx

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const jsonHeaders = { 'Content-Type': 'application/json' };

/** Hàm xử lý response chung */
const handleResponse = async (res) => {
  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    if (res.status === 404) message = 'Không tìm thấy dữ liệu';
    if (res.status === 500) message = 'Lỗi server, thử lại sau';
    throw new Error(message);
  }
  return res.json();
};

/**
 * Lấy danh sách tasks
 * @param {object} params - filter, search, sort
 * @example fetchTasks({ q: 'react', status: 'todo', _sort: 'dueDate', _order: 'asc' })
 */
export const fetchTasks = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/tasks${query ? `?${query}` : ''}`;
    const res = await fetch(url);
    return await handleResponse(res);
  } catch (err) {
    if (err.name === 'TypeError') throw new Error('Không thể kết nối đến server');
    throw err;
  }
};

/**
 * Tạo task mới
 * @param {object} task - dữ liệu task {title, description, status, priority, dueDate}
 */
export const createTask = async (task) => {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify(task),
    });
    return await handleResponse(res);
  } catch (err) {
    if (err.name === 'TypeError') throw new Error('Không thể kết nối đến server');
    throw err;
  }
};

/**
 * Cập nhật task
 * @param {number} id - id của task
 * @param {object} patch - dữ liệu cần update
 */
export const updateTask = async (id, patch) => {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: jsonHeaders,
      body: JSON.stringify(patch),
    });
    return await handleResponse(res);
  } catch (err) {
    if (err.name === 'TypeError') throw new Error('Không thể kết nối đến server');
    throw err;
  }
};

/**
 * Xóa task
 * @param {number} id - id của task
 */
export const deleteTask = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/tasks/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Không thể xóa task (HTTP ${res.status})`);
    return true;
  } catch (err) {
    if (err.name === 'TypeError') throw new Error('Không thể kết nối đến server');
    throw err;
  }
};
