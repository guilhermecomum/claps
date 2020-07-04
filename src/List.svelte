<script>
 export let data
 import { onMount, onDestroy } from 'svelte';
 import inView from 'in-view'
 import { activeListItem, activeMapItem } from './store.js';
 import Guia from './Guia.svelte';
 let list

 onMount(async () => {
   // Set a nicer offset so it's not a hard cutoff
   inView.offset(200);

   list.addEventListener('scroll', function(e) {
     // Active list item is top-most fully-visible item
     const visibleListItems = Array.from(document.getElementsByClassName('item')).map(inView.is);
     // Array.indexOf() will give us the first one in list, so the current active item

     const topMostVisible = visibleListItems.indexOf(true);
     if (topMostVisible !== $activeMapItem) {
       activeMapItem.set(topMostVisible)
     }
   });

 });

 // Update list scroll position when active list item is updated via map
 const unsubscribeActiveListItem = activeListItem.subscribe(
   newActiveListItem => {
     if (list) {
       list.scrollTop = document.getElementById(
         `guia-${newActiveListItem}`
       ).offsetTop;
     }
   }
 );

 onDestroy(unsubscribeActiveListItem);
</script>

<style>
 .guias {
   display: flex;
   flex-direction: column;
   padding: 0;
   flex-shrink: 0;
   margin: 0;
   overflow: scroll;
   height: 100vh;
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



<div class="guias" bind:this={list}>
  {#each data as clave, index }
  <div class="item" id="guia-{index}">
    <Guia  {clave} />
  </div>
  {/each}
</div>
