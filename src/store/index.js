// @ts-check
import { reactive, toRefs, onMounted, watch, watchEffect } from "vue";
import { v4 as uuid } from "uuid";
import { getMany, get, set, entries, del } from "idb-keyval";

/**
 * @typedef {{todo:string;completed:boolean}} Todo
 * @typedef {{title: string, todos:{[key:string]: Todo}}} Collection
 *  */

/** @type {{collections:{[key:string]: Collection }}} */
const initialState = {
  collections: {},
};

export const store = reactive(initialState);

/** @type {(title:string) => void} */
export function createCollection(title) {
  const id = uuid();
  store.collections[id] = { title, todos: {} };
  updateCollection(id);
}

export function deleteCollection(collectionID) {
  delete store.collections[collectionID];
  del(collectionID);
}

/** @type {() => {[key:string]: Collection}} */
export function useCollections() {
  onMounted(async () => {
    /** @type {[any,any][]} */
    const cols = await entries();
    cols.forEach(([key, val]) => {
      store.collections[key] = JSON.parse(val);
    });
  });

  return store.collections;
}

/** @type {(id:string) => Collection} */
export function getCollection(id) {
  return store.collections[id];
}

/**
 * Updates the indexeddb by the given key, it doesn't matter if it exists or not
 * @param {string} id
 */
function updateCollection(id) {
  set(id, JSON.stringify(store.collections[id]));
}

export function useCollection(collectionID) {
  /** @type {(todo:string, completed: boolean) => void} */
  const createTodo = (todo, completed = false) => {
    store.collections[collectionID].todos[uuid()] = { todo, completed };
    updateCollection(collectionID);
  };

  /** @type {(todoID:string, todo: Todo) => void} */
  const updateTodo = (todoID, todo) => {
    store.collections[collectionID].todos[todoID] = { ...todo };
    updateCollection(collectionID);
  };

  /** @type {(todoID:string) => void} */
  const deleteTodo = todoID => {
    delete store.collections[collectionID].todos[todoID];
    updateCollection(collectionID);
  };

  const _deleteCollection = () => {
    deleteCollection(collectionID);
  };

  return {
    createTodo,
    updateTodo,
    deleteTodo,
    deleteCollection: _deleteCollection,
    ...toRefs(store.collections[collectionID]),
  };
}
