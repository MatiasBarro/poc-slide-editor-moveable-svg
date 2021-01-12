import * as React from "react";
import Moveable from "react-moveable";

export default function App() {
  const [target, setTarget] = React.useState();
  const [dragTarget, setDragTarget] = React.useState();
  const [frameId, setFrameId] = React.useState("");
  const [targetFrames, setTargetFrames] = React.useState({
    shape: {
      width: 0,
      height: 0,
      rotate: 0,
      translate: [10, 10]
    },
    isotopes: {
      width: 0,
      height: 0,
      rotate: 0,
      translate: [0, 150]
    },
    richText: {
      width: 0,
      height: 0,
      rotate: 0,
      translate: [200, 0]
    }
  });

  const updateTarget = (id, target) => {
    setFrameId(id);
    setTarget(target);
  };

  React.useEffect(() => {
    setDragTarget(document.querySelector(".container"));
  }, []);
  return (
    <div className="container">
      <Moveable
        target={target}
        dragTarget={dragTarget}
        draggable={true}
        resizable={true}
        rotatable={true}
        rotationPosition={"top"}
        throttleResize={0}
        throttleDrag={0}
        throttleRotate={0}
        startDragRotate={0}
        throttleDragRotate={0}
        snappable={true}
        bounds={{ left: 0, top: 0, right: 800, bottom: 600 }}
        zoom={1}
        origin={false}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        onDragStart={({ set }) => {
          set(targetFrames[frameId].translate);
        }}
        onDrag={({ target, beforeTranslate }) => {
          let frames = Object.assign({}, targetFrames);
          frames[frameId].translate = [...beforeTranslate];
          setTargetFrames(frames);
          target.style.left = `${beforeTranslate[0]}px`;
          target.style.top = `${beforeTranslate[1]}px`;
        }}
        onResizeStart={({ setOrigin, dragStart }) => {
          setOrigin(["%", "%"]);
          dragStart && dragStart.set(targetFrames[frameId].translate);
        }}
        onResize={({ target, width, height, drag }) => {
          let frames = Object.assign({}, targetFrames);
          frames[frameId].width = width;
          frames[frameId].height = height;

          setTargetFrames(frames);

          target.style.width = `${width}px`;
          target.style.height = `${height}px`;
        }}
        onRotateStart={({ set }) => {
          set(targetFrames[frameId].rotate);
        }}
        onRotate={({ beforeRotate }) => {
          let frames = Object.assign({}, targetFrames);
          frames[frameId].rotate = beforeRotate;

          setTargetFrames(frames);
          target.style.transform = `rotate(${beforeRotate}deg)`;
        }}
      />
      <div
        className="target"
        style={{ top: "10px", left: "10px" }}
        onClick={(e) => updateTarget("shape", e.target)}
      ></div>
      <img
        src="https://i.pinimg.com/originals/b7/ac/a1/b7aca191c897af5fe498a22418c076a8.jpg"
        style={{ position: "absolute", width: "100px", top: "150px" }}
        onClick={(e) => updateTarget("isotopes", e.target)}
      />
      <div
        style={{
          position: "absolute",
          border: "1px solid gray",
          width: "200px",
          left: "200px"
        }}
        dangerouslySetInnerHTML={{
          __html:
            '<p style="text-align: center;" data-mce-style="text-align: center;"><span style="text-decoration: underline;" data-mce-style="text-decoration: underline;"><strong><span style="font-size: 14pt;" data-mce-style="font-size: 14pt;">SlideEditor text sample</span></strong></span></p><ul><li style="text-align: center;" data-mce-style="text-align: center;"><span style="color: #e03e2d;" data-mce-style="color: #e03e2d;"><strong><span style="font-size: 14pt;" data-mce-style="font-size: 14pt;">BULLET</span></strong></span><span style="color: #e03e2d;" data-mce-style="color: #e03e2d;"><strong><span style="font-size: 14pt;" data-mce-style="font-size: 14pt;"></span></strong></span></li></ul><p><span style="color: #e03e2d;" data-mce-style="color: #e03e2d;"><strong><span style="font-size: 14pt;" data-mce-style="font-size: 14pt;"><br data-mce-bogus="1"></span></strong></span></p>'
        }}
        onClick={(e) => updateTarget("richText", e.target)}
      />
    </div>
  );
}
