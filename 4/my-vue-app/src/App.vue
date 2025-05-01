<template>
  <div style="max-width: 500px; margin: 0 auto; font-family: sans-serif;">
    <h1>УЧЁТ РАСХОДОВ</h1>

    <div v-if="history.length > 0">
      <h2>Баланс: {{ totalBalance }}</h2>
      <p>
        Расходы: {{ outcomeBalance }}
        Доходы: {{ incomeBalance }}
      </p>

      <ul>
        <li v-for="transaction in history" :key="transaction.id" style="margin: 10px 0;">
          <strong>{{ transaction.text }}</strong><br />
          <span :style="{ color: transaction.amount >= 0 ? 'green' : 'red' }">
            {{ transaction.amount >= 0 ? '+' : '' }}{{ transaction.amount }}
          </span>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Вы не совершали финансовых операций</p>
    </div>

    <hr />

    <h3>Введите название</h3>
    <input v-model.trim="title" type="text" placeholder="Например: Зарплата" />

    <h3>Введите сумму</h3>
    <input v-model.number="amount" type="number" placeholder="Например: 5000" />

    <br /><br />
    <button @click="addTransaction">Добавить</button>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  setup () {
    const history = ref([])

    const title = ref('')
    const amount = ref(0)

    const addTransaction = () => {
      if (!title.value || !amount.value) return

      history.value.push({
        id: Date.now(),
        text: title.value,
        amount: amount.value
      })

      title.value = ''
      amount.value = 0
    }

    const incomeBalance = computed(() =>
      history.value
        .filter(item => item.amount > 0)
        .reduce((sum, item) => sum + item.amount, 0)
    )

    const outcomeBalance = computed(() =>
      history.value
        .filter(item => item.amount < 0)
        .reduce((sum, item) => sum + item.amount, 0)
    )

    const totalBalance = computed(() =>
      incomeBalance.value + outcomeBalance.value
    )

    return {
      history,
      title,
      amount,
      addTransaction,
      incomeBalance,
      outcomeBalance,
      totalBalance
    }
  }
}
</script>

<style>
input {
  width: 100%;
  padding: 8px;
  margin: 4px 0;
  box-sizing: border-box;
}
button {
  padding: 10px 20px;
  cursor: pointer;
}
</style>
