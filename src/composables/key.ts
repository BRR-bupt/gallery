import type { InjectionKey, Ref } from 'vue'

// eslint-disable-next-line symbol-description
const key = Symbol() as InjectionKey<Ref<string>>

// const key = Symbol() as InjectionKey<string>

export default key
