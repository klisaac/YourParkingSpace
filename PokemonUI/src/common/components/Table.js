import React, { useState, useEffect, Fragment } from "react";
import { useTable, usePagination, useSortBy, useRowSelect, useMountedLayoutEffect } from "react-table";
import { Button } from "reactstrap";
import Spinner from "./Spinner";
import IndeterminateCheckbox from "./IndeterminateCheckbox";

//
// Parameters:
//  - columns. Array with the headers and the name of each field (accessor) in the API. Type: Column<object>[].
//  - data. Array with the data to be rendered. Type: object[].
//  - fetchData. Parent method that will be used to fetch new data when pagination state changes.
//  - loading. State to show/hide when data is being fetched. Type: boolean.
//  - onSort. Parent method to handle changes on sort and direction (asc/desc).
//  - totalRows. Total rows in the database. Type: number.
//  - selectedRow. Parent method to handle the row selected and get all its data. Type: number.
//  - currentPage. Page.
//  - currentPageSize. Page size.
//  - allowSorting. To enable/disable column sorting.
//  - columnSortBy. Field to be used for sorting.
//  - columnOrder. True for Desc, null for Asc.
//

const Table = ({
  columns,
  data,
  fetchData,
  loading,
  onSort,
  totalRows,
  selectedRow,
  currentPage,
  currentPageSize,
  allowSorting,
  columnSortBy,
  columnOrder,
  editButton = false,
  allowMultiSelectedRows,
  onSelectedRowsChange,
}) => {
  const hiddenColumns = columns.filter((col) => col.show === false).map((col) => col.id === undefined ? col.accessor : col.id);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      manualPagination: true, // Tell the usePagination hook that we'll handle our own data fetching. This means we'll also have to provide our own pageCount.
      manualSortBy: true,
      initialState: { hiddenColumns: hiddenColumns },
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      allowMultiSelectedRows &&
        hooks.visibleColumns.push((columns) => [
          {
            id: "allCheckboxesSelected",
            Header: ({ toggleRowSelected, isAllRowsSelected, page }) => {
              const modifiedOnChange = (event) => {
                page.forEach((row) => {
                  // check each row if it is not disabled
                  !row.original.disabled && toggleRowSelected(row.id, event.currentTarget.checked);
                });
              };

              // Count number of selectable and selected rows in the current page to determine the state of select all checkbox
              let selectableRowsInCurrentPage = 0;
              let selectedRowsInCurrentPage = 0;
              page.forEach((row) => {
                row.isSelected && selectedRowsInCurrentPage++;
                !row.original.disabled && selectableRowsInCurrentPage++;
              });

              // If there are no selectable rows in the current page select all checkbox will be disabled
              const disabled = selectableRowsInCurrentPage === 0;
              const checked = (isAllRowsSelected || selectableRowsInCurrentPage === selectedRowsInCurrentPage) && !disabled;

              return (
                <div>
                  <IndeterminateCheckbox onChange={modifiedOnChange} checked={checked} />
                </div>
              );
            },
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} style={{ display: row.original.disabled ? "none" : "block" }} />
              </div>
            ),
          },
          ...columns,
        ]);
    }
  );

  const [desc, setDesc] = useState(columnOrder != null ? columnOrder : false);
  const [fieldId, setFieldId] = useState(columnSortBy);
  const [selectedIndex, setSelectedIndex] = useState(-1); //selected row index

  useEffect(() => {
    setSelectedIndex(-1);
    fetchData();
  }, [fetchData]);

  useMountedLayoutEffect(() => {
    onSelectedRowsChange && onSelectedRowsChange(selectedRowIds);
  }, [onSelectedRowsChange, selectedRowIds]);

  // Render the UI
  return (
    <div className="table-responsive">
      <Spinner display={loading}></Spinner>
      <table className="table table-bordered table-striped table-padding table-hover" {...getTableProps()}>
        <thead className="bg-primary text-white">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => ({
                ...(column.isVisible && (
                  <th
                    {...column.getHeaderProps(
                      allowSorting &&
                        column.canSort &&
                        // To avoid this tooltip to mess up with the custom Tooltip component
                        (typeof column.Header !== "string"
                          ? column.getSortByToggleProps({ title: null })
                          : column.getSortByToggleProps({ title: "Sort by " + column.Header }))
                    )}
                    className={column.canSort ? "table-header" : "table-header-no-pointer"}
                    onClick={() => {
                      // To avoid the sorting to be triggered when the header for selecting all the checkboxes is clicked
                      if (allowSorting && column.id !== "allCheckboxesSelected" && column.canSort) {
                        column.id !== fieldId ? setDesc(false) : setDesc(!desc);
                        setFieldId(column.id);
                        onSort({ sortBy: column.id, order: column.id !== fieldId ? false : !desc });
                      }
                    }}
                  >
                    {column.render("Header")}
                    <span>
                      {allowSorting && columnSortBy === column.id ? (
                        desc != null ? (
                          columnOrder ? (
                            <i className="cil-sort-alpha-up"></i>
                          ) : (
                            <i className="cil-sort-alpha-down"></i>
                          )
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                )),
              }))}
              {editButton && <th></th>}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Fragment key={row.index}>
                <tr {...row.getRowProps()} className={selectedIndex === row.index ? "table-row-selected" : ""}>
                  {row.cells.map((cell) => {
                    return {
                      ...(cell.column.isVisible && (
                        <td
                          className={
                            cell.column.id.includes("Nowrap")
                              ? "nowrap"
                              : cell.column.id === "allCheckboxesSelected"
                              ? "table-column-checkbox"
                              : ""
                          }
                          {...cell.getCellProps()}
                          onClick={(e) => {
                            setSelectedIndex(row.index);
                            selectedRow({ row }, false);
                          }}
                        >
                          {cell.render("Cell")}
                        </td>
                      )),
                    };
                  })}
                  {editButton && (
                    <td style={{ width: "20px" }}>
                      <Button
                        type="button"
                        color="primary"
                        className="btn-sm"
                        onClick={() => {
                          selectedRow({ row }, true);
                        }}
                      >
                        <i className="cil-pencil"></i>
                      </Button>
                    </td>
                  )}
                </tr>
              </Fragment>
            );
          })}
          <tr>
            {loading ? (
              // Custom loading state to show a loading indicator
              <td colSpan={10000}>Loading...</td>
            ) : (
              <td colSpan={10000}>
                {totalRows > 0 ? (
                  <span>
                    Showing {(currentPage - 1) * currentPageSize + 1} to {(currentPage - 1) * currentPageSize + page.length} of {totalRows}{" "}
                    results
                  </span>
                ) : (
                  <span>No results</span>
                )}
              </td>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
