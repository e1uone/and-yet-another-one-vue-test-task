<script setup>
import { defineProps } from 'vue'
import BaseInput from './BaseInput.vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
    default: 'Range input',
  },
  labelFrom: {
    type: String,
    default: 'От',
  },
  labelTo: {
    type: String,
    default: 'До',
  },
  type: {
    type: String,
    default: 'number',
  },
})

const calculateName = (name, suffix) => {
  return `${name}.${suffix}`
}
</script>

<template>
  <div class="base-range">
    <p class="base-range__label">{{ props.label }}</p>
    <div class="base-range__input-container">
      <BaseInput
        class="base-range__input"
        :label="labelFrom"
        :type="props.type"
        :name="calculateName(props.name, 'from')"
        design="alternative"
      />
      <BaseInput
        class="base-range__input"
        :label="labelTo"
        :type="props.type"
        :name="calculateName(props.name, 'to')"
        design="alternative"
      />
    </div>
  </div>
</template>

<style scoped>
.base-range {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.base-range__input-container {
  display: flex;
  gap: 1rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 0rem;
  }
}

.base-range__label {
  font-size: 1.4rem;
  font-weight: 300;
  line-height: 1.54rem;
  color: #174b7c;
}
.base-range__input {
  flex: 0 0 1;
  width: 100%;
}
</style>
