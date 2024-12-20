<script setup>
import { ref, computed } from 'vue'
import { useField } from 'vee-validate'
import { vMaska } from 'maska/vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
    default: '',
  },
  type: {
    type: String,
    required: false,
    default: 'text',
  },
  maska: {
    type: Object,
    required: false,
    default: null,
  },
  design: {
    type: String,
    required: false,
    default: 'default', // default, alternative
  },
})

const { errorMessage, value, handleChange, handleBlur } = useField(() => props.name, undefined, {
  validateOnValueUpdate: false,
  syncVModel: true,
})

const validationListeners = {
  blur: (evt) => handleBlur(evt, true),
  change: handleChange,
  input: (evt) => handleChange(evt, !!errorMessage.value),
}

const isFocused = ref(false)
const input = ref(null)
const focusInput = () => {
  input.value.focus()
}

const isLabelHidden = computed(() => {
  return props.type === 'date' || isFocused.value || !!value.value
})
</script>

<template>
  <div class="base-input" :class="{ 'base-input--alternative': props.design === 'alternative' }">
    <label
      :for="$attrs.id"
      class="base-input__label"
      :class="{
        'base-input__label--hidden': isLabelHidden,
        'base-input__label--error-state': errorMessage,
      }"
      @click="focusInput"
    >
      {{ props.label }}
    </label>
    <input
      v-maska="props.maska"
      :id="$attrs.id"
      v-model="value"
      @focus="isFocused = true"
      @blur="isFocused = false"
      class="base-input__input"
      :class="{ 'base-input__input--error-state': errorMessage }"
      :type="props.type"
      ref="input"
      v-on="validationListeners"
    />
    <div class="base-input__error">
      <transition name="fade">
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.base-input {
  position: relative;
}

.base-input__label {
  cursor: text;

  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(calc(50% - 0.7rem));

  padding: 1.05rem 2rem;

  font-size: 1.4rem;
  font-weight: 300;
  line-height: 1.54rem;
  color: #174b7c;

  transition:
    transform 0.2s ease-in-out,
    color 0.2s ease-in-out;
}

.base-input__label--hidden {
  transform: translateY(0);
}
.base-input__label--error-state {
  color: red;
}

.base-input__input {
  width: 100%;
  height: 6.4rem;
  padding: 2rem 2rem 1.05rem;

  font-family: inherit;
  font-size: 1.8rem;
  font-weight: 500;
  color: #174b7c;

  border: 2px solid #f7f8f8;
  border-radius: 6px;

  transition: border 0.2s ease-in-out;
}

.base-input__input:focus-visible {
  outline: #174b7c auto 1px;
}

.base-input__input--error-state {
  border: 2px solid red;
}

.base-input__error {
  height: 2rem;
  font-size: 1.4rem;
  line-height: 2rem;
  color: red;
}

.base-input--alternative {
  .base-input__label {
    top: 50%;
    bottom: 0;
    left: 0;
    transform: translateY(calc(-50% - 0.7rem));
  }
  .base-input__input {
    direction: rtl;
    padding: 2rem 2rem 2rem 10rem;
    text-align: right;
  }
}

/* reset */

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  margin: 0;
  -webkit-appearance: none;
}

input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}
input[type='date'] {
  cursor: text;
}
input[type='date']::-webkit-calendar-picker-indicator {
  display: none;
}
</style>
