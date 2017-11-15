<template>
  <div id="app">
    <div class="input-container">
      <label>Name:</label>
      <input type="text" v-model="name">
    </div>
    <button class="btn-send" @click="sendData()">Agregar</button>
    <div>
      <div class="list-container">
        <h3>Lista</h3>
        <ul class="list">
          <li class="flex item-container" v-for="(el, idx) in listNames" :key="el['.key']">
            <img class="item-img" src="./assets/logo.png" alt="">
            <div class="item" v-if="!el.edit">
              <span class="name">{{el.name}}</span>
              <div class="flex">
                <span class="btns" @click="editItem(el['.key'])">
                  <svg style="fill:#5E82FF;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z" /></svg>
                </span>
                <span class="btns" @click="removeItem(el['.key'])">
                  <svg style="fill:rgb(148, 148, 148);" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
                </span>
              </div>
            </div>
            <div class="item" v-else>
              <input class="inputEdit" type="text" v-model="el.name">
              <div class="flex">
                <span class="btns" @click="saveEdit(el)">
                  <svg style="fill:#5E82FF;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></svg>
                </span>
                <span class="btns" @click="cancelEdit(el['.key'])">
                  <svg style="fill:rgb(148, 148, 148);" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.85 4.63,15.55 5.68,16.91L16.91,5.68C15.55,4.63 13.85,4 12,4M12,20A8,8 0 0,0 20,12C20,10.15 19.37,8.45 18.32,7.09L7.09,18.32C8.45,19.37 10.15,20 12,20Z" /></svg>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {namesRef} from './firebase'
export default {
  name: 'app',
  data () {
    return {
      name: 'Item Uno'
    }
  },
  firebase: {
    listNames: namesRef
  },
  methods: {
    sendData: function () {
      if(this.name.length !== 0) {
        namesRef.push({name: this.name, edit: false})
        this.name = ''
      } else {
        console.log('ingresa un nombre')
      }
    },
    removeItem: function (key) {
      console.log('Remove!')
      namesRef.child(key).remove()
    },
    editItem: function(key){
      namesRef.child(key).update({edit: true})
    },
    saveEdit: function (element){
      let key = element['.key']
      let newName = element.name
      let storeName = ''
      namesRef.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
          if(key == childSnapshot.key) {
            storeName = childSnapshot.val().name
          }
        })
      })
      if(newName === storeName){
        console.log('No hay cambios que guardar')
      } else {
        namesRef.child(key).set({name: newName, edit: false})
        console.log('Se actualizo con exito')
      }
    },
    cancelEdit: function (key) {
      namesRef.child(key).update({edit: false})
    }
  }
}
</script>

<style lang="scss">
.list-container{
  padding-top: 2rem;
}
.input-container{
  padding-bottom: 1rem;
  label{
    color: rgb(148, 148, 148); 
  }
  input{
    border: none;
    border-bottom: solid .05rem #5E82FF;
    font-size: 1.2rem;
    outline: none;
    color: rgb(148, 148, 148); 
  }
}
.btn-send{
  padding: 0.3rem .7rem;
  border: solid .2rem #5E82FF;
  border-radius: 0.3rem;
  outline: none;
  color: #5E82FF;
  font-weight: bold;
}
.item-img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
}
.flex{
  display: flex;
}
.inputEdit{
  border: none;
  border-bottom: solid .05rem #5E82FF;
  font-size: 1.2rem;
  outline: none;
  color: rgb(148, 148, 148);
}
.list{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.name{
  padding-right: 1rem;
  font-size: 1.3rem;
  color: rgb(148, 148, 148);
  font-weight: 500;
}
.item-container{
  background-color: white;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  margin-bottom: .7rem;
  padding: .5rem 2rem;
}
.item{
  display: flex;
  align-items: center;
  width: auto;
  min-width: 19rem;
  justify-content: space-between;
}
.btns{
  cursor: pointer;
  padding-left: 1rem;
  border: none;
  display: flex;
}
.container-camera{
  display: flex;
  justify-content: center;
}
.icon-camera{
  cursor: pointer;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .5rem;
  border-radius: 2rem;
  border: solid .2rem #3498db;
}
.file-container{
  background-color: orange;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
