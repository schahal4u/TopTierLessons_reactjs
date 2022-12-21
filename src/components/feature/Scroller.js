import React from "react";

const Scroller = () => {
  let mybutton = document.getElementById("scrollToTop");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <div>
      <button
        className="ttButton"
        onClick={() => topFunction()}
        id="scrollToTop"
        title="Go to top"
      >
        <i class="fa fa-arrow-up" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default Scroller;
