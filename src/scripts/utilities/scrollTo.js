const scrollTo = (targetElement) => {
  const target = document.querySelector(`#${targetElement}`);
  document.documentElement.scrollTop = target.offsetTop - 70;
};

export default scrollTo;
