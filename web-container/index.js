import { WebContainer } from '@webcontainer/api';

// Import all project files as raw text
import eslint_config_mjs from '../eslint.config.mjs?raw';
import next_env_d_ts from '../next-env.d.ts?raw';
import next_config_ts from '../next.config.ts?raw';
import package_json from '../package.json?raw';
import tsconfig_json from '../tsconfig.json?raw';
import postcss_config_mjs from '../postcss.config.mjs?raw';
import readme_md from '../README.md?raw';

// App files
import layout_tsx from '../src/app/layout.tsx?raw';
import page_tsx from '../src/app/page.tsx?raw';
import globals_css from '../src/app/globals.css?raw';

// Component files
import brain3d_tsx from '../src/components/Brain3D.tsx?raw';

// Public assets (text files)
import globe_svg from '../public/globe.svg?raw';
import next_svg from '../public/next.svg?raw';
import vercel_svg from '../public/vercel.svg?raw';
import window_svg from '../public/window.svg?raw';
import file_svg from '../public/file.svg?raw';

// Global variables
let webcontainerInstance;
let terminal;
let installButton;
let startButton;
let status;
let loader;
let previewStatus;
let websitePreview;

// Terminal management
function appendToTerminal(text, className = '') {
    if (terminal) {
        const span = document.createElement('span');
        span.textContent = text;
        if (className) span.className = className;
        terminal.appendChild(span);
        terminal.scrollTop = terminal.scrollHeight;
    }
}

function updateStatus(message, isSuccess = false, isError = false) {
    if (status) {
        status.textContent = message;
        status.className = isSuccess ? 'success' : isError ? 'error' : '';
    }
}

function hideLoader() {
    if (loader) {
        loader.classList.add('hidden');
    }
}

function showLoader() {
    if (loader) {
        loader.classList.remove('hidden');
    }
}

// Clear terminal function (global for HTML onclick)
window.clearTerminal = function () {
    if (terminal) {
        terminal.innerHTML = '';
    }
};

// Toggle fullscreen preview (global for HTML onclick)
window.toggleFullscreen = function () {
    const previewContainer = document.getElementById('preview-container');
    const panel = previewContainer.closest('.panel');
    const panels = document.querySelector('.panels');

    if (panel.classList.contains('fullscreen')) {
        // Exit fullscreen
        panel.classList.remove('fullscreen');
        panels.style.gridTemplateColumns = '1fr 1fr';
        document.querySelector('.container').style.maxWidth = '1200px';
        document.getElementById('fullscreen-btn').textContent = '⛶ Fullscreen';
    } else {
        // Enter fullscreen
        panel.classList.add('fullscreen');
        panels.style.gridTemplateColumns = '0fr 1fr';
        document.querySelector('.container').style.maxWidth = '100%';
        document.getElementById('fullscreen-btn').textContent = '↙ Exit Fullscreen';
    }
};

// Open preview in new tab (global for HTML onclick)
let currentPreviewUrl = '';
window.openInNewTab = function () {
    if (currentPreviewUrl) {
        window.open(currentPreviewUrl, '_blank', 'noopener,noreferrer');
        appendToTerminal(`🚀 Opened preview in new tab: ${currentPreviewUrl}\n`);
    } else {
        appendToTerminal('⚠️ No preview URL available to open in new tab\n', 'error');
    }
};

// Retry iframe loading (global for HTML onclick)
window.retryIframe = function () {
    if (currentPreviewUrl) {
        appendToTerminal('🔄 Retrying iframe load...\n');
        const websitePreview = document.getElementById('website-preview');
        const previewStatus = document.getElementById('preview-status');
        if (websitePreview) {
            // Hide error message and show iframe
            if (previewStatus) previewStatus.style.display = 'none';
            websitePreview.style.display = 'block';
            websitePreview.src = 'about:blank';
            setTimeout(() => {
                websitePreview.src = currentPreviewUrl;
            }, 500);
        }
    }
};

// Auto-open in new tab (global for HTML onclick)
window.autoOpenTab = function () {
    if (currentPreviewUrl) {
        appendToTerminal('🚀 Auto-opening in new tab and will check periodically...\n');
        window.open(currentPreviewUrl, '_blank', 'noopener,noreferrer');

        // Hide the error message since user is using new tab
        const previewStatus = document.getElementById('preview-status');
        if (previewStatus) {
            previewStatus.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #4CAF50;">
                    <h3 style="margin-bottom: 15px;">✅ Opened in New Tab</h3>
                    <p style="margin-bottom: 20px;">Your portfolio is now running in a separate tab.</p>
                    <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0; word-break: break-all;">
                        <strong>Direct URL:</strong><br>
                        <a href="${currentPreviewUrl}" target="_blank" style="color: #2196F3; text-decoration: none;">${currentPreviewUrl}</a>
                    </div>
                    <button onclick="openInNewTab()" style="background: #2196F3; color: white; border: none; padding: 12px 24px; border-radius: 5px; cursor: pointer; margin: 5px;">
                        🔗 Open Another Tab
                    </button>
                </div>
            `;
        }
    }
};

// File system structure for WebContainer mount
const files = {
    'eslint.config.mjs': {
        file: {
            contents: eslint_config_mjs
        }
    },
    'next-env.d.ts': {
        file: {
            contents: next_env_d_ts
        }
    },
    'next.config.ts': {
        file: {
            contents: next_config_ts
        }
    },
    'package.json': {
        file: {
            contents: package_json
        }
    },
    'tsconfig.json': {
        file: {
            contents: tsconfig_json
        }
    },
    'postcss.config.mjs': {
        file: {
            contents: postcss_config_mjs
        }
    },
    'README.md': {
        file: {
            contents: readme_md
        }
    },
    src: {
        directory: {
            app: {
                directory: {
                    'layout.tsx': {
                        file: {
                            contents: layout_tsx
                        }
                    },
                    'page.tsx': {
                        file: {
                            contents: page_tsx
                        }
                    },
                    'globals.css': {
                        file: {
                            contents: globals_css
                        }
                    }
                }
            },
            components: {
                directory: {
                    'Brain3D.tsx': {
                        file: {
                            contents: brain3d_tsx
                        }
                    }
                }
            }
        }
    },
    public: {
        directory: {
            'globe.svg': {
                file: {
                    contents: globe_svg
                }
            },
            'next.svg': {
                file: {
                    contents: next_svg
                }
            },
            'vercel.svg': {
                file: {
                    contents: vercel_svg
                }
            },
            'window.svg': {
                file: {
                    contents: window_svg
                }
            },
            'file.svg': {
                file: {
                    contents: file_svg
                }
            },
            'image.png': {
                file: {
                    contents: '/* Binary file - image.png placeholder */'
                }
            },
            'brain_3D_model.glb': {
                file: {
                    contents: '/* Binary file - brain_3D_model.glb placeholder */'
                }
            }
        }
    }
};

// Mount file system using WebContainer mount method
async function createFileSystem(container) {
    appendToTerminal('📁 Mounting file system...\n');

    try {
        // Mount all files and directories at once
        await container.mount(files);

        // Count files for feedback
        function countFiles(obj) {
            let count = 0;
            for (const key in obj) {
                if (obj[key].file) {
                    count++;
                } else if (obj[key].directory) {
                    count += countFiles(obj[key].directory);
                }
            }
            return count;
        }

        const fileCount = countFiles(files);
        appendToTerminal(`🎉 Successfully mounted ${fileCount} files!\n`, 'success');

    } catch (error) {
        appendToTerminal(`❌ Failed to mount file system: ${error.message}\n`, 'error');
        throw error;
    }
}

// Install dependencies
async function installDependencies() {
    if (!webcontainerInstance) return;

    appendToTerminal('\n📦 Installing dependencies...\n');
    updateStatus('Installing dependencies...', false, false);
    showLoader();
    installButton.disabled = true;

    try {
        const installProcess = await webcontainerInstance.spawn('npm', ['install']);

        // Stream output to terminal
        installProcess.output.pipeTo(new WritableStream({
            write(data) {
                appendToTerminal(data);
            }
        }));

        const exitCode = await installProcess.exit;

        if (exitCode === 0) {
            appendToTerminal('\n✅ Dependencies installed successfully!\n', 'success');
            updateStatus('Dependencies installed!', true);
            startButton.disabled = false;
        } else {
            appendToTerminal(`\n❌ Installation failed with exit code ${exitCode}\n`, 'error');
            updateStatus('Installation failed!', false, true);
        }
    } catch (error) {
        appendToTerminal(`\n❌ Installation error: ${error.message}\n`, 'error');
        updateStatus('Installation failed!', false, true);
    }

    hideLoader();
}

// Start development server
async function startDevServer() {
    if (!webcontainerInstance) return;

    appendToTerminal('\n🚀 Starting development server...\n');
    updateStatus('Starting development server...', false, false);
    showLoader();
    startButton.disabled = true;

    try {
        // Start the dev server
        const devProcess = await webcontainerInstance.spawn('npm', ['run', 'dev']);

        // Stream output to terminal
        devProcess.output.pipeTo(new WritableStream({
            write(data) {
                appendToTerminal(data);
                // Note: We don't call showWebsite() here as it will be handled by the 'server-ready' event
                // which provides the correct WebContainer URL
            }
        }));

        // Listen for server ready
        webcontainerInstance.on('server-ready', (port, url) => {
            appendToTerminal(`\n🌐 Server ready on port ${port}\n`, 'success');
            appendToTerminal(`🔗 URL: ${url}\n`, 'success');
            updateStatus(`Development server running on port ${port}`, true);
            hideLoader();
            showWebsite(url);
        });

    } catch (error) {
        appendToTerminal(`\n❌ Server start error: ${error.message}\n`, 'error');
        updateStatus('Failed to start server!', false, true);
        hideLoader();
    }
}

// Show website in iframe
function showWebsite(url) {
    if (!url) {
        appendToTerminal('⚠️ No URL provided to showWebsite function\n', 'error');
        return;
    }

    // Store the current URL for the "Open in New Tab" functionality
    currentPreviewUrl = url;

    appendToTerminal(`🔗 Loading preview: ${url}\n`);

    // Show URL bar with clickable link
    const urlBar = document.getElementById('preview-url-bar');
    const urlLink = document.getElementById('preview-url-link');
    if (urlBar && urlLink) {
        urlBar.style.display = 'block';
        urlLink.href = url;
        urlLink.textContent = url;
    }

    if (previewStatus) {
        previewStatus.style.display = 'none';
    }
    if (websitePreview) {
        websitePreview.style.display = 'block';

        // Add a timeout to check if the iframe loads
        let loadTimeout = setTimeout(() => {
            try {
                // Try to access the iframe's content to check if it loaded
                const iframeDoc = websitePreview.contentDocument || websitePreview.contentWindow.document;
                if (!iframeDoc || iframeDoc.location.href === 'about:blank') {
                    throw new Error('Iframe blocked');
                }
            } catch (e) {
                appendToTerminal('⚠️ Website preview may be blocked by CORS or other security policies\n', 'error');
                appendToTerminal('💡 Try clicking "New Tab" to open the preview in a separate tab\n');
                appendToTerminal('🔧 Alternatively, try the fullscreen mode for better viewing\n');

                // Show a helpful message in the preview area
                if (previewStatus) {
                    previewStatus.style.display = 'block';
                    previewStatus.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <p style="margin-bottom: 15px;">⚠️ Iframe preview blocked by security policies</p>
                            <div style="background: #f5f5f5; padding: 10px; border-radius: 5px; margin: 15px 0; word-break: break-all;">
                                <strong>Preview URL:</strong><br>
                                <a href="${url}" target="_blank" style="color: #2196F3; text-decoration: none;">${url}</a>
                            </div>
                            <div style="margin-bottom: 15px;">
                                <button onclick="openInNewTab()" style="background: #2196F3; color: white; border: none; padding: 12px 24px; border-radius: 5px; cursor: pointer; margin: 5px; font-size: 14px;">
                                    🚀 Open in New Tab
                                </button>
                                <button onclick="retryIframe()" style="background: #ff9800; color: white; border: none; padding: 12px 24px; border-radius: 5px; cursor: pointer; margin: 5px; font-size: 14px;">
                                    🔄 Retry Iframe
                                </button>
                                <button onclick="autoOpenTab()" style="background: #4CAF50; color: white; border: none; padding: 12px 24px; border-radius: 5px; cursor: pointer; margin: 5px; font-size: 14px;">
                                    🚀 Auto-Open Tab
                                </button>
                            </div>
                            <small style="color: #666; margin-top: 10px; display: block;">
                                WebContainer URLs work best in separate tabs due to CORS restrictions.<br>
                                Click the URL above or use the buttons below.
                            </small>
                            <div style="margin-top: 15px; padding: 10px; background: #e3f2fd; border-radius: 5px;">
                                <small style="color: #1976d2;">
                                    💡 <strong>Pro Tip:</strong> Auto-opening in new tab in 5 seconds...
                                </small>
                            </div>
                        </div>
                    `;

                    // Auto-open in new tab after 5 seconds
                    setTimeout(() => {
                        appendToTerminal('🚀 Auto-opening preview in new tab due to iframe restrictions...\n');
                        window.open(url, '_blank', 'noopener,noreferrer');
                        autoOpenTab();
                    }, 5000);
                }
            }
        }, 3000);

        // Add load event listeners for debugging
        websitePreview.onload = function () {
            clearTimeout(loadTimeout);
            appendToTerminal('✅ Website preview loaded successfully!\n', 'success');
        };

        websitePreview.onerror = function () {
            appendToTerminal('❌ Failed to load website preview\n', 'error');
        };

        // Set the source URL
        websitePreview.src = url;
    }
}

// Initialize WebContainer
async function initWebContainer() {
    try {
        appendToTerminal('🔧 Booting WebContainer...\n');

        webcontainerInstance = await WebContainer.boot();
        appendToTerminal('✅ WebContainer booted successfully!\n', 'success');

        await createFileSystem(webcontainerInstance);

        updateStatus('WebContainer ready!', true);
        hideLoader();
        installButton.disabled = false;

        appendToTerminal('\n🎯 Ready to install dependencies!\n', 'success');
        appendToTerminal('Click "Install Dependencies" to get started.\n');

    } catch (error) {
        appendToTerminal(`\n❌ WebContainer error: ${error.message}\n`, 'error');
        updateStatus('WebContainer failed to initialize!', false, true);
        hideLoader();
    }
}

// Initialize when page loads
window.addEventListener('load', async () => {
    // Get DOM elements
    terminal = document.getElementById('terminal');
    installButton = document.getElementById('install-btn');
    startButton = document.getElementById('start-btn');
    status = document.getElementById('status');
    loader = document.getElementById('loader');
    previewStatus = document.getElementById('preview-status');
    websitePreview = document.getElementById('website-preview');

    // Add event listeners
    installButton.addEventListener('click', installDependencies);
    startButton.addEventListener('click', startDevServer);

    // Start initialization
    appendToTerminal('🌟 Welcome to Dhruv\'s Portfolio Web Container!\n');
    appendToTerminal('==========================================\n\n');

    await initWebContainer();
});