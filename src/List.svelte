<style>
  .guias {
    display: flex;
    flex-direction: column;
    padding: 0;
    flex-shrink: 0;
    margin: 0;
    overflow-y: scroll;
    height: 100vh;
  }

  .filters {
    margin: 0;
    padding: 0;
    display: flex;
    border-bottom: 2px solid #eee;
    position: fixed;
    background: #fff;
    width: 100%;
  }

  .filter {
    padding: 10px;
    margin: 0;
    text-transform: uppercase;
    color: #8e8e8e;
  }

  .claves {
    padding-top: 80px;
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
    border-bottom: 2px solid #8e8e8e;
  }
</style>

<script>
  import { onMount, onDestroy } from 'svelte'
  import inView from 'in-view'

  import {
    claves,
    routes,
    filteredRoutes,
    activeListItem,
    activeMapItem,
  } from './store.js'
  import Guia from './Guia.svelte'

  let list
  let clavesContainer
  let activeRoute = 0
  let filteredData = $claves
  onMount(async () => {
    // Set a nicer offset so it's not a hard cutoff
    inView.offset(300)

    list.addEventListener('scroll', function (e) {
      // Active list item is top-most fully-visible item
      const visibleListItems = Array.from(
        document.getElementsByClassName('item')
      ).map(inView.is)
      // Array.indexOf() will give us the first one in list, so the current active item

      const topMostVisible = visibleListItems.indexOf(true)
      if (topMostVisible !== $activeMapItem) {
        activeMapItem.set(topMostVisible)
      }
    })
  })

  const handleFilter = async (routeIndex) => {
    activeRoute = routeIndex
    const { nome, ...steps } = $routes[routeIndex]
    const routeSteps = Object.values(steps)
    filteredData = []
    routeSteps.forEach((route) =>
      filteredData.push($claves.find((clave) => clave.id == route))
    )
    list.scrollTop = 0
    filteredRoutes.set(filteredData)
  }

  // Update list scroll position when active list item is updated via map
  const unsubscribeActiveListItem = activeListItem.subscribe(
    (newActiveListItem) => {
      if (list) {
        list.scrollTop = document.getElementById(
          `guia-${newActiveListItem}`
        ).offsetTop
      }
    }
  )

  onDestroy(unsubscribeActiveListItem)
</script>

<div class="guias" bind:this="{list}">
  <ul class="filters">
    {#each $routes as route, index}
      <li
        class="filter"
        class:active="{activeRoute === index}"
        on:click="{() => handleFilter(index)}"
      >
        {route.nome}
      </li>
    {/each}
  </ul>
  <div class="claves">
    {#each filteredData as clave}
      <div class="item" id="guia-{clave.id}">
        <Guia clave="{clave}" />
      </div>
    {/each}
  </div>
</div>
