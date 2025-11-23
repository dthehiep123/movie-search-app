
type PageListProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; 
};

const DOTS = '...';

const PageList = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: PageListProps) => {

  
    const generatePagination = () => {
    
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    
    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 2;

    if (!showLeftDots && showRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, DOTS, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [1, DOTS, ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, DOTS, ...middleRange, DOTS, totalPages];
    }
    
    return [];
  };

  const paginationRange = generatePagination();


  const handlePageClick = (page: number | string) => {
    if (page === DOTS) return;
    if (typeof page === 'number' && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex flex-row justify-center gap-2 m-1">

      {paginationRange.map((pageNumber, index) => {
        const isActive = pageNumber === currentPage;
        
        return (
          <button
            key={index}
            onClick={() => handlePageClick(pageNumber)}
            className={`
              w-10 h-10 
              border border-solid border-black rounded-[5px]
              flex items-center justify-center 
              transition-colors duration-200
              ${pageNumber === DOTS ? 'cursor-default border-none' : 'cursor-pointer'}
              ${isActive ? 'bg-black text-white' : 'bg-white hover:bg-black hover:text-white'}
            `}
          >
            {pageNumber}
          </button>
        );
      })}
      
    </div>
  );
};

export default PageList;