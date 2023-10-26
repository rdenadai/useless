import { Texture, AnimatedSprite, Sprite, SCALE_MODES } from 'pixi.js'


export const animatedSpriteLoader = (frames: number, path: string): AnimatedSprite => {
    const textureArray = Array.from(Array(frames).keys()).map((i) => Texture.from(`${path}/tile${i}.png`))

    const animatedSprite = new AnimatedSprite(textureArray)
    for (const texture of animatedSprite.textures) {
        texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
    }
    animatedSprite.animationSpeed = 0.11
    animatedSprite.anchor.x = 0.5
    animatedSprite.anchor.y = 0.5
    return animatedSprite
}

export const animatedCharacterSpriteLoader = (frames: number, path: string): AnimatedSprite => {
    const animatedSprite = animatedSpriteLoader(frames, path)
    animatedSprite.scale.set(500 / 60, 260 / 60)
    return animatedSprite
}


export const animatedRainSpriteLoader = (frames: number, path: string): AnimatedSprite => {
    const animatedSprite = animatedSpriteLoader(frames, path)
    animatedSprite.scale.set(500 / 60, 260 / 60)
    animatedSprite.scale.set(250 / 32, 150 / 32)
    return animatedSprite
}

export const spriteLoader = (path: string): Sprite => {
    const sprite = Sprite.from(`${path}`)
    sprite.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST
    sprite.scale.set(120 / 16, 50 / 16)
    return sprite
}