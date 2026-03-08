(() => {
    const THEMES = new Set(['light', 'dark', 'system'])
    const STORAGE_KEY = 'theme';

    function getTheme() {
        const storedTheme = localStorage.getItem(STORAGE_KEY)
        return THEMES.has(storedTheme) ? storedTheme : 'system';
    }

    function resolveTheme(theme) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        return theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;
    }

    function setTheme(theme) {
        const resolvedTheme = resolveTheme(theme);
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(resolvedTheme);
        localStorage.setItem(STORAGE_KEY, resolvedTheme);
    }

    setTheme(getTheme());

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('theme-toggle').addEventListener('click', () => {
            const currentTheme = resolveTheme(getTheme());
            const toggledTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(toggledTheme);
        })
    })
})();