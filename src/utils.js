export default function gs2json(data) {
  var columns = [];
  var rows = {};

  for (var i = 0; i < data.feed.entry.length; i++) {
    var entry = data.feed.entry[i];
    var value = entry.content.$t;
    var row = entry['gs$cell']['row'];
    var col = entry['gs$cell']['col'];
    var newRow = {};
    if (entry['gs$cell']['row'] === '1') {
      columns.push(value);
    } else {
      var key = columns[col - 1].toLowerCase();
      rows[row] = { ...rows[row], [key]: value };
    }
  }
  return Object.values(rows);
}

export function isLatitude(lat) {
  return isFinite(lat) && Math.abs(lat) <= 90;
}

export function isLongitude(lng) {
  return isFinite(lng) && Math.abs(lng) <= 180;
}
