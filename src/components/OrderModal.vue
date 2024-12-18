<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
</script>

<template>
  <VueFinalModal
    class="order-modal"
    content-class="order-modal__content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1>Hello</h1>
  </VueFinalModal>
</template>

<style>
.order-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.order-modal__content {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
}
.order-modal__content > * + * {
  margin: 0.5rem 0;
}
.order-modal__content h1 {
  font-size: 1.375rem;
}
.order-modal__content button {
  margin: 0.25rem 0 0 auto;
  padding: 0 8px;
  border: 1px solid;
  border-radius: 0.5rem;
}
.dark .order-modal__content {
  background: #000;
}
</style>
