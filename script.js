// JavaScript extracted from your original single-file app.
// Save as script.js and ensure index.html includes it AFTER the SheetJS script tag.
<script>
const types = {
  contractor: ["Cement", "Chemical", "Putty"],
  customer: ["Builder", "Government", "Precast", "RMC", "AAC Block"],
  dealer: ["Cement & Metal", "Color", "Hardware", "Tiles", "Marble"],
  architect: ["Interior", "Structure", "Small", "Big"],
  aggregate: ["Brick", "Sand", "Rock"]
};

let currCategory = "";
let currType = "";
let currMode = "";
let passwordOK = false;
const VIEW_PASSWORD = "181818"; // client-side gate (not secure)
let currentFilter = null;

window.addEventListener('DOMContentLoaded', function() {
  console.log("✓ Page loaded successfully");
  updateDataCountDisplay();
});

// Update stored entity count
function updateDataCountDisplay() {
  try {
    const data = JSON.parse(localStorage.getItem('businessData') || '{}');
    let totalCount = 0;

    for (let cat in data) {
      for (let type in data[cat]) {
        if (Array.isArray(data[cat][type])) {
          totalCount += data[cat][type].length;
        }
      }
    }

    const displayDiv = document.getElementById('dataCountDisplay');
    if (displayDiv) {
      if (totalCount === 0) {
        displayDiv.innerHTML = '📊 Stored Entities: <strong style="color:#e74c3c;">0</strong>';
      } else {
        displayDiv.innerHTML = '📊 Stored Entities: <strong style="color:#27ae60;">' + totalCount + '</strong>';
      }
    }
  } catch (e) {
    console.error('Error updating count:', e);
  }
}

// Modal functions
function openModal() {
  const m = document.getElementById('myModal');
  m.style.display = 'flex';
  m.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  const m = document.getElementById('myModal');
  m.style.display = 'none';
  m.setAttribute('aria-hidden', 'true');
}

function switchTab(tab, btn) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(tab).classList.add('active');
  btn.classList.add('active');
}

// Mode selection
function selectRetail() {
  currMode = "Retail";
  document.getElementById('retailBtn').classList.add('active');
  document.getElementById('projectBtn').classList.remove('active');
  console.log("Mode selected: Retail");
}

function selectProject() {
  currMode = "Project";
  document.getElementById('projectBtn').classList.add('active');
  document.getElementById('retailBtn').classList.remove('active');
  console.log("Mode selected: Project");
}

// Category & type update
function updateTypes() {
  const cat = document.getElementById('category').value;
  const typeSelect = document.getElementById('type');
  typeSelect.innerHTML = '<option value="">-- Select Type --</option>';

  if (!cat || !types[cat]) return;

  types[cat].forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.text = t;
    typeSelect.appendChild(opt);
  });
}

// Go to form
function goToForm() {
  currCategory = document.getElementById('category').value;
  currType = document.getElementById('type').value;

  if (!currCategory || !currType) {
    alert('⚠ Please select both Category and Type');
    return;
  }

  if (!currMode) {
    alert('⚠ Please select Mode (Retail or Project)');
    return;
  }

  document.getElementById('selectionForm').style.display = 'none';
  document.getElementById('stockForm').style.display = 'block';
  document.getElementById('selectedInfo').innerHTML =
    '📋 Category: <strong>' + currCategory + '</strong> | Type: <strong>' + currType + '</strong> | Mode: <strong>' + currMode + '</strong>';
}

// Save entry
function doSave() {
  const fn = document.getElementById('firmName').value.trim();
  const on = document.getElementById('ownerName').value.trim();
  const om = document.getElementById('ownerMobile').value.trim();
  const ba = document.getElementById('businessAddress').value.trim();
  const gst = document.getElementById('gstNumber').value.trim();
  const pan = document.getElementById('pannumber').value.trim();
  const it = document.getElementById('industryType').value.trim();
  const em = document.getElementById('email').value.trim();
  const bd = document.getElementById('birthDate').value;
  const ad = document.getElementById('anniversaryDate').value;

  if (!fn || !on || !om || !ba || !gst || !pan || !it || !em) {
    alert('❌ Please fill all required fields');
    return;
  }

  if (!/^[0-9]{10}$/.test(om)) {
    alert('❌ Mobile must be exactly 10 digits');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
    alert('❌ Please enter a valid email address');
    return;
  }

  try {
    let data = {};
    const s = localStorage.getItem('businessData');
    if (s) data = JSON.parse(s);

    if (!data[currCategory]) data[currCategory] = {};
    if (!data[currCategory][currType]) data[currCategory][currType] = [];

    data[currCategory][currType].push({
      firmName: fn,
      ownerName: on,
      ownerMobile: om,
      businessAddress: ba,
      gstNumber: gst,
      pannumber: pan,
      industryType: it,
      email: em,
      birthDate: bd,
      anniversaryDate: ad,
      mode: currMode
    });

    localStorage.setItem('businessData', JSON.stringify(data));

    document.getElementById('stockForm').style.display = 'none';
    document.getElementById('step3').style.display = 'block';
    document.getElementById('finalSummary').innerHTML =
      '<strong>✅ Entry Saved Successfully!</strong><br>' +
      '<strong>Firm:</strong> ' + fn + '<br>' +
      '<strong>Owner:</strong> ' + on + '<br>' +
      '<strong>Mode:</strong> ' + currMode;

    updateDataCountDisplay();
    alert('✅ Entry saved successfully!');

  } catch (error) {
    alert('❌ Error: ' + error.message);
  }
}

// New entry
function newEntry() {
  document.getElementById('step3').style.display = 'none';
  document.getElementById('selectionForm').style.display = 'block';
  document.getElementById('stockForm').querySelectorAll('input').forEach(i => i.value = '');
  currCategory = "";
  currType = "";
  currMode = "";
  document.getElementById('retailBtn').classList.remove('active');
  document.getElementById('projectBtn').classList.remove('active');
  document.getElementById('category').value = '';
  document.getElementById('type').innerHTML = '<option value="">-- Select Type --</option>';
}

// Export to Excel using SheetJS
function exportData() {
  const exportBtn = document.getElementById('exportBtn');
  const originalText = exportBtn.textContent;
  exportBtn.disabled = true;
  exportBtn.textContent = '⏳ Exporting...';

  try {
    const data = JSON.parse(localStorage.getItem('businessData') || '{}');
    let entries = [];
    let count = 0;

    for (let cat in data) {
      for (let type in data[cat]) {
        if (Array.isArray(data[cat][type])) {
          data[cat][type].forEach(e => {
            entries.push({
              'Category': cat || '',
              'Type': type || '',
              'Mode': e.mode || '',
              'Firm Name': e.firmName || '',
              'Owner Name': e.ownerName || '',
              'Mobile': e.ownerMobile || '',
              'Email': e.email || '',
              'GST': e.gstNumber || '',
              'PAN': e.pannumber || '',
              'Products': e.industryType || '',
              'Address': e.businessAddress || '',
              'DOB': e.birthDate || '',
              'Anniversary': e.anniversaryDate || ''
            });
            count++;
          });
        }
      }
    }

    if (count === 0) {
      alert('⚠ No data to export. Stored Entities: 0');
      exportBtn.disabled = false;
      exportBtn.textContent = originalText;
      return;
    }

    exportBtn.textContent = '⏳ Generating Excel...';

    const ws = XLSX.utils.json_to_sheet(entries);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Business Data');

    const filename = 'storentity-business-entities.xlsx';
    XLSX.writeFile(wb, filename);

    alert('✅ Export Complete!\n\n📊 Total Entities: ' + count + '\n💾 Downloaded: ' + filename);

  } catch (error) {
    alert('❌ Export failed: ' + error.message);
  } finally {
    exportBtn.disabled = false;
    exportBtn.textContent = originalText;
  }
}

// View data (password-gated)
function viewData() {
  if (VIEW_PASSWORD) {
    if (!passwordOK) {
      const p = prompt("Enter password to view data:");
      if (p !== VIEW_PASSWORD) {
        alert("❌ Wrong password");
        return;
      }
      passwordOK = true;
    }
  }

  document.getElementById('entriesContainer').textContent = 'Select a filter above to view entries';
  document.getElementById('entriesModal').style.display = 'flex';
  document.getElementById('entriesModal').setAttribute('aria-hidden', 'false');
}

// Render entries safely (DOM creation)
function renderEntries(filterMode = null) {
  currentFilter = filterMode;
  const data = JSON.parse(localStorage.getItem('businessData') || '{}');
  const container = document.getElementById('entriesContainer');
  container.innerHTML = '';
  let count = 0;

  for (let cat in data) {
    for (let type in data[cat]) {
      const arr = data[cat][type];
      if (!Array.isArray(arr)) continue;
      arr.forEach((e, index) => {
        if (filterMode && e.mode !== filterMode) return;

        count++;
        const card = document.createElement('div');
        card.className = 'entry-card';
        card.id = entry-${cat}-${type}-${index};

        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.justifyContent = 'space-between';
        wrapper.style.alignItems = 'start';

        const left = document.createElement('div');
        left.style.flex = '1';

        const title = document.createElement('strong');
        title.textContent = (${count}) ${e.firmName || '-'};
        left.appendChild(title);
        left.appendChild(document.createElement('br'));

        left.appendChild(document.createTextNode(📍 Mode: ${e.mode || '-'}));
        left.appendChild(document.createElement('br'));

        left.appendChild(document.createTextNode(👤 Owner: ${e.ownerName || '-'} | 📞 ${e.ownerMobile || '-'}));
        left.appendChild(document.createElement('br'));

        left.appendChild(document.createTextNode(📧 Email: ${e.email || '-'}));
        left.appendChild(document.createElement('br'));

        left.appendChild(document.createTextNode(🏷 Category: ${cat} | Type: ${type}));
        left.appendChild(document.createElement('br'));

        left.appendChild(document.createTextNode(📦 Products: ${e.industryType || '-'}));
        left.appendChild(document.createElement('br'));

        left.appendChild(document.createTextNode(🏢 Address: ${e.businessAddress || '-'}));
        left.appendChild(document.createElement('br'));

        left.appendChild(document.createTextNode(🔑 GST: ${e.gstNumber || '-'} | PAN: ${e.pannumber || '-'}));

        if (e.birthDate) {
          left.appendChild(document.createElement('br'));
          left.appendChild(document.createTextNode(🎂 DOB: ${e.birthDate}));
        }
        if (e.anniversaryDate) {
          left.appendChild(document.createElement('br'));
          left.appendChild(document.createTextNode(🎉 Anniversary: ${e.anniversaryDate}));
        }

        const btn = document.createElement('button');
        btn.className = 'delete-entry-btn';
        btn.type = 'button';
        btn.textContent = '🗑 Delete';
        btn.addEventListener('click', function() {
          deleteEntry(cat, type, index);
        });

        wrapper.appendChild(left);
        wrapper.appendChild(btn);
        card.appendChild(wrapper);
        container.appendChild(card);
      });
    }
  }

  if (count === 0) {
    container.textContent = filterMode ? ⚠ No ${filterMode} entries found : '⚠ No entries found';
  }
}

function showAll() { renderEntries(null); }
function showRetail() { renderEntries('Retail'); }
function showProject() { renderEntries('Project'); }

// Delete single entry
function deleteEntry(category, type, index) {
  if (!confirm('⚠ Are you sure you want to delete this entry?')) {
    return;
  }

  try {
    let data = JSON.parse(localStorage.getItem('businessData') || '{}');

    if (data[category] && data[category][type] && Array.isArray(data[category][type])) {
      data[category][type].splice(index, 1);

      if (data[category][type].length === 0) {
        delete data[category][type];
      }

      if (Object.keys(data[category]).length === 0) {
        delete data[category];
      }

      localStorage.setItem('businessData', JSON.stringify(data));
      updateDataCountDisplay();

      if (currentFilter === 'Retail' || currentFilter === 'Project') {
        renderEntries(currentFilter);
      } else {
        renderEntries(null);
      }

      alert('✅ Entry deleted successfully!');
    }
  } catch (error) {
    alert('❌ Error deleting entry: ' + error.message);
  }
}

// Delete all entries
function deleteAllEntries() {
  const totalCount = getTotalCount();

  if (totalCount === 0) {
    alert('⚠ No entries to delete.');
    return;
  }

  if (!confirm('🚨 WARNING: This will delete ALL ' + totalCount + ' entries permanently!\n\nAre you absolutely sure?')) {
    return;
  }

  if (!confirm('⚠ This action CANNOT be undone!\n\nClick OK to permanently delete all ' + totalCount + ' entries.')) {
    return;
  }

  try {
    localStorage.removeItem('businessData');
    updateDataCountDisplay();
    document.getElementById('entriesContainer').innerHTML = '<div style="text-align:center; padding:40px; background:#d4edda; border-radius:8px; color:#155724;"><h3>✅ All Entries Deleted</h3><p style="margin-top:10px;">All ' + totalCount + ' entries have been permanently removed from storage.</p></div>';
    alert('✅ All entries deleted successfully!');

    setTimeout(function() {
      closeModal2();
    }, 2000);

  } catch (error) {
    alert('❌ Error deleting all entries: ' + error.message);
  }
}

function getTotalCount() {
  try {
    const data = JSON.parse(localStorage.getItem('businessData') || '{}');
    let count = 0;
    for (let cat in data) {
      for (let type in data[cat]) {
        if (Array.isArray(data[cat][type])) {
          count += data[cat][type].length;
        }
      }
    }
    return count;
  } catch (e) {
    return 0;
  }
}

function closeModal2() {
  document.getElementById('entriesModal').style.display = 'none';
  document.getElementById('entriesModal').setAttribute('aria-hidden', 'true');
  passwordOK = false;
}

// Bulk import
function doBulkImport() {
  const file = document.getElementById('bulkExcelFile').files[0];
  if (!file) {
    alert('❌ Please select an Excel file');
    return;
  }

  const status = document.getElementById('bulkImportStatus');
  status.style.display = 'block';
  status.innerHTML = '<p style="background:#fff3cd; padding:12px; border-radius:8px; color:#856404;">🔄 Processing file...</p>';

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const wb = XLSX.read(e.target.result, { type: 'binary' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });

      if (rows.length === 0) {
        throw new Error('No data found in Excel file');
      }

      let allData = {};
      try {
        const stored = localStorage.getItem('businessData');
        if (stored) allData = JSON.parse(stored);
      } catch (err) {
        allData = {};
      }

      let imported = 0;
      let errors = 0;

      rows.forEach((row, idx) => {
        try {
          const rawCategory = (row['Category'] || row['category'] || 'uncategorized').toString().trim();
          const rawType = (row['Type'] || row['type'] || 'general').toString().trim();

          const category = rawCategory.toLowerCase();
          const type = rawType;

          const entry = {
            firmName: (row['Firm Name'] || row['Firm name'] || row['firm name'] || 'N/A').toString().trim(),
            ownerName: (row['Owner Name'] || row['Owner name'] || row['owner name'] || 'N/A').toString().trim(),
            ownerMobile: (row['Mobile'] || row['mobile'] || row['Phone'] || row['phone'] || '').toString().trim(),
            businessAddress: (row['Address'] || row['address'] || 'N/A').toString().trim(),
            gstNumber: (row['GST'] || row['gst'] || 'N/A').toString().trim(),
            pannumber: (row['PAN'] || row['pan'] || 'N/A').toString().trim(),
            industryType: (row['Products'] || row['products'] || row['Product'] || row['product'] || 'N/A').toString().trim(),
            email: (row['Email'] || row['email'] || 'N/A').toString().trim(),
            birthDate: (row['DOB'] || row['dob'] || row['Birth Date'] || '').toString().trim(),
            anniversaryDate: (row['Anniversary'] || row['anniversary'] || '').toString().trim(),
            mode: 'Bulk'
          };

          if (!allData[category]) allData[category] = {};
          if (!allData[category][type]) allData[category][type] = [];
          allData[category][type].push(entry);
          imported++;
        } catch (err) {
          errors++;
        }
      });

      try {
        localStorage.setItem('businessData', JSON.stringify(allData));
      } catch (err) {
        throw new Error('Storage error: ' + err.message);
      }

      status.innerHTML = '<p style="background:#d4edda; padding:12px; border-radius:8px; color:#155724;"><strong>✅ Success!</strong> Imported ' + imported + ' entries. Errors: ' + errors + '</p>';
      document.getElementById('bulkExcelFile').value = '';
      updateDataCountDisplay();
      alert('✅ Successfully imported ' + imported + ' entries!');

    } catch (err) {
      status.innerHTML = '<p style="background:#f8d7da; padding:12px; border-radius:8px; color:#721c24;"><strong>❌ Error:</strong> ' + err.message + '</p>';
    }
  };

  reader.readAsBinaryString(file);
}
</script>
