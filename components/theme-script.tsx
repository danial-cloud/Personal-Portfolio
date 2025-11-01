export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              function getThemePreference() {
                if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
                  return localStorage.getItem('theme');
                }
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              }
              
              const themePreference = getThemePreference();
              const theme = themePreference === 'system' 
                ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                : themePreference;
              
              // Apply theme immediately to prevent flash
              document.documentElement.classList.remove('light', 'dark');
              document.documentElement.classList.add(theme);
              
              // Set a data attribute for CSS to use
              document.documentElement.setAttribute('data-theme', theme);
            } catch (e) {
              // Fallback to light theme if anything fails
              document.documentElement.classList.add('light');
              document.documentElement.setAttribute('data-theme', 'light');
            }
          })();
        `,
      }}
    />
  )
}
