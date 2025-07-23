import React, { useState, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Row, Col, Card, CardBody } from "reactstrap";
import { EcpApiMethod } from "../common/enums/EcpApiMethod";
import TablePagination from "../common/components/TablePagination";
import AlertMessage from "../common/components/AlertMessage";
import Table from "../common/components/Table";
import axios from "axios";
import appConfig from "../config/app-config";
import * as config from "./../app-config/general-config";

const TableDataDisplay = (props: {
  url?: string;
  apiUrl?: string;
  columns: any;
  title: string;
  pageParam?: any;
  selectedRow: (row: any) => void;
  tableRendered?: (value: boolean) => void;
}) => {
  let history = useHistory();
  let param = new URLSearchParams(useLocation().search);
  // alert error handling
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // data for Table component
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const updatePage = (value: number) => {
    setPage(value);
    if (props.url) {
      history.push(buildUrl(value, pageSize));
    }
  };

  const updatePageSize = (value: number) => {
    setPage(1);
    setPageSize(value);
    if (props.url) {
      history.push(buildUrl(1, value));
    }
  };

  const buildUrl = (paramPage, paramPageSize) => {
    let url = `${props.url}?page=${paramPage}&pageSize=${paramPageSize}`;
    return url;
  };

  // props for table
  const selectedRow = (row: { row: { original: any } }) => {
    props.selectedRow(row.row.original);
  };

  const getApiUrl = () => {
    let url = props.apiUrl;
    if (param.get("page")) {
      url = `${url}?Paging.Page=${param.get("page")}&Paging.PageSize=${param.get("pageSize")}`;
    } else {
      url = `${url}?Paging.Page=${page}&Paging.PageSize=${pageSize}`;
    }

    if (props.pageParam) {
      url = url + `&paramData=${props.pageParam}`;
    }
    return url;
  };

  const fetchData = useCallback(() => {
    let url = "";
    (async () => {
      url = getApiUrl();
      setLoading(true);
      setError(false);
      try {
        var accessToken = JSON.parse(localStorage.getItem(config.apiTokenName));
        const urlApi = appConfig.apiConfig.resourceUri + url;
        let result = await axios({
          method: EcpApiMethod.GET,
          url: urlApi,
          data: null,
          headers: {
            Authorization: "Bearer " + accessToken.bearerToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        setData(result.data.results);
        setTotalRows(result.data.totalResults);
        setTotalPages(Math.ceil(result.data.totalResults / (pageSize === 0 ? result.data.totalResults : pageSize)));
        setLoading(false);
        setError(false);
        if (props?.tableRendered) {
          props?.tableRendered(true);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
        setErrorMessage(`There's been an error when trying to get the ${props.title}`);
        if (props?.tableRendered) {
          props?.tableRendered(true);
        }
      }
    })();
  }, [page, pageSize]);

  return (
    <div className="animated fadeIn">
      {!error ? (
        <div>
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <Table
                    columns={props.columns}
                    data={data}
                    fetchData={fetchData}
                    loading={loading}
                    totalRows={totalRows}
                    selectedRow={selectedRow}
                    currentPage={page}
                    currentPageSize={pageSize}
                    allowSorting={false}
                    onSort={null}
                    columnSortBy={null}
                    columnOrder={null}
                    onSelectedRowsChange={null}
                    allowMultiSelectedRows={false}
                  />
                  <TablePagination
                    page={page}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    totalRows={totalRows}
                    updatePage={updatePage}
                    updatePageSize={updatePageSize}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      ) : (
        <AlertMessage color="danger" message={errorMessage}></AlertMessage>
      )}
    </div>
  );
};

export default TableDataDisplay;
