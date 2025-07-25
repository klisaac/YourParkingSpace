import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Row, Col, Card, CardBody } from "reactstrap";
import { EcpApiMethod } from "../../common/enums/EcpApiMethod";
import { PokemonItemTypes } from "../../enums/EcpItemTypes";
import { IPokemon, IPokemons } from "../../models/pokemons/IPokemon";
import useApiRequest from "../../hooks/useApiRequest";
import usePagination from "../../common/hooks/usePagination";
import Table from "../../common/components/Table";
import TablePagination from "../../common/components/TablePagination";
import AlertMessage from "../../common/components/AlertMessage";
import Header from "../../common/components/Header";
import TextBoxSearch from "../../common/components/TextboxSearch";
import Spinner from "../../common/components/Spinner";
import spriteBadge from "../../helpers/SpriteBadge";
import * as api from "../../app-config/api-urls";
import * as config from "../../app-config/general-config";


const Pokemon = () => {
  let history = useHistory();
  const urlRoot = "/pokemon";
  let param = new URLSearchParams(useLocation().search);

  // Hooks.
  const { apiRequest, isProcessing } = useApiRequest();
  const {
    search,
    data,
    totalRows,
    totalPages,
    page,
    pageSize,
    getSearch,
    getSortBy,
    getOrder,
    createQueryStringUrl,
    getApiUrl,
    updateParams,
    handleSearchChange,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    handleSort,
    updateDataAndTotals,
  } = usePagination(urlRoot, api.pokemons, "");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const wrapCell = (value) => (<div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>{value}</div>);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Height",
        accessor: "height",
      },
      {
        Header: "Front Default",
        accessor: (i: { frontDefault: string }) => spriteBadge(i.frontDefault),
        disableSortBy: true
      },
      {
        Header: "Front Shiny",
        accessor: (i: { frontShiny: string }) => spriteBadge(i.frontShiny),
        disableSortBy: true
      },
      {
        Header: "Back Default",
        accessor: (i: { backDefault: string }) => spriteBadge(i.backDefault),
        disableSortBy: true
      },
      {
        Header: "Back Shiny",
        accessor: (i: { backShiny: string }) => spriteBadge(i.backShiny),
        disableSortBy: true
      },
    ],
    []
  );


  const fetchData = useCallback(() => {
    setError(false);
    updateParams();
    (async () => {
      const url = getApiUrl();

      try {
        setIsLoading(true);
        var accessToken = JSON.parse(localStorage.getItem(config.apiTokenName));
        const result: IPokemons = await apiRequest(EcpApiMethod.GET, url, null, accessToken.bearerToken);
        const formattedPokemons = result.results.map((p: IPokemon) => {
          return {
            id: p.id,
            name: p.name,
            height: p.height,
            backDefault: p.backDefault,
            backShiny: p.backShiny,
            frontDefault: p.frontDefault,
            frontShiny: p.frontShiny
          };
        });

        updateDataAndTotals(formattedPokemons, result.totalResults);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setErrorMessage(`There's been an error when trying to get the pokemons`);
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.get("page"), param.get("pageSize"), param.get("query"), param.get("sortBy"), param.get("order")]);

  window.addEventListener("unhandledrejection", function (event) {
    if (
      event !== undefined &&
      event.reason !== undefined &&
      event.reason.response !== undefined &&
      event.reason.response.data !== undefined &&
      event.reason.response.data.message !== undefined
    ) {
      setErrorMessage(event.reason.response.data.message);
    } else {
      setErrorMessage("There's been an error when trying to connect to the server.");
    }
    setError(true);
    setIsLoading(false);
    event.preventDefault();
  });

  return (
    <div className="animated fadeIn">
      <Spinner display={isLoading || isProcessing}></Spinner>
      <Header title={PokemonItemTypes.Pokemon} path={null} name={PokemonItemTypes.Pokemon}></Header>
      {!error ? (
        <div>
          <Row>
            <Col xs="12" md="4" className="mb-2 mb-md-0">
              <TextBoxSearch
                placeholder={"Search..."}
                buttonColor="primary"
                buttonMessage=" Search"
                handleChange={handleSearchChange}
                handleSearch={handleSearch}
                value={search}
                autoComplete={true}
              ></TextBoxSearch>
            </Col>
          </Row>
          <br />
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <Table
                    columns={columns}
                    data={data}
                    fetchData={fetchData}
                    loading={isLoading}
                    totalRows={totalRows}
                    selectedRow={(row: any) => null}
                    currentPage={page}
                    currentPageSize={pageSize}
                    allowSorting={true}
                    onSort={handleSort}
                    columnSortBy={param.get("sortBy")}
                    columnOrder={param.get("order")}
                    onSelectedRowsChange={null}
                    allowMultiSelectedRows={false}
                  />
                  <TablePagination
                    page={page}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    totalRows={totalRows}
                    updatePage={handlePageChange}
                    updatePageSize={handlePageSizeChange}
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

export default Pokemon;