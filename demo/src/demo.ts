import './style.css';
import { AgentCursor } from '../../src/agent-cursor';

// Create the agent cursor
const cursor = new AgentCursor({
  speed: 400,
  size: 24,
  color: '#000',
  jitter: 3,
});

// Logging function
const log = (message: string) => {
  const logOutput = document.getElementById('log-output')!;
  const entry = document.createElement('div');
  entry.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
  logOutput.insertBefore(entry, logOutput.firstChild);

  // Keep only last 10 entries
  while (logOutput.children.length > 10) {
    logOutput.removeChild(logOutput.lastChild!);
  }
};

// Login Demo
document
  .getElementById('run-login-demo')
  ?.addEventListener('click', async () => {
    log('🔵 Starting Login Demo...');

    // Go to login email
    const loginEmail = document.getElementById(
      'login-email'
    ) as HTMLInputElement;
    log('Moving to login email field...');
    await cursor.moveToElement(loginEmail);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Fill login email
    log('Typing email...');
    await cursor.type(loginEmail, 'user@example.com');
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Go to login password
    const loginPassword = document.getElementById(
      'login-password'
    ) as HTMLInputElement;
    log('Moving to password field...');
    await cursor.moveToElement(loginPassword);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Fill login password
    log('Typing password...');
    await cursor.type(loginPassword, 'password123');
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Go to remember me checkbox
    const rememberCheckbox = document.getElementById(
      'login-remember'
    ) as HTMLInputElement;
    log('Moving to remember me checkbox...');
    await cursor.moveToElement(rememberCheckbox);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Check remember me
    log('Checking remember me...');
    await cursor.selectCheckbox(rememberCheckbox, true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Go to login button
    const loginBtn = document.getElementById(
      'login-submit'
    ) as HTMLButtonElement;
    log('Moving to login button...');
    await cursor.moveToElement(loginBtn);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Click login
    log('Clicking login button...');
    await cursor.click(loginBtn);

    log('✅ Login Demo Complete!');
  });

// Register Demo
document
  .getElementById('run-register-demo')
  ?.addEventListener('click', async () => {
    log('🟢 Starting Register Demo...');

    // Go to register name
    const registerName = document.getElementById(
      'register-name'
    ) as HTMLInputElement;
    log('Moving to name field...');
    await cursor.moveToElement(registerName);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Fill name
    log('Typing name...');
    await cursor.type(registerName, 'John Doe');
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Go to register email
    const registerEmail = document.getElementById(
      'register-email'
    ) as HTMLInputElement;
    log('Moving to email field...');
    await cursor.moveToElement(registerEmail);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Fill email
    log('Typing email...');
    await cursor.type(registerEmail, 'john.doe@example.com');
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Go to register password
    const registerPassword = document.getElementById(
      'register-password'
    ) as HTMLInputElement;
    log('Moving to password field...');
    await cursor.moveToElement(registerPassword);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Fill password
    log('Typing password...');
    await cursor.type(registerPassword, 'securepass123');
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Go to country dropdown
    const registerCountry = document.getElementById(
      'register-country'
    ) as HTMLSelectElement;
    log('Moving to country dropdown...');
    await cursor.moveToElement(registerCountry);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Select country (index 4 = Australia)
    log('Selecting country...');
    await cursor.selectByIndex(registerCountry, 4);
    await new Promise((resolve) => setTimeout(resolve, 500));
    log(`Selected: ${registerCountry.options[4].text}`);

    // Go to terms checkbox
    const termsCheckbox = document.getElementById(
      'register-terms'
    ) as HTMLInputElement;
    log('Moving to terms checkbox...');
    await cursor.moveToElement(termsCheckbox);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Check terms
    log('Checking terms and conditions...');
    await cursor.selectCheckbox(termsCheckbox, true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Go to register button
    const registerBtn = document.getElementById(
      'register-submit'
    ) as HTMLButtonElement;
    log('Moving to register button...');
    await cursor.moveToElement(registerBtn);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Click register
    log('Clicking register button...');
    await cursor.click(registerBtn);

    log('✅ Register Demo Complete!');
  });

// Destroy cursor
document.getElementById('destroy-cursor')?.addEventListener('click', () => {
  cursor.destroy();
  log('🔴 Cursor destroyed');
});

// Log button clicks
document.getElementById('login-submit')?.addEventListener('click', () => {
  log('✅ Login button clicked!');
});

document.getElementById('register-submit')?.addEventListener('click', () => {
  log('✅ Register button clicked!');
});

log('🎯 AgentCursor initialized. Try the demo buttons!');
console.log('TypeScript project with AgentCursor initialized successfully!');
