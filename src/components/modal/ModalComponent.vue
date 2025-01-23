<template>
    <div v-if="visible" class="modal-overlay" @click="handleOverlayClick">
        <div v-if="!isForm" class="modal-content" @click.stop>
            <h2>{{ title }}</h2>
            <p>{{ message }}</p>
            <div class="modal-buttons">
                <button class="btn cancel-btn" @click="handleCancel($event)">Cancelar</button>
                <button class="btn confirm-btn" @click="handleConfirm($event)">Confirmar</button>
            </div>
        </div>

        <div v-else class="modal-content" @click.stop>
            <h2>{{ title }}</h2>
            <form>
                <slot></slot>
                <div class="modal-buttons">
                    <button type="reset" class="btn cancel-btn" @click="handleCancel($event)">Cancelar</button>
                    <button type="submit" class="btn confirm-btn" @click="handleConfirm($event)">Confirmar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalComponent",
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        isForm: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: "Modal Title"
        },
        message: {
            type: String,
            default: "This is a modal message."
        },
        onConfirm: {
            type: Function,
            required: true
        },
        onCancel: {
            type: Function,
            required: true
        }
    },
    methods: {
        handleOverlayClick() {
            this.onCancel();
        },
        handleCancel(event) {
            this.onCancel(event);
        },
        handleConfirm(event) {
            this.onConfirm(event);
        }
    }
};
</script>

<style lang="scss" scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.3s ease-in-out;
}

.modal-content {
    background: var(--dark-900-color);
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.3s ease-in-out;
    max-width: 500px;
    width: 100%;
    text-align: center;
}

.modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
}

.btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-family: var(--font-family);
    font-size: var(--medium-font-size);
    transition: filter 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.btn:hover {
    filter: brightness(0.8);
    transform: scale(1.06);
}

.cancel-btn {
    background-color: var(--secondary-200-color);
    color: var(--dark-900-color);
}

.cancel-btn:hover {
    background-color: var(--secondary-100-color);
}

.confirm-btn {
    background-color: var(--primary-color);
    color: var(--secondary-100-color);
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slideIn {
    from {
        transform: translateY(-20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>