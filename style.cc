/* Full CSS extracted from your original single-file app.
   Save this file as styles.css and ensure index.html links to it.
*/
<style>
.mode-btn {
  background: linear-gradient(45deg, #95a5a6, #7f8c8d);
  color: white;
  border: none;
  border-radius: 18px;
  padding: 6px 14px;
  font-size: 14px;
  margin-left: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}
.mode-btn:hover { transform: translateY(-2px); }
.mode-btn.active {
  background: linear-gradient(45deg, #1abc9c, #16a085);
  box-shadow: 0 6px 16px rgba(26,188,156,0.4);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Roboto', sans-serif;
  color: #333;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

nav {
  position: sticky;
  top: 0;
  background: rgba(44, 62, 80, 0.95);
  backdrop-filter: blur(8px);
  color: white;
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0,0,0,0.25);
}
.logo { font-size: 1.5rem; font-weight: 700; color: #1abc9c; }
.nav-links { display: flex; gap: 14px; align-items: center; }
.nav-links a {
  color: white; text-decoration: none; padding: 8px 12px; border-radius: 20px; font-weight: 500;
  transition: all .25s ease;
}
.nav-links a:hover { transform: translateY(-2px); opacity: .95; }
nav a[href="#products"] {
  background: linear-gradient(45deg, #1abc9c, #a3edde);
  color: white;
  border-radius: 25px;
  padding: 8px 18px;
  box-shadow: 0 4px 10px rgba(26, 188, 156, 0.28);
}

.hero {
  text-align: center;
  padding: 90px 20px;
  color: white;
  background: linear-gradient(120deg,#1abc9c,#16a085);
  box-shadow: inset 0 -30px 60px rgba(0,0,0,0.05);
}
.hero h1 { font-size: 2.8rem; margin-bottom: 10px; }

section { padding: 70px 18px; }

#about {
  background: rgba(255, 108, 108, 0.06);
  color: #ffffff;
  text-align: center;
}
#about .profile-box {
  background: rgba(255,255,255,0.08);
  padding: 28px;
  max-width: 980px;
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.18);
  color: #edf6f5;
}
.profile-info {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(220px,1fr));
  gap: 18px;
  margin-bottom: 18px;
}
.info-card {
  background: rgba(255,255,255,0.06);
  padding: 14px;
  border-radius: 10px;
  border-left: 4px solid #1abc9c;
}
.info-card h3 { font-size: 1rem; color: #e6f7f1; margin-bottom: 6px; }
.info-card p { color: #e9f6f2; font-size: .95rem; }

.btn {
  display: inline-block; margin-top: 18px; padding: 12px 22px;
  background: linear-gradient(45deg,#27ae60,#2ecc71);
  color: #fff; border-radius: 24px; text-decoration: none; font-weight: 600;
  box-shadow: 0 6px 18px rgba(39,174,96,0.25);
  transition: transform .2s ease;
  border: none;
  cursor: pointer;
}
.btn:hover { transform: translateY(-3px); }

#products {
  background: rgba(255,255,255,0.92);
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  padding-bottom: 80px;
}
#products .section-heading {
  text-align: center; color: #2c3e50; margin-bottom: 18px;
  font-size: 1.8rem;
}

.top-buttons-bar {
  max-width: 900px;
  margin: 0 auto 30px;
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.export-btn, .view-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 24px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 14px rgba(0,0,0,0.15);
}

.export-btn {
  background: linear-gradient(45deg, #e67e22, #d35400);
  color: white;
}
.export-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(230, 126, 34, 0.4);
}
.export-btn:disabled {
  background: #95a5a6;
  cursor: not-allowed;
  transform: none;
}

.view-btn {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
}
.view-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(52, 152, 219, 0.4);
}

.form-wrapper {
  max-width: 780px; margin: 0 auto; display: grid; gap: 18px;
}

.form-card {
  background: #fff; padding: 22px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.06);
}

form .field-label { display:block; margin-bottom:8px; font-weight:600; color:#2c3e50; }
form select, form input[type="text"], form input[type="email"], form input[type="tel"], form input[type="date"], form input[type="file"] {
  width:100%; padding:10px 12px; border:1px solid #d6dbe0; border-radius:8px; font-size:15px;
}
.row { display:flex; gap:12px; }
@media (max-width:760px) { .row { flex-direction: column; } }

.action-btn {
  margin-top: 16px; padding:12px; border-radius:10px; border:none;
  background: linear-gradient(45deg,#1abc9c,#16a085); color:white; cursor:pointer; font-weight:600;
  width:100%; font-size:15px; transition: all 0.3s ease;
}
.action-btn:hover { opacity: 0.9; transform: translateY(-2px); }
.action-btn.small { width:auto; padding:8px 14px; display:inline-block; margin: 6px 6px 6px 0; }

#summary, #output {
  margin-top:12px; background:#f8f9fa; padding:12px; border-radius:8px; border:1px solid #e6e9ec; color:#333;
  word-break:break-word;
}

#contact { text-align:center; color: #fff; background: linear-gradient(120deg,#2c3e50,#1abc9c); padding:50px 18px; }
#contact p { margin-top:12px; }

#myModal {
  display: none; position: fixed; z-index: 5000; left:0; top:0; width:100%; height:100%;
  background-color: rgba(0,0,0,0.6); align-items:center; justify-content:center; padding:20px;
}
.modal-content {
  background:#fff; padding:22px; border-radius:14px; width:640px; max-width:100%; box-shadow:0 20px 60px rgba(0,0,0,0.25); position:relative;
}
.close-btn { position:absolute; right:12px; top:8px; font-size:26px; cursor:pointer; color:#999; }
.modal-tabs { display:flex; gap:6px; border-bottom:1px solid #eef2f3; margin-bottom:12px; padding-bottom:8px; }
.tab-btn { background:none; border:none; padding:10px 14px; cursor:pointer; font-weight:600; color:#6b7175; border-bottom:3px solid transparent; }
.tab-btn.active { color:#1abc9c; border-bottom-color:#1abc9c; }

.tab-content { display:none; animation:fadeIn .22s ease; }
.tab-content.active { display:block; }
@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }

footer { padding:16px; text-align:center; background:rgba(0,0,0,0.12); color:#fff; margin-top:12px; }

.entry-card {
  background: #f9f9f9;
  padding: 14px 18px;
  margin: 10px 0;
  border-left: 4px solid #1abc9c;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.entry-card:hover {
  background: #f0fefc;
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.12);
}

#entriesModal {
  display: none; position: fixed; z-index: 6000; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0,0,0,0.6); justify-content: center; align-items: center; overflow-y: auto;
}
.entries-modal-content {
  background: white; padding: 24px; border-radius: 12px; max-height: 90%; overflow-y: auto;
  width: 90%; max-width: 800px; position: relative;
}

.filter-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.filter-btn.retail {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
}

.filter-btn.project {
  background: linear-gradient(45deg, #e67e22, #d35400);
  color: white;
}

.filter-btn.all {
  background: linear-gradient(45deg, #1abc9c, #16a085);
  color: white;
}

.filter-btn.delete-all {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
}

.filter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.15);
}

.bulk-import-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.2);
  margin-bottom: 30px;
}
.bulk-import-inner {
  background: rgba(255,255,255,0.95);
  padding: 25px;
  border-radius: 12px;
  color: #2c3e50;
}

.data-count-display {
  text-align: center;
  margin: 15px 0;
  padding: 15px;
  background: #ecf0f1;
  border-radius: 8px;
  font-weight: bold;
  color: #2c3e50;
  font-size: 16px;
}

.delete-entry-btn {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 10px;
  font-size: 14px;
}
.delete-entry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(231, 76, 60, 0.4);
}
</style>
