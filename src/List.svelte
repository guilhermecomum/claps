<script>
 export let data
 import { clave } from './store.js';

 function handleClave(e) {
   clave.set(e)
 }
</script>

<style>
 ul {
   text-align: left;
 }

 li {
   list-style: none;
   text-align: left;
   cursor: pointer;

 }
</style>


<ul>
  {#each data as entry }
  <li on:click={handleClave(entry)}>{entry.Nome}</li>
  {/each}
</ul>
