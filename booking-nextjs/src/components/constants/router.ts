export const pageRouters = {
    HOME: '/',
    LOGIN: 'auth/login',
    PROFILE: '/profile/information',
    CHANGE_PASSWORD: '/profile/change-password',
    DASHBOARD: '/system',
    MANAGER_USER: '/system/user',
    MANAGER_ACCOUNT: '/system/account',
    MANAGER_DOCTOR: '/system/doctor',
    EDIT_ACCOUNT: (id: number) => `/system/account/${id}`,
    MANAGER_SCHEDULE: '/system/schedule',
    MANAGER_CALENDAR: '/system/calendar',
    MANAGER_CLINIC: '/system/clinic',
    MANAGER_SPECIAL: '/system/special',
    MANAGER_HISTORY: '/system/calendar/patient',
    DOCTOR: '/doctor',
    DOCTOR_DETAIL: (id: string) => `/doctor/detail/${id}`,
    SPECIAL: '/special',
    SPECIAL_DETAIL: (id: number) => `/special/detail/${id}`,
};
export const apiRouters = {
    USER_PROFILE: (id: number) => `/get-user-detail?id=${id}`,
    USER_LOGIN: '/login',
    LIST_USERS: (page: number, size: number, type: string, key: string) =>
        `/get-all-users?page=${page}&size=${size}&type=${type}&q=${key}`,
    ALL_CODE: (type: string) => `/allcode?type=${type}`,

    CONFIRM_PASSWORD: '/confirm-password',
    CREATE_USER: '/create-new-user',
    CREATE_CLINIC: '/create-new-clinic',
    CREATE_SPECIAL: '/create-new-specialty',
    SEND_REMEDY: 'send-remedy',

    DELETE_USER: (id: number) => `/delete-user?id=${id}`,
    DELETE_CLINIC: (id: number) => `/delete-clinic?id=${id}`,
    DELETE_SPECIAL: (id: number) => `/delete-specialty?id=${id}`,
    DETAIL_USER: (id: number) => `/get-user-detail?id=${id}`,
    EDIT_USER: '/edit-user',
    EDIT_CLINIC: '/edit-clinic',
    EDIT_SPECIAL: '/edit-specialty',

    LIST_DOCTOR: '/get-all-doctors',
    LIST_PATIENT: (id: number, date: number, statusId: string) =>
        `/get-list-patient-for-doctor?doctorId=${id}&date=${date}&statusId=${statusId}`,
    LIST_HISTORY: (id: number, date: number) =>
        `/get-history-patient-for-doctor?doctorId=${id}&date=${date}`,

    LIST_SPECIAL: '/get-all-specialty-all',
    LIST_CLINIC: '/get-all-clinic-all',
    LIST_BLOG: '/get-all-blog',
    DETAIL_DOCTOR: (id: number | undefined) => `/get-detail-doctor-by-id?id=${id}`,
    SAVE_INFO: '/save-info-doctors',
    SAVE_SCHEDULE: '/bulk-create-schedule',
    DETAIL_SCHEDULE_DOCTOR: (doctorId: number, date: number) =>
        `/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`,
    BOOKING_REQUEST: '/patient-book-appointment',
    VERIFY_BOOKING: (token: string) => `/verify-book-appointment?token=${token}`,
    LIST_DOCTOR_FOR_SPECIAL: (id: number) => `/get-detail-specialty-by-id?id=${id}`,
};
