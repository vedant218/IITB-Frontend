export function createTableHeader(headers, currentSort) {
    return `
      <thead>
        <tr>
          ${headers.map(header => `
            <th data-column="${header.id}" class="${currentSort.column === header.id ? `sort-${currentSort.direction}` : 'sort-icon'}">
              ${header.label}
            </th>
          `).join('')}
          <th>Actions</th>
        </tr>
      </thead>
    `;
  }
  
  export function createTableBody(data, headers, selectedRowId) {
    return `
      <tbody>
        ${data.map(item => `
          <tr data-id="${item.id}" class="${item.id.toString() === selectedRowId ? 'selected-row' : ''}">
            ${headers.map(header => `<td>${item[header.id]}</td>`).join('')}
            <td>
              <button class="btn btn-edit" onclick="window.handleEdit(${item.id})">Edit</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }