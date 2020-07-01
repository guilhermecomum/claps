<script>
 export let data
</script>

<style>
 ul {
   text-align: left;
 }

 li {
   color: red;
   list-style: none;
   text-align: lefta;
 }
</style>


<ul>
  {#each data as entry }
  <li>{entry.Nome}</li>
  {/each}
</ul>
