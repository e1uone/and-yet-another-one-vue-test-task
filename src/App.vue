<script setup>
import { ModalsContainer, useModal } from 'vue-final-modal'
import OrderModal from './components/OrderModal.vue'

const { open: openModal, close } = useModal({
  component: OrderModal,
  attrs: {
    onConfirm() {
      close()
    },
  },
})
</script>

<template>
  <main class="main">
    <ModalsContainer />
    <button @click="openModal()">Open modal</button>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
