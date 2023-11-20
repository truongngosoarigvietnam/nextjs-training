export const pageRouters = {
    HOME: '/',
    LOGIN: 'auth/login',
    DASHBOARD: '/system',
    MANAGER_USER: '/system/user',
    MANAGER_ACCOUNT: '/system/account',
    MANAGER_DOCTOR: '/system/doctor',
    EDIT_ACCOUNT: (id: number) => `/system/account/${id}`,
    MANAGER_SCHEDULE: '/system/schedule',
    DOCTOR: '/doctor',
    DOCTOR_DETAIL: (id: string) => `/doctor/detail/${id}`,
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
    LIST_BLOG : '/get-all-blog' ,
    DETAIL_DOCTOR: (id: number) => `/get-detail-doctor-by-id?id=${id}`,
    SAVE_INFO: '/save-info-doctors',
    SAVE_SCHEDULE: '/bulk-create-schedule',
    DETAIL_SCHEDULE_DOCTOR: (doctorId: number, date: number) =>
        `/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`,
};
