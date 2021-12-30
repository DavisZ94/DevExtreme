import { exportDataGrid } from 'exporter/jspdf/v3/export_data_grid_3';
import { normalizeBoundaryValue } from 'exporter/jspdf/v3/normalizeOptions';

const JSPdfSplittingTests = {
    runTests(moduleConfig, createMockPdfDoc, createDataGrid) {

        function initMargin(doc, availablePageWidth, customMargin) {
            // Calculate margins for the allowed page width.
            const docPageWidth = doc.internal.pageSize.getWidth();
            const unusableWidth = docPageWidth - availablePageWidth;
            const margin = normalizeBoundaryValue(customMargin);
            return {
                top: margin.top,
                bottom: margin.bottom,
                left: margin.left,
                right: unusableWidth - margin.left,
            };
        }

        QUnit.module('Splitting - Horizontally splitting for simple cells', moduleConfig, () => {
            QUnit.test('1 cols - 1 rows, columnWidth = 200, availablePageWidth = 300', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 300);

                const dataGrid = createDataGrid({
                    width: 600,
                    columns: [
                        { dataField: 'f1' }
                    ],
                    dataSource: [{ f1: 'v1_1' }]
                });

                const expectedLog = [
                    'text,F1,10,24.2,{baseline:middle}',
                    'text,v1_1,10,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,200,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 10, y: 15 }, columnWidths: [ 200 ] }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('2 cols - 1 rows, columnWidth = 200, availablePageWidth = 300', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 300);

                const dataGrid = createDataGrid({
                    width: 600,
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [{ f1: 'v1_1', f2: 'v2_1' }]
                });

                const expectedLog = [
                    'text,F1,10,24.2,{baseline:middle}',
                    'text,v1_1,10,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,200,18.4',
                    'addPage,',
                    'text,F2,10,24.2,{baseline:middle}',
                    'text,v2_1,10,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,200,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 10, y: 15 }, columnWidths: [ 200, 200 ] }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('3 cols - 1 rows, columnWidth = 200, availablePageWidth = 300', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 300);

                const dataGrid = createDataGrid({
                    width: 600,
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                    ],
                    dataSource: [{ f1: 'v1_1', f2: 'v2_1', f3: 'v3_1' }]
                });

                const expectedLog = [
                    'text,F1,10,24.2,{baseline:middle}',
                    'text,v1_1,10,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,200,18.4',
                    'addPage,',
                    'text,F2,10,24.2,{baseline:middle}',
                    'text,v2_1,10,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,200,18.4',
                    'addPage,',
                    'text,F3,10,24.2,{baseline:middle}',
                    'text,v3_1,10,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,200,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 10, y: 15 }, columnWidths: [ 200, 200, 200 ] }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('3 cols - 1 rows, cells[1,0] & [1,1] - no right border, columnWidth = 200, availablePageWidth = 300', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 300);

                const dataGrid = createDataGrid({
                    width: 600,
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                    ],
                    dataSource: [{ f1: 'v1_1', f2: 'v2_1', f3: 'v3_1' }]
                });

                const customizeCell = ({ pdfCell }) => {
                    if(pdfCell.text === 'v1_1' || pdfCell.text === 'v2_1') {
                        pdfCell.drawRightBorder = false;
                    }
                };

                const expectedLog = [
                    'text,F1,10,24.2,{baseline:middle}',
                    'text,v1_1,10,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'line,10,33.4,210,33.4',
                    'line,10,33.4,10,51.8',
                    'line,10,51.8,210,51.8',
                    'addPage,',
                    'text,F2,10,24.2,{baseline:middle}',
                    'text,v2_1,10,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'line,10,33.4,210,33.4',
                    'line,10,51.8,210,51.8',
                    'addPage,',
                    'text,F3,10,24.2,{baseline:middle}',
                    'text,v3_1,10,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'line,10,33.4,210,33.4',
                    'line,210,33.4,210,51.8',
                    'line,10,51.8,210,51.8'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 10, y: 15 }, customizeCell, columnWidths: [ 200, 200, 200 ] }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('3 cols - 1 rows, cells[2,1] & [3,1] - no left border, columnWidth = 200, availablePageWidth = 300', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 300);

                const dataGrid = createDataGrid({
                    width: 600,
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                    ],
                    dataSource: [{ f1: 'v1_1', f2: 'v2_1', f3: 'v3_1' }]
                });

                const customizeCell = ({ pdfCell }) => {
                    if(pdfCell.text === 'v2_1' || pdfCell.text === 'v3_1') {
                        pdfCell.drawLeftBorder = false;
                    }
                };

                const expectedLog = [
                    'text,F1,10,24.2,{baseline:middle}',
                    'text,v1_1,10,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'line,10,33.4,210,33.4',
                    'line,10,33.4,10,51.8',
                    'line,10,51.8,210,51.8',
                    'addPage,',
                    'text,F2,10,24.2,{baseline:middle}',
                    'text,v2_1,10,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'line,10,33.4,210,33.4',
                    'line,10,51.8,210,51.8',
                    'addPage,',
                    'text,F3,10,24.2,{baseline:middle}',
                    'text,v3_1,10,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'line,10,33.4,210,33.4',
                    'line,210,33.4,210,51.8',
                    'line,10,51.8,210,51.8'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 10, y: 15 }, customizeCell, columnWidths: [ 200, 200, 200 ] }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('3 cols - 2 rows, cells[1,1] - no borders, columnWidth = 200, availablePageWidth = 300', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 300);

                const dataGrid = createDataGrid({
                    width: 600,
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                    ],
                    dataSource: [{ f1: 'v1_1', f2: 'v2_1', f3: 'v3_1' }, { f1: 'v1_2', f2: 'v2_2', f3: 'v3_2' }]
                });

                const customizeCell = ({ pdfCell }) => {
                    if(pdfCell.text === 'v2_1') {
                        pdfCell.drawLeftBorder = false;
                        pdfCell.drawRightBorder = false;
                        pdfCell.drawTopBorder = false;
                        pdfCell.drawBottomBorder = false;
                    }
                };

                const expectedLog = [
                    'text,F1,10,24.2,{baseline:middle}',
                    'text,v1_1,10,42.6,{baseline:middle}',
                    'text,v1_2,10,61,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'line,10,33.4,210,33.4',
                    'line,10,33.4,10,51.8',
                    'line,10,51.8,210,51.8',
                    'setLineWidth,1',
                    'rect,10,51.8,200,18.4',
                    'addPage,',
                    'text,F2,10,24.2,{baseline:middle}',
                    'text,v2_1,10,42.6,{baseline:middle}',
                    'text,v2_2,10,61,{baseline:middle}',
                    'setLineWidth,1',
                    'line,10,15,210,15',
                    'line,10,15,10,33.4',
                    'line,210,15,210,33.4',
                    'setLineWidth,1',
                    'line,10,51.8,10,70.2',
                    'line,210,51.8,210,70.2',
                    'line,10,70.2,210,70.2',
                    'addPage,',
                    'text,F3,10,24.2,{baseline:middle}',
                    'text,v3_1,10,42.6,{baseline:middle}',
                    'text,v3_2,10,61,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'line,10,33.4,210,33.4',
                    'line,210,33.4,210,51.8',
                    'line,10,51.8,210,51.8',
                    'setLineWidth,1',
                    'rect,10,51.8,200,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 10, y: 15 }, customizeCell, columnWidths: [ 200, 200, 200 ] }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('3 cols - 1 rows, topLeft.x = 0, columnWidths = [100, 200, 100], availablePageWidth = 250', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 250);

                const dataGrid = createDataGrid({
                    width: 600,
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                    ],
                    dataSource: [{ f1: 'v1_1', f2: 'v2_1', f3: 'v3_1' }]
                });

                const expectedLog = [
                    'text,F1,0,24.2,{baseline:middle}',
                    'text,v1_1,0,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,0,15,100,18.4',
                    'setLineWidth,1',
                    'rect,0,33.4,100,18.4',
                    'addPage,',
                    'text,F2,0,24.2,{baseline:middle}',
                    'text,v2_1,0,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,0,15,200,18.4',
                    'setLineWidth,1',
                    'rect,0,33.4,200,18.4',
                    'addPage,',
                    'text,F3,0,24.2,{baseline:middle}',
                    'text,v3_1,0,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,0,15,100,18.4',
                    'setLineWidth,1',
                    'rect,0,33.4,100,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 0, y: 15 }, columnWidths: [ 100, 200, 100 ] }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('3 cols - 1 rows, topLeft.x = 0, columnWidths = [100, 100, 100], availablePageWidth = 110', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 110);

                const dataGrid = createDataGrid({
                    width: 600,
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                    ],
                    dataSource: [{ f1: 'v1_1', f2: 'v2_1', f3: 'v3_1' }]
                });

                const expectedLog = [
                    'text,F1,0,24.2,{baseline:middle}',
                    'text,v1_1,0,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,0,15,100,18.4',
                    'setLineWidth,1',
                    'rect,0,33.4,100,18.4',
                    'addPage,',
                    'text,F2,0,24.2,{baseline:middle}',
                    'text,v2_1,0,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,0,15,100,18.4',
                    'setLineWidth,1',
                    'rect,0,33.4,100,18.4',
                    'addPage,',
                    'text,F3,0,24.2,{baseline:middle}',
                    'text,v3_1,0,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,0,15,100,18.4',
                    'setLineWidth,1',
                    'rect,0,33.4,100,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 0, y: 15 }, columnWidths: [ 100, 100, 100 ] }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('2 cols - 1 rows, topLeft.x = 0, columnWidth = 200, availablePageWidth = 200', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 200);

                const dataGrid = createDataGrid({
                    width: 600,
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [{ f1: 'v1_1', f2: 'v2_1' }]
                });

                const expectedLog = [
                    'text,F1,0,24.2,{baseline:middle}',
                    'text,v1_1,0,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,0,15,200,18.4',
                    'setLineWidth,1',
                    'rect,0,33.4,200,18.4',
                    'addPage,',
                    'text,F2,0,24.2,{baseline:middle}',
                    'text,v2_1,0,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,0,15,200,18.4',
                    'setLineWidth,1',
                    'rect,0,33.4,200,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 0, y: 15 }, columnWidths: [ 200, 200 ] }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('2 cols - 1 rows, topLeft.x = 10, columnWidth = 200, availablePageWidth = 200', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 200);

                const dataGrid = createDataGrid({
                    width: 600,
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                    ],
                    dataSource: [{ f1: 'v1_1', f2: 'v2_1' }]
                });

                const expectedLog = [
                    'text,F1,20,24.2,{baseline:middle}',
                    'text,F2,220,24.2,{baseline:middle}',
                    'text,v1_1,20,42.6,{baseline:middle}',
                    'text,v2_1,220,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,20,15,200,18.4',
                    'setLineWidth,1',
                    'rect,220,15,200,18.4',
                    'setLineWidth,1',
                    'rect,20,33.4,200,18.4',
                    'setLineWidth,1',
                    'rect,220,33.4,200,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 10, y: 15 }, columnWidths: [ 200, 200 ] }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('3 cols - 1 rows, topLeft.x = 10, margin.left = 15, columnWidth = 200, availablePageWidth = 300', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 300, { left: 15 });

                const dataGrid = createDataGrid({
                    width: 600,
                    columns: [
                        { dataField: 'f1' },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                    ],
                    dataSource: [{ f1: 'v1_1', f2: 'v2_1', f3: 'v3_1' }]
                });

                const expectedLog = [
                    'text,F1,25,24.2,{baseline:middle}',
                    'text,v1_1,25,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,25,15,200,18.4',
                    'setLineWidth,1',
                    'rect,25,33.4,200,18.4',
                    'addPage,',
                    'text,F2,25,24.2,{baseline:middle}',
                    'text,v2_1,25,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,25,15,200,18.4',
                    'setLineWidth,1',
                    'rect,25,33.4,200,18.4',
                    'addPage,',
                    'text,F3,25,24.2,{baseline:middle}',
                    'text,v3_1,25,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,25,15,200,18.4',
                    'setLineWidth,1',
                    'rect,25,33.4,200,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 10, y: 15 }, columnWidths: [ 200, 200, 200 ] }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });
        });

        QUnit.module('Splitting - Horizontally splitting for merged cells', moduleConfig, () => {
            QUnit.test('3 cols - 2 rows, 1 level - 1 group - [{f1, groupIndex: 0}, f2, f3], columnWidth = 200, availablePageWidth = 300', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 300);

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                    ],
                    dataSource: [
                        { f1: 'f1', f2: 'f1_2', f3: 'f1_3' },
                        { f1: 'f1', f2: 'f2_2', f3: 'f2_3' },
                    ],
                });

                const customizeCell = ({ pdfCell, gridCell }) => {
                    if(gridCell.rowType === 'group') {
                        pdfCell.backgroundColor = '#CCCCCC';
                    }
                };

                const expectedLog = [
                    'text,F2,10,24.2,{baseline:middle}',
                    'text,f1_2,20,61,{baseline:middle}',
                    'text,f2_2,20,79.4,{baseline:middle}',
                    'setFillColor,#CCCCCC',
                    'rect,10,33.4,200,18.4,F',
                    'text,F1: f1,10,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,20,51.8,190,18.4',
                    'setLineWidth,1',
                    'rect,20,70.2,190,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,200,18.4',
                    'addPage,',
                    'text,F3,10,24.2,{baseline:middle}',
                    'text,f1_3,10,61,{baseline:middle}',
                    'text,f2_3,10,79.4,{baseline:middle}',
                    'setFillColor,#CCCCCC',
                    'rect,10,33.4,200,18.4,F',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,10,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,10,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,200,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 10, y: 15 }, columnWidths: [ 200, 200 ], customizeCell }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('4 cols - 2 rows, 1 level - 1 group - [{f1, groupIndex: 0}, f2, f3, f4], columnWidth = 200, availablePageWidth = 500', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 500);

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                        { dataField: 'f4' },
                    ],
                    dataSource: [
                        { f1: 'f1', f2: 'f1_2', f3: 'f1_3', f4: 'f1_3' },
                        { f1: 'f1', f2: 'f2_2', f3: 'f2_3', f4: 'f2_3' },
                    ],
                });

                const customizeCell = ({ pdfCell, gridCell }) => {
                    if(gridCell.rowType === 'group') {
                        pdfCell.backgroundColor = '#CCCCCC';
                    }
                };

                const expectedLog = [
                    'text,F2,10,24.2,{baseline:middle}',
                    'text,F3,210,24.2,{baseline:middle}',
                    'text,f1_2,20,61,{baseline:middle}',
                    'text,f1_3,210,61,{baseline:middle}',
                    'text,f2_2,20,79.4,{baseline:middle}',
                    'text,f2_3,210,79.4,{baseline:middle}',
                    'setFillColor,#CCCCCC',
                    'rect,10,33.4,400,18.4,F',
                    'text,F1: f1,10,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,210,15,200,18.4',
                    'setLineWidth,1',
                    'rect,20,51.8,190,18.4',
                    'setLineWidth,1',
                    'rect,210,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,20,70.2,190,18.4',
                    'setLineWidth,1',
                    'rect,210,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,400,18.4',
                    'addPage,',
                    'text,F4,10,24.2,{baseline:middle}',
                    'text,f1_3,10,61,{baseline:middle}',
                    'text,f2_3,10,79.4,{baseline:middle}',
                    'setFillColor,#CCCCCC',
                    'rect,10,33.4,200,18.4,F',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,10,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,10,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,200,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 10, y: 15 }, columnWidths: [ 200, 200, 200 ], customizeCell }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('5 cols - 2 rows, 1 level - 1 group - [{f1, groupIndex: 0}, f2, f3, f4, f5], columnWidth = 200, availablePageWidth = 500', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 500);

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                        { dataField: 'f4' },
                        { dataField: 'f5' },
                    ],
                    dataSource: [
                        { f1: 'f1', f2: 'f1_2', f3: 'f1_3', f4: 'f1_4', f5: 'f1_5' },
                        { f1: 'f1', f2: 'f2_2', f3: 'f2_3', f4: 'f2_4', f5: 'f2_5' },
                    ],
                });

                const customizeCell = ({ pdfCell, gridCell }) => {
                    if(gridCell.rowType === 'group') {
                        pdfCell.backgroundColor = '#CCCCCC';
                    }
                };

                const expectedLog = [
                    'text,F2,10,24.2,{baseline:middle}',
                    'text,F3,210,24.2,{baseline:middle}',
                    'text,f1_2,20,61,{baseline:middle}',
                    'text,f1_3,210,61,{baseline:middle}',
                    'text,f2_2,20,79.4,{baseline:middle}',
                    'text,f2_3,210,79.4,{baseline:middle}',
                    'setFillColor,#CCCCCC',
                    'rect,10,33.4,400,18.4,F',
                    'text,F1: f1,10,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,210,15,200,18.4',
                    'setLineWidth,1',
                    'rect,20,51.8,190,18.4',
                    'setLineWidth,1',
                    'rect,210,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,20,70.2,190,18.4',
                    'setLineWidth,1',
                    'rect,210,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,400,18.4',
                    'addPage,',
                    'text,F4,10,24.2,{baseline:middle}',
                    'text,F5,210,24.2,{baseline:middle}',
                    'text,f1_4,10,61,{baseline:middle}',
                    'text,f1_5,210,61,{baseline:middle}',
                    'text,f2_4,10,79.4,{baseline:middle}',
                    'text,f2_5,210,79.4,{baseline:middle}',
                    'setFillColor,#CCCCCC',
                    'rect,10,33.4,400,18.4,F',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,210,15,200,18.4',
                    'setLineWidth,1',
                    'rect,10,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,210,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,10,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,210,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,400,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 10, y: 15 }, columnWidths: [ 200, 200, 200, 200 ], customizeCell }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('6 cols - 2 rows, 1 level - 1 group - [{f1, groupIndex: 0}, f2, f3, f4, f5, f6], columnWidth = 200, availablePageWidth = 500', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 500);

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2' },
                        { dataField: 'f3' },
                        { dataField: 'f4' },
                        { dataField: 'f5' },
                        { dataField: 'f6' },
                    ],
                    dataSource: [
                        { f1: 'f1', f2: 'f1_2', f3: 'f1_3', f4: 'f1_4', f5: 'f1_5', f6: 'f1_6' },
                        { f1: 'f1', f2: 'f2_2', f3: 'f2_3', f4: 'f2_4', f5: 'f2_5', f6: 'f2_6' },
                    ],
                });

                const customizeCell = ({ pdfCell, gridCell }) => {
                    if(gridCell.rowType === 'group') {
                        pdfCell.backgroundColor = '#CCCCCC';
                    }
                };

                const expectedLog = [
                    'text,F2,10,24.2,{baseline:middle}',
                    'text,F3,210,24.2,{baseline:middle}',
                    'text,f1_2,20,61,{baseline:middle}',
                    'text,f1_3,210,61,{baseline:middle}',
                    'text,f2_2,20,79.4,{baseline:middle}',
                    'text,f2_3,210,79.4,{baseline:middle}',
                    'setFillColor,#CCCCCC',
                    'rect,10,33.4,400,18.4,F',
                    'text,F1: f1,10,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,210,15,200,18.4',
                    'setLineWidth,1',
                    'rect,20,51.8,190,18.4',
                    'setLineWidth,1',
                    'rect,210,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,20,70.2,190,18.4',
                    'setLineWidth,1',
                    'rect,210,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,400,18.4',
                    'addPage,',
                    'text,F4,10,24.2,{baseline:middle}',
                    'text,F5,210,24.2,{baseline:middle}',
                    'text,f1_4,10,61,{baseline:middle}',
                    'text,f1_5,210,61,{baseline:middle}',
                    'text,f2_4,10,79.4,{baseline:middle}',
                    'text,f2_5,210,79.4,{baseline:middle}',
                    'setFillColor,#CCCCCC',
                    'rect,10,33.4,400,18.4,F',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,210,15,200,18.4',
                    'setLineWidth,1',
                    'rect,10,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,210,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,10,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,210,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,400,18.4',
                    'addPage,',
                    'text,F6,10,24.2,{baseline:middle}',
                    'text,f1_6,10,61,{baseline:middle}',
                    'text,f2_6,10,79.4,{baseline:middle}',
                    'setFillColor,#CCCCCC',
                    'rect,10,33.4,200,18.4,F',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,10,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,10,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,200,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 10, y: 15 }, columnWidths: [ 200, 200, 200, 200, 200 ], customizeCell }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('4 cols - 2 rows, 2 level - 1 group - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4], columnWidth = 200, availablePageWidth = 500', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 500);

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' },
                    ],
                    dataSource: [
                        { f1: 'f1', f2: 'f2', f3: 'f1_3', f4: 'f1_4' },
                        { f1: 'f1', f2: 'f2', f3: 'f2_3', f4: 'f2_4' },
                    ],
                });

                const customizeCell = ({ pdfCell, gridCell }) => {
                    if(gridCell.rowType === 'group') {
                        pdfCell.backgroundColor = gridCell.groupIndex === 0 ? '#CCFFCC' : '#CCCCFF';
                    }
                };

                const expectedLog = [
                    'text,F3,10,24.2,{baseline:middle}',
                    'text,F4,210,24.2,{baseline:middle}',
                    'setFillColor,#CCFFCC',
                    'rect,10,33.4,400,18.4,F',
                    'text,F1: f1,10,42.6,{baseline:middle}',
                    'setFillColor,#CCCCFF',
                    'rect,20,51.8,390,18.4,F',
                    'text,F2: f2,20,61,{baseline:middle}',
                    'text,f1_3,30,79.4,{baseline:middle}',
                    'text,f1_4,210,79.4,{baseline:middle}',
                    'text,f2_3,30,97.8,{baseline:middle}',
                    'text,f2_4,210,97.8,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,210,15,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,400,18.4',
                    'setLineWidth,1',
                    'rect,20,51.8,390,18.4',
                    'setLineWidth,1',
                    'rect,30,70.2,180,18.4',
                    'setLineWidth,1',
                    'rect,210,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,30,88.6,180,18.4',
                    'setLineWidth,1',
                    'rect,210,88.6,200,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 10, y: 15 }, columnWidths: [ 200, 200, 200 ], customizeCell }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('5 cols - 2 rows, 2 level - 1 group - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4, f5], columnWidth = 200, availablePageWidth = 500', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 500);

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' },
                        { dataField: 'f5' },
                    ],
                    dataSource: [
                        { f1: 'f1', f2: 'f2', f3: 'f1_3', f4: 'f1_4', f5: 'f1_5' },
                        { f1: 'f1', f2: 'f2', f3: 'f2_3', f4: 'f2_4', f5: 'f2_5' },
                    ],
                });

                const customizeCell = ({ pdfCell, gridCell }) => {
                    if(gridCell.rowType === 'group') {
                        pdfCell.backgroundColor = gridCell.groupIndex === 0 ? '#CCFFCC' : '#CCCCFF';
                    }
                };

                const expectedLog = [
                    'text,F3,10,24.2,{baseline:middle}',
                    'text,F4,210,24.2,{baseline:middle}',
                    'text,f1_3,30,79.4,{baseline:middle}',
                    'text,f1_4,210,79.4,{baseline:middle}',
                    'text,f2_3,30,97.8,{baseline:middle}',
                    'text,f2_4,210,97.8,{baseline:middle}',
                    'setFillColor,#CCFFCC',
                    'rect,10,33.4,400,18.4,F',
                    'text,F1: f1,10,42.6,{baseline:middle}',
                    'setFillColor,#CCCCFF',
                    'rect,20,51.8,390,18.4,F',
                    'text,F2: f2,20,61,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,210,15,200,18.4',
                    'setLineWidth,1',
                    'rect,30,70.2,180,18.4',
                    'setLineWidth,1',
                    'rect,210,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,30,88.6,180,18.4',
                    'setLineWidth,1',
                    'rect,210,88.6,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,400,18.4',
                    'setLineWidth,1',
                    'rect,20,51.8,390,18.4',
                    'addPage,',
                    'text,F5,10,24.2,{baseline:middle}',
                    'text,f1_5,10,79.4,{baseline:middle}',
                    'text,f2_5,10,97.8,{baseline:middle}',
                    'setFillColor,#CCFFCC',
                    'rect,10,33.4,200,18.4,F',
                    'setFillColor,#CCCCFF',
                    'rect,10,51.8,200,18.4,F',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,10,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,10,88.6,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,200,18.4',
                    'setLineWidth,1',
                    'rect,10,51.8,200,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 10, y: 15 }, columnWidths: [ 200, 200, 200 ], customizeCell }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('6 cols - 2 rows, 2 level - 1 group - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4, f5, f6], columnWidth = 200, availablePageWidth = 500', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 500);

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' },
                        { dataField: 'f5' },
                        { dataField: 'f6' },
                    ],
                    dataSource: [
                        { f1: 'f1', f2: 'f2', f3: 'f1_3', f4: 'f1_4', f5: 'f1_5', f6: 'f1_6' },
                        { f1: 'f1', f2: 'f2', f3: 'f2_3', f4: 'f2_4', f5: 'f2_5', f6: 'f2_6' },
                    ],
                });

                const customizeCell = ({ pdfCell, gridCell }) => {
                    if(gridCell.rowType === 'group') {
                        pdfCell.backgroundColor = gridCell.groupIndex === 0 ? '#CCFFCC' : '#CCCCFF';
                    }
                };

                const expectedLog = [
                    'text,F3,10,24.2,{baseline:middle}',
                    'text,F4,210,24.2,{baseline:middle}',
                    'text,f1_3,30,79.4,{baseline:middle}',
                    'text,f1_4,210,79.4,{baseline:middle}',
                    'text,f2_3,30,97.8,{baseline:middle}',
                    'text,f2_4,210,97.8,{baseline:middle}',
                    'setFillColor,#CCFFCC',
                    'rect,10,33.4,400,18.4,F',
                    'text,F1: f1,10,42.6,{baseline:middle}',
                    'setFillColor,#CCCCFF',
                    'rect,20,51.8,390,18.4,F',
                    'text,F2: f2,20,61,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,210,15,200,18.4',
                    'setLineWidth,1',
                    'rect,30,70.2,180,18.4',
                    'setLineWidth,1',
                    'rect,210,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,30,88.6,180,18.4',
                    'setLineWidth,1',
                    'rect,210,88.6,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,400,18.4',
                    'setLineWidth,1',
                    'rect,20,51.8,390,18.4',
                    'addPage,',
                    'text,F5,10,24.2,{baseline:middle}',
                    'text,F6,210,24.2,{baseline:middle}',
                    'text,f1_5,10,79.4,{baseline:middle}',
                    'text,f1_6,210,79.4,{baseline:middle}',
                    'text,f2_5,10,97.8,{baseline:middle}',
                    'text,f2_6,210,97.8,{baseline:middle}',
                    'setFillColor,#CCFFCC',
                    'rect,10,33.4,400,18.4,F',
                    'setFillColor,#CCCCFF',
                    'rect,10,51.8,400,18.4,F',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,210,15,200,18.4',
                    'setLineWidth,1',
                    'rect,10,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,210,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,10,88.6,200,18.4',
                    'setLineWidth,1',
                    'rect,210,88.6,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,400,18.4',
                    'setLineWidth,1',
                    'rect,10,51.8,400,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 10, y: 15 }, columnWidths: [ 200, 200, 200, 200 ], customizeCell }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('7 cols - 2 rows, 2 level - 1 group - [{f1, groupIndex: 0}, {f2, groupIndex: 1}, f3, f4, f5, f6, f7], columnWidth = 200, availablePageWidth = 500', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 500);

                const dataGrid = createDataGrid({
                    columns: [
                        { dataField: 'f1', groupIndex: 0 },
                        { dataField: 'f2', groupIndex: 1 },
                        { dataField: 'f3' },
                        { dataField: 'f4' },
                        { dataField: 'f5' },
                        { dataField: 'f6' },
                        { dataField: 'f7' },
                    ],
                    dataSource: [
                        { f1: 'f1', f2: 'f2', f3: 'f1_3', f4: 'f1_4', f5: 'f1_5', f6: 'f1_6', f7: 'f1_7' },
                        { f1: 'f1', f2: 'f2', f3: 'f2_3', f4: 'f2_4', f5: 'f2_5', f6: 'f2_6', f7: 'f2_7' },
                    ],
                });

                const customizeCell = ({ pdfCell, gridCell }) => {
                    if(gridCell.rowType === 'group') {
                        pdfCell.backgroundColor = gridCell.groupIndex === 0 ? '#CCFFCC' : '#CCCCFF';
                    }
                };

                const expectedLog = [
                    'text,F3,10,24.2,{baseline:middle}',
                    'text,F4,210,24.2,{baseline:middle}',
                    'text,f1_3,30,79.4,{baseline:middle}',
                    'text,f1_4,210,79.4,{baseline:middle}',
                    'text,f2_3,30,97.8,{baseline:middle}',
                    'text,f2_4,210,97.8,{baseline:middle}',
                    'setFillColor,#CCFFCC',
                    'rect,10,33.4,400,18.4,F',
                    'text,F1: f1,10,42.6,{baseline:middle}',
                    'setFillColor,#CCCCFF',
                    'rect,20,51.8,390,18.4,F',
                    'text,F2: f2,20,61,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,210,15,200,18.4',
                    'setLineWidth,1',
                    'rect,30,70.2,180,18.4',
                    'setLineWidth,1',
                    'rect,210,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,30,88.6,180,18.4',
                    'setLineWidth,1',
                    'rect,210,88.6,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,400,18.4',
                    'setLineWidth,1',
                    'rect,20,51.8,390,18.4',
                    'addPage,',
                    'text,F5,10,24.2,{baseline:middle}',
                    'text,F6,210,24.2,{baseline:middle}',
                    'text,f1_5,10,79.4,{baseline:middle}',
                    'text,f1_6,210,79.4,{baseline:middle}',
                    'text,f2_5,10,97.8,{baseline:middle}',
                    'text,f2_6,210,97.8,{baseline:middle}',
                    'setFillColor,#CCFFCC',
                    'rect,10,33.4,400,18.4,F',
                    'setFillColor,#CCCCFF',
                    'rect,10,51.8,400,18.4,F',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,210,15,200,18.4',
                    'setLineWidth,1',
                    'rect,10,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,210,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,10,88.6,200,18.4',
                    'setLineWidth,1',
                    'rect,210,88.6,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,400,18.4',
                    'setLineWidth,1',
                    'rect,10,51.8,400,18.4',
                    'addPage,',
                    'text,F7,10,24.2,{baseline:middle}',
                    'text,f1_7,10,79.4,{baseline:middle}',
                    'text,f2_7,10,97.8,{baseline:middle}',
                    'setFillColor,#CCFFCC',
                    'rect,10,33.4,200,18.4,F',
                    'setFillColor,#CCCCFF',
                    'rect,10,51.8,200,18.4,F',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,10,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,10,88.6,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,200,18.4',
                    'setLineWidth,1',
                    'rect,10,51.8,200,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 10, y: 15 }, columnWidths: [ 200, 200, 200, 200, 200 ], customizeCell }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('[band1-[f1, f2]], columnWidth = 200, availablePageWidth = 300', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 300);

                const dataGrid = createDataGrid({
                    columns: [
                        { caption: 'Band1', columns: [ 'f1', 'f2', ] }
                    ],
                    dataSource: [{ f1: 'f1_1', f2: 'f2_1' }],
                });

                const customizeCell = ({ pdfCell }) => {
                    if(pdfCell.text === 'Band1') {
                        pdfCell.backgroundColor = '#CCCCCC';
                    }
                };

                const expectedLog = [
                    'text,F1,10,42.6,{baseline:middle}',
                    'text,f1_1,10,61,{baseline:middle}',
                    'setFillColor,#CCCCCC',
                    'rect,10,15,200,18.4,F',
                    'text,Band1,10,24.2,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,33.4,200,18.4',
                    'setLineWidth,1',
                    'rect,10,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'addPage,',
                    'text,F2,10,42.6,{baseline:middle}',
                    'text,f2_1,10,61,{baseline:middle}',
                    'setFillColor,#CCCCCC',
                    'rect,10,15,200,18.4,F',
                    'setLineWidth,1',
                    'rect,10,33.4,200,18.4',
                    'setLineWidth,1',
                    'rect,10,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 10, y: 15 }, customizeCell, columnWidths: [ 200, 200 ] }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('[band1-[band1_1-[f1, f2], f3]], columnWidth = 200, availablePageWidth = 300', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 300);

                const dataGrid = createDataGrid({
                    columns: [
                        {
                            caption: 'Band1',
                            columns: [
                                { caption: 'Band1_1', columns: [ 'f1', 'f2' ] },
                                'f3',
                            ]
                        }
                    ],
                    dataSource: [{ f1: 'f1_1_1', f2: 'f2_1_1', f3: 'f3_1' }],
                });

                const customizeCell = ({ pdfCell }) => {
                    if(pdfCell.text === 'Band1') {
                        pdfCell.backgroundColor = '#CCFFCC';
                    } else if(pdfCell.text === 'Band1_1') {
                        pdfCell.backgroundColor = '#CCCCFF';
                    }
                };

                const expectedLog = [
                    'text,F1,10,61,{baseline:middle}',
                    'text,f1_1_1,10,79.4,{baseline:middle}',
                    'setFillColor,#CCFFCC',
                    'rect,10,15,200,18.4,F',
                    'text,Band1,10,24.2,{baseline:middle}',
                    'setFillColor,#CCCCFF',
                    'rect,10,33.4,200,18.4,F',
                    'text,Band1_1,10,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,10,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,200,18.4',
                    'addPage,',
                    'text,F2,10,61,{baseline:middle}',
                    'text,f2_1_1,10,79.4,{baseline:middle}',
                    'setFillColor,#CCCCFF',
                    'rect,10,33.4,200,18.4,F',
                    'setFillColor,#CCFFCC',
                    'rect,10,15,200,18.4,F',
                    'setLineWidth,1',
                    'rect,10,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,10,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,200,18.4',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4',
                    'addPage,',
                    'text,F3,10,51.8,{baseline:middle}',
                    'text,f3_1,10,79.4,{baseline:middle}',
                    'setFillColor,#CCFFCC',
                    'rect,10,15,200,18.4,F',
                    'setLineWidth,1',
                    'rect,10,33.4,200,36.8',
                    'setLineWidth,1',
                    'rect,10,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,10,15,200,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 10, y: 15 }, columnWidths: [ 200, 200, 200 ], customizeCell }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('[band1-[band1_1-[f1, f2, f3], band1_2-[f4, f5, f6]]], columnWidth = 200, availablePageWidth = 500', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 500);

                const dataGrid = createDataGrid({
                    columns: [
                        {
                            caption: 'Band1',
                            columns: [
                                {
                                    caption: 'Band1_1',
                                    columns: [ 'f1', 'f2', 'f3' ]
                                },
                                {
                                    caption: 'Band1_2',
                                    columns: [ 'f4', 'f5', 'f6' ]
                                },
                            ]
                        }
                    ],
                    dataSource: [{ f1: 'f1_1_1', f2: 'f2_1_1', f3: 'f3_1_1', f4: 'f4_1_2', f5: 'f5_1_2', f6: 'f6_1_2' }],
                });

                const customizeCell = ({ pdfCell }) => {
                    if(pdfCell.text === 'Band1') {
                        pdfCell.backgroundColor = '#CCFFCC';
                    } else if(pdfCell.text === 'Band1_1') {
                        pdfCell.backgroundColor = '#CCCCFF';
                    } else if(pdfCell.text === 'Band1_2') {
                        pdfCell.backgroundColor = '#CCCCFF';
                    }
                };

                const expectedLog = [
                    'text,F1,10,61,{baseline:middle}',
                    'text,F2,210,61,{baseline:middle}',
                    'text,f1_1_1,10,79.4,{baseline:middle}',
                    'text,f2_1_1,210,79.4,{baseline:middle}',
                    'setFillColor,#CCFFCC',
                    'rect,10,15,400,18.4,F',
                    'text,Band1,10,24.2,{baseline:middle}',
                    'setFillColor,#CCCCFF',
                    'rect,10,33.4,400,18.4,F',
                    'text,Band1_1,10,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,10,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,210,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,10,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,210,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,10,15,400,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,400,18.4',
                    'addPage,',
                    'text,F3,10,61,{baseline:middle}',
                    'text,F4,210,61,{baseline:middle}',
                    'text,f3_1_1,10,79.4,{baseline:middle}',
                    'text,f4_1_2,210,79.4,{baseline:middle}',
                    'setFillColor,#CCCCFF',
                    'rect,10,33.4,200,18.4,F',
                    'setFillColor,#CCCCFF',
                    'rect,210,33.4,200,18.4,F',
                    'text,Band1_2,210,42.6,{baseline:middle}',
                    'setFillColor,#CCFFCC',
                    'rect,10,15,400,18.4,F',
                    'setLineWidth,1',
                    'rect,10,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,210,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,10,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,210,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,200,18.4',
                    'setLineWidth,1',
                    'rect,210,33.4,200,18.4',
                    'setLineWidth,1',
                    'rect,10,15,400,18.4',
                    'addPage,',
                    'text,F5,10,61,{baseline:middle}',
                    'text,F6,210,61,{baseline:middle}',
                    'text,f5_1_2,10,79.4,{baseline:middle}',
                    'text,f6_1_2,210,79.4,{baseline:middle}',
                    'setFillColor,#CCCCFF',
                    'rect,10,33.4,400,18.4,F',
                    'setFillColor,#CCFFCC',
                    'rect,10,15,400,18.4,F',
                    'setLineWidth,1',
                    'rect,10,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,210,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,10,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,210,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,10,33.4,400,18.4',
                    'setLineWidth,1',
                    'rect,10,15,400,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 10, y: 15 }, columnWidths: [ 200, 200, 200, 200, 200, 200 ], customizeCell }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });

            QUnit.test('[band1-[band1_1-[f1, f2, f3], band1_2-[f4, f5, f6]]], topLeft.x = 10, margin.left = 15, columnWidth = 200, availablePageWidth = 500', function(assert) {
                const done = assert.async();
                const doc = createMockPdfDoc();
                const margin = initMargin(doc, 500, { left: 15 });

                const dataGrid = createDataGrid({
                    columns: [
                        {
                            caption: 'Band1',
                            columns: [
                                {
                                    caption: 'Band1_1',
                                    columns: [ 'f1', 'f2', 'f3' ]
                                },
                                {
                                    caption: 'Band1_2',
                                    columns: [ 'f4', 'f5', 'f6' ]
                                },
                            ]
                        }
                    ],
                    dataSource: [{ f1: 'f1_1_1', f2: 'f2_1_1', f3: 'f3_1_1', f4: 'f4_1_2', f5: 'f5_1_2', f6: 'f6_1_2' }],
                });

                const customizeCell = ({ pdfCell }) => {
                    if(pdfCell.text === 'Band1') {
                        pdfCell.backgroundColor = '#CCFFCC';
                    } else if(pdfCell.text === 'Band1_1') {
                        pdfCell.backgroundColor = '#CCCCFF';
                    } else if(pdfCell.text === 'Band1_2') {
                        pdfCell.backgroundColor = '#CCCCFF';
                    }
                };

                const expectedLog = [
                    'text,F1,25,61,{baseline:middle}',
                    'text,F2,225,61,{baseline:middle}',
                    'text,f1_1_1,25,79.4,{baseline:middle}',
                    'text,f2_1_1,225,79.4,{baseline:middle}',
                    'setFillColor,#CCFFCC',
                    'rect,25,15,400,18.4,F',
                    'text,Band1,25,24.2,{baseline:middle}',
                    'setFillColor,#CCCCFF',
                    'rect,25,33.4,400,18.4,F',
                    'text,Band1_1,25,42.6,{baseline:middle}',
                    'setLineWidth,1',
                    'rect,25,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,225,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,25,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,225,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,25,15,400,18.4',
                    'setLineWidth,1',
                    'rect,25,33.4,400,18.4',
                    'addPage,',
                    'text,F3,25,61,{baseline:middle}',
                    'text,F4,225,61,{baseline:middle}',
                    'text,f3_1_1,25,79.4,{baseline:middle}',
                    'text,f4_1_2,225,79.4,{baseline:middle}',
                    'setFillColor,#CCCCFF',
                    'rect,25,33.4,200,18.4,F',
                    'setFillColor,#CCCCFF',
                    'rect,225,33.4,200,18.4,F',
                    'text,Band1_2,225,42.6,{baseline:middle}',
                    'setFillColor,#CCFFCC',
                    'rect,25,15,400,18.4,F',
                    'setLineWidth,1',
                    'rect,25,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,225,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,25,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,225,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,25,33.4,200,18.4',
                    'setLineWidth,1',
                    'rect,225,33.4,200,18.4',
                    'setLineWidth,1',
                    'rect,25,15,400,18.4',
                    'addPage,',
                    'text,F5,25,61,{baseline:middle}',
                    'text,F6,225,61,{baseline:middle}',
                    'text,f5_1_2,25,79.4,{baseline:middle}',
                    'text,f6_1_2,225,79.4,{baseline:middle}',
                    'setFillColor,#CCCCFF',
                    'rect,25,33.4,400,18.4,F',
                    'setFillColor,#CCFFCC',
                    'rect,25,15,400,18.4,F',
                    'setLineWidth,1',
                    'rect,25,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,225,51.8,200,18.4',
                    'setLineWidth,1',
                    'rect,25,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,225,70.2,200,18.4',
                    'setLineWidth,1',
                    'rect,25,33.4,400,18.4',
                    'setLineWidth,1',
                    'rect,25,15,400,18.4'
                ];

                exportDataGrid(doc, dataGrid, { margin, topLeft: { x: 10, y: 15 }, columnWidths: [ 200, 200, 200, 200, 200, 200 ], customizeCell }).then(() => {
                    // doc.save(assert.test.testName + '.pdf');
                    assert.deepEqual(doc.__log, expectedLog);
                    done();
                });
            });
        });
    }
};

export { JSPdfSplittingTests };
