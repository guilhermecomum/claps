<script>
  import { onMount, afterUpdate } from 'svelte'
  import Clavis from './clavis.js'
  import Youtube from '@sveltecasts/svelte-youtube'
  const clavis = new Clavis()
  let canvas
  export let clave

  onMount(() => {
    if (clave.guia) {
      clavis.configure(canvas, clave.guia, 120)
      clavis.draw()
    }
  })

  afterUpdate(() => {
    if (clave.guia) {
      clavis.configure(canvas, clave.guia, 120)
      clavis.draw()
    }
  })
</script>

<div class="guia">
  {#if clave.nome && clave.pais}
    <h1>
      {clave.nome}
      <small>{clave.pais}</small>
    </h1>
  {:else}{Sentry.captureMessage('Faltando nome')}{/if}

  <canvas bind:this="{canvas}" width="{200}" height="{200}"></canvas>

  {#if clave.texto}
    <p>{clave.texto}</p>
  {/if}

  {#if clave.youtube}
       <iframe
       width="560"
       height="315"
       src={clave.youtube.replace("watch?v=","embed/")}
       frameborder="0"
       ></iframe>
       {/if}
</div>

<style>
  .embed-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;
  }

  .embed-container iframe,
  .embed-container object,
  .embed-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .guia {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
  }
  h1 {
    text-align: center;
  }
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
