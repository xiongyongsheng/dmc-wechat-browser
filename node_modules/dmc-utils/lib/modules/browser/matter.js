export function createGameBoundary(
  {
    width,
    height,
    boundaryWidth = 200,
    collisionFilter,
    render = {},
    boundary,
    viewport,
  } = {},
  { Bodies }
) {
  const arr = [
    {
      //上边界
      id: "boundary-top",
      x: width / 2,
      y: -boundaryWidth / 2 - viewport.offset,
      width: width + viewport.offset * 2,
      height: boundaryWidth,
    },
    {
      //下边界
      id: "boundary-bottom",
      x: width / 2,
      y: height + boundaryWidth / 2,
      width: width + viewport.offset * 2,
      height: boundaryWidth,
    },
    {
      //左边界
      id: "boundary-left",
      x: -boundaryWidth / 2 - viewport.offset,
      y: height / 2,
      width: boundaryWidth,
      height: height + viewport.offset * 2,
    },
    {
      //右边界
      id: "boundary-right",
      x: width + boundaryWidth / 2 + viewport.offset,
      y: height / 2,
      width: boundaryWidth,
      height: height + viewport.offset * 2,
    },
  ]
    .filter((item) => {
      return boundary instanceof Array ? boundary.includes(item.id) : true;
    })
    .map((item) => {
      item.collisionFilter = collisionFilter;
      return item;
    });
  return handleRectangle(arr, { render, Bodies });
}
export function handleRectangle(arr, { render, Bodies }) {
  return arr.map(
    ({
      id,
      x,
      y,
      width,
      height,
      angle = 0,
      isSensor,
      collisionFilter = {},
    } = {}) => {
      const option = {
        isStatic: true,
        angle,
        collisionFilter,
        render,
      };
      if (id) {
        option.id = id;
      }
      if (isSensor) {
        option.isSensor = isSensor;
      }
      return Bodies.rectangle(x, y, width, height, option);
    }
  );
}
