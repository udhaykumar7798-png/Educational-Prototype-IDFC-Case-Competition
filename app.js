// UI role toggling
function switchRole(role) {
  ['consumer-view','officer-view','connector-view'].forEach(
    id => document.getElementById(id).className = 'hidden'
  );
  document.getElementById(`${role}-view`).className = 'active';
}

// Consumer: Ballpark valuation and rate based on instant inputs
function triggerValuation() {
  const mobile = document.getElementById("input-mobile").value;
  const name = document.getElementById("input-name").value;
  const address = document.getElementById("input-address").value;
  const circle = parseFloat(document.getElementById("input-circle").value);
  const registry = document.getElementById("input-registry").value;
  const consent = document.getElementById("input-consent").checked;
  const type = document.getElementById("input-type").value;

  if (!mobile || !name || !address || !circle || !registry || !consent) {
    showModal('Please fill all required fields & tick consent.', false);
    return;
  }

  // Simulate AVM logic and instant valuation
  let baseVal = circle * (type === 'Apartment' ? 950 : type === 'Plot' ? 850 : 730);
  let confidence = registry.length > 10 ? 'high' : 'low';
  let valuationResult = `${name}, instant ballpark value for your ${type} is ₹${baseVal.toLocaleString()} (${confidence} confidence)`;

  // Interest rate logic based on dummy credit/cashflow data and permission
  let cashflow = 200000 + Math.round(Math.random()*150000); // simulate UPI flows
  let score = Math.min(850, 500 + cashflow/1000 + (confidence==='high'?50:0));
  let interestRate = score > 700 ? 7.5 : score > 600 ? 8.5 : 11.5;

  // Display valuation, rate, and (if needed) rejection-to-retention funnel
  document.getElementById("valuation-result").innerHTML = `<span class="success">${valuationResult}</span>`;
  document.getElementById("rate-result").innerHTML = `Cashflow detected: ₹${cashflow}. AI credit score: ${score}. Offered loan at <b>${interestRate}%</b>`;
  if (score < 600) showRejectionFunnel(name);
  else showModal('Congratulations! You can proceed to upload full documents or request loan officer callback.', true);
}

// Rejection funnel for relationship building and alternate product suggestions
function showRejectionFunnel(name) {
  document.getElementById("rejection-flow").innerHTML = `
    <div class="rejection">Not eligible for instant loan. Reason: Thin-file, low credit score.</div>
    <div>Hi ${name}, consider enrolling in IDFC Credit Builder or opening a savings account. Our relationship team will connect you soon.</div>
    <button onclick="showModal('Retention in progress: Relationship manager will contact.',true)">Connect Now</button>
  `;
}

// Modal for transient messages
function showModal(msg, success) {
  let modal = document.getElementById('modal');
  modal.innerHTML = `<div class="${success?'success':'rejection'}">${msg}</div>
    <button onclick="document.getElementById('modal').className='modal hidden'">Close</button>`;
  modal.className = 'modal';
}

// Officer dashboard: dummy data for applications and metrics
let officerApps = [
  ["Rahul", "Apartment", "12000", "REG2098-XYZ", "Yes", "Approved", "Green"],
  ["Sunita", "Land", "6800", "REG8923-ZZZ", "Yes", "Pending", "Yellow"],
  ["Priya", "Plot", "7700", "REG9821-ABC", "No", "Rejected", "Red"]
];
function loadOfficerDash() {
  document.getElementById("app-count").innerText = officerApps.length;
  document.getElementById("tat-avg").innerText = "2.5";
  document.getElementById("gnpa-score").innerText = "-25bp";
  document.getElementById("ntb-count").innerText = "1";
  let table = document.getElementById("app-table").getElementsByTagName("tbody")[0];
  table.innerHTML = officerApps.map(app => `<tr>` + app.map(cell => `<td>${cell}</td>`).join("") + `</tr>`).join("");
}
document.getElementById("officer-view").onshow = loadOfficerDash;

// Connector data submission mock
function submitConnectorData() {
  showModal('Geo-tagged data and photo uploaded. Field verification complete!', true);
}

// Auto-load officer dashboard on role change
document.querySelector('nav').addEventListener('click', e => {
  if (e.target.textContent === "Loan Officer") setTimeout(loadOfficerDash, 150);
});
