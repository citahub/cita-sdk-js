import CITASDK from './index';
declare global {
    interface Window {
        CITASDK: typeof CITASDK;
    }
}
