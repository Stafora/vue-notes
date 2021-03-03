<template>
    <div v-if="noteItem" class="note-item">

        <div class="note-item-header">
          <input 
            placeholder="Введите название"
            class="note-item__edit-text"
            type="text"
            v-model="noteItem.title"
          >
        </div>

        <div class="note-item-body">
            <ul class="note-item-list">
                <li class="note-item-list__item" v-for="(todo, index) in noteItem.todos" v-bind:key="index">
                    <input 
                        class="note-item-list__edit-text"
                        type="text"
                        v-model="noteItem.todos[index]"
                    >
                    <div class="note-item-list__delete" v-on:click="removeTodosInItem(index)" title="Удалить">
                        <svg height="15pt" viewBox="0 0 329.26933 329" width="15pt" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg>
                    </div>
                </li>
            </ul>
            <div class="note-item-list-add" v-on:click="addTodos" title="Добавить">
                <svg height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm112 277.332031h-90.667969v90.667969c0 11.777344-9.554687 21.332031-21.332031 21.332031s-21.332031-9.554687-21.332031-21.332031v-90.667969h-90.667969c-11.777344 0-21.332031-9.554687-21.332031-21.332031s9.554687-21.332031 21.332031-21.332031h90.667969v-90.667969c0-11.777344 9.554687-21.332031 21.332031-21.332031s21.332031 9.554687 21.332031 21.332031v90.667969h90.667969c11.777344 0 21.332031 9.554687 21.332031 21.332031s-9.554687 21.332031-21.332031 21.332031zm0 0"/></svg>
            </div>
        </div>

        <div class="note-item-footer">
            <div 
                class="note-item__btn note-item__btn_save" 
                v-bind:class="{active: availableSave}" 
                v-on:click="updateItem"
                title="Сохранить"
            >
                <svg enable-background="new 0 0 515.556 515.556" height="512" viewBox="0 0 515.556 515.556" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m0 274.226 176.549 176.886 339.007-338.672-48.67-47.997-290.337 290-128.553-128.552z"/></svg>
            </div>
            <div 
                class="note-item__btn note-item__btn_delete" 
                v-on:click="removeItem"
                title="Удалить"
            >
                <svg enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m424 64h-88v-16c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16h-88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283c1.221 25.636 22.281 45.717 47.945 45.717h242.976c25.665 0 46.725-20.081 47.945-45.717l13.823-290.283h8.744c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zm-216-16c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zm-128 56c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40c-4.931 0-331.567 0-352 0zm313.469 360.761c-.407 8.545-7.427 15.239-15.981 15.239h-242.976c-8.555 0-15.575-6.694-15.981-15.239l-13.751-288.761h302.44z"/><path d="m256 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/><path d="m336 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/><path d="m176 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"/></g></svg>
            </div>
        </div>

    </div>
</template>

<script>
import { NoteService } from '../services/NoteService';
export default {
    name: 'NoteItem',
    props: {
        noteItem: Object,
    },
    data() {
        return {
            availableSave: false,
        }
    },
    watch: {
        noteItem: {
            handler (newValue, oldValue) {
                this.availableSave = true;
            },
            deep: true
        }
    },
    methods: {
        removeTodosInItem: function(todosId){
            this.noteItem.todos.splice(todosId, 1);
        },
        updateItem: function() {
            this.$emit('updateItem', this.noteItem.id, this.noteItem);
            this.availableSave = false;
        },
        removeItem: function() {
            this.$emit('removeItem', this.noteItem.id);
        },
        addTodos: function() {
            this.noteItem.todos.push('');
        }
    },
}
</script>

<style lang="scss">
    .note-item{
        width: 32%;
        border: 1px solid #212121;
        background-color: #fff7d2;
        margin-right: 1.6%;
        margin-bottom: 20px;
        min-height: 200px;
        display: flex;
        flex-direction: column;

        &:nth-child(3n + 3){
            margin-right: 0px;
        }
        
        &-header{
            padding: 10px;
            font-weight: 600;
        }
        &-body{
            padding: 10px;
        }
        &-footer{
            padding: 10px;
            background-color: #fef3a9;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-top: auto;

            & > *{
                margin-left: 10px;
                cursor: pointer;    
                opacity: 0.6;
                transition: 0.3s;

                &:hover{
                    opacity: 1;
                }

                svg{
                    fill: #313030;
                }
            }
        }

        &__edit-text{
            border: 0px;
            width: 100%;
            height: auto;
            background: none;
            text-align: center;
            font-size: 16px;
            font-weight: 600;
            outline: none;
            padding-right: 20px;

            &:focus{
                border-bottom: 1px solid #b7b7b7;
            }
        }

        svg{
            width: 20px;
            height: 20px;
        }

        &-list{
            list-style: none;
            padding: 0px;
            margin: 0px;

            &__item{
                position: relative;
            }
            &__delete{
                position: absolute;
                right: 0px;
                top: 2px;
                cursor: pointer;
                width: 15px;
                height: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                svg{
                    fill: red;
                    width: 8px;
                    height: 8px;
                }
            }

            &__edit-text{
                width: 100%;
                margin-bottom: 5px;
                border: 0px;
                background: none;
                font-size: 12px;
                outline: none;

                &:focus{
                    border-bottom: 1px solid #b7b7b7;
                }
            }

            &-add{
                cursor: pointer;
                svg{
                    fill: #4ad395;
                }
            }
        }

        &__btn{
            &_save{
                &.active{
                    svg{
                        fill: #66ae44;
                    }
                }
            }
            &_delete{
                svg{
                    fill: #ff6244;
                }
            }
        }

    }
</style>
