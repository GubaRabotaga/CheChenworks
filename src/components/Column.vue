<template>
  <div class="col">
    <span class="container horizontal-scrollable p-0">
      <div class="row">
        <div class="col mb-3" v-for="employer in employers" :key="employer.id">
          <div class="card card-employer">
            <div class="card-header">
              <h3 class="d-flex align-items-center">
                {{ employer.name }}
           
              </h3>
           
            </div>
            <div class="card-body">
              <base-draggable
                class="list-group"
                :list="employer.takenTasks"
                animation="150"
                group="tasks"
                itemKey="id"
                @choose="onTaskChoose"
                filter=".btn-close"
              >
                <template #item="{ element, index }">
                  <div>
                    <button
                      class="btn btn-close"
                      @click="releaseTask(employer, index)"
                    >
                    </button>
                      <div class="card-header" :style="{
                        backgroundColor:
                        $store.state.difficultyColors[element.difficulty],
                       
                       
                    }"><h5><strong>Name:</strong>{{ element.title }} </h5>
                     </div>
                    <h5 class="task-title" :style="{
                        borderColor:
                        $store.state.difficultyColors[element.difficulty],
                       
                       
                    }">
                   <span v-show="!upHere">
                     <strong >Description:</strong>{{ element.description }}
                  </span>
                    
                     <div v-show="upHere">
                     <h5><strong>Director:</strong>{{ element.creator  }} </h5>
                     <h5><strong>Executor:</strong>User</h5>
                     <h5><strong>Standard:</strong>{{ element.standard  }} </h5>
                     <h5><strong>Used up:</strong>{{ element.standard  }} </h5>
                     <h5 contenteditable="true"><strong >Progress:</strong>{{ element.progress  }} </h5>
                     </div>
                     
                     
                    <strong v-on:click="upHere = !upHere"  >
     <strong class="information" :style=" {
                        backgroundColor:
                        $store.state.difficultyColors[element.difficulty],
                       
                       
                    }">ℹ</strong>
                
                    </strong>
                    </h5>
                  </div>
                </template>
              </base-draggable>
            </div> 
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
import OpenLinkIcon from "./icons/OpenLinkIcon.vue";
export default {
  

name:'redact',
data(){
  return  {
  upHere:false
  }                                                              
},


  props: {
    employers: { type: Array, required: true },
  },
  setup(_, context) {
    let releaseTask = (employer, taskIndex) => {
      let deletedTask = employer.takenTasks.splice(taskIndex, 1).at(0);
      context.emit("release-task", deletedTask);
    };
    return {
      releaseTask,
    };
  },
  methods: {
    getTotalDifficulty(takenTasks) {
      return takenTasks.reduce((total, task) => total + task.difficulty, 0);
    },
  
  },
  emits: ["release-task"],
  components: { OpenLinkIcon },
};
let hours = 0;
let minutes = 0;
let interval = setInterval(() => {

    minutes++
    console.log(minutes)
    console.log(hours)
    if (minutes == 60){
      minutes = 1;
      hours = hours+1;
    
  }             
}, 60000)

</script>

<style lang="scss" scoped>
@import "@/assets/style.scss";

.horizontal-scrollable > .row {
  overflow-x: auto;
  flex-wrap: nowrap;
}

.list-group-item {
  background-color: $teal-100;
  cursor: move;
}
.btn{
position: absolute;
margin-top: 12px;
margin-left: auto;
margin-right: end;
right: 25px;


}
.information{
  width: 25px;
  height: 25px;
position: absolute;
margin-top: 11px;
margin-left: auto;
margin-right: end;
text-align: center;
right: 16px;


}
.information:hover{
  color: white;
}

.card-employer {
  
  border-color: $indigo;
  border-width: 2px;
  margin-bottom: 2em;
  min-width: 15em;
  height: 100%;
}
.card-header{
  text-align: start;
  padding-top: 15px;
}
.badge {
  
  margin-left: auto;
  margin-right: 7px;
  margin-bottom: 5px;
  background-color: $info;
  float: right;
}

.task-title {

  border-width: 2px; 
  border-style:double;
  margin-bottom: 10px;
  text-align: left;
  padding: 10px;

}
.box {
  clip-path: circle(75%);
  transition: clip-path 1s;
}

.box:hover {
  clip-path: circle(25%);
}
</style>
