<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Application, Graphics } from 'pixi.js'
import {
  animatedCharacterSpriteLoader,
  animatedRainSpriteLoader,
  spriteLoader
} from '../biz/sprite'

let app = reactive({})
const animation = ref(false)

const defaultAnimatedSpriteParam = (animatedSprite) => {
  animatedSprite.x = app?.renderer?.width / 2
  animatedSprite.y = app?.renderer?.height / 2 - 50
  animatedSprite.loop = false
  animatedSprite.eventMode = 'static'
  animatedSprite.visible = false
  return animatedSprite
}

onMounted(() => {
  const canvas = document.getElementById('game')
  app = new Application({
    background: '#FEF08A',
    antialias: false,
    transparent: true,
    view: canvas
  })

  const container = new Graphics()

  const idle = animatedCharacterSpriteLoader(8, './fox/sit1')
  idle.x = app.renderer.width / 2
  idle.y = app.renderer.height / 2 - 50
  idle.eventMode = 'static'
  idle.cursor = 'pointer'
  idle.visible = true
  idle.play()

  const howl = defaultAnimatedSpriteParam(animatedCharacterSpriteLoader(16, './fox/howl'))
  const jump = defaultAnimatedSpriteParam(animatedCharacterSpriteLoader(12, './fox/jump'))
  const crouch = defaultAnimatedSpriteParam(animatedCharacterSpriteLoader(8, './fox/crouch'))
  const fright = defaultAnimatedSpriteParam(animatedCharacterSpriteLoader(6, './fox/fright'))

  const meet = spriteLoader('./items/meet.png')
  meet.x = 65
  meet.y = app?.screen?.height - 75
  meet.eventMode = 'static'
  meet.cursor = 'pointer'

  const apple = spriteLoader('./items/apple.png')
  apple.x = 240
  apple.y = app?.screen?.height - 75
  apple.eventMode = 'static'
  apple.cursor = 'pointer'

  const ice = spriteLoader('./items/ice.png')
  ice.x = 415
  ice.y = app?.screen?.height - 75
  ice.eventMode = 'static'
  ice.cursor = 'pointer'

  const sunny = spriteLoader('./items/sunny.png')
  sunny.x = 600
  sunny.y = app?.screen?.height - 75
  sunny.visible = false
  sunny.eventMode = 'static'
  sunny.cursor = 'pointer'

  const rainy = spriteLoader('./items/rainy.png')
  rainy.x = 600
  rainy.y = app?.screen?.height - 75
  rainy.visible = true
  rainy.eventMode = 'static'
  rainy.cursor = 'pointer'

  const rain = []
  for (const x of [140, 410, 670]) {
    for (const y of [-10, 130]) {
      const sprite = animatedRainSpriteLoader(8, './water/rain')
      sprite.x = x
      sprite.y = y
      sprite.visible = false
      rain.push(sprite)
    }
  }
  for (const x of [140, 410, 670]) {
    const rainDrop = animatedRainSpriteLoader(8, './water/rainDrop')
    rainDrop.x = x
    rainDrop.y = app?.renderer?.height / 2 - 25
    rainDrop.visible = false
    rain.push(rainDrop)
  }

  howl.onComplete = function () {
    howl.stop()
    idle.play()
    idle.visible = true
    howl.visible = false
    animation.value = false
  }
  jump.onComplete = function () {
    jump.stop()
    idle.play()
    idle.visible = true
    jump.visible = false
    animation.value = false
  }
  crouch.onComplete = function () {
    crouch.stop()
    idle.play()
    idle.visible = true
    crouch.visible = false
    animation.value = false
  }
  fright.onComplete = function () {
    fright.stop()
    idle.play()
    idle.visible = true
    fright.visible = false
    animation.value = false
  }

  idle.on('pointerdown', () => {
    if (animation.value) return
    animation.value = true
    idle.stop()
    idle.visible = false
    howl.visible = true
    howl.currentFrame = 0
    howl.play()
  })
  apple.on('pointerdown', () => {
    if (animation.value) return
    animation.value = true
    idle.stop()
    idle.visible = false
    crouch.visible = true
    crouch.currentFrame = 0
    crouch.play()
  })
  meet.on('pointerdown', () => {
    if (animation.value) return
    animation.value = true
    idle.stop()
    idle.visible = false
    jump.visible = true
    jump.currentFrame = 0
    jump.play()
  })
  ice.on('pointerdown', () => {
    if (animation.value) return
    animation.value = true
    idle.stop()
    idle.visible = false
    fright.visible = true
    fright.currentFrame = 0
    fright.play()
  })
  sunny.on('pointerdown', () => {
    for (const element of rain) {
      element.stop()
      element.visible = false
    }
    sunny.visible = false
    rainy.visible = true
  })
  rainy.on('pointerdown', () => {
    for (const element of rain) {
      element.visible = true
      element.play()
    }
    sunny.visible = true
    rainy.visible = false
  })

  const bottom = new Graphics()
  bottom.beginFill('#fbbf24', 1)
  bottom.drawRect(0, app?.screen?.height - 100, app?.screen?.width, 200)
  bottom.eventMode = 'static'
  bottom.cursor = 'pointer'
  bottom.addChild(meet)
  bottom.addChild(apple)
  bottom.addChild(ice)
  bottom.addChild(rainy)
  bottom.addChild(sunny)

  container.addChild(bottom)
  container.addChild(jump)
  container.addChild(howl)
  container.addChild(crouch)
  container.addChild(fright)
  container.addChild(idle)
  for (const element of rain) {
    container.addChild(element)
  }
  app.stage.addChild(container)
})
</script>

<template>
  <div class="flex items-center justify-center w-full h-full">
    <canvas id="game" class="w-full h-full max-w-[28rem] max-h-[48rem]"></canvas>
  </div>
</template>
