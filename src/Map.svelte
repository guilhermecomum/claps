<script>
 import { onMount, onDestroy } from 'svelte';
 import { mapbox, key } from './mapbox.js';
 import { claves, activeListItem, activeMapItem } from './store.js';
 let container;
 let map;

 function generateFeature({ nome, lat, log }, index) {
   return {
     type: 'Feature',
     properties: {
       description: nome,
       id: index
     },
     geometry: {
       type: 'Point',
       coordinates: [log, lat]
     }
   };
 }

 onMount(async () => {
   map = new mapbox.Map({
     container,
     style: 'mapbox://styles/guerrinha/ckc70179o1sae1ip67q6upbgg',
     center: [$claves[0].log, $claves[0].lat],
     zoom: 3
   });

   map.on('load', function() {
     map.addLayer({
       id: 'places',
       type: 'symbol',
       source: {
         type: 'geojson',
         data: {
           type: 'FeatureCollection',
           features: $claves.map(generateFeature)
         }
       },
       layout: {
         'icon-image': 'cafe-15',
         'icon-size': 2,
         'icon-allow-overlap': true
       }
     });
   });

   map.on('click', 'places', function({ features }) {
     const match = features[0];
     const coordinates = match.geometry.coordinates.slice();
     console.log("match", coordinates)
     // Show popup
     new mapbox.Popup()
               .setLngLat([coordinates[0], coordinates[1]])
               .setHTML(match.properties.description)
               .addTo(map);

     activeListItem.set(match.properties.id);

   });

   map.on('mouseenter', 'places', function() {
     map.getCanvas().style.cursor = 'pointer';
   });

   map.on('mouseleave', 'places', function() {
     map.getCanvas().style.cursor = '';
   });

 });

 // Update map center when active list item is updated via list
 const unsubscribeActiveMapItem = activeMapItem.subscribe(newActiveMapItem => {
   if (map) {
     const item = $claves[newActiveMapItem]
     map.flyTo({
       center: [item.log, item.lat],
       zoom: 4
     });
   }
 });

 onDestroy(unsubscribeActiveMapItem);
</script>

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


<div bind:this={container} />
