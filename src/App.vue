<script setup>
import { ModalsContainer, useModal } from 'vue-final-modal'
import BaseSelect from './components/ui/BaseSelect.vue'
import BaseButton from './components/ui/BaseButton.vue'
import { ref } from 'vue'

import OrderModal from './components/OrderModal.vue'

const { open: openModal, close: closeModal } = useModal({
  component: OrderModal,
  attrs: {
    onConfirm(event) {
      submitResult.value = event
      closeModal()
    },
  },
})

const roomTypeOptions = [
  { value: '1', label: 'Производственная площадь' },
  { value: '2', label: 'Офисное помещение' },
  { value: '3', label: 'Складское помещение' },
  { value: '4', label: 'Торговая площадь' },
  { value: '5', label: 'Жилое помещение' },
]

const roomType = ref([])
const submitResult = ref('')
</script>

<template>
  <main class="main">
    <ModalsContainer />
    <div class="main__content">
      <BaseButton @click="openModal()">Открыть модалку</BaseButton>
      <BaseSelect
        label="(множественный выбор)"
        :options="roomTypeOptions"
        multiple
        clearable
        v-model="roomType"
        name="someRandomName"
      />
      <pre class="debug">
        отправленная форма:
        {{ submitResult || 'пока ничего' }}
        множественный выбор:
        {{ roomType }}
      </pre>
    </div>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.main__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 40rem;
  max-width: 100%;
}

.debug {
  height: 30rem;
  white-space: pre-line;
}
</style>
