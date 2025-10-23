// Small API helper used across the frontend
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function apiPost(path, data, token = null) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = json?.message || res.statusText || 'Request failed';
    const err = new Error(message);
    err.response = json;
    throw err;
  }
  return json;
}

export async function apiGet(path, token = null) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = json?.message || res.statusText || 'Request failed';
    const err = new Error(message);
    err.response = json;
    throw err;
  }
  return json;
}
