$(document).ready(function () {
  // Load organization data from JSON
  $.getJSON('data.json', function (data) {
    // Create a DataSet from the JSON data
    const nodes = new vis.DataSet();
    const edges = new vis.DataSet();

    // Add nodes and edges to the DataSet
    data.forEach(function (employee) {
      const title = `<div class="node-label">
       <div class="node-name">${employee.firstName} ${employee.lastName}</div>
        <div class="node-details">${employee.designation}</div>
        <div class="node-details">Email: ${employee.email}</div>
        <div class="node-details">Tel: ${employee.contactNumber}</div>
        <div class="node-details">Address: ${employee.address}</div>
        </div>`;
      nodes.add({
        id: employee.id,
        label: employee.firstName + ' ' + employee.lastName + '(' + employee.designation + ')', 
        title: title,
        image: employee.imageUrl
      });

      if (employee.managerId !== undefined) {
        edges.add({
          from: employee.managerId,
          to: employee.id
        });
      }
    });

    // Create a network container
    const container = document.getElementById('mynetwork');

    // Define options for the network
    const options = {
      nodes: {
        shape: 'circularImage',
        borderWidth: 3
      },
      edges: {
        arrows: 'to',
        smooth: {
          type: 'cubicBezier',
          forceDirection: 'horizontal',
          roundness: 0.4
        }
      },
      layout: {
        hierarchical: {
          direction: 'UD', // Up-Down direction
          sortMethod: 'directed'
        }
      }
    };
    // Create a network
    const network = new vis.Network(container, {nodes: nodes, edges: edges}, options);
  });
});

  // Load CSS file dynamically
  const cssLink = document.createElement("link");
  cssLink.href = "main.css"; // Adjust the path to your CSS file
  cssLink.rel = "stylesheet";
  cssLink.type = "text/css";
  document.head.appendChild(cssLink);
