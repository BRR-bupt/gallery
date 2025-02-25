<script setup lang='ts'>
import ScrollTrigger from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import type { ImageInfo } from '~/store/piniaStore'
import { dataStore, routeStore } from '~/store/piniaStore'
import { catalog } from '~/assets/data/catalog'

const isRoute = routeStore()
const isData = dataStore()

const defaultAlbum = 'dearest'
const activeAlbum = ref('')
const imageNumber = ref(20)
const maxImageNumber = ref(100)

const testData = ref<ImageInfo[]>([])

changeAlbum(defaultAlbum)

onMounted(() => {
  if (window.screen.width > 800) {
    ScrollSmoother.create({
      wrapper: '#wrapper',
      content: '#content',
      smooth: 2,
      effects: true,
      ignoreMobileResize: true,
    })
  }

  document
    .querySelectorAll<HTMLElement>(
      '#gridgalerie_cell1',
    )
    .forEach((Element) => {
      ScrollTrigger.create({
        trigger: Element,
        start: 0,
        pin: true,
        pinSpacing: false,
        // anticipatePin: 2,
        endTrigger: '#gridgalerie',
      })
    })

  gsapMove()
})

function lookMore() {
  if (window.screen.width < 800) {
    isData.data.forEach((el) => {
      if (el[0] === activeAlbum.value) {
        imageNumber.value += 20
        testData.value = el[1].slice(0, imageNumber.value)
      }
    })
    return
  }
  isData.data.forEach((el) => {
    if (el[0] === activeAlbum.value) {
      ScrollSmoother.get().kill()
      imageNumber.value += 20
      testData.value = el[1].slice(0, imageNumber.value)
      ScrollSmoother.create({
        wrapper: '#wrapper',
        content: '#content',
        smooth: 2,
        effects: true,
        ignoreMobileResize: true,
      })
    }
  })
}

function changeAlbum(album: string) {
  if (activeAlbum.value === album)
    return

  activeAlbum.value = album

  if (window.screen.width < 800) {
    isData.data.forEach((el) => {
      if (el[0] === activeAlbum.value) {
        imageNumber.value = 20
        maxImageNumber.value = el[1].length
        testData.value = el[1].slice(0, imageNumber.value)
        window.scrollTo(0, 0)
      }
    })
    return
  }
  isData.data.forEach((el) => {
    if (el[0] === activeAlbum.value) {
      if (ScrollSmoother.get())
        ScrollSmoother.get().kill()

      imageNumber.value = 20
      maxImageNumber.value = el[1].length
      testData.value = el[1].slice(0, imageNumber.value)
      window.scrollTo(0, 0)
      ScrollSmoother.create({
        wrapper: '#wrapper',
        content: '#content',
        smooth: 2,
        effects: true,
        ignoreMobileResize: true,
      })
    }
  })
}

function gsapMove() {
  const filters = document.querySelectorAll(
    '.filters-group-container > * > div',
  )

  const tl1 = gsap.timeline().pause()
  isRoute.$subscribe(() => {
    tl1.play()
  })

  tl1
    .from(
      '#header-content > div > div',
      {
        xPercent: -100,
        duration: 1.4,
        ease: 'power4.out',
      },
    )
    .from(
      '#album-list > div > div',
      {
        yPercent: 100,
        duration: 1.4,
        ease: 'power4.out',
      },
      '<',
    )
    .from(
      '#album-title > div',
      {
        yPercent: 100,
        duration: 1.4,
        ease: 'power4.out',
      },
      '<',
    )
    .from(
      '#describ',
      {
        opacity: 0,
        // yPercent: 100,
        duration: 2,
        // ease: 'power4.out',
      },
      '<',
    )
}
</script>

<template>
  <div id="wrapper" class="overflow-hidden">
    <div id="content">
      <div
        id="gridgalerie"
        class="z-0 mx-auto grid min-h-screen w-full max-w-[3600px] grid-cols-1 [--initsize:_32px] sm:grid-cols-[30%_70%] md:grid-cols-[25%_75%] xl:grid-cols-[22.5%_77.5%] 2xl:grid-cols-[20%_80%] lt:md:[--initsize:_4.5vw] lt:xl:[--initsize:_54px]"
      >
        <div id="gridgalerie_cell1" class="relative h-[420px] sm:z-[2] sm:h-screen">
          <div id="title-galerie-container" class="absolute right-[5vw] top-[15vh] min-h-[320px] sm:top-[15vh]">
            <div
              id="header-content"
              class="ml-[-150px] md:ml-[20%] grid cursor-vertical-text gap-2 leading-none [writing-mode:vertical-rl]"
            >
              <div class="baron overflow-hidden text-[calc(var(--initsize))]">
                <div>photographies</div>
              </div>
              <div
                class="overflow-hidden text-[calc(var(--initsize)_*_2_/_3)] font-thin text-dark-lavender dark:text-dark-orange"
              >
                <div>BAO RUIRUI</div>
              </div>
            </div>
          </div>
          <div class="pt-[15vh] pl-6 font-mono">
            <div id="album-title" class="baron overflow-hidden text-xl mb-4 leading-6 text-gray dark:text-white">
              <div>Albums</div>
            </div>
            <div id="album-list" class="text-2xl text-grey">
              <div
                v-for="(item, index) in catalog" :key="index" class="overflow-hidden cursor-pointer hover:text-jet dark:hover:text-white"
                @click="changeAlbum(item.en)"
              >
                <div :class="item.en === activeAlbum ? 'activeAlbum' : ''">
                  / {{ item.zh }}
                </div>
              </div>
            </div>
          </div>

          <div id="describ" class="hidden sm:block absolute bottom-10 left-6 pt-2 pr-10 border-t font-mono">
            <div class="text-2xl mb-2 font-bold">
              摄影记录
            </div>
            <div>摄影是一门光的艺术!</div>
            <div>私以为摄影要素:</div>
            <div class="mt-2">
              <div>- 审美</div>
              <div>- 走出门，去发现</div>
              <div>- 按下快门</div>
            </div>
          </div>
        </div>

        <div
          id="gridgalerie_cell2"
          class="z-[3] bg-white h-min transition-bg-color duration-500 ease-[ease] dark:bg-jet sm:z-0 sm:pl-6 sm:pt-[15vh] it:pt-[15vh] av:sm:pt-[15vh]"
        >
          <!-- <div v-for="(folder, i) in list" :key="i"> -->
          <!-- <div>{{ folder[0] }}</div> -->
          <masonry-wall :items="testData" :ssr-columns="1" :column-width="400" :gap="16">
            <template #default="{ item }">
              <img :src="item.fixUrl" :width="item.width" :height="item.height" alt="">
            </template>
          </masonry-wall>
          <!-- </div> -->

          <div class="mx-auto mt-2 w-auto max-w-[220px]">
            <button
              v-show="imageNumber < maxImageNumber" id="see-more" class="button flex w-full cursor-pointer justify-center p-2 disabled:pointer-events-none disabled:bg-light-lavender dark:disabled:pointer-events-none dark:disabled:bg-light-orange"
              @click="lookMore"
            >
              更多
            </button>
          </div>

          <Footer class="sm:pr-6" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activeAlbum {
  font-weight: 700;
  font-size: 28px;
  color: black;
}
.dark .activeAlbum {
  color: white;
}
</style>
