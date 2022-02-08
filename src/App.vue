<template>
  <v-app>
    <v-container>
      <v-card elevation="0" class="px-5 py-5">
        <v-card-title>My Todo lists</v-card-title>
        <div class="mb-4 d-flex">
          <v-text-field
            label="Nouvelle liste"
            v-model="newListName"
            @keyup.enter="addList"
          ></v-text-field>
          <v-btn
            elevation="2"
            color="primary"
            @click="addList"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </div>
        <v-row>
          <v-col cols="6" v-for="todoList in todoLists" :key="todoList.id">
            <v-card elevation="2">
              <v-card-title class="d-flex">
                {{ todoList.name }}
                <v-btn
                  fab
                  small
                  elevation="2"
                  color="error"
                  class="ms-auto"
                  @click="removeList(todoList.id)"
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
              </v-card-title>
              <div class="mb-2 px-2 d-flex">
                <v-text-field
                  label="Nouvel élément"
                  :ref="'newItem' + todoList.id"
                  @keyup.enter="addItem(todoList.id)"
                ></v-text-field>
                <v-btn
                  small
                  elevation="2"
                  color="primary"
                  @click="addItem(todoList.id)"
                  ><v-icon>mdi-plus</v-icon></v-btn
                >
              </div>
              <v-list>
                <v-list-item
                  v-for="todoItem in todoList.todoItems"
                  :key="todoItem.id"
                >
                  <v-list-item-title>{{ todoItem.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
const DEFAULT_LISTS = [
  {
    id: 1,
    name: "List #1",
    createdAt: "2022-02-06T12:54:18+00:00",
    isActive: true,
    todoItems: [
      {
        id: 1,
        title: "item 1",
        isDone: false,
      },
    ],
  },
];

export default {
  name: "App",
  data() {
    return {
      newListName: "",
      todoLists: [],
    };
  },
  methods: {
    fetchTodoLists: function () {
      this.todoLists = DEFAULT_LISTS;
      /* this.$http.get(this.$domain + "/todo_lists").then((response) => {
        this.todoLists = response.data;
      }); */
    },
    addList: function () {
      const newList = {
        id: this.todoLists.length ? this.todoLists[this.todoLists.length - 1].id + 1 : 1,
        name: this.newListName,
        createdAt: new Date(),
        isActive: true,
        todoItems: [],
      };
      if (this.newListName) {
        this.todoLists.push(newList);
        this.newListName = "";
      }
      /* const $this = this;
      this.$http
        .post(this.$domain + "/todo_lists", {
          name: $this.newListName,
        })
        .then(() => {
          this.fetchTodoLists();
        }); */
    },
    removeList: function (listId) {
      this.todoLists.map((list, index) => {
        if (list.id ===  listId) {
          this.todoLists.splice(index, 1);
        }
      });
      /* this.$http.delete(this.$domain + "/todo_lists/" + listId).then(() => {
        this.fetchTodoLists();
      }); */
    },
    addItem(listId) {
      const name = this.$refs["newItem" + listId][0].$refs.input.value;
      if (name) {
        const newItem = {
          title: name,
          isDone: false,
        };
        this.todoLists.map((list) => {
          if (list.id === listId) {
            newItem.id = list.todoItems.length
              ? list.todoItems[list.todoItems.length - 1].id + 1
              : 1;
            list.todoItems.push(newItem);
          }
        });
      }
      this.$nextTick(() => {
        this.$refs["newItem" + listId][0].$props.value = "";
      })
    },
  },
  created: function () {
    this.fetchTodoLists();
  },
};
</script>

<style>
#app {
    background-color: rgb(187, 187, 187);
}
</style>
