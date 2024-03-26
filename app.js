$(document).ready(function () {
  // Load organization data from JSON
  $.getJSON('data.json', function (data) {
    // Create a DataSet from the JSON data
    const nodes = new vis.DataSet();
    const edges = new vis.DataSet();

    // Add nodes and edges to the DataSet
    data.forEach(function (employee) {
      nodes.add({
        id: employee.id,
        label: employee.firstName + ' ' + employee.lastName,
        title: employee.designation,
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
