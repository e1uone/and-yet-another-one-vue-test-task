<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import BaseSelect from './ui/BaseSelect.vue'
import BaseRange from './ui/BaseRange.vue'
import BaseInput from './ui/BaseInput.vue'
import BaseButton from './ui/BaseButton.vue'

import { reactive } from 'vue'

const emit = defineEmits(['successSubmit'])

const phoneMaskaOptions = reactive({
  mask: '+7 (###) ### ## ##',
  eager: true,
})

const schema = yup.object({
  organizationName: yup.string().required(),
  phone: yup
    .string()
    .required()
    .transform((value, originalValue) => {
      const unmaskedValue = originalValue.replace(/\D+/g, '')
      return unmaskedValue
    })
    .length(11, 'Номер телефона должен быть полным'),
  address: yup.string().required(),
  roomType: yup.string().required(),
  roomSq: yup.object({
    from: yup
      .number()
      .required()
      .transform((value, originalValue) => {
        if (originalValue === '') return undefined
        return value
      })
      .positive(),
    to: yup
      .number()
      .required()
      .transform((value, originalValue) => {
        if (originalValue === '') return undefined
        return value
      })
      .positive()
      .test(
        'less-than-to',
        'Максимальная площадь должна быть больше минимальной',
        function (value, options) {
          const { from } = options.parent

          return value > from
        },
      ),
  }),
  dateRange: yup.object({
    from: yup
      .date()
      .typeError('Данные должны являться корректной датой')
      .required()
      .transform((value) => new Date(value)),
    to: yup
      .date()
      .typeError('Данные должны являться корректной датой')
      .required()
      .min(yup.ref('from'), 'Дата окончания не может быть раньше даты начала')
      .transform((value) => new Date(value)),
  }),
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})

const roomTypeOptions = [
  { value: '1', label: 'Производственная площадь' },
  { value: '2', label: 'Офисное помещение' },
  { value: '3', label: 'Складское помещение' },
  { value: '4', label: 'Торговая площадь' },
  { value: '5', label: 'Жилое помещение' },
]

const onSubmit = handleSubmit((values) => {
  const valuesToSend = {
    ...values,
    phone: values.phone.replace(/\D+/g, ''),
  }

  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Submitted', JSON.stringify(valuesToSend, null, 2))
        emit('successSubmit', valuesToSend)
        resolve()
      }, 2000)
    })
  } catch (error) {
    console.log('error', error)
  }
})
</script>
<template>
  <form class="order-form" @submit.prevent="onSubmit">
    <h2 class="order-form__title">Заполните заявку, чтобы стать резидентом</h2>
    <BaseInput label="Наименование организации / ИП" name="organizationName" />

    <BaseInput label="Контактный телефон" name="phone" type="tel" :maska="phoneMaskaOptions" />
    <BaseSelect label="Тип помещения" :options="roomTypeOptions" clearable name="roomType" />
    <BaseInput label="Адрес" name="address" />
    <BaseRange label="Площадь помещения (м2)" name="roomSq" />
    <BaseRange
      label="Дата начала аренды"
      label-from="с"
      label-to="по"
      name="dateRange"
      type="date"
    />
    <div class="order-form__actions">
      <BaseButton :loading="isSubmitting" type="submit" label="Отправить" />
    </div>
  </form>
</template>
<style scoped>
.order-form {
  display: flex;
  flex-direction: column;

  width: 80rem;
  max-width: 100%;
  padding: 4rem;

  @media screen and (max-width: 768px) {
    padding: 2rem;
  }
}
.order-form__title {
  margin-bottom: 4rem;
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 2.64rem;
}
.order-form__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}
</style>
