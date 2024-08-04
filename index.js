const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'whoseno.cjqs2djyup3u.us-east-1.rds.amazonaws.com',
  user: 'whoseno_username',
  password: 'vyfT*YU(ihjguf7t8uyIHJGt87uyijh)',
  database: 'test-app'
});

function createInsertQuery(rows) {
  const tableName = 'entity_info';
  const columns = Object.keys(rows[0]).join(', ');
  const values = rows.map(row => {
    const rowValues = Object.values(row).map(value =>
      value === null || value === '' ? 'NULL' : mysql.escape(value.replace('+00', ''))
    ).join(', ');
    return `(${rowValues})`;
  }).join(', ');

  return `INSERT INTO ${tableName} (${columns}) VALUES ${values};`;
}

function processCSV(filePath) {
  const rows = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      rows.push(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      const query = createInsertQuery(rows.slice(75000, 100000));
      console.log(rows.length, query.length);
      connection.query(query, (error, results) => {
        if (error) throw error;
        console.log('Inserted Rows:', results.affectedRows);
      });
      connection.end();
    });
}

// Call the function with the path to your CSV file
processCSV('data.csv');
