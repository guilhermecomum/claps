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
  <!-- <iframe
       width="100%"
       height="100%"
       src={clave.youtube.replace("watch?v=","embed/")}
       frameborder="0"
       allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
</div>

<style>
 iframe {
   width: 100%;
   height: auto;
 }
 .guia {
   display: flex;
   flex-direction: column;
   align-items: center;
   min-height: 100vh;
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
 p {
   padding: 0 20px;
 }
</style>
