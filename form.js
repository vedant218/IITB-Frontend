export function createEditForm(headers) {
    return `
      <div id="formModal" class="modal">
        <div class="modal-content">
          <form id="chemicalForm">
            <input type="hidden" id="editId" value="">
            ${headers.filter(h => h.id !== 'id').map(header => `
              <div class="form-group">
                <label for="${header.id}">${header.label}:</label>
                <input type="text" id="${header.id}" name="${header.id}" required>
              </div>
            `).join('')}
            <div class="form-actions">
              <button type="submit" class="btn btn-success">Save</button>
              <button type="button" class="btn btn-danger" onclick="window.closeForm()">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }