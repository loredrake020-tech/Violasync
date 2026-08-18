// Todo service for local storage operations
import AsyncStorage from '@react-native-async-storage/async-storage';

const TODOS_KEY = 'violasync_todos';

export const todoService = {
  // Get all todos
  async getAllTodos() {
    try {
      const jsonValue = await AsyncStorage.getItem(TODOS_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error getting todos:', error);
      return [];
    }
  },

  // Add a new todo
  async addTodo(title) {
    try {
      const todos = await this.getAllTodos();
      const newTodo = {
        id: Date.now().toString(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      todos.push(newTodo);
      await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
      return newTodo;
    } catch (error) {
      console.error('Error adding todo:', error);
      return null;
    }
  },

  // Update a todo
  async updateTodo(id, updates) {
    try {
      const todos = await this.getAllTodos();
      const index = todos.findIndex((t) => t.id === id);
      if (index !== -1) {
        todos[index] = { ...todos[index], ...updates };
        await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
        return todos[index];
      }
      return null;
    } catch (error) {
      console.error('Error updating todo:', error);
      return null;
    }
  },

  // Delete a todo
  async deleteTodo(id) {
    try {
      const todos = await this.getAllTodos();
      const filtered = todos.filter((t) => t.id !== id);
      await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error deleting todo:', error);
      return false;
    }
  },

  // Toggle todo completion
  async toggleTodo(id) {
    try {
      const todos = await this.getAllTodos();
      const todo = todos.find((t) => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        await AsyncStorage.setItem(TODOS_KEY, JSON.stringify(todos));
        return todo;
      }
      return null;
    } catch (error) {
      console.error('Error toggling todo:', error);
      return null;
    }
  },

  // Clear all todos
  async clearAllTodos() {
    try {
      await AsyncStorage.removeItem(TODOS_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing todos:', error);
      return false;
    }
  },

  // Get completed todos count
  async getCompletedCount() {
    try {
      const todos = await this.getAllTodos();
      return todos.filter((t) => t.completed).length;
    } catch (error) {
      console.error('Error getting completed count:', error);
      return 0;
    }
  },
};

export default todoService;