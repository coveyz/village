import Cookie from 'js-cookie'

//* user
const tokenKey = 'Vue3_TypeScript_Access'
export const getToken = () => Cookie.get(tokenKey)
export const setToken = (token: string) => Cookie.set(tokenKey, token)
export const removeToken = () => Cookie.remove(tokenKey)

//* sidebar
const sidebarKey = 'sidebarStatus'
export const getSidebarStatus = () => Cookie.get(sidebarKey)
export const setSidebarStatus = (status: string) => Cookie.set(sidebarKey, status)
export const removeSidebarStatus = () => Cookie.remove(sidebarKey)