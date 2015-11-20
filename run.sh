python generate-records.py $1
tr -d '\n\r\t\f[:blank:]' < data-file.json > data/data-file-min.json
rm -f data-file.json
