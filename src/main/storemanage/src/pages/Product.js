import React from "react";
import jQuery from "jquery";
import {useState} from "react";
import {Button} from "react-bootstrap";
import {AgGridReact, AgGridColumn, AgGridColumnGroupProps} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
// import "../styles.css";
import $ from "jquery";
import axios from "axios";
import AuthenticationSerivce from "../service/AuthenticationSerivce";

function Product() {

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);
    const [selectedRows, setSelectedRows] = useState(
        {
            productNm: ""
            ,division: ""
            ,division1: ""
            ,price: ""
        }
    );
    const [btndisabled, setBtnDisabled] = useState(true);

    const formData = new FormData;

    const excelDownLoad = () => {
        gridApi.exportDataAsCsv();
    }

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);

        const updateData = (data) => {
            console.log(data);
            params.api.setRowData(data);
        }

        axios.post("/api/selectProduct", {})
            .then((res) => {
                updateData(res.data);
            })
            .catch((error) => {
                alert("로그인 인증기간이 만료되었습니다.");
                AuthenticationSerivce.logout();
            });

    };

    const onSelectionChanged = () => {
        const data = gridApi.getSelectedRows();

        if (data.length > 0) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
        // formData.append("data", JSON.stringify(gridApi.getSelectedRows()));
        setSelectedRows({...selectedRows});
    };

    const onCellValueChanged = (e) => {
        console.log("changed", e.data);
    };

    //맵을 문자로
    function replacer(key, value) {
        if (value instanceof Map) { //형식 확인
            return {
                dataType: 'Map', //정의
                value: Array.from(value.entries()), //entries 함수를 통해 배열로 변경(이중)
            };
        } else {
            return value;
        }
    }

    function reviver(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (value.dataType === 'Map') {  //정의된 형태가 Map이라면
                return new Map(value.value); //새로이 생성
            }
        }
        return value;
    }


    // 저장
    const onClickSave = (e) => {
        onSelectionChanged();
        const data = selectedRows;
        debugger;

        // formData.append("data", JSON.stringify(data))
        console.log(JSON.stringify(data));

        axios.post("/api/updateProduct", data)
            .then((res) => {
                onGridReady();
            })
        // .catch((error) => {
        //     alert("로그인 인증기간이 만료되었습니다.");
        //     AuthenticationSerivce.logout();
        // });

    };

    //행추가
    const onClickInsertRow = () => {
        let newData = {
            productNm: ''
            , division: ''
            , division1: ''
            , price: ''
        }
        gridApi.updateRowData({add: [newData]});

    };

    return (
        <>
            <div style={{width: "100%", height: "100%"}}>
                <div
                    id="myGrid"
                    style={{
                        height: "600px",
                        width: "100%",
                    }}
                    className="ag-theme-alpine"
                >
                    <h1 className="mx-sm-3">재료 관리
                        <Button className="float-md-end mx-5" onClick={excelDownLoad}>엑셀다운로드</Button>
                    </h1>

                    <div>
                        <Button variant="contained" onClick={onClickInsertRow}>
                            행추가
                        </Button>
                        <Button variant="contained" disabled={btndisabled}>
                            삭제
                        </Button>
                        <Button variant="contained" disabled={btndisabled} value={selectedRows} onClick={onClickSave}>
                            저장
                        </Button>
                        <Button variant="contained" onClick={excelDownLoad}>
                            엑셀다운로드
                        </Button>
                    </div>
                    <AgGridReact
                        rowData={rowData}
                        rowSelection={"multiple"}
                        pagination={true}
                        paginationPageSize={20}
                        suppressRowClickSelection={false}
                        defaultColDef={{
                            editable: true,
                            sortable: true,
                            minWidth: 100,
                            resizable: true,
                            flex: 1,
                        }}
                        sideBar={{
                            toolPanels: ["columns", "filters"],
                            defaultToolPanel: "",
                        }}
                        onGridReady={onGridReady}
                        onSelectionChanged={onSelectionChanged}
                        onCellEditingStopped={(e) => {
                            onCellValueChanged(e);
                        }}
                    >
                        {/*<AgGridColumn*/}
                        {/*    headerName="..HELLO."*/}
                        {/*    headerCheckboxSelection={true}*/}
                        {/*    checkboxSelection={true}*/}
                        {/*    floatingFilter={false}*/}
                        {/*    // suppressMenu={true}*/}
                        {/*    minWidth={50}*/}
                        {/*    maxWidth={50}*/}
                        {/*    width={50}*/}
                        {/*    flex={0}*/}
                        {/*    resizable={false}*/}
                        {/*    sortable={false}*/}
                        {/*    editable={true}*/}
                        {/*    filter={false}*/}
                        {/*    suppressColumnsToolPanel={false}*/}
                        {/*/>*/}
                        {/*<AgGridColumn headerName="Participant">*/}
                        <AgGridColumn headerName="재료명" field="productNm" minWidth={170}/>
                        <AgGridColumn headerName="완재품/재료" field="division" minWidth={150}/>
                        <AgGridColumn headerName="용량/개수" field="division1" minWidth={150}/>
                        <AgGridColumn headerName="금액" field="price" minWidth={150}/>
                        {/*</AgGridColumn>*/}
                        {/*<AgGridColumn field="금액" />*/}
                        {/*<AgGridColumn headerName="Medals">*/}
                        {/*    <AgGridColumn*/}
                        {/*        field="total"*/}
                        {/*        columnGroupShow="closed"*/}
                        {/*        filter="agNumberColumnFilter"*/}
                        {/*        width={120}*/}
                        {/*        flex={0}*/}
                        {/*    />*/}
                        {/*    <AgGridColumn*/}
                        {/*        field="gold"*/}
                        {/*        columnGroupShow="open"*/}
                        {/*        filter="agNumberColumnFilter"*/}
                        {/*        width={100}*/}
                        {/*        flex={0}*/}
                        {/*    />*/}
                        {/*    <AgGridColumn*/}
                        {/*        field="silver"*/}
                        {/*        columnGroupShow="open"*/}
                        {/*        filter="agNumberColumnFilter"*/}
                        {/*        width={100}*/}
                        {/*        flex={0}*/}
                        {/*    />*/}
                        {/*    <AgGridColumn*/}
                        {/*        field="bronze"*/}
                        {/*        columnGroupShow="open"*/}
                        {/*        filter="agNumberColumnFilter"*/}
                        {/*        width={100}*/}
                        {/*        flex={0}*/}
                        {/*    />*/}
                        {/*</AgGridColumn>*/}
                        {/*<AgGridColumn field="year" filter="agNumberColumnFilter" />*/}
                    </AgGridReact>
                </div>
            </div>
        </>
    );
};

export default Product;