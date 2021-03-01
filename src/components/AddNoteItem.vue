<template>
  <div class="note-item note-item-add" v-on:click="addNewNote">
      <svg height="50pt" viewBox="0 0 426.66667 426.66667" width="50pt" xmlns="http://www.w3.org/2000/svg"><path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"/></svg>
  </div>
</template>

<script>
import { NoteService } from '../services/NoteService'
export default {
  name: 'AddNoteItem',
  mounted() {

  },
  methods: {
    addNewNote: function(){
      this.$emit('addItem');
    }
  }
}
</script>

<style lang="scss">
    .note-item-add{
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0.6;
        transition: 0.3s;

        &:hover{
          opacity: 1;
        }
        
        svg{
            width: 60px;
            height: 60px;
            fill: #212121;
        }
    }
</style>
