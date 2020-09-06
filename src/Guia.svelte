<style lang="scss">
  $breakpoint-tablet: 460px;

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
    min-height: 100vh;
    .body {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
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

  @media (max-width: $breakpoint-tablet) {
    .guia {
      position: absolute;
      bottom: 0px;
      height: 80px;
      min-height: 80px;
      display: block;
      width: 100%;
      background: white;
      z-index: 2;
      &.active {
        bottom: 200px;
      }
      .body {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
      }
    }

    iframe {
      width: 100%;
    }
    canvas {
      width: 80px;
      height: 80px;
    }

    h1 {
      text-align: left;
      font-size: 18px;
    }
  }
</style>

<script>
  import { onMount, afterUpdate } from 'svelte'
  import Clavis from './clavis.js'
  //import Youtube from '@sveltecasts/svelte-youtube'
  const clavis = new Clavis()
  let canvas
  let screenWidth = window.matchMedia('(max-width: 460px)')
  let showMore = false
  export let clave

  onMount(() => {
    if (clave.guia) {
      if (screenWidth.matches) {
        clavis.configure(canvas, clave.guia)
        clavis.draw(80, 80, 30)
      } else {
        clavis.configure(canvas, clave.guia)
        clavis.draw(200, 200, 80)
      }
    }
  })

  afterUpdate(() => {
    if (clave.guia) {
      if (screenWidth.matches) {
        clavis.configure(canvas, clave.guia)
        clavis.draw(80, 80, 30)
      } else {
        clavis.configure(canvas, clave.guia)
        clavis.draw(200, 200, 80)
      }
    }
  })

  const handleDetails = () => {
    if (screenWidth.matches) {
      showMore = !showMore
    }
  }
</script>

<div class="guia" class:active="{showMore}" on:click="{() => handleDetails()}">
  <div class="body">
    <h1>{clave.nome} <small>{clave.pais}</small></h1>

    <canvas bind:this="{canvas}" width="{200}" height="{200}"></canvas>

    {#if clave.texto && !screenWidth.matches}
      <p class="texto">{clave.texto}</p>
    {/if}
  </div>

  {#if showMore}
    {#if clave.texto}
      <p class="texto">{clave.texto}</p>
    {/if}
    {#if clave.youtube}
      <iframe
        width="560"
        height="315"
        src="{clave.youtube.replace('watch?v=', 'embed/')}"
        frameborder="0"
      ></iframe>
    {/if}
  {/if}

  {#if clave.youtube && !screenWidth.matches}
    <iframe
      width="560"
      height="315"
      src="{clave.youtube.replace('watch?v=', 'embed/')}"
      frameborder="0"
    ></iframe>
  {/if}
</div>
