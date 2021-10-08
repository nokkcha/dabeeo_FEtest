import "./App.css";
import imagemap from "./assets/map.png";
import reset from "./assets/reset.png";
import imagemarker from "./assets/marker.png";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const img = document.createElement("img");
    img.src = `${imagemap}`;
    const maps = document.getElementById("maps");
    maps.appendChild(img);

    //scroll drag 적용
    const draggable = document.querySelector(".map");
    let isDown = false;
    let startX;
    let startY;
    let scrollLeft;
    let scrollTop;

    draggable.addEventListener("mousedown", (e) => {
      isDown = true;
      draggable.classList.add("active");
      startX = e.pageX - draggable.offsetLeft;
      startY = e.pageY - draggable.offsetTop;
      scrollTop = draggable.scrollTop;
      scrollLeft = draggable.scrollLeft;
    });

    draggable.addEventListener("mouseleave", () => {
      isDown = false;
      draggable.classList.remove("active");
    });

    draggable.addEventListener("mouseup", () => {
      isDown = false;
      draggable.classList.remove("active");
    });

    draggable.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - draggable.offsetLeft;
      const y = e.pageY - draggable.offsetTop;
      const walk = (x - startX) * 3;
      const run = (y - startY) * 3;
      draggable.scrollTop = scrollTop - run;
      draggable.scrollLeft = scrollLeft - walk;
    });

    return () => {
      console.log("close");
    };
  }, []);

  //marker 표시하기
  const showMarker = (event) => {
    event.preventDefault();

    //이미지 상 좌표 가져오기
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;

    const mymap = document.getElementById("maps");

    //marker 위치 설정
    const markers = document.createElement("img");
    markers.src = `${imagemarker}`;
    markers.classList.add("markers");
    markers.style.display = "";
    markers.style.position = `absolute`;
    markers.style.left = `${x}px`;
    markers.style.top = `${y}px`;
    mymap.appendChild(markers);
  };

  //marker 리셋하기
  const handleReset = () => {
    document.querySelectorAll(".markers").forEach(function (a) {
      a.remove();
    });
  };
  return (
    <div className="App">
      <div id="maps" className="map" onContextMenu={showMarker}></div>
      <img src={reset} alt="reset" className="reset" onClick={handleReset} />
    </div>
  );
}

export default App;
