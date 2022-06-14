<template>
    <div class="todo-list">
        <div class="title">
            {{title}}
        </div>
     <slot></slot>
    </div>
</template>

<script>

export default {
    props: ['title'],
  data(){
    return {

    }
  },
}
</script>

<style lang="scss">
@import "@/assets/style.scss";
.todo-list{
    padding: 10px 20px;
    margin:0 10px;
    border-radius: 5px;
    border: 2px solid indigo;
    font-family:  sans-serif;
    background: linear-gradient(90deg, $teal-100, $teal-200);
}
.title{
padding:  10px 20px;
font-size: 20px;
font-weight: 600;
margin-bottom: 10px;
text-align: center;
border-bottom: 1px solid gray;
}
</style>