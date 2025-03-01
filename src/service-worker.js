/* eslint-disable no-restricted-globals */

import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

// Precache files for offline access
precacheAndRoute(self.__WB_MANIFEST);

// Cache API calls (for faster performance)
registerRoute(
  ({ request }) => request.destination === "script" || request.destination === "style",
  new StaleWhileRevalidate()
);
