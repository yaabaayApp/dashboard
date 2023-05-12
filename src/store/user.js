import create from 'zustand'
import {devtools, persist} from "zustand/middleware";

let store = (set) => ({
  user : null,
  setUserData: (user) => set( state => ({ user }) ),
})

const userStore = create(
  persist(devtools(store), { name: 'user' })
);

export default userStore
