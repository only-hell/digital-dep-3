<template>
  <div class="form-container">
    <form @submit.prevent>
      <label>
        Имя пользователя:
        <input type="text" v-model="user.firstName" />
      </label>
      <br />

      <label>
        Фамилия пользователя:
        <input type="text" v-model="user.lastName" />
      </label>
      <br />

      <label>
        Пол:
        <input type="radio" value="male" v-model="user.gender" /> Мужской
        <input type="radio" value="female" v-model="user.gender" /> Женский
      </label>
      <br />

      <label>
        Пароль:
        <input :type="showPassword ? 'text' : 'password'" v-model="user.password" />
      </label>
      <br />

      <label>
        Подтверждение пароля:
        <input :type="showPassword ? 'text' : 'password'" v-model="user.confirmPassword" />
      </label>
      <br />

      <button
        type="button"
        @click="register"
        :disabled="user.password !== user.confirmPassword"
      >
        Зарегистрироваться
      </button>

      <button
        type="button"
        @mousedown="showPassword = true"
        @mouseup="showPassword = false"
      >
        Показать пароль
      </button>
    </form>

    <p>
      Пользователь: {{ user.firstName }} {{ user.lastName }}.
      {{ user.gender === 'male' ? 'Мужского' : user.gender === 'female' ? 'Женского' : '' }} пола.
    </p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const user = reactive({
  firstName: '',
  lastName: '',
  gender: '',
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)

function register() {
  console.log('Пользователь:', { ...user })
}
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
  font-family: sans-serif;
}
label {
  display: block;
  margin: 0.5rem 0;
}
button {
  margin-right: 0.5rem;
  margin-top: 1rem;
}
</style>
