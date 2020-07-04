<script>
 import { onMount, setContext } from 'svelte';
 import { mapbox, key } from './mapbox.js';
 let container;
 let map;

 onMount(async () => {
   map = new mapbox.Map({
     container,
     style: 'mapbox://styles/guerrinha/ckc70179o1sae1ip67q6upbgg',
     center: [-74.5, 40],
     zoom: 2
   });
 });
</script>

<style>
 div {
   width: 100%;
 }

 div:before {
   box-shadow: 20px 0 10px -10px rgba(0, 0, 0, 0.15) inset;
   content: '';
   height: 100%;
   left: 0;
   position: absolute;
   width: 20px;
   z-index: 1000;
 }
</style>


<div bind:this={container} />
