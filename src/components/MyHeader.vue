<script setup lang='ts'>
import { toggleDark } from '~/composables'
const route = useRoute()
console.log(route)
</script>

<template>
  <div id="my-header" class="z-10">
    <div style="cursor: default; display: flex; align-items: center;">
      PHOTO
    </div>
    <div class="flex gap-6 justify-center items-center">
      <div @click="toggleDark()">
        <button
          aria-label="Affichage du Mode Sombre/Lumineux"
          class="menu toggle fixed-el"
        >
          <div>
            <svg
              class="sun origin-center translate-y-0 animate-[20s_linear_infinite_spin] fill-jet stroke-jet dark:translate-y-16 dark:animate-none dark:fill-white dark:stroke-white"
              viewBox="0 0 24 24"
            >
              <path d="M1 12h1m2.2-7.8.7.7M12 1v1m7.8 2.2-.7.7M23 12h-1m-2.2 7.8-.7-.7M12 23v-1m-7.8-2.2.7-.7" />
              <circle cx="12" cy="12" r="6" />
            </svg>
            <svg
              class="moon translate-y-16 fill-jet stroke-jet dark:translate-y-0 dark:fill-white dark:stroke-white"
              viewBox="0 0 24 24"
            >
              <path d="M18 16A10 10 0 0 1 8 6c0-.9.1-1.8.4-2.6A9.9 9.9 0 0 0 1 13a10 10 0 0 0 10 10c4.6 0 8.5-3.1 9.6-7.4-.8.3-1.7.4-2.6.4z" />
              <path d="M15 1v4m-2-2h4" class="star-1" />
              <path d="M21 7v4m-2-2h4" class="star-2" />
            </svg>
          </div>
        </button>
      </div>
      <div v-if="route.path !== '/'">
        <router-link to="/">
          主页
        </router-link>
      </div>
      <div v-if="route.path !== '/gallery'">
        <router-link to="/gallery">
          摄影集
        </router-link>
      </div>
      <div v-if="route.path !== '/about'">
        <router-link to="/about">
          关于我
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
#my-header {
  position: fixed;
  top: 20px;
  width: 100vw;
  /* border: 1px solid; */
  font-size: 24px;
  font-weight: 700;
  padding-left: 20px;
  padding-right: 30px;
  display: flex;
  justify-content: space-between;
}

/*
Menu Burger
*/
.menu {
  width: var(--dimensions);
  height: var(--dimensions);
  --dimensions: 40px;
  color: currentColor;
}

/* @media (min-width: 768px) and (min-height: 576px) {
  .menu {
    --dimensions: 50px;
  }
} */

/* DARK MODE BUTTON */

.toggle {
  position: relative;
  z-index: 1;
  padding: 0;
  margin: 0;
  display: block;
  width: var(--dimensions);
  height: var(--dimensions);
}

.toggle svg {
  display: block;
  stroke-linecap: square;
  stroke-linejoin: round;
  position: absolute;
  left: var(--left, -2px);
  top: var(--top, 14px);
  stroke-width: var(--stroke-width, 2px);
}

.toggle svg.line {
  --stroke-width: 3px;
  width: 52px;
  height: 36px;
  stroke-width: 3px;
  stroke-linecap: square;
}

.toggle div {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  left: 0px;
  top: 0px;
}

.toggle svg.sun {
  --left: 5px;
  --top: 5px;
  width: calc(var(--dimensions) - 10px);
  height: calc(var(--dimensions) - 10px);
}

.toggle svg.moon {
  --left: calc((var(--dimensions) - (0.8 * (var(--dimensions) - 10px))) / 2);
  --top: calc((var(--dimensions) - (0.8 * (var(--dimensions) - 10px))) / 2);
  width: calc(0.8 * (var(--dimensions) - 10px));
  height: calc(0.8 * (var(--dimensions) - 10px));
}

.moon .star-1 {
  transform-origin: 15px 3px;
  animation: star 5s linear infinite;
}

.moon .star-2 {
  transform-origin: 21px 9px;
  animation: star2 5s linear infinite;
}

@keyframes star {
  5%,
  20% {
    opacity: 0;
    transform: scale(0) rotate(90deg) translateZ(0);
  }

  25%,
  100% {
    opacity: 1;
    transform: scale(1) rotate(180deg) translateZ(0);
  }
}

@keyframes star2 {
  0%,
  60% {
    opacity: 1;
    transform: scale(1) rotate(0) translateZ(0);
  }

  65%,
  70% {
    opacity: 0;
    transform: scale(0) rotate(90deg) translateZ(0);
  }

  75%,
  100% {
    opacity: 1;
    transform: scale(1) rotate(180deg) translateZ(0);
  }
}
</style>
