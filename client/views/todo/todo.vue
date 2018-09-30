<template>
  <section class="real-app">

      <Input 
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么？"
      v-model="value"
      @keyup.enter="addTodo"
      ></Input>
      <item 
       v-for="todo in filterTodos"
       :key="todo.id"
       :todo="todo"
        @del="deleteTodo"
      />
      <tabs 
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted='clearAllCompleted'
      />
  </section>
</template>
<script>
import Item from './item.vue';
import Tabs from './tabs.vue';

let id = 0;
export default {
  data(){
    return {
      todos:[],
      filter:'all'
    }
  },
  components:{
    Item,
    Tabs
  },
  computed:{
    filterTodos(){
      if(this.filter == 'all'){
        return this.todos;
      }
      let completed = this.filter ==='completed';
      return this.todos.filter(todo=> completed == todo.completed);
    }
  },
  methods:{
    addTodo(e){
      this.todos.unshift({
        id:id++,
        content:e.target.value,
        completed:false
      });
      e.target.value='';
    },
    deleteTodo(id){
      this.todos.splice( this.todos.findIndex((todo)=>{ todo.id===id}),1);
    },
    toggleFilter(state){
      this.filter = state;
    },
    clearAllCompleted(){
      this.todos = this.todos.filter( todo => !todo.completed);
    }
  }
}
</script>
<style lang="stylus" scoped>
    .real-app {
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    }

    .add-input {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 36px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    }
</style>


