<template>
    <ul v-if="userListsOfTodos != null && userListsOfTodos.length > 0">
        <li v-for="(todo, index) in userListsOfTodos" :key="todo.todoTitle + index" @click="toggleTodoDone(index)"
            :class="{ 'completed-todo': todo.done }">
            <input disabled type="checkbox" :id="todo.todoTitle + index" :name="todo.todoTitle + index"
                :checked="todo.done" @click.stop>
            <label :for="todo.todoTitle + index">{{ todo.todoTitle }}</label>
            <div @click.stop="confirmDelete(index)" class="delete-list">
                <img src="../../assets/img/icons/Trash.svg" alt="Icone de lixo">
            </div>
        </li>
    </ul>
    <div class="empty-list-container" v-else>
        <img src="../../assets/img/MESSAGE_IF_EMPTY_TO_DO_LIST.svg"
            alt="Uma mensagem de que não há nenhuma tarefa cadastrada">
    </div>

    <ModalComponent :visible="showModal" title="Confirmar deleção" :message="modalMessage" :onConfirm="handleConfirm"
        :onCancel="handleCancel" />
</template>

<script>
import ModalComponent from "@/components/modal/ModalComponent.vue";

export default {
    components: {
        ModalComponent
    },
    props: {
        userListsOfTodos: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            indexToDelete: null,
            showModal: false
        };
    },
    emits: ['toggle-todo-done', 'delete-todo'],
    computed: {
        modalMessage() {
            if (this.indexToDelete !== null) {
                return `Tem certeza de que deseja deletar "${this.userListsOfTodos[this.indexToDelete].todoTitle}"? Essa ação não poderá ser desfeita.`;
            }
            return "";
        }
    },
    methods: {
        toggleTodoDone(index) {
            this.$emit('toggle-todo-done', index);
        },
        confirmDelete(index) {
            this.indexToDelete = index;
            this.showModal = true;
        },
        handleConfirm() {
            this.$emit('delete-todo', this.indexToDelete);
            this.showModal = false;
            this.indexToDelete = null;
        },
        handleCancel() {
            this.showModal = false;
            this.indexToDelete = null;
        }
    }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 590px) {
    section.container .empty-list-container img {

        width: 100%;
    }
}


input[type="checkbox"] {
    display: none;
}

input[type="checkbox"]+label {
    position: relative;
    padding-left: 2rem;
    cursor: pointer;
    user-select: none;
}

input[type="checkbox"]+label::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1.2rem;
    height: 1.2rem;
    border: 2px solid var(--secondary-200-color);
    border-radius: 50%;
    background-color: #ffffffc1;
    transition: background-color 0.3s, border-color 0.3s;
    transition: rotate 0.3s ease-in-out;
}


input[type="checkbox"]:checked+label::before {
    background-color: var(--green-color);
    border-color: var(--green-color);
    content: '✔';
    font-size: 0.8rem;
    text-align: center;
    line-height: 1.1rem;
    rotate: 7deg;
}

input[type="checkbox"]+label::after {
    content: '';
    position: absolute;
    left: 0.25rem;
    top: 50%;
    transform: translateY(-50%) scale(0);
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 0.125rem;
    background-color: #fff;
    transition: transform 0.3s;
}

.completed-todo {
    text-decoration: line-through;

    label {
        color: var(--dark-500-color);
    }

    filter: brightness(0.7);
}

ul {
    list-style: none;
    padding: 0;
    height: 100%;
}

.empty-list-container {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;

    img {
        width: 50%;
        height: auto;
        max-width: 1200px;
        user-select: none;
    }
}

ul {
    list-style: none;
    padding: 0;
    width: 100%;
}

li {
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.5rem;
    background-color: var(--dark-900-color);
    margin-bottom: 1rem;
    transition: all 0.3s;
    width: 100%;
    user-select: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    padding-left: 1rem;
    cursor: pointer;

    animation: fadeIn 0.4s ease-in-out;
}

li:hover {

    transform: scale(1.02);
    background-color: var(--dark-800-color);
}

.delete-list {
    position: relative;
    width: 14px;
    height: 65px;
    background-color: #632329;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
    box-shadow: none;

    img {
        transition: all 0.3s ease-in-out;
        transform: scale(0.5);
        opacity: 0;
    }
}

.delete-list:hover {
    width: 50px;
    cursor: pointer;
    box-shadow: none;

    img {
        transform: scale(1);
        opacity: 1;
    }
}

.image-container {
    margin: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    margin-left: auto;
    cursor: pointer;
}
</style>