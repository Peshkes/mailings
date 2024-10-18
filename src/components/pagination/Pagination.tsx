import React from 'react';
import PaginationButton from "./PaginationButton";

type Props = {
    currentPage: number
    totalPages: number
    handleSetPage: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, handleSetPage }: Props) => {
    const generatePages = () => {
        const pages: Array<string> = [];

        pages.push('1');
        if (currentPage > 4) pages.push('...');

        for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
            pages.push(i.toString());
        }

        if (currentPage < totalPages - 3) pages.push('...');
        if (totalPages > 1) pages.push(totalPages.toString());

        return pages;
    };

    const pages = generatePages();


    const handleNext = () => currentPage < totalPages && handleSetPage(currentPage + 1);
    const handlePrevious = () => currentPage > 1 && handleSetPage(currentPage - 1);

    return (
        <div className="flex justify-center space-x-2">
            <PaginationButton handleSetPage={handlePrevious} disabled={currentPage === 1}>{"<"}</PaginationButton>
            {pages.map((page, index) => (
                <PaginationButton key={page + index} isActive={+page === currentPage} handleSetPage={() => handleSetPage(+page)} disabled={page==="..."}>
                    {page}
                </PaginationButton>
            ))}
            <PaginationButton handleSetPage={handleNext} disabled={currentPage === totalPages}>{">"}</PaginationButton>
        </div>
    );
};

export default Pagination;
