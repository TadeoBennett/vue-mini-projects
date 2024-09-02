<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="" />
      <h1>Pinia Tasks</h1>
    </header>

    <!-- new task form -->
     <div class="new-task-form">
      <TaskForm />
     </div>

    <!-- filter -->
    <nav class="filter">
      <button @click="filter = 'all'">All Tasks</button>
      <button @click="filter = 'favs'">Fav tasks</button>
    </nav>

    <!-- Loading -->
     <div class="loading" v-if="isLoading">
      Loading tasks...
     </div>

    <!-- taskList -->
    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ totalCount }} tasks left to do</p>
      <div v-for="task in tasks" :key="task">
        <TaskDetails :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favCount }} tasks left to do</p>
      <div v-for="task in favs" :key="task">
        <TaskDetails :task="task" />
      </div>
    </div>

    <button @click="taskStore.$reset">reset</button>

  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";
import { useTaskStore } from "./stores/TaskStore";
import { onMounted, ref } from "vue";

const taskStore = useTaskStore();

const filter = ref('all')

//fetch tasks
taskStore.getTasks()

//making refs of all the getters and properties from the store
//allows us to direclty call the value without refering to "taskStore" in our declarations.
const {tasks, name, isLoading, favs, totalCount, favCount} = storeToRefs(taskStore)

onMounted(() => {
  console.log(taskStore);
});
</script>

<style lang="scss" scoped>
</style>