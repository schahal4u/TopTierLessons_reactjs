import React from "react";

const Scroller = () => {
  let mybutton = document.getElementById("scrollToTop");
  let myheader = document.getElementById("scrollerHeader");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
    scrollheader();
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

  function scrollheader() {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      // let selectList = myheader.classList;
      // console.log(selectList);
      // selectList.remove("d-none");
      // selectList.add("sticky-top");
      myheader.style.display = "block";
      myheader.style.position = "sticky";
      myheader.style.top = 0;
    } else {
      myheader.style.display = "none";
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
