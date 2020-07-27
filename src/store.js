import { writable } from 'svelte/store'

export const claves = writable([])
export const routes = writable([])
export const filteredRoutes = writable([])
export const activeListItem = writable(0)
export const activeMapItem = writable(0)
