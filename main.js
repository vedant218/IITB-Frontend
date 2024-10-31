import './style.css';
import { chemicalData } from './data.js';

let data = JSON.parse(localStorage.getItem('chemicalData')) || chemicalData;
let selectedRowId = null;
let currentSort = { column: null, direction: 'asc' };

const app = document.getElementById('app');

function renderApp() {
  app.innerHTML = `
    <div class="container">
      <header>
        <h1>Chemical Supplies</h1>
        <div class="toolbar">
          <button onclick="add()">➕ Add</button>
          <button onclick="moveRow('up')">⬆️ Up</button>
          <button onclick="moveRow('down')">⬇️ Down</button>
          <button onclick="deleteRow()">🗑️ Delete</button>
          <button onclick="refreshData()">🔄 Refresh</button>
        </div>
      </header>
      <main>
        <table>
          <thead>
            ${Object.keys(data[0]).map(key => 
              `<th onclick="sort('${key}')">${key}</th>`
            ).join('')}
            <th>Actions</th>
          </thead>
          <tbody>
            ${data.map(row => `
              <tr class="${row.id === selectedRowId ? 'selected' : ''}" onclick="select(${row.id})">
                ${Object.values(row).map(val => `<td>${val}</td>`).join('')}
                <td><button onclick="edit(${row.id})">✏️ Edit</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </main>
    </div>
    <div id="modal" class="modal">
      <div class="modal-content">
        <form id="form" onsubmit="save(event)">
          <input type="hidden" id="editId">
          ${Object.keys(data[0]).filter(key => key !== 'id').map(key => `
            <div class="form-group">
              <label>${key.replace(/([A-Z])/g, ' $1').trim()}</label>
              <input name="${key}" required>
            </div>
          `).join('')}
          <div class="form-actions">
            <button type="submit">💾 Save</button>
            <button type="button" onclick="closeModal()">❌ Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function sort(column) {
  currentSort.direction = currentSort.column === column && currentSort.direction === 'asc' ? 'desc' : 'asc';
  currentSort.column = column;
  
  data.sort((a, b) => {
    const aVal = a[column], bVal = b[column];
    return currentSort.direction === 'asc' 
      ? (typeof aVal === 'number' ? aVal - bVal : String(aVal).localeCompare(String(bVal)))
      : (typeof aVal === 'number' ? bVal - aVal : String(bVal).localeCompare(String(aVal)));
  });
  
  renderApp();
}

function select(id) {
  selectedRowId = selectedRowId === id ? null : id;
  renderApp();
}

function edit(id) {
  event.stopPropagation();
  const item = data.find(item => item.id === id);
  if (!item) return;

  document.getElementById('editId').value = id;
  Object.keys(item).forEach(key => {
    const input = document.querySelector(`[name="${key}"]`);
    if (input) input.value = item[key];
  });

  document.getElementById('modal').style.display = 'block';
}

function add() {
  document.getElementById('editId').value = '';
  document.getElementById('form').reset();
  document.getElementById('modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function save(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const editId = document.getElementById('editId').value;
  
  const newItem = {
    id: editId ? parseInt(editId) : Math.max(...data.map(item => item.id)) + 1
  };
  
  Object.keys(data[0]).forEach(key => {
    if (key !== 'id') {
      const value = formData.get(key);
      newItem[key] = ['density', 'viscosity', 'packSize', 'quantity'].includes(key)
        ? parseFloat(value)
        : value;
    }
  });
  
  if (editId) {
    const index = data.findIndex(item => item.id === parseInt(editId));
    if (index !== -1) data[index] = newItem;
  } else {
    data.push(newItem);
  }
  
  localStorage.setItem('chemicalData', JSON.stringify(data));
  closeModal();
  renderApp();
}

function moveRow(direction) {
  if (!selectedRowId) return;
  
  const currentIndex = data.findIndex(item => item.id === selectedRowId);
  if (currentIndex === -1) return;
  
  const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
  
  if (newIndex >= 0 && newIndex < data.length) {
    [data[currentIndex], data[newIndex]] = [data[newIndex], data[currentIndex]];
    localStorage.setItem('chemicalData', JSON.stringify(data));
    renderApp();
  }
}

function deleteRow() {
  if (!selectedRowId) return;
  
  data = data.filter(item => item.id !== selectedRowId);
  selectedRowId = null;
  localStorage.setItem('chemicalData', JSON.stringify(data));
  renderApp();
}

function refreshData() {
  data = [...chemicalData];
  selectedRowId = null;
  localStorage.setItem('chemicalData', JSON.stringify(data));
  renderApp();
}

window.sort = sort;
window.select = select;
window.edit = edit;
window.add = add;
window.closeModal = closeModal;
window.save = save;
window.moveRow = moveRow;
window.deleteRow = deleteRow;
window.refreshData = refreshData;

renderApp();