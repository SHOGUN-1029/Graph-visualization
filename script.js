function generateGraph() {
    var inputData = document.getElementById("inputData").value;
    var lines = inputData.split('\n');
    
    // Determine graph type from selected radio button
    var graphType = document.querySelector('input[name="graphType"]:checked').value;
    var graphString = graphType === 'directed' ? 'digraph {' : 'graph {';

    for (var i = 0; i < lines.length; i++) {
        var tokens = lines[i].trim().split(/\s+/);
        if (tokens.length >= 2) {
            graphString += tokens[0] + (graphType === 'directed' ? ' -> ' : ' -- ') + tokens[1];
            if (tokens.length >= 3) {
                graphString += ' [label="' + tokens[2] + '"]';
            }
            graphString += ';';
        }
    }
    graphString += '}';

    const viz = new Viz();
    viz.renderSVGElement(graphString)
        .then(function(element) {
            var graphContainer = document.getElementById("graphContainer");
            graphContainer.innerHTML = ''; // Clear previous content
            graphContainer.appendChild(element);
        })
        .catch(error => {
            console.error(error);
        });
}
