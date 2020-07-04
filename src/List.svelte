<script>
 export let data
 import { clave } from './store.js';

 function handleClave(e) {
   clave.set(e)
 }

 $: $clave
 console.log($clave.name)
</script>

<style>
 ul {
   width: 190px;
   padding: 0;
   flex-shrink: 0;
   margin: 0;
 }

 li {
   list-style: none;
   text-align: left;
   cursor: pointer;
   padding: 0 10px;
   height: 40px;
   display: flex;
   flex-direction: column;
   margin-bottom: 9px;
   justify-content: center;
 }

 .active {
   font-weight: bold;
 }
</style>


<ul>

  {#each data as entry }

  <li
    class:active="{entry.nome === $clave.nome}"
    on:click={handleClave(entry)}>
    {entry.nome}
  </li>
  {/each}
</ul>
