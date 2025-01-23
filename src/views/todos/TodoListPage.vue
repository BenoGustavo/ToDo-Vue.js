<template>
    <HeaderComponent :title="'TO-DO | ' + findListById.listTitle.toUpperCase()" :hasAddButton="true"
        :has-return-button="true" :is-todo="true" @add-new-to-do="createNewTodo" />

    <MainContainerComponent>
        <TodoComponent :user-lists-of-todos="findListById?.todos" @toggle-todo-done="toggleTodoDone"
            @delete-todo="deleteTodo" />
    </MainContainerComponent>

</template>

<script>
import HeaderComponent from '@/components/header/HeaderComponent.vue';
import MainContainerComponent from "@/components/main-container-component/MainContainerComponent.vue";
import TodoComponent from '@/components/todo/TodoComponent.vue';
import TitleMixin from "@/mixin/TitleMixin";

export default {
    name: 'TodoListPage',
    components: {
        HeaderComponent,
        MainContainerComponent,
        TodoComponent,
    },
    props: {
        listId: {
            type: String,
            required: true
        }
    },
    emits: ['add-new-to-do'],
    mixins: [TitleMixin],
    computed: {
        findListById() {
            return this.$store.getters.findListById(this.listId);
        },
        title() {
            return this.findListById.listTitle;
        }
    },
    methods: {
        toggleTodoDone(index) {
            this.$store.dispatch('toggleTodoDone', { listId: this.listId, todoIndex: index });
        },
        createNewTodo(title) {
            if (!title) return;

            this.$store.dispatch('addTodo', { listId: this.listId, todo: { todoTitle: title, done: false } });
        },
        deleteTodo(index) {
            this.$store.dispatch('deleteTodo', { listId: this.listId, todoIndex: index });
        }
    },
};
</script>