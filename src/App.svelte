<style>
  main {
      display: flex;
      justify-content: space-around;
      height: 100%;
  }
  .left {
      width: 30%;
      height: 100%;
  }
  .right {
      width: 70%;
      height: 100%;
  }
</style>

<script>
  import gs2json from './utils.js'
  import List from './List.svelte'
  import { claves, routes, filteredRoutes } from './store.js'
  import Map from './Map.svelte'
  let parsedClaves
  let parsedRoutes

  Sentry.init({
    dsn:
    'https://71d2baf50eb145e9aba10e189286047b@o416341.ingest.sentry.io/5310674',
  })

  const fetchData = (async () => {
    const responseClaves = await fetch(
      `https://spreadsheets.google.com/feeds/cells/1ia-bi_1oIuVbNGtAWsQbF6jrUMp1ef7AuGhepLfTxqM/1/public/full?alt=json`
    )

    const responseRoutes = await fetch(
      `https://spreadsheets.google.com/feeds/cells/1ia-bi_1oIuVbNGtAWsQbF6jrUMp1ef7AuGhepLfTxqM/2/public/full?alt=json`
    )

    const jsonClaves = await responseClaves.json()
    const jsonRoutes = await responseRoutes.json()
    parsedClaves = await gs2json(jsonClaves)
    parsedRoutes = await gs2json(jsonRoutes)
    await claves.set(parsedClaves)
    await routes.set(parsedRoutes)
    await filteredRoutes.set(parsedClaves)
    return parsedClaves
  })()
</script>

<main>
  {#await fetchData}
    <div class="loading">
      <p>carregando...</p>
    </div>
  {:then}
    <div class="left">
      <List />
    </div>
    <div class="right">
      <Map />
    </div>
  {/await}
</main>
