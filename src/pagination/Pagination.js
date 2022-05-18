import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

const Pagination = (Component) => (props) => (
    <div className='pagination'>
        <FontAwesomeIcon
            icon={faAngleLeft}
            onClick={() => props.setPagination({
                ...props.pagination,
                currentPage: props.pagination.currentPage === 1 ? 1 : props.pagination.currentPage - 1,
            })
            }
        />
        <Component {...props} />
        <FontAwesomeIcon
            icon={faAngleRight}
            onClick={() => props.setPagination({
                ...props.pagination,
                currentPage: props.pagination.currentPage === props.pageNumbers.length ? props.pageNumbers.length : props.pagination.currentPage + 1,
            })
            }
        />
    </div>
);

export default Pagination;