<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().required().email(),
})

const { defineField, handleSubmit } = useForm({
  validationSchema: schema,
})

const [email, emailAttrs] = defineField('email', {
  validateOnModelUpdate: false,
})

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})
</script>
<template>
  <form class="order-form" @submit.prevent="onSubmit">
    <input v-model="email" v-bind="emailAttrs" type="text" />
    <button type="submit">Confirm</button>
  </form>
</template>
<style scoped></style>
