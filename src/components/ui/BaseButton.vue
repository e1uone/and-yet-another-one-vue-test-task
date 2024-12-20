<script setup>
import BaseSpinner from './spinners/BaseSpinner.vue'

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disable: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    class="base-button"
    :class="{ 'base-button--loading': props.loading }"
    :disabled="props.loading || props.disable"
  >
    <div class="base-button__spinner-container" v-if="props.loading">
      <BaseSpinner />
    </div>
    <p class="base-button__text-container">
      <slot>{{ label }}</slot>
    </p>
  </button>
</template>

<style scoped>
.base-button {
  cursor: pointer;

  position: relative;

  display: flex;
  align-items: center;

  padding: 0;
  padding: 1.2rem 4rem;

  font: inherit;
  color: #fff;

  appearance: none;
  background: #174b7c;
  border: none;
  border-radius: 1000px;
  outline: none;

  transition:
    background 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
}

.base-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.base-button:hover:not(:disabled) {
  background: #15406a;
}
.base-button:focus-visible:not(:disabled) {
  background: #15406a;
}

.base-button__text-container {
  width: 100%;
  text-align: center;
}

.base-button--loading {
  .base-button__text-container {
    opacity: 0;
  }
}

.base-button__spinner-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
