# **Eloqui PWA**

**Fluent Speech Practice. No Accounts, No Analytics, No Student Data Saved by Eloqui.**

## **1\. About Eloqui**

In Latin, **eloqui** is the present active infinitive of the deponent verb *eloquor*, meaning to speak out, to utter, or to express. It serves as the root for the English words **eloquence** and **eloquent**, which describe having the ability to express thoughts and emotions in fluent and persuasive speech.

The **Eloqui PWA** is a lightweight Progressive Web Application designed to help elementary students find their voice. It acts as an intelligent, patient, and real-time reading tracker that turns practice into an interactive experience. It has no accounts and no server of its own, and it keeps nothing once the tab is closed.

**Live Application:** [https://lgrabarek.github.io/eloqui-app/](https://lgrabarek.github.io/eloqui-app/)

## **2\. Privacy & Data Flow (for Schools)**

Eloqui keeps its own footprint small, but it depends on third-party services that schools should review. In particular, on Chromebooks speech recognition is performed by Google's servers, not on the device.

### **What Eloqui Does Not Do**

* **No accounts or tracking:** There are no logins, cookies, analytics, or ads.  
* **No backend:** Eloqui has no server or database of its own, and Eloqui's own code never uploads the reading text, transcripts, or scores. The third-party services below are the exceptions.  
* **Local text files:** Texts are opened with the browser's file picker and read inside the browser. The file itself is never uploaded.  
* **Nothing saved:** Transcripts, error counts, and trend charts exist only in the browser tab's memory and are erased when the tab is reloaded or closed. The service worker caches only the app's own files (the page, manifest, and icons), never student data.

### **What Leaves the Device**

1. **Speech recognition (Google):** Eloqui uses Chrome's built-in Web Speech API. On Chromebooks, Chrome sends the microphone audio to Google's speech servers, which send the recognized text back to the page ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)). Audio streams the whole time **Listening** is on, so it can pick up other voices in the room; pause when the student isn't reading. Eloqui itself never receives the audio, only the text Google returns. Because Google produces that text, Google has both the audio and the transcript of everything said while Listening is on. Their handling is governed by [Google's policies](https://policies.google.com/privacy), not Eloqui's, and as of October 2026 we could not find current Google documentation on how long either is kept. Recognition needs an internet connection.  
2. **Hosting (GitHub Pages):** GitHub logs and stores each visitor's IP address for security purposes ([GitHub Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)).  
3. **Code libraries (jsDelivr and the Tailwind CDN):** The Python runtime (Pyodide), Chart.js, and the file-picker library load from cdn.jsdelivr.net, and the styles load from cdn.tailwindcss.com. These services receive each device's IP address and browser details when the files load ([jsDelivr privacy policy](https://github.com/jsdelivr/jsdelivr/blob/master/Privacy%20Policy.md)).  
4. **Pronunciation (🔊) button:** This uses the browser's text-to-speech voice. On some computers that is an online Google voice, which sends the word to Google.

### **Notes for School IT**

* **Compliance:** Eloqui does not claim COPPA or FERPA compliance on its own. Review Google (speech recognition), GitHub, jsDelivr, and the Tailwind CDN under your district's policies; Eloqui has no data processing agreements with them. Note that jsDelivr's privacy policy says its service "is not intended for use by children."  
* **Third-party scripts:** Pyodide, Chart.js, the file-picker library, and Tailwind run inside the page with the same access as Eloqui's own code, including the text and transcripts. They are not integrity-checked, and Chart.js and Tailwind are not pinned to an exact version, so their code can change without review.  
* **Microphone permission:** Chrome asks for microphone access per site. On managed Chromebooks, the AudioCaptureAllowedUrls policy ("Audio input allowed URLs" in the Admin console) grants it without a prompt. The permission covers all of https://lgrabarek.github.io, which also hosts other projects. Blocking the microphone disables Eloqui, and no Chrome policy forces speech recognition to stay on the device.  
* **Desktop Chrome:** On Windows, Mac, and Linux, Chrome 139 and later may run speech recognition on the device if a language pack is already installed; otherwise it also uses Google's servers. ChromeOS does not currently offer on-device recognition to websites.  
* **HTTPS:** GitHub Pages serves Eloqui over an encrypted connection, which browsers require before granting microphone access.

## **3\. How the Tracker Works (Child-Friendly Logic)**

Eloqui is specifically tuned for the unique pace of elementary school readers:

1. **Patient Tracking:** Unlike other apps, the blue target box will never "run away" from a student. If they need time to sound out a difficult word, the app waits indefinitely for them.  
2. **Smart Catch-Up:** If a student skips a difficult word and starts reading the next one, the app intelligently recognizes the jump, marks the skipped word as "missed" in the background, and moves the blue box to catch up to their current position.  
3. **Manual Override:** If the student or teacher wants to jump to a specific paragraph or reset a sentence, they can simply **click any word** on the screen. The tracker will instantly move to that word, marking any jumped-over words as mispronounced.  
4. **Compound Word Support:** The engine handles syllables and combined words (like "sun-flower") by looking ahead and stitching spoken fragments together to find a match.

## **4\. Deployment Instructions**

To make Eloqui accessible on Chromebooks without any local setup, host it as a static site on GitHub Pages.

### **Initial Setup**

1. **Create Repository:** Create a new **Public** repository named eloqui-app.  
2. **Upload Files:** Drag and drop index.html, manifest.json, service-worker.js, icon-192.png, and icon-512.png into the repository root.  
3. **Enable Pages:** Go to **Settings \> Pages**. Under "Branch", select **main** and **/(root)**, then click **Save**.

### **Updating the App**

Eloqui's service worker loads the newest files from the network first and keeps a copy only as an offline fallback, so updates reach students automatically:

1. **Upload the changed files:** Commit or upload the updated files (for example, index.html) to the repository's main branch. GitHub Pages usually republishes the site within a minute or two.  
2. **Students get it on their next visit:** The new version loads the next time students open or reload the app. GitHub Pages lets browsers reuse files for up to 10 minutes, so a student who reopens the app within 10 minutes of their last visit may still see the old version. Pressing reload (Ctrl+R) loads the new version right away.  
3. **No version bump needed:** Normal updates don't require changing service-worker.js. Only if you add, rename, or remove one of the files in its urlsToCache list, update that list and increment CACHE\_NAME (e.g., change v3 to v4) so old copies are cleared.

**Internet required:** Eloqui can be installed as an app from Chrome, but it still needs an internet connection: speech recognition runs on Google's servers, and the Python runtime and libraries load from the CDNs listed above. Offline, the app may stay on "Initializing Python runtime..." or show an error. On a Chromebook that has used Eloqui recently, it may instead load normally, but the blue box won't move after **Start Listening** because speech recognition can't reach Google. If that happens, check the internet connection.

## **5\. User Guide**

1. **Open Eloqui:** Navigate to \[your GitHub Pages URL\] in Google Chrome.  
2. **Load Text:** Select the language and click the **Load Text File** link to select a .txt or .md file.  
3. **Start Reading:** Click **Start Listening**. Read the words highlighted in **blue**.  
4. **Review Progress:** Click **End & Summarize** to see accuracy metrics and trend charts.
