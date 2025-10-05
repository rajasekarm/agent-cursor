interface AgentCursorOptions {
  speed?: number; // pixels per second
  size?: number; // cursor diameter in pixels
  color?: string;
  jitter?: number; // max pixels of random jitter
}

interface Point {
  x: number;
  y: number;
}

export class AgentCursor {
  private element: HTMLDivElement;
  private currentPosition: Point = { x: 0, y: 0 };
  private targetPosition: Point = { x: 0, y: 0 };
  private animationFrameId: number | null = null;
  private options: Required<AgentCursorOptions>;
  private lastTimestamp: number = 0;

  constructor(options: AgentCursorOptions = {}) {
    this.options = {
      speed: options.speed ?? 300,
      size: options.size ?? 20,
      color: options.color ?? '#646cff',
      jitter: options.jitter ?? 2,
    };

    this.element = this.createCursorElement();
    document.body.appendChild(this.element);

    // Start at center of viewport
    this.currentPosition = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    this.targetPosition = { ...this.currentPosition };
    this.updateElementPosition();
  }

  private createCursorElement(): HTMLDivElement {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.pointerEvents = 'none';
    el.style.zIndex = '10000';
    el.style.transition =
      'left 0.3s ease-out, top 0.3s ease-out, transform 0.1s ease-out';
    el.style.width = `${this.options.size}px`;
    el.style.height = `${this.options.size}px`;

    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="48" viewBox="0 0 24 24"><path fill="${this.options.color}" d="M4.5.79v22.42l6.56-6.57h9.29L4.5.79z"></path></svg>`;

    return el;
  }

  private updateElementPosition(): void {
    this.element.style.left = `${this.currentPosition.x}px`;
    this.element.style.top = `${this.currentPosition.y}px`;
    this.element.style.transform = `translate(0, 0) rotate(-25deg)`;
  }

  private easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  private getDistance(p1: Point, p2: Point): number {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  private addJitter(): Point {
    const jitter = this.options.jitter;
    return {
      x: (Math.random() - 0.5) * jitter * 2,
      y: (Math.random() - 0.5) * jitter * 2,
    };
  }

  private dispatchMouseEvent(
    type: string,
    x: number,
    y: number,
    target?: HTMLElement
  ): void {
    const eventTarget =
      target || document.elementFromPoint(x, y) || document.body;
    const event = new MouseEvent(type, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: x,
      clientY: y,
      screenX: x,
      screenY: y,
    });
    eventTarget.dispatchEvent(event);
  }

  private animate(timestamp: number): void {
    if (!this.lastTimestamp) {
      this.lastTimestamp = timestamp;
      this.animationFrameId = requestAnimationFrame((ts) => this.animate(ts));
      return;
    }

    const deltaTime = (timestamp - this.lastTimestamp) / 1000; // Convert to seconds
    this.lastTimestamp = timestamp;

    const distance = this.getDistance(
      this.currentPosition,
      this.targetPosition
    );

    if (distance > 1) {
      // Calculate how far we should move this frame
      const pixelsToMove = this.options.speed * deltaTime;
      const ratio = Math.min(pixelsToMove / distance, 1);

      // Apply easing
      const easedRatio = this.easeInOutCubic(ratio);

      // Add jitter for more natural movement
      const jitter = this.addJitter();

      this.currentPosition.x +=
        (this.targetPosition.x - this.currentPosition.x) * easedRatio +
        jitter.x;
      this.currentPosition.y +=
        (this.targetPosition.y - this.currentPosition.y) * easedRatio +
        jitter.y;

      this.updateElementPosition();

      // Dispatch mousemove event
      this.dispatchMouseEvent(
        'mousemove',
        this.currentPosition.x,
        this.currentPosition.y
      );

      this.animationFrameId = requestAnimationFrame((ts) => this.animate(ts));
    } else {
      // Reached target
      this.currentPosition = { ...this.targetPosition };
      this.updateElementPosition();
      this.animationFrameId = null;
      this.lastTimestamp = 0;
    }
  }

  async moveTo(x: number, y: number): Promise<void> {
    this.currentPosition = { x, y };
    this.targetPosition = { x, y };
    this.updateElementPosition();

    // Wait for CSS transition to complete (300ms)
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  async moveToElement(el: HTMLElement): Promise<void> {
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Dispatch mouseover when arriving at element
    await this.moveTo(centerX, centerY);
    this.dispatchMouseEvent('mouseover', centerX, centerY, el);
  }

  async click(el?: HTMLElement): Promise<void> {
    let clickX = this.currentPosition.x;
    let clickY = this.currentPosition.y;
    let target = el;

    if (el) {
      await this.moveToElement(el);
      const rect = el.getBoundingClientRect();
      clickX = rect.left + rect.width / 2;
      clickY = rect.top + rect.height / 2;
    }

    // Add a small animation to show click
    this.element.style.transform = 'translate(0, 0) rotate(-25deg) scale(0.8)';

    // Dispatch mousedown
    this.dispatchMouseEvent('mousedown', clickX, clickY, target);

    await new Promise((resolve) => setTimeout(resolve, 100));

    // Dispatch mouseup and click
    this.dispatchMouseEvent('mouseup', clickX, clickY, target);
    this.dispatchMouseEvent('click', clickX, clickY, target);

    // Reset scale
    this.element.style.transform = 'translate(0, 0) rotate(-25deg) scale(1)';
  }

  async type(
    el: HTMLInputElement | HTMLTextAreaElement,
    text: string
  ): Promise<void> {
    // Move to and click the input to focus it
    await this.moveToElement(el);
    await this.click(el);

    // Wait for focus
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Clear existing value
    el.value = '';
    el.dispatchEvent(new Event('input', { bubbles: true }));

    // Type each character with a delay
    for (const char of text) {
      el.value += char;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(
        new KeyboardEvent('keydown', { key: char, bubbles: true })
      );
      el.dispatchEvent(
        new KeyboardEvent('keypress', { key: char, bubbles: true })
      );
      el.dispatchEvent(
        new KeyboardEvent('keyup', { key: char, bubbles: true })
      );
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    // Trigger change event
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  async selectByIndex(el: HTMLSelectElement, index: number): Promise<void> {
    // Move to and click the select element
    await this.moveToElement(el);
    await this.click(el);

    // Wait a bit for the dropdown to open
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Set the selected index
    if (index >= 0 && index < el.options.length) {
      el.selectedIndex = index;
      el.dispatchEvent(new Event('change', { bubbles: true }));
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  async selectRadio(el: HTMLInputElement): Promise<void> {
    if (el.type !== 'radio') {
      throw new Error('Element must be a radio input');
    }

    // Move to and click the radio button
    await this.moveToElement(el);
    await this.click(el);

    // Set checked state
    el.checked = true;
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }

  async selectCheckbox(el: HTMLInputElement, checked: boolean): Promise<void> {
    if (el.type !== 'checkbox') {
      throw new Error('Element must be a checkbox input');
    }

    // Move to and click the checkbox
    await this.moveToElement(el);
    await this.click(el);

    // Set checked state
    el.checked = checked;
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }

  destroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.element.remove();
  }
}
