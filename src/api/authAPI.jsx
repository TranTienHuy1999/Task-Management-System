// src/api/authAPI.jsx

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const TOKEN_KEY = 'tm_token';
const USER_KEY = 'tm_user';

/**
 * Đăng nhập user
 * @param {{username: string, password: string}} credentials
 * @returns {Promise<{user: object, token: string}>}
 */
export const login = async ({ username, password }) => {
  if (!username || username.trim().length < 3) {
    throw new Error('Username at least 3 characters');
  }
  if (!password || password.length < 6) {
    throw new Error('Password at least 6 characters');
  }

  try {
    // JSON Server filter theo username và password
    const res = await fetch(
      `${API_BASE_URL}/users?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    );

    if (!res.ok) {
      throw new Error(`Log in error (status ${res.status})`);
    }

    const users = await res.json();

    if (!Array.isArray(users) || users.length === 0) {
      throw new Error('Invalid username or password');
    }

    const user = users[0];
    // Tạo token giả
    const token = btoa(`${user.id}:${Date.now()}`);

    // Lưu vào localStorage
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return { user, token };
  } catch (err) {
    if (err.name === 'TypeError') {
      throw new Error('Cannot connect to server');
    }
    throw err;
  }
};

/** Đăng xuất: xóa token + user */
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/** Lấy user hiện tại (nếu đã login) */
export const getCurrentUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/** Lấy token */
export const getToken = () => localStorage.getItem(TOKEN_KEY);

/** Kiểm tra đã login chưa */
export const isAuthenticated = () => Boolean(getToken());
