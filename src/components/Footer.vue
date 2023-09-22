<template>
  <footer class="bg-black footer w-full">
    {{ $route.params.id }}
    <div class="white">Footer</div>
  </footer>
</template>

<style>
.w-full{
  width: 100%;
}
.white {
  color: white;
}
.bg-black {
  background-color: black;
}
.footer {
  position: absolute;
  bottom: 0;
}
</style>
