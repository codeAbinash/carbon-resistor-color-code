// import { } from './lib/fontawesome.js'



// Register a Service Worker

async function registerSW() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = navigator.serviceWorker.register('./sw.js')
            console.log('Service Worker Registered')
        } catch (error) {
            console.warn("Error Registering Service Worker")
            console.log(error)
        }
    } else
        console.log('Service worker is not available for this device')
}


registerSW()