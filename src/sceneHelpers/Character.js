export default class Character {
  constructor(id) {
    this.id = id;
    this.sprite = { /* phaser 3 sprite */ };
    this.position = new Map([]);
    this.speed = 0;
  }

  setSprite(sprite) {
    this.sprite = sprite;
    return this
  }

  setSpeed(speed) {
    this.speed = speed;
    return this
  }

  setFrameByName(name) {
    const direction = this.position.get(name)?.direction;
    if (direction) {
      this.setIdleFrame(direction);
    }
    return this
  }

  setIdleFrame(direction) {
    this.sprite.setFrame(`idle_${direction}_01.png`);
    return this
  }

  setVisible(visible) {
    this.sprite.setVisible(visible);
    return this
  }

  addPosition(name, x, y, direction) {
    this.position.set(name, { x: x, y: y, direction: direction });
    return this
  }

  getPosition(name) {
    return this.position.get(name)
  }

  play(movingMotion, direction) {
    this.sprite.play(`${this.id}_${movingMotion}_${direction}`); // key of animation config
    return this
  }

  stop() {
    this.sprite.anims.stop();
    return this
  }
  
  isEqual(id) {
    return this.id == id
  }

  isEventPosition(position, eventName) {
    const eventPosition = this.getPosition(eventName);
    return eventPosition && position.x == eventPosition.x && position.y == eventPosition.y
  }

  isPlaying() {
    return this.sprite.anims.isPlaying
  }

  isVisible() {
    return this.sprite.visible
  }
}