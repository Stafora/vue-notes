<template>
  <section class="section">
    
    <div class="section-title">Записки</div>

    <div class="wrapper notes-list">
      <NoteItem 
        v-for="(noteItem, index) in notes"
        :noteItem="noteItem"
        :key="index"

        v-on:removeItem="removeItem"
        v-on:updateItem="updateItem"
      />

      <AddNoteItem @addItem="addItem" />
    </div>

    <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>

  </section>
</template>

<script>
import NoteItem from '@/components/NoteItem.vue'
import AddNoteItem from '@/components/AddNoteItem.vue'
import { NoteService } from '../services/NoteService'
import ConfirmDialogue from '@/components/ConfirmDialogue.vue'

export default {
  name: "Home",
  /** 
   * DATE
   */
  data() {
    return {
      notes: {},
    }
  },
  /**
   * COMPONENTS
   */
  components: {
    NoteItem,
    AddNoteItem,
    ConfirmDialogue
  },
  /**
   * MOUNTED
   */
  mounted() {
    this.notes = NoteService.getAll();
  },
  /**
   * METHODS
   */
  methods: {
    /**
     * @param {String} id
     * @param {Object} noteItem
     */
    async updateItem(id, noteItem){
      let ok = await this.$refs.confirmDialogue.show({
            title: 'Обновление записи',
            message: 'Вы уверены что хотите обновить? все данные перезапишуться!',
            okButton: 'Обновить',
      })
      if (ok) {
        NoteService.updateItem(id, noteItem);
      }
    },      
    /**
     * @param {String} id
     */
    async removeItem(id){
      let ok = await this.$refs.confirmDialogue.show({
            title: 'Удалиние записи',
            message: 'Вы уверены что хотите удалить? все данные будут утеряны!',
            okButton: 'Удалить',
      })
      if (ok) {
        NoteService.removeItem(id);
        let index = this.notes.findIndex(i => i.id === id)
        this.notes.splice(index, 1)
      }
    },
    addItem(){
      let id =  Math.round(Math.random() * new Date());
      NoteService.createItem(id);
      let item = NoteService.getItemById(id);
      this.notes.push(item);
    }
  },
}
</script>

<style lang="scss">
  .notes-list{
    display: flex;
    flex-wrap: wrap;
  }
</style>
