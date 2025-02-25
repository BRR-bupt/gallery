<script setup lang="ts">
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { routeStore } from '~/store/piniaStore'
import { SplitText } from '~/utils/splitText'
import Footer from '~/components/Footer.vue'

const isRoute = routeStore()

const connetion = [
  {
    label: '邮箱',
    value: 'baoruirui0430@qq.com',
    imgUrl: '',
    color: '#f6e58d',
  },
  {
    label: '电话',
    value: '18618301673',
    imgUrl: '',
    color: '#ffbe76',
  },
  {
    label: '微信',
    value: 'brr0430',
    imgUrl: '',
    color: '#ff7979',
  },
  {
    label: 'qq',
    value: '2847530931',
    imgUrl: '',
    color: '#badc58',
  },
]

const st = new SplitText({
  words: 1,
  chars: 1,
})
const reftitleHero = ref()
const refsubtitleHero = ref()
const refcharAbout = ref()
const refwordPortfolio = ref()
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

  const Smooth = ScrollSmoother.get() as globalThis.ScrollSmoother
  const buttonsToForm = document.querySelectorAll(
    '.to-form',
  ) as NodeListOf<HTMLButtonElement>
  const titleHero = st.split(reftitleHero.value)
  const subtitleHero = st.split(refsubtitleHero.value)
  const charAbout = st.split(refcharAbout.value)
  const wordPortfolio = st.split(refwordPortfolio.value)

  const imgUnit = document.querySelectorAll<HTMLImageElement>('.img-unit')

  gsap.set([charAbout.words], {
    css: { overflow: 'hidden' },
  })
  // 控制播放
  const tl1 = gsap.timeline().pause()
  isRoute.$subscribe(() => {
    tl1.play()
  })

  tl1
    .from(
      titleHero.chars,
      {
        yPercent: 100,
        stagger: 0.07,
        duration: 0.8,
        ease: 'power4.out',
      },
    )
    .from(
      subtitleHero.chars,
      {
        yPercent: 100,
        stagger: 0.07,
        duration: 0.6,
        ease: 'power4.out',
        onComplete: () => {
          // titleHero.revert()
          // subtitleHero.revert()
        },
      },
      '<+0.8',
    )
    .from(
      '#main-img',
      {
        opacity: 0,
        scale: 0.6,
        duration: 1.2,
        ease: 'power4.out',
      },
      '>-=0.7',
    )
    .from(
      '#call-text',
      {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: 'power4.out',
      },
      '<+0.5',
    )
    .from(
      '#hidden__large',
      {
        opacity: 0,
        scale: 0.7,
        duration: 1,
        ease: 'back.out(1.4)',
      },
      '>-=0.5',
    )

  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#homesection',
        start: 'top 0px',
        end: '=+100%',
        scrub: true,
      },
    })
    .to('#titleHero', {
      yPercent: -250,
    })
    .to(
      '#subtitleHero',
      {
        yPercent: -350,
      },
      '<',
    )
    .to(
      '#img-wrap',
      {
        scale: 1.4,
      },
      '<',
    )
    .to(
      '#call-text',
      {
        xPercent: 100,
      },
      '<',
    )

  // gsap.to(Smooth, {
  //   duration: 1,
  //   scrollTop: Math.min(
  //     ScrollTrigger.maxScroll(window),
  //     Smooth.offset('#homesection', 'top top'),
  //   ),
  //   ease: 'power3.inOut',
  // })

  buttonsToForm.forEach((button) => {
    button.addEventListener('click', () => {
      if (Smooth) {
        gsap.to(Smooth, {
          duration: 3,
          scrollTop: Math.min(
            ScrollTrigger.maxScroll(window),
            Smooth.offset('#connect', 'top top'),
          ),
          ease: 'power3.inOut',
        })
      }
      else {
        window.scrollTo({
          top: 8000,
          behavior: 'smooth',
        })
      }
    })
  })

  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#grid-about',
        start: 'top 100%',
        end: 'top 100%',
        toggleActions: 'play none none reset',
      },
    })
    .from(
      charAbout.chars,
      {
        yPercent: 100,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power4.out',
      },
    )
    .from(
      '.link-about',
      {
        autoAlpha: 0,
        y: 20,
        duration: 1,
        ease: 'power4.out',
      },
      '>-=0.5',
    )

  imgUnit.forEach((element) => {
    gsap.to(element, {
      autoAlpha: 1,
      scrollTrigger: {
        trigger: element,
        start: 'top 75%',
        end: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    })
  })

  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#carousel-title',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    })
    .from('#span-portfolio', {
      yPercent: 100,
      duration: 1.4,
      ease: 'power4.out',
    })
    .from(
      wordPortfolio.words,
      {
        yPercent: 100,
        duration: 1.4,
        ease: 'power4.out',
      },
      '<',
    )
    .from(
      '.link-portfolio',
      {
        autoAlpha: 0,
        y: 20,
        duration: 1,
        ease: 'power4.out',
      },
      '<+=0.8',
    )

  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#connect',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    })
    .from('#connect-title', {
      yPercent: 100,
      duration: 1.4,
      ease: 'power4.out',
    })
    .from('.connect-count', {
      yPercent: 100,
      duration: 1.4,
      ease: 'power4.out',
    }, '<')
    .from('.connect-label', {
      yPercent: 100,
      duration: 1.4,
      ease: 'power4.out',
    }, '< 25%')
    .from('.connect-value', {
      yPercent: 100,
      duration: 1.4,
      ease: 'power4.out',
    }, '<')
})

const router = useRouter()
function toGallery() {
  router.push('/gallery')
}

console.log(window.screen.width)
const width = window.screen.width
</script>

<template>
  <div id="wrapper">
    <div id="content">
      <!-- HERO SECTION -->
      <div id="homesection" class="h-[110vh] min-h-[400px] overflow-hidden">
        <div class="o-container">
          <div id="c-header" class="relative h-[90vh] min-h-[320px] sm:h-screen">
            <div id="container-title" class="absolute top-0 grid h-3/5 w-full justify-center">
              <div
                id="titleHero" ref="reftitleHero"
                class="mb-4 baron z-[1] cursor-text self-end overflow-hidden text-center text-[8.7vw] leading-tight sm:text-[7vw] xl:text-[calc((7px_*_1200)_/_100)]"
              >
                <!-- Define&nbsp;own&nbsp;field -->
                记录生活的每份感动
              </div>
              <div
                id="subtitleHero" ref="refsubtitleHero"
                class="z-[1] cursor-text self-start overflow-hidden text-center text-[5.3vw] font-thin leading-none text-dark-lavender dark:text-dark-orange sm:text-[3.6vw] xl:text-[calc((3.6px_*_1200)_/_100)]"
              >
                PHOTOGRAPHE
              </div>
            </div>
            <div id="img-wrap" class="z-0 h-full w-full px-[10vw] py-[10vh] sm:px-[20vw]">
              <div
                id="main-img"
                class="m-auto h-full max-h-[853px] w-[63vw] max-w-[63vw] rounded-[8rem] bg-[url('~/assets/img/Hero_img_light.webp')] bg-cover bg-center bg-no-repeat transition-bg-img duration-500 ease-[ease] after:hidden after:content-[url('~/assets/img/Hero_img_light.webp')_url('~/assets/img/Hero_img_dark.webp')] dark:bg-[url('~/assets/img/Hero_img_dark.webp')] sm:max-h-full sm:w-full sm:max-w-[454px] lt:rounded-[11rem] av:rounded-full"
              />
            </div>
            <div
              id="call-text"
              class="absolute left-[70%] top-2/3 z-20 hidden w-1/5 max-w-[12rem] gap-2 sm:grid md:left-3/4 lt:top-1/2"
            >
              <span class="hidden cursor-text font-bold lt:block">私人定制画廊</span>

              <span class="hidden cursor-text text-[0.9rem] lt:block">
                陈列生活的每一份美好
              </span>
              <span class="hidden  cursor-text text-[0.9rem] lt:block">
                - <b class="italic">imagekit</b> 相片托管
              </span>
              <span class="hidden  cursor-text text-[0.9rem] lt:block">
                - <b class="italic">gsap</b> 网页动效
              </span>
              <span class="mx-0 my-2 hidden w-2/5 border-t-4 lt:block" />
              <button
                id="button__hover" aria-label="Affichage du Formulaire de contact"
                class="to-form group mt-[0.3rem] h-12 w-48"
              >
                <div id="learn-more" class="relative">
                  <span
                    id="circle"
                    class="m-0 block h-12 w-12 rounded-full bg-jet transition-all duration-500 ease-smooth group-hover:w-full dark:bg-white"
                    aria-hidden="true"
                  >
                    <span
                      id="arrow"
                      class="absolute inset-y-0 left-[0.625rem] m-auto h-[0.125rem] w-[1.125rem] bg-transparent transition-all duration-500 ease-smooth before:absolute before:right-[0.0625rem] before:top-[-0.25rem] before:h-[0.625rem] before:w-[0.625rem] before:rotate-45 before:border-r-[0.125rem] before:border-t-[0.125rem] before:border-white before:content-[''] group-hover:translate-x-4 group-hover:bg-white dark:before:border-jet dark:group-hover:bg-jet"
                    />
                  </span>
                  <span
                    id="button-text"
                    class="baron absolute inset-0 ml-[1.85rem] py-[0.9rem] text-center text-sm leading-[1.6rem] transition-all duration-500 ease-smooth group-hover:text-white dark:group-hover:text-jet sm:text-base"
                  >联系我
                    !</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div
          id="hidden__large"
          class="z-[1] mt-2 flex h-[4vh] w-full scale-100 items-center justify-center opacity-100 sm:hidden"
        >
          <button
            aria-label="Affichage du Formulaire de contact"
            class="to-form font-bold button h-full min-h-[40px] w-[65%] max-w-[300px] rounded-full"
          >
            <span>联 系 我 !</span>
          </button>
        </div>
      </div>

      <!-- ABOUT SECTION -->
      <div id="aboutsection" class="my-[10vw] h-[70vh] min-h-[400px] sm:my-[10vh] sm:min-h-full">
        <div class="p-container">
          <div id="grid-about" class="grid w-full justify-items-center self-center">
            <div
              class="mx-auto w-full items-end text-center text-[24.544px] font-extralight md:text-[3.2vw] 2xl:text-[53.76px]"
            >
              <span id="char-about" ref="refcharAbout" aria-hidden="true" class="inline-block cursor-text">
                <span v-if="width > 1000">摄影捕捉了真实的生活和我们的情感</span>
                <template v-else>
                  <span>摄影捕捉了真实的生活</span>
                  <span>和我们的情感</span>
                </template>

                <span>每一份感动都被记录</span>
              </span>
            </div>
            <span
              class="link-about mb-4 mt-2 w-[10%] border-t-2 border-current sm:mb-[2vw] sm:mt-[1vw] md:border-t-[3px]"
            />
            <span>
              <router-link to="/about" class="link-about group relative flex content-center justify-center">
                <span class="cursor-pointer baron text-center text-[16.864px] lg:text-[1.7vw] 2xl:text-[28.56px]">
                  了解更多，关于我
                </span>
                <ArrowButton class="right-[-16%] top-[8%]" />
              </router-link>
            </span>
          </div>
        </div>
      </div>

      <!-- GALERIE SECTION -->
      <div id="galeriesection" class="py-[10vw] lg:py-[10vh]">
        <div
          class="m-w-[2500px] relative m-auto grid grid-cols-[repeat(11,_1fr)] items-start gap-0 px-[5vw] sm:px-[10vw]"
        >
          <div
            id="carousel-title"
            class="col-start-1 col-end-10 row-span-1 grid max-w-[650px] justify-items-start sm:col-start-7 sm:col-end-12"
          >
            <span class="baron w-full cursor-text overflow-hidden text-[16px] lg:text-[20px] 2xl:text-[24px]">
              <p id="span-portfolio">摄影集分类</p>
            </span>
            <span
              id="word-portfolio" ref="refwordPortfolio"
              class="w-full cursor-text text-[27.776px] font-thin lg:text-[2.8vw] 2xl:text-[47.04px]"
            >
              <!-- Paysage/Mariage/Paysage/Mariage/
              Paysage/Mariage/ -->
              <div class="overflow-hidden">人像&nbsp;/&nbsp;精选&nbsp;/&nbsp;自然</div>
              <div class="overflow-hidden">/&nbsp;漫展&nbsp;/&nbsp;城市</div>
              <!-- Paysage / Mariage /
              Portrait / Nature / Architecture /
              Astrophotographie -->
            </span>
            <span
              class="link-portfolio mb-4 mt-2 w-[20%] border-t-2 border-current sm:mb-[2vw] sm:mt-[1vw] md:border-t-[3px]"
            />
            <span>
              <a class="cursor-pointer link-portfolio group relative flex content-center justify-center" @click="toGallery">
                <span class="baron text-center text-[16.864px] lg:text-[1.7vw] 2xl:text-[28.56px]">参观画廊</span>
                <ArrowButton class="right-[-30%] top-[10%]" />
              </a>
            </span>
          </div>
          <div
            class="carousel-cell img-v z-[1] col-start-1 col-end-12 row-start-2 row-end-2 mt-[5vw] sm:col-end-6 sm:row-start-1 sm:row-end-1 sm:mt-0"
          >
            <img src="../assets/img/6.webp" class="img-unit">
          </div>
          <div class="carousel-cell img-h col-start-1 col-end-12 mt-[5vw] sm:col-start-5 sm:mt-[-1.5vw]">
            <img src="../assets/img/5.webp" class="img-unit">
          </div>
          <div class="carousel-cell img-h col-start-1 col-end-12 mt-[5vw] sm:col-end-8">
            <img src="../assets/img/1.webp" class="img-unit">
          </div>
          <div class="carousel-cell img-v z-[1] col-start-1 col-end-12 mt-[5vw] sm:col-start-7 sm:mt-[-2vw]">
            <img src="../assets/img/3.webp" class="img-unit">
          </div>
          <div class="carousel-cell img-v z-[1] col-start-1 col-end-12 mt-[5vw] sm:col-end-6 sm:mt-[-15vw]">
            <img src="../assets/img/10.webp" class="img-unit">
          </div>
          <div class="carousel-cell img-h col-start-1 col-end-12 mt-[5vw] sm:col-start-5 sm:mt-[-15vw]">
            <img src="../assets/img/2.webp" class="img-unit">
          </div>
          <div class="carousel-cell img-h col-start-1 col-end-12 mt-[5vw] sm:col-start-5 sm:mt-[10vw]">
            <img src="../assets/img/8.webp" class="img-unit">
          </div>
          <div class="carousel-cell img-v z-[1] col-start-1 col-end-12 mt-[5vw] sm:col-end-6 sm:mt-[-20vw]">
            <img src="../assets/img/4.webp" class="img-unit">
          </div>
          <div class="carousel-cell img-v z-[1] col-start-1 col-end-12 mt-[5vw] sm:col-start-7 sm:mt-[10vw]">
            <img src="../assets/img/12.webp" class="img-unit">
          </div>
          <div class="carousel-cell img-h col-start-1 col-end-12 mt-[5vw] sm:col-end-8 sm:mt-[-10vw]">
            <img src="../assets/img/9.webp" class="img-unit">
          </div>
          <div class="carousel-cell img-h z-[1] col-start-1 col-end-12 mt-[5vw] sm:col-start-5 sm:mt-[7vw]">
            <img src="../assets/img/7.webp" class="img-unit">
          </div>
          <!-- <div class="carousel-cell img-v col-start-1 col-end-12 mt-[5vw] sm:col-end-6 sm:mt-[-15vw]">
            <img src="../assets/img/c-12-910w.webp" class="img-unit" />
          </div> -->
        </div>
      </div>
      <!-- CONTACT SECTION -->
      <div id="connect" class="px-[5vw] sm:px-[10vw]">
        <div class="overflow-hidden">
          <div id="connect-title" class="text-4xl">
            me contacter
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 font-mono">
          <div v-for="(item, index) in connetion" :key="index" class="shadow">
            <div class="h-[150px] flex items-center justify-center" :style="{ 'background-color': `${item.color}` }">
              <div class="overflow-hidden">
                <div class="connect-count text-white text-6xl">
                  {{ index + 1 }}
                </div>
              </div>
            </div>
            <div class="p-2">
              <div class="overflow-hidden">
                <div class="connect-label">
                  {{ item.label }}
                </div>
              </div>
              <div class="overflow-hidden">
                <div class="connect-value">
                  {{ item.value }}
                </div>
              </div>
              <div class="text-center mt-2">
                <div class="border cursor-pointer">
                  copy that
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <!-- <div class="flex justify-center items-center pl-[100px] pr-[100px] bg-jet min-h-[200px]">
        <div class="text-white flex-1 flex justify-end">email: baoruirui0430@qq.com</div>
        <div class="text-white flex-1">11</div>
      </div> -->
    </div>
  </div>
</template>
