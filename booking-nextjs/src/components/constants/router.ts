export const pageRouters = {
    LOGIN : "auth/login"
}
export const apiRouters = {
    USER_LOGIN: '/login',
    LIST_USERS: (page: number, size: number, type: string, key: string) =>
        `/get-all-users?page=${page}&size=${size}&type=${type}&q=${key}`,
};