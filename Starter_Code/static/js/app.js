// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log(data)

    // Get the names field
let names = data.names
//console.log(names)

    // Use d3 to select the dropdown with id of `#selDataset`
let dropdown = d3.select("#selDataset")
for (const name of names) {
  dropdown.append("option").text(name)
  
}
// Use the list of sample names to populate the select options
// Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    

    // Get the first sample from the list
    
    let first_name = names[0]

    // Build charts and metadata panel with the first sample
optionChanged(first_name)
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample)
  buildCharts(newSample)
}
// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    
    // get the metadata field
    let metadata = data.metadata
    
    // Filter the metadata for the object with the desired sample number
    let selected_metadata =metadata.find((metaobj) => metaobj.id == sample)
    // console.log("Metadata: ",selected_metadata)

    // Use d3 to select the panel with id of `#sample-metadata`
    let demo = d3.select(`#sample-metadata`)
    demo.html("")
    for (const key in selected_metadata) {
    
        const value = selected_metadata[key];
        // console.log(`${key}: ${value}`)
        demo.append("div").text(`${key}: ${value}`)
    }

    // Use `.html("") to clear any existing metadata
    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Get the samples field
    let charts = data.samples
    
    // Filter the samples for the object with the desired sample number
    let selected_chart = charts.find((chartobj) => chartobj.id == sample)
    console.log("Charts: ",selected_chart)

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids =selected_chart.otu_ids
    let otu_labels =selected_chart.otu_labels
    let sample_values =selected_chart.sample_values
    // Build a Bubble Chart
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values
      }
    };
    
    var bubble_Data = [trace1];
    
    var bubble_layout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: {
        title: 'OTU ID'
      },
      yaxis: {
        title: 'Number of Bacteria'
      },
    
      showlegend: false,
    };
    
    
    
    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubble_Data, bubble_layout);


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    var data = [{
      type: 'bar',
      x: sample_values.slice(0,10).reverse(),
      y: otu_ids.slice(0,10).map(id=>`OTU ${id}`).reverse(),
      text: otu_labels.slice(0,10).reverse(),
      orientation: 'h'
    }];

    var layout = {
      title: 'Top 10 Bacteria Cultures',
      xaxis: {
        title: 'Number of Bacteria'
      }
      };
    
    
    Plotly.newPlot('bar', data, layout);

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    // Render the Bar Chart

  });
}


// Initialize the dashboard
init();
