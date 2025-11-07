let nextLabel = '>';
let prevLabel = '<';

const setNextLabel = (label: string) => {
  nextLabel = label;
};
const setPrevLabel = (label: string) => {
  prevLabel = label;
};

export { nextLabel, setNextLabel, setPrevLabel, prevLabel };
