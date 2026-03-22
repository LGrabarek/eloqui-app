Eloqui PWA

Product & Deployment Guide

1. About Eloqui

In Latin, eloqui is the present active infinitive of the deponent verb eloquor, meaning to speak out, to utter, or to express. It serves as the root for the English words eloquence and eloquent, which describe having the ability to express thoughts and emotions in fluent and persuasive speech.

The Eloqui PWA is a privacy-first, local Progressive Web Application designed to help elementary students find their voice. It acts as an intelligent, patient, and real-time reading tracker that turns practice into an interactive experience.

Live Demo: https://lgrabarek.github.io/eloqui-app/

2. Privacy & Security (Architecture for Schools)

Eloqui is built with a "Zero-Data" local-first architecture. It is designed specifically to meet the stringent privacy requirements of educational environments (including COPPA/FERPA considerations).

Technical Security Profile

Local Runtime: The application utilizes Pyodide, a port of the CPython runtime to WebAssembly. This allows all speech processing and logic to run entirely within the client's browser sandbox.

No Data Transmission: Unlike traditional speech-to-text services, Eloqui does not send audio data or transcripts to a cloud server. All transcription is handled by the browser's local Web Speech API, and all analysis is performed by the local Python engine.

No Persistent Storage: The application does not use a database or external cloud storage. Session data and trend charts are stored in volatile memory (RAM) and are cleared once the browser tab is closed or the application is reloaded.

Static Distribution: As a static site hosted on GitHub Pages, the server only serves files; it cannot receive or store user data. There is no "backend" where student information could be leaked.

Secure Context (HTTPS): Deployment via GitHub Pages ensures a secure, encrypted connection (SSL/TLS), which is a requirement for the browser to grant microphone access.

For security professionals: Eloqui represents a "closed-loop" system. Once the static assets are downloaded, the application's functionality is contained strictly within the device's local environment.

3. How the Tracker Works (Child-Friendly Logic)

Eloqui is specifically tuned for the unique pace of elementary school readers:

Patient Tracking: Unlike other apps, the blue target box will never "run away" from a student. If they need time to sound out a difficult word, the app waits indefinitely for them.

Smart Catch-Up: If a student skips a difficult word and starts reading the next one, the app intelligently recognizes the jump, marks the skipped word as "missed" in the background, and moves the blue box to catch up to their current position.

Manual Override: If the student or teacher wants to jump to a specific paragraph or reset a sentence, they can simply click any word on the screen. The tracker will instantly move to that word, marking any jumped-over words as mispronounced.

Compound Word Support: The engine handles syllables and combined words (like "sun-flower") by looking ahead and stitching spoken fragments together to find a match.

4. GitHub Pages Deployment (Chromebooks)

To make Eloqui accessible on Chromebooks without any local setup, we host it as a static site on GitHub Pages.

Initial Setup

Create Repository: Create a new Public repository on GitHub named eloqui-app.

Upload Files: Drag and drop index.html, manifest.json, service-worker.js, icon-192.png, and icon-512.png into the repository root.

Enable Pages: Go to Settings > Pages. Under "Branch", select main and /(root), then click Save.

Access: Your app is live at https://lgrabarek.github.io/eloqui-app/.

How to Update the App

Because the app is a PWA, it saves itself to the Chromebook for offline use. To push a new update:

Replace index.html: Upload your new index.html to the repository.

Update Service Worker: Open service-worker.js on GitHub and increment the CACHE_NAME version (e.g., change v1 to v2).

Refresh: When students next open the app with an internet connection, the browser will see the version change in the service worker and automatically download the latest code.

5. Instructions for Users

Open Eloqui: Navigate to https://lgrabarek.github.io/eloqui-app/ in Google Chrome.

Load Text: Select the student's language and click the Load Text File link to select a .txt or .md file.

Start Reading: Click Start Listening. The current target word is highlighted in blue. Successfully spoken words will turn bold.

Review Progress: Click End & Summarize to see a report of minor and major pronunciation errors, as well as a trend chart showing progress over time.
