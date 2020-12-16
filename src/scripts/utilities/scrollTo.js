const scrollTo = (targetElement) => {
  const target = document.querySelector(`#${targetElement}`);
  document.documentElement.scrollTop = target.offsetTop;
};

export default scrollTo;
