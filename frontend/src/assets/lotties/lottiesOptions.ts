import walking from "@/assets/lotties/walking.json";
import loginwalking from "@/assets/lotties/loginwalking.json";
import print from "@/assets/lotties/foot.json";

export const walkingOptions = {
  loop: true,
  autoplay: true,
  animationData: walking,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const printOptions = {
  loop: true,
  autoplay: true,
  animationData: print,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const loginwalkingOptions = {
  loop: true,
  autoplay: true,
  animationData: loginwalking,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
