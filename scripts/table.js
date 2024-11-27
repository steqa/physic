const table = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
const tableClearBtn = document.getElementById('tableCleareBtn');

let rowCount = 1;

function insertTableRow(t, m, h, M) {
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);

    cell1.textContent = rowCount++;
    cell2.textContent = t;
    cell3.textContent = m;
    cell4.textContent = h;
    cell5.textContent = M;
}

tableClearBtn.addEventListener('click', () => {
    const rows = table.rows.length;
    for (let i = rows - 1; i >= 0; i--) {
        table.deleteRow(i);
    }
    rowCount = 1;
});
