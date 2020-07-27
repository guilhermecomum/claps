<style>
  div {
    width: 100%;
    height: 100%;
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

<script>
  import { onMount, onDestroy } from 'svelte'
  import { mapbox, key } from './mapbox.js'
  import {
    claves,
    filteredRoutes,
    activeListItem,
    activeMapItem,
  } from './store.js'
  import { isLatitude, isLongitude } from './utils.js'
  import { lineString } from '@turf/helpers'
  let container
  let map

  function generateRoute(route) {
    const { nome, ...steps } = route
    let places = Object.values(steps)
    let coords = []
    places.forEach((place) => {
      const { lat, log } = place
      coords.push([log, lat])
    })

    return coords
  }

  function generateFeature({ id, nome, lat, log }) {
    if (isLatitude(lat) && isLongitude(log)) {
      return {
        type: 'Feature',
        properties: {
          description: nome,
          id: id,
        },
        geometry: {
          type: 'Point',
          coordinates: [log, lat],
        },
      }
    } else {
      return {}
    }
  }

  onMount(async () => {
    map = new mapbox.Map({
      container,
      style: 'mapbox://styles/guerrinha/ckc70179o1sae1ip67q6upbgg',
      center: [parseFloat($claves[0].lat), parseFloat($claves[0].log)],
      zoom: 3,
    })

    map.on('load', function () {
      map.addLayer({
        id: 'places',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: $filteredRoutes.map(generateFeature),
          },
        },
        layout: {
          'icon-image': 'cafe-15',
          'icon-size': 2,
          'icon-allow-overlap': true,
        },
      })

      map.addLayer({
        id: 'routes',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: generateRoute($filteredRoutes),
            },
          },
        },
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': '#fff',
          'line-width': 2,
          'line-opacity': 0.8,
        },
      })
    })

    map.on('click', 'places', function ({ features }) {
      const match = features[0]
      const coordinates = match.geometry.coordinates.slice()
      //let line = lineString([[-33.044279 ,-55.602114], [-22.906972 , -43.195715]], {name: 'lin 1'});
      if (isLatitude(coordinates[0]) && isLongitude(coordinates[1])) {
        // Show popup
        new mapbox.Popup()
          .setLngLat([coordinates[0], coordinates[1]])
          .setHTML(match.properties.description)
          .addTo(map)

        activeListItem.set(match.properties.id)
      }
    })

    map.on('mouseenter', 'places', function () {
      map.getCanvas().style.cursor = 'pointer'
    })

    map.on('mouseleave', 'places', function () {
      map.getCanvas().style.cursor = ''
    })
  })

  // Update map center when active list item is updated via list
  const unsubscribeActiveMapItem = activeMapItem.subscribe(
    (newActiveMapItem) => {
      const item = $filteredRoutes[newActiveMapItem]
      if (map && isLatitude(item.lat) && isLongitude(item.log)) {
        map.flyTo({
          center: [item.log, item.lat],
          zoom: 4,
        })
      }
    }
  )

  const unsubscribeSelectedRoute = filteredRoutes.subscribe(
    async (newRoute) => {
      if (newRoute && map) {
        const newData = {
          type: 'FeatureCollection',
          features: newRoute.map(generateFeature),
        }
        const newRoutes = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: generateRoute(newRoute),
          },
        }

        map.getSource('routes').setData(newRoutes)
        map.getSource('places').setData(newData)
        const item = newRoute[0]
        map.flyTo({
          center: [item.log, item.lat],
          zoom: 4,
        })
      }
    }
  )

  onDestroy(unsubscribeActiveMapItem, unsubscribeSelectedRoute)
</script>

<div bind:this="{container}"></div>
