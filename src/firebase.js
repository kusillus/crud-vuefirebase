import { initializeApp } from 'firebase'

const app = initializeApp ({
  apiKey: "AIzaSyAXGjqbpwYZxdChgM0i-NmgHN6ctzXKswo",
  authDomain: "camera-vue.firebaseapp.com",
  databaseURL: "https://camera-vue.firebaseio.com",
  projectId: "camera-vue",
  storageBucket: "camera-vue.appspot.com",
  messagingSenderId: "459712020406"
})
export const db = app.database()
export const namesRef = db.ref('names')