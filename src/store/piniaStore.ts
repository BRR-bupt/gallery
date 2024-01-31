import { defineStore } from 'pinia'
export interface ImageInfo {
  name: string
  filePath: string
  height: number
  width: number
  url: string
  fixUrl: string
}
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const routeStore = defineStore('page-store', {
  // other options...
  state: () => ({
    isNewPage: 0,
  }),
})

export const dataStore = defineStore('data-store', {
  // other options...
  state: () => ({
    data: ref<[string, ImageInfo[]][]>([]),
  }),
})
