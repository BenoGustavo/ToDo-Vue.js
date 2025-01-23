<template>
  <HeaderComponent title="LISTS | YOUR LISTS" :hasAddButton="true" @add-new-list="createNewList" />
  <MainContainerComponent>
    <ListComponent @delete-list="deleteTodoList(index)" :user-lists-of-todos="userListsOfTodos" />
  </MainContainerComponent>
</template>
<script>
import ListComponent from "@/components/list/ListComponent.vue";
import HeaderComponent from "@/components/header/HeaderComponent.vue";
import MainContainerComponent from "@/components/main-container-component/MainContainerComponent.vue";
import TitleMixin from "@/mixin/TitleMixin";
import { v4 as uuidv4 } from 'uuid';

export default {
  name: "HomePage",
  components: {
    HeaderComponent,
    MainContainerComponent,
    ListComponent
  },
  mixins: [TitleMixin],
  computed: {
    userListsOfTodos() {
      return this.$store.getters.userListsOfTodos;
    },
    title() {
      return "LISTS | YOUR LISTS";
    }
  },
  methods: {
    addTodoList(list) {
      this.$store.dispatch('addTodoList', list);
    },
    deleteTodoList(index) {
      this.$store.dispatch('deleteTodoList', index);
    },
    createNewList(title) {
      const newList = {
        id: uuidv4(),
        listTitle: title,
        todos: []
      };
      this.$store.dispatch("addTodoList", newList);
    }
  }
};
</script>
<style lang="scss">
.container {
  max-width: 1250px;
  margin: 0 auto;
}
</style>
