import "./FacilityMarker.css";

const FacilityMarker = (img: string, color: any) => {
  return `
    <div class="facilityMarker" style="background-color: ${color};">
        <img class='iconMarker' src='${img}' />
    </div>
  `;
};

export default FacilityMarker;
