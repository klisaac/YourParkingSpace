import React, { Fragment, useState } from "react";
import { Col, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";

//
// It renders a set of buttons to allow pagination, page selection and page size.
//

const TablePagination = (props: {
  page: number;
  pageSize: number;
  totalPages: number;
  totalRows: number;
  updatePage: (value: number) => void;
  updatePageSize: (value: number) => void;
}) => {
  const [goToPage, setGoToPage] = useState(1);

  const handlePagination = (value: number) => {
    let localPage = props.page;
    switch (value) {
      case 1:
        props.updatePage(1);
        break;
      case 2:
        localPage--;
        props.updatePage(localPage);
        break;
      case 3:
        localPage++;
        props.updatePage(localPage);
        break;
      case 4:
        props.updatePage(props.totalPages);
        break;
    }
  };

  const renderPaginationItems = () => {
    return (
      <Fragment>
        <PaginationItem disabled={props.page === 1}>
          <PaginationLink onClick={() => handlePagination(1)} tag="button">
            {"<<"}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={props.page === 1}>
          <PaginationLink onClick={() => handlePagination(2)} tag="button">
            {"<"}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={props.page === props.totalPages || props.totalPages === 0}>
          <PaginationLink onClick={() => handlePagination(3)} tag="button">
            {">"}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={props.page === props.totalPages || props.totalPages === 0}>
          <PaginationLink onClick={() => handlePagination(4)} tag="button">
            {">>"}
          </PaginationLink>
        </PaginationItem>
      </Fragment>
    );
  };

  const renderPageCounter = () => {
    return props.totalRows > 0 ? (
      <span className="form-control pagination-page">
        Page{" "}
        <strong>
          {props.page} of {props.totalPages}
        </strong>{" "}
      </span>
    ) : null;
  };

  const renderGoToPage = () => {
    return (
      <Fragment>
        <label className="form-control pagination-go-to-label">Go to page: </label>
        <input
          type="number"
          className="form-control pagination-go-to-input"
          min="1"
          max={props.totalPages}
          value={goToPage}
          onChange={(e) => {
            const value = e.target.value ? Number(e.target.value) : 1;
            setGoToPage(value);
          }}
        />
        <button
          type="button"
          className="btn btn-primary pagination-go-to-button"
          onClick={() => {
            if (goToPage > props.totalPages) {
              setGoToPage(props.totalPages);
              props.updatePage(props.totalPages);
            } else {
              props.updatePage(goToPage);
            }
          }}
        >
          Go
        </button>
      </Fragment>
    );
  };

  const renderPageSize = () => {
    return (
      <select
        className="form-control pagination-go-to-select"
        value={props.pageSize}
        onChange={(e) => {
          const value = Number(e.target.value);
          props.updatePageSize(value);
        }}
      >
        {[10, 20, 30, 40, 50, 100, 500, 1000, 0].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize === 0 ? "All" : pageSize}
          </option>
        ))}
      </select>
    );
  };

  return (
    <Fragment>
      {/* Pagination for all sizes but mobile devices. It will be hidden for <576px */}
      <div className="d-none d-sm-block">
        <Row>
          <Col sm="12" md="6">
            <Pagination>
              {renderPaginationItems()}
              {renderPageCounter()}
            </Pagination>
          </Col>
          <Col sm="12" md="6">
            <div className="pagination">
              {renderGoToPage()}
              {renderPageSize()}
            </div>
          </Col>
        </Row>
      </div>

      {/* Pagination for mobile devices. It will be hidden for >=576px */}
      <div className="d-block d-sm-none">
        <Row>
          <Col xs="12">
            <Pagination>{renderPaginationItems()}</Pagination>
            {renderPageCounter()}
          </Col>
        </Row>
        <Row className="pagination-go-to-row">{renderGoToPage()}</Row>
        <Row className="page-size-row">
          <Col className="pl-0">{renderPageSize()}</Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default TablePagination;
