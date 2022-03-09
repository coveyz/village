<template>
  <div class="components-container board">
    <Kanban :key="1"
            :list="list1"
            :group="group"
            headText="todo"
            class="kanban todo" />
    <Kanban :key="1"
            :list="list2"
            :group="group"
            headText="Working"
            class="kanban working" />
    <Kanban :key="1"
            :list="list3"
            :group="group"
            headText="Done"
            class="kanban done" />

  </div>
  {{list1}}<br />
  {{list2}}<br />
  {{list3}}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Kanban } from "@/components";

export default defineComponent({
  name: "DragKanbanDemo",
  components: { Kanban },
  data() {
    return {
      group: "mission",
      list1: [
        { name: "Mission", id: 1 },
        { name: "Mission", id: 2 },
        { name: "Mission", id: 3 },
        { name: "Mission", id: 4 },
      ],
      list2: [
        { name: "Mission", id: 5 },
        { name: "Mission", id: 6 },
        { name: "Mission", id: 7 },
      ],
      list3: [
        { name: "Mission", id: 8 },
        { name: "Mission", id: 9 },
        { name: "Mission", id: 10 },
      ],
    };
  },
});
</script>

<style  lang="scss">
.board {
  width: 1000px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4a9ff9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>