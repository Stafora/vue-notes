import { LocalStorageService } from './LocalStorageService'

/**
 * @typedef Note
 * @property {string} id - id of note
 * @property {string} title - title of note
 * @property {array} todos - list of todos
 */

/**
 * The key under which we are saving Notes in LS
 * @type {string}
 */
export const STORAGE_KEY = 'notes'

export const NoteService = {
  /**
   * Stores all the provided notes items
   * @param {Note[]} items
   */
  saveAll (items) {
    LocalStorageService.setItem(STORAGE_KEY, items)
  },
  /**
   * Fetch all Notes
   * @return {notes[]}
   */
  getAll () {
    return LocalStorageService.getItem(STORAGE_KEY, [])
  },
  /**
   * Fetch Note By Id
   * @param {String} id
   * @return {note}
   */
  getItemById (id) {
    let items = LocalStorageService.getItem(STORAGE_KEY, [])
    let index = items.findIndex(i => i.id === id)
    if (index === -1) return
    return items[index]
  },

  /**
   * create new note item
   * @param {String} id
   */
  createItem (id){
    let items = NoteService.getAll();
    let item = {
      id: id,
      title: '',
      todos: [],
    }
    items.push(item);
    NoteService.saveAll(items)
  },
  /**
   * Updates a note item.
   * @param {String} id
   * @param {Note} payload
   */
  updateItem (id, payload) {
    let items = NoteService.getAll()
    let index = items.findIndex(i => i.id === id)
    items.splice(index, 1, payload)
    NoteService.saveAll(items)
  },
  /**
   * Remove a note item from the list
   * @param {string} id
   */
  removeItem (id) {
    const items = NoteService.getAll()
    const index = items.findIndex(i => i.id === id)
    items.splice(index, 1)
    NoteService.saveAll(items)
  }
}
