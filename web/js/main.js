import { Editor } from './core/Editor.js';
import { ParserManager } from './core/Parser.js';
import { AppState } from './core/State.js';
import { events } from './utils/events.js';

async function initializeApp() {
    try {
        // Initialize core components in order
        const state = AppState.getInstance();
        const parser = ParserManager.getInstance();
        await parser.initialize();

        const editor = new Editor();

        window.addEventListener('error', (e) => {
            console.error('Global error:', e);
            state.showNotification('An error occurred', 'error');
        });

    } catch (error) {
        console.error('Failed to initialize application:', error);
        document.body.innerHTML = `
            <div class="error-screen">
                <h1>Failed to Initialize</h1>
                <p>${error.message}</p>
                <button onclick="location.reload()">Retry</button>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);
