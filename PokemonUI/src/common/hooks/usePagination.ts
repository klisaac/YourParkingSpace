import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

//
// urlRoot: root for the query string
// apiUrl: base url for the api
// customParam: any other required params in queryString format, without the initial &. If not param required, then empty spaces.
//

const usePagination = (urlRoot: string, apiUrl: string, customParam: string) => {
  let history = useHistory();
  let param = new URLSearchParams(useLocation().search);

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getSearch = () => {
    return param.get("query") !== null ? param.get("query") : "";
  };

  const getSortBy = () => {
    return param.get("sortBy") !== null ? param.get("sortBy") : "";
  };

  const getOrder = () => {
    return param.get("order") !== null;
  };

  const getPage = () => {
    return Number(param.get("page"));
  };

  const getPageSize = () => {
    return Number(param.get("pageSize"));
  };

  const handleSearchChange = (text: string) => {
    setSearch(text);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    history.push(createQueryStringUrl(1, pageSize, text, customParam, getSortBy(), getOrder()));
  };

  const handlePageChange = (value: number) => {
    setPage(value);
    history.push(createQueryStringUrl(value, pageSize, getSearch(), customParam, getSortBy(), getOrder()));
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    history.push(createQueryStringUrl(1, value, getSearch(), customParam, getSortBy(), getOrder()));
  };

  const handleSort = (sortByOrder: any) => {
    history.push(createQueryStringUrl(1, getPageSize(), getSearch(), customParam, sortByOrder.sortBy, sortByOrder.order));
  };

  // custom param is to allow extra parameters to be added to the query string from the page request
  const createQueryStringUrl = (page: number, pageSize: number, query: string, custom: string, sortBy: string, order: boolean) => {
    let url = `${urlRoot}?page=${page}&pageSize=${pageSize}`;

    if (query !== "") {
      url = url + `&query=${encodeURIComponent(query)}`;
    }

    if (custom !== "") {
      url = url + `&${custom}`;
    }

    if (sortBy !== "") {
      url = url + `&sortBy=${sortBy}`;
    }

    if (order) {
      url = url + `&order=desc`;
    }

    return url;
  };

  const getApiUrl = () => {
    let url = `${apiUrl}?Paging.Page=${getPage()}&Paging.PageSize=${getPageSize()}`;

    if (param.get("query") !== null) {
      url = url + `&query=${encodeURIComponent(param.get("query"))}`;
    }

    if (customParam !== "") {
      url = url + `&${customParam}`;
    }

    if (param.get("sortBy") !== null) {
      url = url + `&sortBy=${param.get("sortBy")}`;
    }

    if (param.get("order") !== null) {
      url = url + `&sortOrder=desc`;
    }

    return url;
  };

  const updateParams = () => {
    setPage(getPage());
    setPageSize(getPageSize());
    setSearch(getSearch());
  };

  const updateDataAndTotals = (data: any, totalResults: number) => {
    setData(data);
    setTotalRows(totalResults);
    setTotalPages(Math.ceil(totalResults / (getPageSize() === 0 ? totalResults : getPageSize())));
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
    getSearch,
    getSortBy,
    getOrder,
    getPage,
    getPageSize,
    createQueryStringUrl,
    getApiUrl,
    updateParams,
    handleSearchChange,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    handleSort,
    updateDataAndTotals,
  };
};

export default usePagination;
