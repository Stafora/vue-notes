<template>
    <popup-modal ref="popup">
        <h2 style="margin-top: 0">{{ title }}</h2>
        <p>{{ message }}</p>
        <div class="btns">
            <button class="cancel-btn" @click="_cancel">{{ cancelButton }}</button>
            <span class="ok-btn" @click="_confirm">{{ okButton }}</span>
        </div>
    </popup-modal>
</template>

<script>
import PopupModal from './PopupModal.vue'

export default {
    name: 'ConfirmDialogue',
    /**
     * DATA
     */
    data: () => ({
        title: undefined,
        message: undefined,
        okButton: undefined, 
        cancelButton: 'Назад',
        
        resolvePromise: undefined,
        rejectPromise: undefined,
    }),
    /**
     * COMPONENTS
     */
    components: { 
        PopupModal 
    },
    /**
     * METHODS
     */
    methods: {
        /**
         * @param {Object} opts with title, message, okButton - string
         */
        show(opts = {}) {
            this.title = opts.title
            this.message = opts.message
            this.okButton = opts.okButton
            if (opts.cancelButton) {
                this.cancelButton = opts.cancelButton
            }
            this.$refs.popup.open()
            return new Promise((resolve, reject) => {
                this.resolvePromise = resolve
                this.rejectPromise = reject
            })
        },
        _confirm() {
            this.$refs.popup.close()
            this.resolvePromise(true)
        },
        _cancel() {
            this.$refs.popup.close()
            this.resolvePromise(false)
        },
    },
}
</script>

<style scoped>
.btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.ok-btn {
    padding: 0.5em 1em;
    background-color: #4ad395;
    color: #fff;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    min-width: 120px;
    text-decoration: none;
    outline: none;
}
.cancel-btn {
    padding: 0.5em 1em;
    color: #fff;
    background-color: red;
    border: 2px solid red;
    border: 0px;
    text-decoration: underline;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    min-width: 120px;
    text-decoration: none;
    outline: none;
}
</style>