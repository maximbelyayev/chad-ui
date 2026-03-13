import 'vite/modulepreload-polyfill'
import "@/css/main.css"

import htmx from 'htmx.org';
import 'htmx.org/dist/ext/hx-alpine-compat';

import Alpine from 'alpinejs'
import anchor from '@alpinejs/anchor'
import collapse from '@alpinejs/collapse'
import focus from '@alpinejs/focus'
import resize from '@alpinejs/resize'

window.Alpine = Alpine
Alpine.plugin(anchor)
Alpine.plugin(collapse)
Alpine.plugin(focus)
Alpine.plugin(resize)
Alpine.start();
