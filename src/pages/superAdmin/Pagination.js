import React from "react";

function Pagination({ postsPerPage, totalPosts, setCurrentPage, currentPage }) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className='pagination'>
      {pages.map((page, index) => {
        return (
          <button
            onClick={() => setCurrentPage(page)}
            className={page == currentPage ? "active" : ""}
            key={index}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
