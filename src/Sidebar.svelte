<script>
 import Guia from './Guia.svelte';
 import { clave } from './store.js';
 $: $clave
</script>

{#if Object.keys($clave).length > 0}
<Guia clave={$clave} />
{/if}
