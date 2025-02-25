<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import axios from 'axios'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import MyHeader from './components/MyHeader.vue'
import Preload from './components/Preload.vue'
import type { ImageInfo } from './store/piniaStore'
import { dataStore, routeStore } from './store/piniaStore'
import { all } from '~/assets/data/test'
const isRoute = routeStore()
const isData = dataStore()

const list = ref<[string, ImageInfo[]][]>([])
const patt = /\/.*\//
const url = import.meta.env.MODE === 'development' ? 'api/v1/files' : 'https://api.imagekit.io/v1/files'
// axios.get(url, {
//   headers: { Authorization: 'Basic cHJpdmF0ZV9YbnJhOVYyVG5LYjFIU0dCSmpCWXlqOUdxMVE9OjIwMDA0MzA=' },
// }).then((res) => {
//   console.log('axios get ------------- 只一次')
//   res.data.forEach((el: ImageInfo & { tags: null | string[] }) => {
//     if (el.tags && el.tags.includes('trans')) {
//       const temp = el.height
//       el.height = el.width
//       el.width = temp
//     }
//     if (patt.test(el.filePath)) {
//       const folder = patt.exec(el.filePath)![0]
//       const folderFix = folder.slice(1, folder.length - 1)
//       const info: ImageInfo = {
//         name: el.name,
//         filePath: el.filePath,
//         height: el.height,
//         width: el.width,
//         url: el.url,
//         fixUrl: `${el.url}?tr=w-720,h-${720 * el.height / el.width}`,
//       }
//       let find = false
//       list.value.forEach((list) => {
//         if (list[0] === folderFix) {
//           find = true
//           list[1].push(info)
//         }
//       })
//       if (!find)
//         list.value.push([folderFix, [info]])
//     }
//   })
//   console.log(list.value)
//   // isDataReady.isReady = true
//   isData.data = list.value
//   // changeAlbum(defaultAlbum)
// })

function removeUpdatedAt(url: string) {
  return url.replace(/\?updatedAt=\d+/, '')
}

all.reverse().forEach((el: ImageInfo & { tags: null | string[] } & any) => {
  if (el.tags && el.tags.includes('trans')) {
    const temp = el.height
    el.height = el.width
    el.width = temp
  }
  if (patt.test(el.filePath)) {
    const folder = patt.exec(el.filePath)![0]
    const folderFix = folder.slice(1, folder.length - 1)
    const info: ImageInfo = {
      name: el.name,
      filePath: el.filePath,
      height: el.height,
      width: el.width,
      url: el.url,
      fixUrl: removeUpdatedAt(`${el.url}?tr=w-720,h-${720 * el.height / el.width}`),
    }
    let find = false
    list.value.forEach((list) => {
      if (list[0] === folderFix) {
        find = true
        list[1].push(info)
      }
    })
    if (!find)
      list.value.push([folderFix, [info]])
  }
})
console.log(list.value)
isData.data = list.value

const init1 = 'M 0 100 V 100 Q 50 100 100 100 V 100 z'
const start1 = 'M 0 100 V 50 Q 50 0 100 50 V 100 z'
const end1 = 'M 0 100 V 0 Q 50 0 100 0 V 100 z'
const init2 = 'M 0 0 V 100 Q 50 100 100 100 V 0 z'
const start2 = 'M 0 0 V 50 Q 50 0 100 50 V 0 z'
const end2 = 'M 0 0 V 0 Q 50 0 100 0 V 0 z'

const onBeforeLeave = (_el: Element) => {
  console.log('onBeleave')
  // isLock.$patch({
  //   isReady: true,
  // })
  ScrollTrigger.killAll()
}

const waveHidden = ref(true)

const isPreCompeted = ref(false)

const onLeave = (_el: Element, done: any) => {
  console.log('onleave')
  // const menuItems = document.querySelectorAll(
  //   '.menu-item',
  // ) as NodeListOf<HTMLAnchorElement>
  // const navbar = document.querySelector('#navbar') as HTMLDivElement
  // const buttonBurger = document.querySelector(
  //   '#button-burger',
  // ) as HTMLButtonElement
  gsap
    .timeline()
    .set('#quadbz', {
      attr: {
        d: init1,
      },
    })
    .to('#quadbz', {
      onStart: () => {
        waveHidden.value = false
        // menuItems.forEach((Navlink) => {
        //   Navlink.classList.add('pointer-events-none')
        // })
      },
      duration: 0.5,
      attr: { d: start1 },
      ease: 'power3.in',
    })
    .to('#quadbz', {
      duration: 0.3,
      attr: { d: end1 },
      ease: 'power3',
      onComplete: () => {
        const Smooth = ScrollSmoother.get() as globalThis.ScrollSmoother
        if (Smooth)
          Smooth.scrollTop(0)

        else
          window.scrollTo({ top: 0 })

        done()
        // buttonBurger.classList.remove('is-hovered', 'is-open')
        // navbar.classList.replace('block', 'hidden')
      },
    })
  // .to(
  //   '#to-offset',
  //   {
  //     duration: 0.8,
  //     yPercent: 3,
  //     ease: 'power3.in',
  //   },
  //   0,
  // )
  // .to(
  //   menuItems,
  //   {
  //     duration: 0.8,
  //     opacity: 0,
  //     y: -100,
  //     stagger: 0.05,
  //     ease: 'power2.inOut',
  //     onComplete: () => {
  //       // menuItems.forEach((Navlink) => {
  //       //   Navlink.classList.remove('pointer-events-none')
  //       // })
  //     },
  //   },
  //   0,
  // )
  // .to(
  //   '#content__drag-area',
  //   {
  //     duration: 1,
  //     opacity: 0,
  //     y: -200,
  //     ease: 'power3.inOut',
  //     onComplete: done,
  //   },
  //   0,
  // )
}

function onEnter(_el: Element, done: any) {
  console.log('onEnter')
  gsap
    .timeline()
    .set('#quadbz', {
      attr: {
        d: init2,
      },
    })
    .to('#quadbz', {
      duration: 0.3,
      attr: { d: start2 },
      ease: 'power3.in',
      onComplete: () => {
        done()
      },
    })
    .to('#quadbz', {
      duration: 0.5,
      attr: { d: end2 },
      ease: 'power3',
      onComplete: () => {
        waveHidden.value = true
        done()
      },
    })
  // .to(
  //   '#to-offset',
  //   {
  //     duration: 0.8,
  //     yPercent: 0,
  //     ease: 'power3.out',
  //     onComplete: done,
  //   },
  //   0,
  // )
  // setTimeout(() => {
  //   isRoute.isNewPage++
  //   console.log('isNewPage++')
  // }, 100)
}

const onAfterEnter = (_el: Element) => {
  console.log('onAfterEnter')
  ScrollTrigger.refresh()
  if (isPreCompeted.value) {
    console.log('enter触发动画')
    isRoute.isNewPage++
  }

  // setTimeout(() => {
  //   isRoute.isNewPage++
  //   console.log('isNewPage++')
  // }, 100)
  // delay(100).then(() => {
  //   isLock.$patch({
  //     isReady: false,
  //   })
  // })
}
</script>

<template>
  <Preload @pre-competed="isPreCompeted = true" />

  <MyHeader />

  <svg
    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" :class="{ hidden: waveHidden }"
    class="pointer-events-none fixed left-0 top-0 z-[1000] h-full w-full fill-light-lavender dark:fill-light-orange"
  >
    <path id="quadbz" vector-effect="non-scaling-stroke" d="M 0 100 V 100 Q 50 100 100 100 V 100 z" />
  </svg>

  <router-view v-slot="{ Component }">
    <Transition mode="out-in" @before-leave="onBeforeLeave" @leave="onLeave" @enter="onEnter" @after-enter="onAfterEnter">
      <component :is="Component" v-if="Component" />
    </Transition>
  </router-view>
</template>

<style scoped>
.box {
  height: 400px;
  background-color: aliceblue;
}
</style>
