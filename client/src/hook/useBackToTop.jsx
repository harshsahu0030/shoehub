const useBackToTop = () => {
  function backToTopHanlder() {
    window.scrollTo(0, 0);
  }

  return backToTopHanlder;
};

export default useBackToTop;
