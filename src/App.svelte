<script>
 import gs2json from './utils.js';
 import List from './List.svelte';
 import mock from './mock.json'
 import { claves } from './store.js';
 import Map from './Map.svelte';
 let parsed

 const fetchData = (async () => {
   const response = await fetch(`https://spreadsheets.google.com/feeds/cells/1ia-bi_1oIuVbNGtAWsQbF6jrUMp1ef7AuGhepLfTxqM/1/public/full?alt=json`);
   const json = await response.json()
   parsed =  await gs2json(json)
   await claves.set(parsed)
   return parsed
 })()

</script>

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

<main>
  {#await fetchData}
  <div class="loading">
    <p>carregando...</p>
  </div>
  {:then data}
  <div class="left">
    <List {data} />
  </div>
  <div class="right">
    <Map />
  </div>
  {/await}
</main>
