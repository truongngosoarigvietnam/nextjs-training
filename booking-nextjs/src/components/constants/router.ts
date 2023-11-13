export const pageRouters = {
    LOGIN: 'auth/login',
    DASHBOARD: '/system',
    MANAGER_USER: '/system/user',
    MANAGER_ACCOUNT: '/system/account',
    MANAGER_DOCTOR: '/system/doctor',
    EDIT_ACCOUNT: (id: number) => `/system/account/${id}`,
};
export const apiRouters = {
    USER_LOGIN: '/login',
    LIST_USERS: (page: number, size: number, type: string, key: string) =>
        `/get-all-users?page=${page}&size=${size}&type=${type}&q=${key}`,
    ALL_CODE: (type: string) => `/allcode?type=${type}`,
    CREATE_USER: '/create-new-user',
    DELETE_USER: (id: number) => `/delete-user?id=${id}`,
    DETAIL_USER: (id: number) => `/get-user-detail?id=${id}`,
    EDIT_USER: '/edit-user',
    LIST_DOCTOR: '/get-all-doctors',
    LIST_SPECIAL: '/get-all-specialty-all',
    LIST_CLINIC: '/get-all-clinic-all',
};