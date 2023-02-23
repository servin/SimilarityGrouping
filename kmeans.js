const csv = require('csv-parser');
const fs = require('fs');
const kmeans = require('ml-kmeans');

const csvFilePath = 'mycsvfile.csv';
const numClusters = 5;

// Read in the CSV file and extract the values from the second column
const data = [];
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    data.push(parseFloat(row[1]));
  })
  .on('end', () => {
    // Use k-means clustering to group the data into numClusters clusters
    const clusters = kmeans(data, numClusters);

    // Output the results
    console.log(`Data points: ${data.length}`);
    for (let i = 0; i < numClusters; i++) {
      const clusterData = data.filter((value, index) => clusters[index] === i);
      console.log(`Cluster ${i + 1} (${clusterData.length} records): ${clusterData}`);
    }
  });
