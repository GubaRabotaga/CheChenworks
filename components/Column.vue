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
                   <span v-show="!element.Uphere">
                     <strong >Description:</strong>{{ element.description }}
                  </span>
                     <div v-show="element.Uphere">
                     <h5><strong>Director:</strong>{{ element.Uphere  }} </h5>
                     <h5><strong>Executor:</strong>User</h5>
                     <h5><strong>Standard:</strong>{{ diffTask(element)}}<span>h</span></h5>
                     <span v-show="!element.Uphere2">
                     <h5><strong>Used up:</strong>{{ element.usedHours }}h {{ element.usedMinutes }}m</h5>
                     </span>
                     <span v-show="element.Uphere2">
                     <h5><strong>Used left:</strong>{{Math.trunc(((diffTask(element)*60) - (element.usedHours*60+element.usedMinutes))/60) }}h {{(((diffTask(element)*60) - (element.usedHours*60+element.usedMinutes))) - (Math.trunc(((diffTask(element)*60) - (element.usedHours*60+element.usedMinutes))/60))*60 }}m</h5>
                     </span>
                     <strong v-on:click="element.Uphere2 = !element.Uphere2" class="informationTime" :style=" {
                        backgroundColor:
                        $store.state.difficultyColors[element.difficulty],
                    }"  >ℹ</strong>

                     <h5><strong >Progress:</strong>{{ element.donePercents }}%  <strong class="change1" :style=" {
                        backgroundColor:
                        $store.state.difficultyColors[element.difficulty],
                    }" @mousedown="addPros(element)">+</strong>

                     <strong class="change2" :style=" {
                        backgroundColor:
                        $store.state.difficultyColors[element.difficulty],
                    }" @mousedown="delPros(element)" >-</strong>
                    </h5>



                    <div class="progress" >
  <div class="progress-bar" role="progressbar" v-bind:style="{width: element.donePercents + '%'}"  aria-valuemin="0" aria-valuemax="100"></div>
</div>

             
      
</div>
                     
                     
                     
                    <strong v-on:click="element.Uphere = !element.Uphere" v-on:click.prevent="SetTime(element)" >
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

<script  type="text/javascript">
import OpenLinkIcon from "./icons/OpenLinkIcon.vue";
export default {
  

name:'redact',
data(){
  return  {
  upHere:false,
  upHere2:false,
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
  diffTask(task){
let date1 = new Date(task.deadline)
let date2 = new Date(task.startTime)
let diff = date1.getTime() - date2.getTime();
return parseInt((diff / (1000 * 60 * 60))%24);
  },



SetTime(task){
let interval = setInterval(() => {

    task.usedMinutes++
 
    if (task.usedMinutes == 60){
      task.usedMinutes = 0;
      task.useHours = task.useHours+1;
    
  }             
}, 60000)
},


   addPros(task){
 task.donePercents +=1;
    if (task.donePercents > 99){
      task.donePercents = 100;
    }           
    return task.donePercents;
   },
    delPros(task){
    task.donePercents -=1;
      if (task.donePercents < 1){
      task.donePercents = 0;
    }
    return task.donePercents;
   },

  },
  emits: ["release-task"],
  components: { OpenLinkIcon },
}



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
.informationTime{
  border-radius: 5px;
 width: 20px;
 height: 20px;
 font-size: medium;
position: absolute;
margin-top: -30px;
margin-left: auto;
margin-right: auto;
text-align: center;
right: 28px;


}
.informationTime:hover{
  color: white;
}

.change1{
  border-radius: 5px;
 width: 21px;
 height: 21px;
 font-size: medium;
position: absolute;
margin-top: 8px;
margin-left: auto;
margin-right: end;
text-align: center;
right: 28px;
}
.change1:hover{
  color: white;
}
.change2{
  border-radius: 5px;
 width: 21px;
 height: 21px;
 font-size: medium;
position: absolute;
margin-top: 8px;
margin-left: auto;
margin-right: end;
text-align: center;
right: 52px;
}
.change2:hover{
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
</style>
