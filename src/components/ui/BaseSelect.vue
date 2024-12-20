<template>
  <div class="base-select" :class="{ 'base-select--focused': isMenuOpened }">
    <label
      :for="$attrs.id"
      class="base-select__label"
      :class="{
        'base-select__label--hidden': isLabelHidden,
        'base-select__label--error-state': errorMessage,
      }"
      @click="focusSelect"
    >
      {{ props.label }}
    </label>

    <input
      :id="$attrs.id"
      :value="inputValue"
      readonly
      role="combobox"
      @focus="handleMenuOpen(true)"
      class="base-select__input"
      :class="{ 'base-select__input--error-state': errorMessage }"
      ref="select"
      v-on="validationListeners"
    />

    <div class="base-select__options" role="listbox" v-if="isMenuOpened" ref="menuListRef">
      <div
        v-for="option in options"
        :key="option.value"
        class="base-select__option"
        :class="{ 'base-select__option--selected': isOptionsSelected(option) }"
        @click="onOptionClick(option)"
        role="option"
        :tabindex="0"
        @keydown.space="onOptionClick(option)"
        @blur="handleSelectBlur($event)"
      >
        {{ option.label }}
      </div>
    </div>

    <div class="base-select__error">
      <transition name="fade">
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </transition>
    </div>
    <button class="base-select__clear-button" @click="handleClear" v-if="isClearBtnShown">
      <ClearIcon class="base-select__clear-icon" />
    </button>

    <DropdownArrow
      class="base-select__dropdown-arrow"
      :class="{ 'base-select__dropdown-arrow--focused': isMenuOpened }"
    />
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useField } from 'vee-validate'
import DropdownArrow from './icons/DropdownArrowIcon.vue'
import ClearIcon from './icons/ClearIcon.vue'

const props = defineProps({
  modelValue: {
    type: [String, Array],
    required: false,
  },
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])

const { errorMessage, value, handleChange, handleBlur } = useField(() => props.name, undefined, {
  validateOnValueUpdate: false,
  initialValue: props.multiple ? [] : '',
  syncVModel: true,
})

const validationListeners = {
  blur: (evt) => {
    handleSelectBlur(evt)
    handleBlur(evt, false)
  },
  change: handleChange,
  input: (evt) => {
    handleChange(evt, !!errorMessage.value)
  },
}

const inputValue = computed(() => {
  if (props.multiple) {
    return value.value.map((v) => props.options.find((o) => o.value === v).label).join(', ')
  }
  return props.options.find((o) => o.value === value.value)?.label
})

const menuListRef = ref(null)

onClickOutside(menuListRef, () => {
  handleMenuOpen(false)
})

const onOptionClick = (option) => {
  if (props.multiple) {
    const selectedValues = Array.isArray(value.value) ? value.value.slice() : []
    const index = selectedValues.indexOf(option.value)

    if (index === -1) {
      selectedValues.push(option.value)
    } else {
      selectedValues.splice(index, 1)
    }
    handleChange(selectedValues)
  } else {
    handleChange(option.value)
    handleMenuOpen(false)
  }
}

const handleSelectBlur = (event) => {
  const focusedElement = event?.relatedTarget
  if (
    !focusedElement ||
    (!focusedElement.classList.contains('base-select__option') &&
      !focusedElement.classList.contains('base-select__input'))
  ) {
    handleMenuOpen(false)
  }
}
const handleClear = () => {
  if (props.multiple) {
    handleChange([])
  } else {
    handleChange('')
  }
}

const isClearBtnShown = computed(() => {
  if (props.multiple) {
    return props.clearable && value.value.length > 0
  }
  return props.clearable && !!value.value
})

const isLabelHidden = computed(() => {
  if (props.multiple) {
    return isMenuOpened.value || value.value.length > 0
  }
  return isMenuOpened.value || !!value.value
})

const isOptionsSelected = (option) => {
  if (props.multiple) {
    return value.value.includes(option.value)
  }
  return value.value === option.value
}

const isMenuOpened = ref(false)

const calculateMenuPosition = () => {
  nextTick(() => {
    const menuRect = menuListRef.value.getBoundingClientRect()
    const viewportHeight = globalThis.innerHeight
    const menuBottom = menuRect.bottom

    if (menuBottom > viewportHeight) {
      menuListRef.value.style.top = 'auto'
      menuListRef.value.style.bottom = '100%'
    } else {
      menuListRef.value.style.top = 'calc(100% - 2rem)'
      menuListRef.value.style.bottom = 'auto'
    }
  })
}

const handleMenuOpen = (value) => {
  isMenuOpened.value = value
  if (value === true) {
    calculateMenuPosition()
  }
}

const select = ref(null)
const focusSelect = () => {
  select.value.focus()
}
</script>

<style scoped>
.base-select {
  position: relative;
}

.base-select__label {
  cursor: text;

  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(calc(50% - 7px));

  padding: 10.5px 20px;

  font-size: 14px;
  font-weight: 300;
  line-height: 15.4px;
  color: #174b7c;

  transition:
    transform 0.2s ease-in-out,
    color 0.2s ease-in-out;
}

.base-select__label--hidden {
  top: 0;
  transform: translateY(0);
}

.base-select__options {
  position: absolute;
  z-index: 1;
  top: 6.4rem;
  right: 0;
  left: 0;

  overflow-y: auto;

  width: 100%;
  max-height: calc(4.48rem * 4);

  background-color: #fff;
  border: 2px solid #f7f8f8;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.base-select__option {
  cursor: pointer;
  user-select: none;

  padding: 0.8rem 1.6rem;

  font-size: 1.8rem;
  font-weight: 500;
  color: #174b7c;
}
.base-select__option:hover,
.base-select__option:focus-visible {
  background-color: #cbe5ff;
  outline: none;
}
.base-select__option--selected {
  background-color: #d5e8fb;
}

.base-select__label--error-state {
  color: red;
}

.base-select__input {
  display: inline-block;

  width: 100%;
  height: 6.4rem;
  padding: 2rem 9rem 1.05rem 2rem;

  font: inherit;
  font-size: 1.8rem;
  font-weight: 500;
  color: #174b7c;

  appearance: none;
  border: 2px solid #f7f8f8;
  border-radius: 6px;

  transition: border 0.2s ease-in-out;
}
.base-select__input:focus-visible {
  outline: #174b7c auto 1px;
}
.base-select__input--error-state {
  border: 2px solid red;
}
.base-select__error {
  height: 2rem;
  font-size: 1.4rem;
  line-height: 2rem;
  color: red;
}

.base-select--focused {
  .base-select__input {
    border: 2px solid #174b7c;
  }
}

.base-select__dropdown-arrow {
  pointer-events: none;

  position: absolute;
  top: 0;
  right: 1.5rem;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 3.2rem;
  height: 6.4rem;

  color: #174b7c;

  transition: transform 0.2s ease-in-out;
}
.base-select__dropdown-arrow--focused {
  transform: rotate(180deg);
}
.base-select__clear-button {
  cursor: pointer;

  position: absolute;
  top: 0;
  right: 4rem;
  bottom: 0;

  display: flex;
  border-spacing: 0;
  align-items: center;
  justify-content: center;

  width: 3.2rem;
  height: 6.4rem;
  margin-top: 0.2rem;

  appearance: none;
  background: none;
  border: none;
  outline: none;
}

.base-select__clear-icon {
  color: #a9a9a9;
}

.base-select__clear-button:hover,
.base-select__clear-button:focus-visible {
  .base-select__clear-icon {
    color: #727272;
  }
}
</style>
