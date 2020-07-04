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


<div>
  <h1>{clave.nome}</h1>
  <canvas
    bind:this={canvas}
    width={300}
    height={300}
  ></canvas>
{#if clave.texto}
  <p>{clave.texto}</p>
  {/if}
  <!-- <Youtube videoId={clave.youtube.slice(32)} /> -->
</div>
