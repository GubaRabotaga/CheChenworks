<template>
  <div>  
    <div v-for="category in categories"
         :key="category.id"
         @drop="onDrop($event, category.id)"
         class="droppable"
         @dragover.prevent
         @dragenter.prevent>
      <h4>{{ category.title }}</h4>
      <div v-for="item in items.filter(x => x.categoryId === category.id)"
           @dragstart="onDragStart($event, item)"
           class="draggable"
           draggable="true">
           <div class = "description" contenteditable="true" >{{ item.difficult }}</div>
        <h5 contenteditable="true"><strong>Name: </strong >{{ item.title }}</h5>
        <h5 contenteditable="true"><strong>Description: </strong>{{ item.body }}</h5>
        
      </div>
    </div>
      
         <form @submit.prevent>
          <button class ="btn" @click="CreateTask"><h1>+</h1></button >
 </form>
      
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  name: 'App',
  setup() {

     
     const items = ref([
      {
        id: 0,
        title: 'None',
        body: 'None',
        categoryId: 1,
        difficult: 1,
        
      }

      
    ])
    
    
    const categories = ref([
      {
        id: 0,
        title: 'writing'
      },
      {
        id: 1,
        title: 'in progress'
      },
      {
        id: 2,
        title: 'stoped'
      },
      {
        id: 3,
        title: 'closed'
      }
    ])
    function onDragStart(e: DragEvent, item) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('itemId', item.id.toString())
    }
    function onDrop(e: DragEvent, categoryId) {
      const itemId = parseInt(e.dataTransfer.getData('itemId'))
      items.value = items.value.map(x => {
        if (x.id == itemId)
          x.categoryId = categoryId
        return x
      })
    }
    return {
      items,
      categories,
      onDragStart,
      onDrop
    }
  
}

  }






function setup() {
throw new Error('Function not implemented.')
}

function CreateTask() {
throw new Error('Function not implemented.')
}
</script>

<style scoped>
.droppable {
    
    display: inline-block;
    padding: 15px;
    border-radius: 25px;
    background: #2c3e50;
    margin-left: 100px;
    margin-top: 25px;
    width:  340px;
  
}
.droppable h4 {
    
    display: inline-block;
    color: white;
    border-radius: 25px;
}
.draggable {
  
    flex-direction: row;
    background: white;
    padding: 5px;
    border-radius: 25px;
    margin-bottom: 5px;

}
.draggable h5 {
    position: relative;
    bottom: 20px;
     display: flexbox;
    flex-direction: row;
    margin: 0;
    border-radius: 25px;
}
.btn {
     
    text-size-adjust: 50;
    padding: 1px;
    border-radius: 50px;
      background: #000000;
    color: white;
    margin-left: 1700px;
    margin-top: 600px;
    width: 100px;
    height: 100px;
    
}
.description{
    
    text-align: center;
    border-radius: 50px;
    background: #000000;
    color:white;
    margin-left:260px;
    width: 25px;
    height: 25px;
}
</style>