import { createStore } from 'vuex';

const store = createStore({
  state: {
    userListsOfTodos: JSON.parse(localStorage.getItem('userListsOfTodos')) || []
  },
  mutations: {
    setUserListsOfTodos(state, lists) {
      state.userListsOfTodos = lists;
      localStorage.setItem('userListsOfTodos', JSON.stringify(lists));
    },
    addTodo(state, { listId, todo }) {
      console.log(listId, todo)
      state.userListsOfTodos.find(list => list.id === listId).todos.push(todo);
      localStorage.setItem('userListsOfTodos', JSON.stringify(state.userListsOfTodos));
    },
    addTodoList(state, list) {
      state.userListsOfTodos.push(list);
      localStorage.setItem('userListsOfTodos', JSON.stringify(state.userListsOfTodos));
    },
    deleteTodoList(state, index) {
      state.userListsOfTodos.splice(index, 1);
      localStorage.setItem('userListsOfTodos', JSON.stringify(state.userListsOfTodos));
    },
    toggleTodoDone(state, { listId, todoIndex }) {
      const todo = state.userListsOfTodos.find(list => list.id === listId).todos[todoIndex];
      todo.done = !todo.done;
      localStorage.setItem('userListsOfTodos', JSON.stringify(state.userListsOfTodos));
    },
    deleteTodo(state, { listId, todoIndex }) {
      state.userListsOfTodos.find(list => list.id === listId).todos.splice(todoIndex, 1);
      localStorage.setItem('userListsOfTodos', JSON.stringify(state.userListsOfTodos));
    }
  },
  actions: {
    setUserListsOfTodos({ commit }, lists) {
      commit('setUserListsOfTodos', lists);
    },
    addTodo({ commit }, payload) {
      commit('addTodo', payload);
    },
    addTodoList({ commit }, list) {
      commit('addTodoList', list);
    },
    deleteTodoList({ commit }, index) {
      commit('deleteTodoList', index);
    },
    toggleTodoDone({ commit }, payload) {
      commit('toggleTodoDone', payload);
    },
    deleteTodo({ commit }, payload) {
      commit('deleteTodo', payload);
    }
  },
  getters: {
    userListsOfTodos: state => state.userListsOfTodos,
    findListById: state => id => state.userListsOfTodos.find(list => list.id === id)
  }
});

export default store;