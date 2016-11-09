// remountSpriteByID makes sure to remount
// given sprite in given container only if
// given id changes
const remountSpriteByID = () => {
  let currentSprite = {};

  return (id, sprite, container) => {
    // memoized sprite exists. return it
    if (currentSprite.id === id) {
      return currentSprite.sprite;
    }

    // memoized sprite exists, but user gave new ID
    // and asked for new sprite. remove old from container
    if (currentSprite.id !== undefined) {
      container.removeChild(currentSprite.sprite);
    }

    // create and mount new sprite
    currentSprite.sprite = sprite;
    currentSprite.id = id;
    container.addChild(currentSprite.sprite);

    return currentSprite.sprite;
  }
};

export default remountSpriteByID;
