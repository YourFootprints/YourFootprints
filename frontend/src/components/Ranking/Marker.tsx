import "./Marker.css";

const Marker = (img:string) => {
  return (`
    <div class="marker">
      <div class="triangle"></div>
      <div class="circle">
        <img src=${img} />
      </div>
    </div>
  `);
}

export default Marker;