# AgentCursor

A programmatic cursor control library that enables AI agents and automation scripts to visually interact with web pages. Perfect for building browser automation tools, AI agents, and demonstrating automated workflows.

## Features

- 🤖 **AI Agent Control**: Programmatic cursor control for AI agents to interact with web UIs
- 🎯 **Complete Form Automation**: Type text, select dropdowns, check boxes, select radios
- 🖱️ **Visual Cursor**: SVG cursor with smooth transitions for visual feedback
- 🎨 **Customizable**: Color, size, speed, and movement behavior
- 📦 **TypeScript support** with full type definitions
- 🚀 **Zero dependencies** (pure TypeScript)
- 💫 **Real DOM events** for genuine browser interaction

## Installation

```bash
npm install agent-cursor
```

## Quick Start

```typescript
import { AgentCursor } from 'agent-cursor';

// Create cursor instance
const cursor = new AgentCursor({
  color: '#646cff',
  size: 24,
  speed: 400,
});

// Move to an element
const button = document.getElementById('myButton');
await cursor.moveToElement(button);

// Click it
await cursor.click(button);

// Type into an input
const input = document.getElementById('email');
await cursor.type(input, 'user@example.com');

// Clean up when done
cursor.destroy();
```

## API Reference

### Constructor Options

```typescript
interface AgentCursorOptions {
  speed?: number; // Movement speed in pixels/second (default: 300)
  size?: number; // Cursor size in pixels (default: 20)
  color?: string; // Cursor color (default: '#646cff')
  jitter?: number; // Random movement jitter in pixels (default: 2)
}
```

### Methods

#### `moveTo(x: number, y: number): Promise<void>`

Move cursor to specific coordinates.

```typescript
await cursor.moveTo(100, 200);
```

#### `moveToElement(element: HTMLElement): Promise<void>`

Move cursor to the center of an element.

```typescript
const button = document.querySelector('button');
await cursor.moveToElement(button);
```

#### `click(element?: HTMLElement): Promise<void>`

Click at current position or on a specific element.

```typescript
await cursor.click(button);
```

#### `type(input: HTMLInputElement | HTMLTextAreaElement, text: string): Promise<void>`

Type text character-by-character into an input field.

```typescript
const emailInput = document.querySelector('#email');
await cursor.type(emailInput, 'user@example.com');
```

#### `selectByIndex(select: HTMLSelectElement, index: number): Promise<void>`

Select a dropdown option by index.

```typescript
const countrySelect = document.querySelector('#country');
await cursor.selectByIndex(countrySelect, 3); // Select 4th option
```

#### `selectCheckbox(checkbox: HTMLInputElement, checked: boolean): Promise<void>`

Check or uncheck a checkbox.

```typescript
const terms = document.querySelector('#terms');
await cursor.selectCheckbox(terms, true);
```

#### `selectRadio(radio: HTMLInputElement): Promise<void>`

Select a radio button.

```typescript
const option = document.querySelector('input[name="plan"][value="premium"]');
await cursor.selectRadio(option);
```

#### `destroy(): void`

Remove the cursor and clean up resources.

```typescript
cursor.destroy();
```

## Examples

### Login Form Demo

```typescript
import { AgentCursor } from 'agent-cursor';

const cursor = new AgentCursor({ color: '#646cff' });

// Fill login form
const emailInput = document.querySelector('#email');
await cursor.type(emailInput, 'user@example.com');

const passwordInput = document.querySelector('#password');
await cursor.type(passwordInput, 'password123');

const rememberMe = document.querySelector('#remember');
await cursor.selectCheckbox(rememberMe, true);

const loginButton = document.querySelector('#login-btn');
await cursor.click(loginButton);

cursor.destroy();
```

### Registration Form Demo

```typescript
const cursor = new AgentCursor();

await cursor.type(document.querySelector('#name'), 'John Doe');
await cursor.type(document.querySelector('#email'), 'john@example.com');
await cursor.selectByIndex(document.querySelector('#country'), 2);
await cursor.selectCheckbox(document.querySelector('#terms'), true);
await cursor.click(document.querySelector('#submit'));

cursor.destroy();
```

## Demo

Run the demo locally:

```bash
git clone https://github.com/rajasekarm/agent-cursor.git
cd agent-cursor
npm install
npm run dev
```

Visit `http://localhost:5173/demo/index.html` to see the demo in action.

## Use Cases

- 🤖 **AI Agents**: Enable AI agents to visually interact with web interfaces
- 🔄 **Browser Automation**: Automate repetitive browser tasks with visual feedback
- 🧪 **Testing**: Visualize automated test flows and UI interactions
- 📹 **Demo & Training**: Create visual demonstrations of user workflows
- 🎯 **Web Scraping**: Interact with dynamic web pages that require user actions
- 🔧 **RPA (Robotic Process Automation)**: Automate business processes in web applications

## Browser Support

Works in all modern browsers that support:

- ES2020
- CSS Transitions
- SVG

## License

MIT © Rajasekarm

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Repository

[https://github.com/rajasekarm/agent-cursor](https://github.com/rajasekarm/agent-cursor)
