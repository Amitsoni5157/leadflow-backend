// <script src="https://leadflow-backend-rlgu.onrender.com/leadflow.js"data-agent="69bf94730a694639e1e2d6d3"></script>
(function () {

  // 🔥 GET AGENT ID FROM SCRIPT TAG
  const scriptTag = document.currentScript;
  const agentId = scriptTag.getAttribute("data-agent");

  function createLeadForm() {
    const box = document.createElement("div");

    box.innerHTML = `
      <div style="
        position:fixed;
        bottom:20px;
        right:20px;
        background:#fff;
        padding:15px;
        border-radius:10px;
        box-shadow:0 0 10px rgba(0,0,0,0.2);
        z-index:9999;
        width:220px;
        font-family:Arial;
      ">
        <h4 style="margin:0 0 10px;">Enquiry</h4>
        <input id="lf-name" placeholder="Name" style="width:100%;margin-bottom:6px;" />
        <input id="lf-phone" placeholder="Phone" style="width:100%;margin-bottom:6px;" />
        <input id="lf-property" placeholder="Property" style="width:100%;margin-bottom:8px;" />
        <button id="lf-submit" style="width:100%;">Submit</button>
      </div>
    `;

    document.body.appendChild(box);

    document.getElementById("lf-submit").addEventListener("click", submitLead);
  }

  async function submitLead() {
    const data = {
      name: document.getElementById("lf-name").value,
      phone: document.getElementById("lf-phone").value,
      property: document.getElementById("lf-property").value,

      // 🔥 SEND AGENT ID
      agentId: agentId
    };

    try {
      await fetch("https://leadflow-backend-rlgu.onrender.com/api/leads/public-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      alert("Submitted ✅");

    } catch (err) {
      alert("Error ❌");
    }
  }

  window.addEventListener("load", createLeadForm);

})();