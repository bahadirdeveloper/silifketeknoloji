export const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME?.trim() || 'bahadir33';
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD?.trim() || '7415095Ba';

export const ADMIN_STORAGE_KEY = 'silifke-tech-admin-auth';
export const ADMIN_DEFAULT_CREDENTIALS_IN_USE = !import.meta.env.VITE_ADMIN_USERNAME || !import.meta.env.VITE_ADMIN_PASSWORD;

export const getAdminAuthorizationToken = () => `authorized:${ADMIN_USERNAME}`;
