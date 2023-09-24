export default function PostCssCrossedPlugin() {
  return {
    'modify-selectors': {
      enable: true,
      modify: [
        {
          match: '*',
          with: (selector: any) => {
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
  };
}
