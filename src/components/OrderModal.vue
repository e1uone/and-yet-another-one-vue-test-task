<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import OrderForm from './OrderForm.vue'
import ClearIcon from './ui/icons/ClearIcon.vue'
</script>

<template>
  <VueFinalModal
    class="order-modal"
    content-class="order-modal__content"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <button class="order-modal__close-btn" @click="$emit('confirm')">
      <ClearIcon />
    </button>
    <OrderForm @success-submit="$emit('confirm', $event)" />
  </VueFinalModal>
</template>

<style>
.order-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 4rem;

  @media screen and (max-width: 768px) {
    padding: 0;
  }
}
.order-modal__content {
  overflow-y: auto;
  max-height: 100%;
  background: #fff;
}

.order-modal__close-btn {
  cursor: pointer;

  position: absolute;
  z-index: 5;
  top: 2rem;
  right: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 3.6rem;
  height: 3.6rem;
  padding: 0;

  appearance: none;
  background: none;
  border: none;
  border-radius: 25px;

  @media screen and (min-width: 768px) {
    display: none;
  }
}
</style>
