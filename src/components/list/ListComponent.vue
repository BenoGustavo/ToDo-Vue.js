<template>
    <ul v-if="userListsOfTodos != null && userListsOfTodos.length > 0">
        <li v-for="(list, index) in userListsOfTodos" :key="list.listTitle">
            <div @click="confirmDelete(index)" class="delete-list">
                <img src="../../assets/img/icons/Trash.svg" alt="Icone de lixo">
            </div>
            <router-link :to="{ name: 'TodosPage', params: { listId: list.id } }">
                <h3>{{ list.listTitle }}</h3>
                <div class="image-container">
                    <img src="../../assets/img/icons/CaretRight.svg" alt="Icone de uma seta para a direita">
                </div>
            </router-link>
        </li>
    </ul>
    <div class="empty-list-container" v-else>
        <img src="../../assets/img/MESSAGE_IF_LISTS_EMPTY.svg" alt="Uma mensagem de que não há listas cadastradas">
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
    computed: {
        modalMessage() {
            if (this.indexToDelete !== null) {
                return `Tem certeza de que deseja deletar "${this.userListsOfTodos[this.indexToDelete].listTitle}"? Essa ação não poderá ser desfeita.`;
            }
            return "";
        }
    },
    emits: ['delete-list'],
    methods: {
        confirmDelete(index) {
            this.indexToDelete = index;
            this.showModal = true;
        },
        handleConfirm() {
            this.$emit('delete-list', this.indexToDelete);
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
a {
    text-decoration: none;
    color: inherit;
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
    border-radius: 0.5rem;
    background-color: var(--dark-900-color);
    margin-bottom: 1rem;
    transition: all 0.3s;
    width: 100%;
    user-select: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    animation: fadeIn 0.4s ease-in-out;
}

li a {
    height: 65px;
    display: flex;
    align-items: center;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background-color: var(--dark-900-color);
    transition: all 0.3s;
    width: 100%;
    user-select: none;
    box-shadow: none;
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
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
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

h3 {
    font-weight: 400;
    padding: 1rem;
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