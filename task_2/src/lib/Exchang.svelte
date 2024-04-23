<script lang="ts">
  import { getData } from '../api/api'

  const promise = getData()

  let fromAmount = ''
  let toAmount = ''

  let selectedFrom = 1
  let selectedTo = 1

  const exchangFrom = (): number | string => {
    if (fromAmount === '') return ''
    return Math.round((+fromAmount / selectedFrom) * selectedTo * 100) / 100
  }

  const exchangTo = (): number | string => {
    if (toAmount === '') return ''
    return Math.round((+toAmount / selectedTo) * selectedFrom * 100) / 100
  }

  const changeValueFrom = (e) => {
    fromAmount = e.target.value
    toAmount = String(exchangFrom())
  }

  const changeValueTo = (e) => {
    toAmount = e.target.value
    
    fromAmount = String(exchangTo())
  }

  const changeSelectValueFrom = (e) => {
    selectedFrom = Number(e.target.value)
    fromAmount = String(exchangTo())
  }

  const changeSelectValueTo = (e) => {
    selectedTo = Number(e.target.value)
    toAmount = String(exchangFrom())
  }
</script>

<div class="exchang">
  <div class="exchang__input-wrapper">
    <select
      class="exchang__input"
      name=""
      id=""
      on:change={changeSelectValueFrom}
      bind:value={selectedFrom}
    >
      {#await promise then data}
        <option value={data.rates.USD}>Доллар</option>
        <option value={data.rates.EUR}>Евро</option>
        <option value={data.rates.RUB}>Рубль</option>
        <option value={data.rates.GBP}>Фунт</option>
        <option value={data.rates.CZK}>Чешка крона</option>
        <option value={data.rates.KZT}>Тенге</option>
        <option value={data.rates.TRY}>Турецкая лира</option>
      {/await}
    </select>
    <input
      class="exchang__input"
      on:input={changeValueFrom}
      bind:value={fromAmount}
      type="number"
    />
  </div>
  <p>&harr;</p>
  <div class="exchang__input-wrapper">
    <select
      class="exchang__input"
      name=""
      id=""
      on:change={changeSelectValueTo}
      bind:value={selectedTo}
    >
      {#await promise then data}
        <option value={data.rates.USD}>Доллар</option>
        <option value={data.rates.EUR}>Евро</option>
        <option value={data.rates.RUB}>Рубль</option>
        <option value={data.rates.GBP}>Фунт</option>
        <option value={data.rates.CZK}>Чешка крона</option>
        <option value={data.rates.KZT}>Тенге</option>
        <option value={data.rates.TRY}>Турецкая лира</option>
      {/await}
    </select>
    <input
      class="exchang__input"
      bind:value={toAmount}
      type="number"
      on:input={changeValueTo}
    />
  </div>
</div>

<style>
  .exchang {
    display: flex;
    gap: 50px;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
  }

  .exchang__input-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 10px;
  }

  .exchang__input {
    height: 50px;
    max-width: 400px;
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    margin: 0;
    font-size: 24px;
  }
</style>
