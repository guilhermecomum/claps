<script>
 import { onMount, afterUpdate } from 'svelte';
 import Clavis from './clavis.js'
 import Youtube from "@sveltecasts/svelte-youtube";
 const clavis = new Clavis()
 let canvas
 export let clave

 onMount(() => {
   clavis.configure(canvas, clave.guia, 120)
   clavis.draw()
 });

 afterUpdate(() => {
   clavis.configure(canvas, clave.guia, 120)
   clavis.draw()
 });
</script>


<div class="guia">
  <h1>{clave.nome}<small>{clave.pais}</small></h1>
  <canvas
    bind:this={canvas}
    width={200}
    height={200}
  ></canvas>
  {#if clave.texto}
  <p>{clave.texto}</p>
  {/if}
  <!-- <Youtube videoId={clave.youtube.slice(32)} /> -->
</div>

<style>
 .guia {
   display: flex;
   flex-direction: column;
   width: 600px;
   align-items: center;
 }
 h1 { text-align: center;}
 small {
   color: #8e8e8e;
   display: block;
 }
 canvas {
   width: 200px;
   height: 200px;
 }
</style>
