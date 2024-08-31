import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        tanker: ['Tanker', 'sans-serif'],
        cabinet: ['Cabinet Grotesk', 'sans-serif'],
      },
    },
  },
};
