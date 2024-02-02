<script setup lang="ts">
import gsap from 'gsap'
import { routeStore } from '~/store/piniaStore'
import FAQquestion from '~/components/FAQ.vue'

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

  const ellipseBigCircle = document.querySelector(
    '#big-circle ellipse',
  ) as SVGEllipseElement
  const pathBigLine = document.querySelector(
    '#big-line path',
  ) as SVGPathElement
  const tl1 = gsap.timeline().pause()
  isRoute.$subscribe(() => {
    tl1.play()
  })

  tl1
    .from(
      '#hello',
      {
        yPercent: 100,
        duration: 1,
        ease: 'power4.out',
      },
    )
    .from(
      '#star-sticky',
      {
        scale: 0,
        rotateZ: 45,
        duration: 1.5,
        ease: 'power4.out',
      },
      '<+0.3',
    )
  // .from(
  //   aboutLinesChild.lines,
  //   {
  //     yPercent: 100,
  //     stagger: 0.04,
  //     duration: 1,
  //     ease: 'power4.out',
  //   },
  //   '<',
  // )
  // .fromTo(
  //   ellipseBigCircle,
  //   {
  //     drawSVG: '0% 0%',
  //   },
  //   {
  //     drawSVG: '20% 38%',
  //     duration: 1.5,
  //   },
  //   '<+0.4',
  // )
  // .to(
  //   ellipseBigCircle,
  //   {
  //     drawSVG: '80% 98%',
  //     duration: 2,
  //   },
  //   '>-0.8',
  // )
  // .to(
  //   ellipseBigCircle,
  //   {
  //     drawSVG: '100% 100%',
  //     duration: 0.4,
  //   },
  //   '>-0.4',
  // )

  // window.addEventListener('resize', () => {
  //   aboutLinesParent.revert()
  //   aboutLinesChild.revert()
  // })

  gsap.to(
    '#star-sticky',
    {
      rotateZ: 360 * 2,
      ease: 'none',
      scrollTrigger: {
        trigger: '#star-container',
        pin: true,
        anticipatePin: 1,
        pinSpacing: false,
        scrub: true,
        toggleActions: 'play none none reverse',
      },
    },
  )

  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#section-about',
        start: 'top 0%',
        end: '=+100%',
        scrub: true,
        toggleActions: 'play none none reverse',
      },
    })
  // .fromTo(
  //   pathBigLine,
  //   {
  //     drawSVG: '-10% -10%',
  //   },
  //   {
  //     drawSVG: '40% 65%',
  //   },
  // )
  // .to(pathBigLine, {
  //   drawSVG: '100% 100%',
  // })

  const mm = gsap.matchMedia()
  // const skewSetter = gsap.quickTo('#grained', 'skewY')
  const clamp = gsap.utils.clamp(-6, 6)

  if (window.screen.width > 800) {
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
  }

  // gsap.set('#grained', {
  //   transformOrigin: 'center center',
  //   force3D: true,
  // })

  // const descriptionAnima = gsap.from(aboutblockTextChild.lines, {
  //   yPercent: 100,
  //   delay: 0.3,
  //   duration: 1,
  //   stagger: 0.04,
  //   ease: 'power4.out',
  //   scrollTrigger: {
  //     trigger: '#description',
  //     start: 'top 60%',
  //     toggleActions: 'play none none reverse',
  //   },
  // })

  // gsap.from(
  //   '#caracteristics',
  //   {
  //     yPercent: 100,
  //     duration: 0.8,
  //     ease: 'power4.out',
  //     onComplete: () => {
  //       // descriptionAnima.play()
  //     },
  //     scrollTrigger: {
  //       trigger: '#caracteristics',
  //       start: 'top 60%',
  //       toggleActions: 'play none none reverse',
  //     },
  //   },
  // )

  // mm.add('(min-width: 767px)', () => {
  //   gsap.fromTo(
  //     '#grained',
  //     {
  //       yPercent: 40,
  //     },
  //     {
  //       yPercent: -20,
  //       ease: 'power2.out',
  //       scrollTrigger: {
  //         trigger: '#description',
  //         start: 'top 70%',
  //         scrub: true,
  //         onUpdate: self => skewSetter(clamp(self.getVelocity() / -300)),
  //         onLeave: () => {
  //           skewSetter(0)
  //         },
  //       },
  //     },
  //   )
  // })
})
</script>

<template>
  <div id="wrapper">
    <div id="content">
      <svg
        id="big-circle"
        class="absolute right-0 top-0 z-0 w-full fill-transparent stroke-light-lavender stroke-[8px] dark:stroke-light-orange lg:w-4/5"
        stroke-linecap="round" viewBox="0 0 240 240"
      >
        <ellipse cx="240" cy="0" rx="120" ry="120" vector-effect="non-scaling-stroke" />
      </svg>
      <div id="section-about" class="relative mx-auto max-w-[2500px] px-6 pb-[calc(8rem)] pt-56 sm:px-[10%]">
        <svg
          id="big-line"
          class="absolute -left-3 top-1/3 z-0 h-4/5 w-11/12 fill-transparent stroke-light-lavender stroke-[8px] dark:stroke-light-orange lg:w-4/6"
          xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" preserveAspectRatio="none" viewBox="0 0 520 425"
        >
          <path
            d="M0 81c53-31 129-50 188-61 84-15 210-31 283 17 21 15 41 51 44 73 3 23-20 64-44 82-31 22-65 39-83 70-21 37-27 74-26 114 0 15 0 35 2 53"
            vector-effect="non-scaling-stroke"
          />
        </svg>
        <div class="baron z-0 mb-12 overflow-hidden text-[calc(2rem_+_3vw)] text-dark-lavender dark:text-dark-orange">
          <div id="hello">
            hello,
          </div>
        </div>
        <div id="container-about" class="grid grid-cols-[calc(1rem_+_2vw)_95%]">
          <div id="star-container" class="mt-[0.8vw] h-[calc(100%_-_2rem_-_4vw)] pt-5">
            <div id="star-sticky" class="text-dark-lavender dark:text-dark-orange">
              <svg
                class="h-[calc(1rem_+_2vw)] w-[calc(1rem_+_2vw)] fill-current" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 13 13"
              >
                <path
                  d="M4.2 12.5c-.4.2-.8 0-1.2-.2-.4-.3-.6-.6-.6-1l.1-.8 1-.6c.5-.3 1-.6 1.3-1a8 8 0 0 0 1.5-1.5 9.8 9.8 0 0 0-3.7-1l-1-.1a1 1 0 0 1-.5-.6L1 5.1c0-.3 0-.6.3-1 .3-.2.5-.3.9-.3l.7.1.6.7 1.1 1.2L6.3 7a11 11 0 0 0-.8-4l-.3-1c0-.2 0-.4.2-.6.2-.3.6-.5 1.2-.5s1 .2 1.2.5l.1.5c0 .3 0 .6-.3 1.1a15 15 0 0 0-.7 2l-.2 2.2 1.7-1 1.3-1.5.8-.8.7-.2c.3 0 .6 0 .9.4.3.3.4.6.4 1 0 .2 0 .4-.2.5l-.7.4a7 7 0 0 1-1 .3c-.7 0-1.4.2-2 .3l-1.8.9c1 1.1 2.2 1.9 3.3 2.4.3 0 .6.2.7.3l.4.6c.1.3 0 .6-.1.9-.2.3-.4.6-.7.7-.4.2-.6.3-.9.1a1 1 0 0 1-.5-.3l-.4-1a8.8 8.8 0 0 0-2-3.5A8.4 8.4 0 0 0 5 11.1c0 .5-.2.8-.3 1 0 .2-.3.3-.6.4Z"
                />
              </svg>
            </div>
          </div>
          <div class="z-[1] pl-4 pt-5 text-[calc(1rem_+_2vw)] font-light" style="font-family: cursive;">
            <span id="about_block" class="block">
              我是鲍瑞瑞！我与摄影的际遇可以追溯到22年，我的大四时光。这两年，我走过很多城市，去记录那里的风景、人文，去记录人们的情感。在摄影领域，我的成长并不算快，因为要兼顾学业与其他爱好，加上本人略微内向的性格，摄影经历一度停滞很久。摄影之外，在此必须提及的是我的专业特长——前端开发，虽然目前（24年1月）我还未毕业，但日常的学习和积累，以及在中国教育在线半年的实习经验，独立开发一个网页对我来说并不是件难事。也必须感谢 Benjamin 的 photographe 开源项目，在该项目的基础和启发下，我才能了解并使用到 gsap 和 imagekit 这样的技术和资源，才有了目前这个网站。
            </span>
            <!-- <span style="font-family: sans-serif;">I am Benjamin! My photography history can be traced back to</span> -->
          </div>
        </div>
      </div>

      <div id="connect" class="px-[5vw] sm:px-[10vw] z-10 relative">
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
    </div>
  </div>
</template>

<style scoped></style>
