export function setupAcc(element: HTMLDivElement) {
  const xSlider = slider(element);
  const ySlider = slider(element);
  const zSlider = slider(element);
  const acl = new Accelerometer({ frequency: 60 });
  acl?.addEventListener("reading", () => {
    xSlider.value = acl.x;
    ySlider.value = acl.y;
    zSlider.value = acl.z;
  });
  acl?.start();
}

function slider(parent: HTMLElement) {
  const slider = document.createElement("input");
  slider.setAttribute("type", "range");
  slider.setAttribute("min", "-1");
  slider.setAttribute("max", "1");
  slider.setAttribute("step", "0.1");
  slider.style.display = "block";
  slider.style.margin = "auto";
  slider.style.width = "100%";
  slider.style.padding = "2em";
  parent.appendChild(slider);
  return slider;
}
