<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { routeStore } from '~/store/piniaStore'
const emits = defineEmits<{
  (e: 'preCompeted'): void
}>()
// const { $gsap: gsap } = useNuxtApp()

// const isLock = scrollStore()
// const isRoute = routeStore()
const isRoute = routeStore()
onMounted(() => {
  const preloaderContainer = document.querySelector(
    '#preloader-container',
  ) as HTMLDivElement
  gsap
    .timeline()
    .to('#quadbz2', {
      attr: {
        d: 'M 0 0 V 70 Q 50 90 100 70 V 0 z',
      },
      duration: 0.3,
      ease: 'power3.in',
      delay: 0.5,
    })
    .to('#quadbz2', {
      attr: {
        d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z',
      },
      duration: 0.8,
      ease: 'power3',
      onComplete: () => {
        preloaderContainer.style.display = 'none'
        // emits('preCompeted')
        // console.log('preCompeted')
        // isRoute.isNewPage++
        // isLock.$patch({
        //   isReady: false,
        // })
        // isRoute.isNewPage++
      },
    })
    .to('#preloader-container', {
      duration: 0.4,
      onComplete: () => {
        emits('preCompeted')
        console.log('preCompeted')
        isRoute.isNewPage++
      },
    }, '<')
    // .fromTo(
    //   '#logoBO',
    //   {
    //     yPercent: 0,
    //   },
    //   {
    //     yPercent: -100,
    //     duration: 1.4,
    //     ease: 'power4.out',
    //   },
    //   2,
    // )
})
</script>

<template>
  <div
    id="preloader-container"
    class="preloader"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      class="svg1"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        id="quadbz2"
        stroke="tranparent"
        vector-effect="non-scaling-stroke"
        d="M 0 0 V 100 Q 50 100 100 100 V 0 z"
      />
    </svg>
  </div>
</template>

<style scoped>
.preloader {
  position: fixed;
  z-index: 50;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.svg1 {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  fill: #d1d3e0;
}
.dark .svg1 {
  fill: #fba77d;
}
</style>
