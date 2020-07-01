<script>
 import gs2json from './utils.js';
 import List from './List.svelte';
 import Sidebar from './Sidebar.svelte';
 import mock from './mock.json'
 import { claves, clave } from './store.js';
 let data
 const fetchData = (async () => {
   const response = await fetch(`https://spreadsheets.google.com/feeds/cells/1ia-bi_1oIuVbNGtAWsQbF6jrUMp1ef7AuGhepLfTxqM/1/public/full?alt=json`);
   const json = await response.json()
   return data =  await gs2json(json)
 })()
 let clave_value
 function selectClave(selected) {
   clave.set(selected)
 }

 //const data = gs2json(mock)
 claves.set(data)
</script>

<style>
 main {
   display: flex;
   justify-content: space-around;
 }
</style>

<main>
  {#await fetchData}
  carregando...
  {:then data}
  <List {data} />
  <Sidebar />
  {/await}
</main>
p
