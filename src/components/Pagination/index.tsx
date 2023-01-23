import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss"
import React from "react";


type PaginationProps = {
    setCurrentPage: (page: number) => void;
}


const Pagination: React.FC<PaginationProps> = ({setCurrentPage}) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => setCurrentPage(event.selected + 1)}
            pageRangeDisplayed={5}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
}


export default Pagination;