import { useState } from "react";
import * as helpers from "../helpers/SecurityHelper";

//
// apiUrl: base url for the api.
// customParam: any other required params. If not param required, then empty spaces.
//

const usePaginationAndEventsTabs = (apiUrl: string, customParam: string) => {
  // pagination
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState(false);

  const [showModal, setShowModal] = useState(false); // if modal is displayed
  const [modalItemId, setModalItemId] = useState(0);
  const [modalItem, setModalItem] = useState<any>();

  // to determine if the row modified on the modal has been changed so the table needs to be refreshed.
  const [formUpdated, setFormUpdated] = useState(false);

  const [isProcessingRequest, setIsProcessingRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getApiUrl = () => {
    let url = `${apiUrl}?Paging.Page=${page}&Paging.PageSize=${pageSize}`;

    if (search !== "") {
      url = url + `&query=${encodeURIComponent(search)}`;
    }

    if (customParam !== "") {
      url = url + `&${customParam}`;
    }

    if (sortBy !== "") {
      url = url + `&sortBy=${sortBy}`;
    }

    if (order !== false) {
      url = url + `&sortOrder=desc`;
    }

    return url;
  };

  const handleSearchChange = (text: string) => {
    setPage(1);
    setSearch(text);
  };

  const handleSearch = (text: string) => {
    setPage(1);
    setSearch(text);
  };

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const handlePageSizeChange = (value: number) => {
    setPage(1);
    setPageSize(value);
  };

  const handleSort = (sortByOrder: any) => {
    setPage(1);
    setSortBy(sortByOrder.sortBy);
    setOrder(sortByOrder.order);
  };

  const handleAddClick = () => {
    setModalItemId(null);
    setModalItem(null);
    setShowModal(true);
  };

  const handleTableClick = (item: any, itemId: number, role: string) => {
    if (helpers.hasPermission(role)) {
      setModalItemId(itemId);
      setModalItem(item);
      setShowModal(true);
    }
  };

  // shows/hides the modal window with the form
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  // this will change the value of formUpdated, so the data on the table will be refreshed if formUpdated has been added to the param array on fetchData
  const handleContentUpdatedInModal = (deleted?: boolean) => {
    // It'll move to the first page in case the item removed was the only one on a page > 1
    if (deleted && page > 1 && (totalRows - 1) % pageSize === 0) {
      setPage(page - 1);
    } else {
      setFormUpdated(!formUpdated);
    }

    setShowModal(!showModal);
  };

  const updateDataAndTotals = (data: any, totalResults: number) => {
    setData(data);
    setTotalRows(totalResults);
    setTotalPages(Math.ceil(totalResults / (pageSize === 0 ? totalResults : pageSize)));
  };

  return {
    search,
    setSearch,
    data,
    setData,
    totalRows,
    setTotalRows,
    totalPages,
    setTotalPages,
    page,
    setPage,
    pageSize,
    setPageSize,
    sortBy,
    order,
    showModal,
    setShowModal,
    modalItemId,
    setModalItemId,
    modalItem,
    setModalItem,
    formUpdated,
    setFormUpdated,
    isProcessingRequest,
    setIsProcessingRequest,
    errorMessage,
    setErrorMessage,
    getApiUrl,
    handleSearchChange,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    handleSort,
    handleAddClick,
    handleTableClick,
    handleToggleModal,
    handleContentUpdatedInModal,
    updateDataAndTotals,
  };
};

export default usePaginationAndEventsTabs;
