class Accelerometer {
  listeners: (() => void)[] = [];
  frequency = 1;
  x = 0;
  y = 0;
  z = 0;
  constructor(options: { frequency: number }) {
    this.frequency = options.frequency;
  }
  addEventListener(_: string, listener: () => void) {
    this.listeners.push(listener);
  }
  start() {
    setInterval(() => {
      this.x = Math.random() * 2 - 1;
      this.y = Math.random() * 2 - 1;
      this.z = Math.random() * 2 - 1;
      this.listeners.forEach(listener => listener());
    }, 1000 / this.frequency);
  }
}

export function setupAcc(element: HTMLDivElement) {
  const xSlider = slider(element);
  const ySlider = slider(element);
  const zSlider = slider(element);
  const acl = new Accelerometer({ frequency: 1 });
  acl?.addEventListener("reading", () => {
    xSlider(acl.x);
    ySlider(acl.y);
    zSlider(acl.z);
  });
  acl?.start();
}

function slider(parent: HTMLElement) {
  const label = document.createElement("label");
  const slider = document.createElement("input");
  slider.setAttribute("type", "range");
  slider.setAttribute("min", "-1");
  slider.setAttribute("max", "1");
  slider.setAttribute("step", "0.1");
  slider.style.display = "block";
  slider.style.margin = "auto";
  slider.style.width = "100%";
  slider.style.padding = "2em";
  parent.appendChild(label);
  parent.appendChild(slider);
  return (val: number) => {
    label.innerText = `Axis: ${val}`;
    slider.value = String(val);
  };
}
