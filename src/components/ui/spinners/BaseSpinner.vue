<template>
  <span class="base-spinner"></span>
</template>
<style scoped>
.base-spinner {
  display: inline-block;

  box-sizing: border-box;
  width: 2rem;
  height: 2rem;

  border: 3px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;

  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
