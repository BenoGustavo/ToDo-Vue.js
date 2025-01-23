<template>
  <header>
    <div class="title-container">
      <router-link :to="{ name: 'Home' }">
        <button @click="returnPage" v-if="hasReturnButton" class="return-btn">
          <img src="../../assets/img/icons/ArrowCircleLeft.svg" alt="Seta para a direita">
        </button>
      </router-link>
      <h1>{{ title }}</h1>
    </div>

    <div v-if="hasAddButton" class="btn">
      <div @click="openModal" class="button-content">
        <img src="../../assets/img/icons/PlusCircle.svg" alt="Botão redondo com um mais no meio">
        <p>Criar nova {{ isTodo ? "tarefa" : "lista" }}</p>
      </div>
    </div>
  </header>
  <hr />

  <ModalComponent :visible="showModal" :is-form="true" :title="returnFormatedTitle()" :onConfirm="handleConfirm"
    :onCancel="closeModal">
    <fieldset class="form-container">
      <label for="list-title">Título da {{ this.isTodo ? "tarefa" : "lista" }}:</label>
      <input ref="titleInput" placeholder="Insira aqui!" type="text" id="list-title" v-model="listTitle" required>
      <span ref="err"></span>
    </fieldset>
  </ModalComponent>
</template>

<script>
import { nextTick } from 'vue';
import ModalComponent from "@/components/modal/ModalComponent.vue";

export default {
  name: "HeaderComponent",
  components: {
    ModalComponent,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    hasDeleteButton: {
      type: Boolean,
      default: false,
    },
    hasReturnButton: {
      type: Boolean,
      default: false,
    },
    hasAddButton: {
      type: Boolean,
      default: false,
    },
    isTodo: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['add-new-list', 'add-new-to-do'],
  data() {
    return {
      showModal: false,
      listTitle: '',
      todoLists: this.$store.getters.userListsOfTodos,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
      nextTick(() => {
        this.$refs.titleInput.focus();
      });
    },
    closeModal() {
      this.showModal = false;
    },
    returnFormatedTitle() {
      return "Criar nova " + (this.isTodo ? "tarefa" : "lista") + "!";
    },
    isListAlreadyCreated() {
      return this.todoLists.some((list) => list.listTitle === this.listTitle) && !this.isTodo;
    },
    isTodoAlreadyCreated() {
      return this.todoLists.some((list) => list.todos.some((todo) => todo.todoTitle === this.listTitle)) && this.isTodo;
    },
    isTitleValid() {
      this.$refs.err.style.transform = "translateY(-1rem)";
      if (!this.$refs.titleInput.checkValidity()) {
        this.$refs.err.textContent = "Valor inválido!";
        this.$refs.err.style.transform = "translateY(0)";
        this.$refs.err.style.opacity = 1;
        return false;
      }
      return true;
    },
    isListValid() {
      this.$refs.err.style.transform = "translateY(-1rem)";
      if (this.isListAlreadyCreated()) {
        this.$refs.err.textContent = "Já existe uma lista com esse nome";
        this.$refs.err.style.transform = "translateY(0)";
        this.$refs.err.style.opacity = 1;
        return false;
      }

      if (this.isTodo && this.listTitle.length > 30) {
        this.$refs.err.textContent = "O nome da lista deve ter no máximo 30 caracteres";
        this.$refs.err.style.transform = "translateY(0)";
        this.$refs.err.style.opacity = 1;
        return false;
      }

      return true;
    },
    isTodoValid() {
      this.$refs.err.style.transform = "translateY(-1rem)";
      if (this.isTodoAlreadyCreated()) {
        this.$refs.err.textContent = "Já existe uma tarefa com esse nome";
        this.$refs.err.style.transform = "translateY(0)";
        this.$refs.err.style.opacity = 1;
        return false;
      }

      //Validate if the name of the todo is more than 30 characters
      if (this.isTodo && this.listTitle.length > 30) {
        this.$refs.err.textContent = "O nome da tarefa deve ter no máximo 30 caracteres";
        this.$refs.err.style.transform = "translateY(0)";
        this.$refs.err.style.opacity = 1;
        return false;
      }

      this.$refs.err.style.transform = "translateY(-1rem)";
      return true;
    },
    handleConfirm(event) {
      event.preventDefault();

      if (!this.isTitleValid()) return;
      if (!this.isListValid()) return;
      if (!this.isTodoValid()) return;

      this.$emit("add-new-" + (this.isTodo ? "to-do" : "list"), this.listTitle);
      this.showModal = false;
    },
  },
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 630px) {
  .title-container {

    h1 {
      font-size: 1.5rem;
    }
  }
}

.form-container {
  display: flex;
  padding: 0;
  margin-bottom: 2rem;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  outline: none;
  border: 0;
  width: 100%;

  label {
    font-family: var(--font-family);
    font-size: var(--medium-font-size);
    color: var(--secondary-100-color);
    text-align: left;
    user-select: none;
  }

  input {
    padding: 0.5rem;
    border: 1px solid var(--dark-700-color);
    border-radius: 0.25rem;
    font-family: var(--font-family);
    font-size: var(--medium-font-size);
    color: var(--dark-900-color);
    background-color: var(--secondary-100-color);
    transition: border-color 0.3s ease-in-out;
    z-index: 2;

    &:focus {
      border-color: var(--primary-color);
      outline: none;
    }
  }

  span {
    z-index: 1;
    color: red;
    user-select: none;
    transition: transform 0.3s ease-in, opacity 0.3s ease-in;
    transform: translateY(-1rem);
    opacity: 0;
  }
}

header {
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: last baseline;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  user-select: none;
}

hr {
  border: 0;
  height: 2px;
  background: #54353e;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: baseline;
  margin-bottom: 1rem;
  gap: 1.5rem;
  user-select: none;
}

.btn {
  transition: background-color 0.3s ease-in-out;
  border-radius: 30px;
}

.btn:hover {
  cursor: pointer;
  background-color: var(--dark-600-color);
}

.button-content {
  background-color: transparent;
  outline: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  padding: 0.8rem;

  img {
    width: 24px;
    height: 24px;
  }

  p {
    color: var(--primary-color);
    margin: 0;
    padding: 0;
    white-space: nowrap;
    display: block;
  }
}

.return-btn {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  img {
    width: 36px;
    height: 36px;
    transition: filter 0.3s ease-in-out;
  }

  :hover {
    filter: brightness(0.5);
  }
}

.button-container {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-self: flex-end;
}

h1 {
  margin: 0;
}
</style>
