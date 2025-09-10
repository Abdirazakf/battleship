export default class UI {
    constructor() {
        this.elements = {
            modal: document.querySelector('dialog'),
            form: document.querySelector('form'),
        }
    }

    openModal() {
        this.elements.modal.showModal()
    }

    closeModal() {
        this.elements.modal.close()
        this.elements.form.reset()
    }

    init() {
        this.openModal()
    }
}