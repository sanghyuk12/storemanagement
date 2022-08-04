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
const updatedData = [];

function Product() {

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);
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

    const onCellValueChanged = (e) => {
        if(!e.data.status) e.data.status = 'modify';
        gridApi.applyTransaction({ update: [e.data] });
        setBtnDisabled(false);
    };

    // 저장
    const onClickSave = (e) => {

        // console.log(gridApi.applyTransaction())
        gridApi.forEachNode(function (node) {
            if(node.data.status){
                updatedData.push(node.data);
            }
        });

        formData.append("gridData", JSON.stringify(updatedData));

        axios.post("/api/updateProduct", formData)
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
        const prodNoArr = [];
        gridApi.forEachNode(function (node) {
            prodNoArr.push(parseInt(node.data.prodNo));
        });

        let newData = {
            prodNo: Math.max.apply(Math,prodNoArr) + 1
            , prodNm: ''
            , division: ''
            , division1: ''
            , price: ''
            , status: 'add'
        }
        gridApi.updateRowData({add: [newData]});
    };
    function onClickDeleteRow() {
        var selectedRows = gridApi.getSelectedRows();

        selectedRows.forEach( function(selectedRow, index) {
            const _selectedRow = selectedRow;
            gridApi.updateRowData({remove: [selectedRow]});
            // gridApi.applyTransaction({ remove: selectedRow });
            _selectedRow.status='remove';
            updatedData.push(_selectedRow);
            setBtnDisabled(false);
        });
    }

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
                        <Button variant="contained" onClick={onClickDeleteRow}>
                            삭제
                        </Button>
                        <Button variant="contained" disabled={btndisabled} onClick={onClickSave}>
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
                        onCellEditingStopped={(e) => {
                            onCellValueChanged(e);
                        }}
                    >
                        <AgGridColumn headerName="제품번호" field="prodNo" minWidth={170}
                                      headerCheckboxSelection={true}
                                      checkboxSelection={true}
                                      floatingFilter={false}
                            // suppressMenu={true}
                                      minWidth={50}
                                      maxWidth={50}
                                      width={50}
                                      flex={0}
                                      resizable={false}
                                      sortable={false}
                                      editable={true}
                                      filter={false}
                                      suppressColumnsToolPanel={false}/>
                        <AgGridColumn headerName="재료명" field="prodNm" minWidth={170}/>
                        <AgGridColumn headerName="완재품/재료" field="division" minWidth={150}/>
                        <AgGridColumn headerName="용량/개수" field="division1" minWidth={150}/>
                        <AgGridColumn headerName="금액" field="price" minWidth={150}/>

                    </AgGridReact>
                </div>
            </div>
        </>
    );
};

export default Product;