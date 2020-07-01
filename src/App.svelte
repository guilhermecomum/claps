<script>
 import gs2json from './utils.js';
 import List from './List.svelte';
 const fetchData = (async () => {
   const response = await fetch(`https://spreadsheets.google.com/feeds/cells/1ia-bi_1oIuVbNGtAWsQbF6jrUMp1ef7AuGhepLfTxqM/1/public/full?alt=json`);
   const json = await response.json()
   const data =  await gs2json(json)
   return data
 })()
</script>

<main>
  {#await fetchData}
  <p>...carregando</p>
  {:then data}
    <List {data} />
  {:catch error}
  <p>An error occurred!</p>
  {/await}

</main>
