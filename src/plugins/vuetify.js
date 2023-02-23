// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
export default createVuetify({
  icons: {
    iconfont: "md" || "fa",
  },
  theme: {
    defaultTheme: "myCustomTheme",
    themes: {
      myCustomTheme: {
        dark: false,  
        colors: {
          weserveback: "#0d0d0b",
          weservegrey: "#e1e8eb",
          weserveyellow: "#FFC801",
          bule:"#128CD0",
        },
      },
    },
  },
  display: {
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 0,
      sm: 340,
      md: 540,
      lg: 800,
      xl: 1280,
    },
  },
});
