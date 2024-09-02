<script setup>
import { ref, onMounted, computed, watch } from "vue";

const todos = ref([]);
const name = ref("");
const input_content = ref("");
const input_category = ref(null);

// Save an ascending list of todos
const todos_asc = computed(()=> todos.value.sort((a,b)=>{
  return b.createdAt - a.createdAt
}))


watch(name, (newVal) => {
  localStorage.setItem("name", newVal);
});

onMounted(() => {
  name.value = localStorage.getItem("name") || "";
  todos.value = JSON.parse(localStorage.getItem('todos')) || [];
});

const addTodo = () => {
  if (input_content.value.trim() === '' || input_category.value === null) {
    console.log("No content or category accepted");
    return;
  }
  todos.value.push({
    content: input_content.value,
    category: input_category.value,
    done: false,
    createdAt: new Date().getTime() // Ensure this is a number
  });
  input_content.value = ""; // Clear input after adding
  input_category.value = null; // Reset category
};

const clearTodos = () => {
  todos.value = [];
};

const removeTodo = todo =>{
  // NOTE: this only filters the todos that do no match the one that was deleted.
  //      only the ones that are not deleted are added back to the todos list
  todos.value = todos.value.filter(
    t => t !== todo
  )
}

watch(todos, (newVal) => {
  localStorage.setItem("todos", JSON.stringify(newVal))
}, { deep: true });
</script>

<template>
  <main class="app">
    <section class="greeting">
      <h2 class="title">
        What's up, <input type="text" placeholder="Name here" v-model="name" />
      </h2>
    </section>
  </main>

  <section class="create-todo">
    <h3>CREATE A TODO</h3>
    <form @submit.prevent="addTodo">
      <h4>What's on your to do list?</h4>
      <input
        type="text"
        placeholder="e.g. make a video"
        v-model="input_content"
      />
      <h4>Pick a category</h4>
      <div class="options">
        <label>
          <input
            type="radio"
            name="category"
            value="business"
            v-model="input_category"
          />
          <span class="bubble business"></span>
          <div>Business</div>
        </label>

        <label>
          <input
            type="radio"
            name="category"
            value="personal"
            v-model="input_category"
          />
          <span class="bubble personal"></span>
          <div>Personal</div>
        </label>
      </div>

      <input type="submit" value="Clear Todos" @click="clearTodos" />
      <br />
      <input type="submit" value="Add Todo" />
    </form>

    <!-- Display todos sorted in ascending order -->
    <!-- <ul>
      <li v-for="todo in todos_asc" :key="todo.createdAt">
        {{ todo.content }} ({{ new Date(todo.createdAt).toLocaleString() }})
      </li>
    </ul> -->
  </section>

  <section class="todo-list">
    <h3>TO DO LIST</h3>
    <div class="list">
      <div v-for="(todo, index) in todos_asc" :key="index" :class="`todo-item ${todo.done && 'done'}`">

        <label>
          <input type="checkbox" v-model="todo.done">
          <span :class="`bubble ${todo.category}`"></span>
        </label>

        <div class="todo-content">
          <input type="text" v-model="todo.content">
        </div>

        <div class="actions">
          <button class="delete" @click="removeTodo(todo)">Delete</button>
        </div>
      </div>


    </div>
  </section>

</template>

<style scoped>
/* Add any necessary styles */
</style>
