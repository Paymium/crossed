module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'modify-selectors': {
      enable: true,
      modify: [
        {
          match: '*',
          with: (selector) => {
            const regEx = new RegExp('^\\.', 'g');
            if (selector.match(regEx)) {
              return `${selector}, [data-class-name~="${selector.replace(
                regEx,
                ''
              )}"]`;
            }
            return selector;
          },
        },
      ],
    },
  },
}
