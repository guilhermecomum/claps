export default function gs2json(data) {
  var columns = [];
  var rows = {};

  for (var i = 0; i < data.feed.entry.length; i++) {
    var entry = data.feed.entry[i];
    var value = entry.content.$t;
    var row = entry["gs$cell"]["row"];
    var col = entry["gs$cell"]["col"];
    var key = columns[col - 1];
    var newRow = {};
    if (entry["gs$cell"]["row"] === "1") {
      columns.push(value);
    } else {
      rows[row] = { ...rows[row], [key]: value };
    }
  }
  return Object.values(rows);
}
