import * as React from "react";
import Moveable from "react-moveable";

export default function App() {
  const moveable = React.useRef();

  const [frameId, setFrameId] = React.useState("");
  const [target, setTarget] = React.useState();
  const [dragTarget, setDragTarget] = React.useState();
  const [targetFrames, setTargetFrames] = React.useState({
    shape: {
      width: 0,
      height: 0,
      rotate: 0,
      translate: [0, 0]
    },
    isotopes: {
      width: 0,
      height: 0,
      rotate: 0,
      translate: [0, 0]
    },
    richText: {
      width: 0,
      height: 0,
      rotate: 0,
      translate: [0, 0]
    }
  });

  const getTargetId = (target) => target.getAttribute("data-target");

  const updateTarget = (target) => {
    const frameId = getTargetId(target);
    if (targetFrames[frameId] && !moveable.current.isMoveableElement(target)) {
      setFrameId(frameId);
      setTarget(target);
    }
  };

  React.useEffect(() => {
    let container = document.querySelector("svg");
    console.log(container);
    setDragTarget(container);
  }, []);
  return (
    <div>
      <Moveable
        target={target}
        dragTarget={dragTarget}
        ref={moveable}
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
        origin={true}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        onDragStart={({ set }) => {
          set(targetFrames[frameId].translate);
        }}
        onDrag={({ target, beforeTranslate }) => {
          let frames = Object.assign({}, targetFrames);
          frames[frameId].translate = [...beforeTranslate];
          setTargetFrames(frames);
          target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px) rotate(${frames[frameId].rotate}deg)`;
        }}
        onDragEnd={({ target }) => {
          console.log(target);
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
        onRotate={({ target, beforeRotate }) => {
          let frames = Object.assign({}, targetFrames);
          frames[frameId].rotate = beforeRotate;
          setTargetFrames(frames);

          const frameTranslate = frames[frameId].translate;
          target.style.transform = `translate(${frameTranslate[0]}px, ${frameTranslate[1]}px) rotate(${beforeRotate}deg)`;
        }}
      />
      <svg
        data-target="svg"
        viewBox="0 0 800 600"
        style={{ width: "800", height: "600", border: "1px solid black" }}
        onClick={(e) => updateTarget(e.target)}
      >
        <rect
          data-target="shape"
          x="0"
          y="0"
          width="100"
          height="100"
          stroke="black"
          fill="yellow"
          stroke-width="1"
        />
        <image
          x="0"
          y="150"
          data-target="isotopes"
          href="https://i.pinimg.com/originals/b7/ac/a1/b7aca191c897af5fe498a22418c076a8.jpg"
          width="100"
          height="150"
        />
        <foreignObject
          x="200"
          y="0"
          data-target="richText"
          width="200"
          height="200"
        >
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            dangerouslySetInnerHTML={{
              __html:
                '<p style="text-align: center;" data-mce-style="text-align: center;"><span style="text-decoration: underline;" data-mce-style="text-decoration: underline;"><strong><span style="font-size: 14pt;" data-mce-style="font-size: 14pt;">SlideEditor text sample</span></strong></span></p><ul><li style="text-align: center;" data-mce-style="text-align: center;"><span style="color: #e03e2d;" data-mce-style="color: #e03e2d;"><strong><span style="font-size: 14pt;" data-mce-style="font-size: 14pt;">BULLET</span></strong></span></li><li style="text-align: center;" data-mce-style="text-align: center;"><span id="_mce_caret" data-mce-bogus="1" data-mce-type="format-caret"><span style="color: #e03e2d;" data-mce-style="color: #e03e2d;"><strong><span style="font-size: 14pt;" data-mce-style="font-size: 14pt;"><math xmlns="http://www.w3.org/1998/Math/MathML"><msqrt><mn>2</mn></msqrt></math></span></strong></span></span></li></ul>'
            }}
          ></div>
        </foreignObject>
        {/* <g>
          <rect fill="blue" width="200" height="200" stroke-width="2" />
          <foreignObject width="200" height="200">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              dangerouslySetInnerHTML={{
                __html:
                  '<p style="text-align: center;" data-mce-style="text-align: center;"><span style="text-decoration: underline;" data-mce-style="text-decoration: underline;"><strong><span style="font-size: 14pt;" data-mce-style="font-size: 14pt;">SlideEditor text sample</span></strong></span></p><ul><li style="text-align: center;" data-mce-style="text-align: center;"><span style="color: #e03e2d;" data-mce-style="color: #e03e2d;"><strong><span style="font-size: 14pt;" data-mce-style="font-size: 14pt;">BULLET</span></strong></span></li><li style="text-align: center;" data-mce-style="text-align: center;"><span id="_mce_caret" data-mce-bogus="1" data-mce-type="format-caret"><span style="color: #e03e2d;" data-mce-style="color: #e03e2d;"><strong><span style="font-size: 14pt;" data-mce-style="font-size: 14pt;"><math xmlns="http://www.w3.org/1998/Math/MathML"><msqrt><mn>2</mn></msqrt></math></span></strong></span></span></li></ul>'
              }}
            ></div>
          </foreignObject>
        </g> */}
      </svg>
    </div>
  );
}
