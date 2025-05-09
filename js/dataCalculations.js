export const dataCalculations = {
    createHistogramData: function (categoryName, categories, data, validator) {
        const histogramData = [],
            dataIndex = categories.indexOf(categoryName) - 1;
            if(!data || !data[0]) {
            return;
            }
            if (categoryName==="Zrobione drogi" && !Array.isArray(data[0][dataIndex])) {
                data.forEach(function(arrayPoint) {
                    (arrayPoint[dataIndex].split(',').map(p=>Math.round(p))).forEach(function(point){
                    let isNew = true;
                    histogramData.forEach(function(histogramPoint) {
                        if(histogramPoint[0] === point) {
                        isNew = false;
                        histogramPoint[1]++;
                        }
                    });

                    if(isNew && validator(point)) {
                        histogramData.push([point, 1]);
                    }

                    });
                });
            } else
            if(!Array.isArray(data[0][dataIndex])) {
            data.forEach(function(point) {
                let isNew = true;
                histogramData.forEach(function(histogramPoint) {
                    if(histogramPoint[0] === point[dataIndex]) {
                    isNew = false;
                    histogramPoint[1]++;
                    }
                });
                if(isNew && validator(point[dataIndex])) {
                    histogramData.push([point[dataIndex], 1]);
                }
                });
            } else {
            data.forEach(function(arrayPoint) {
                arrayPoint[dataIndex].forEach(function(point){
                let isNew = true;
                histogramData.forEach(function(histogramPoint) {
                    if(histogramPoint[0] === point) {
                    isNew = false;
                    histogramPoint[1]++;
                    }
                });

                if(isNew && validator(point)) {
                    histogramData.push([point, 1]);
                }

                });
            });
            }
        return histogramData;
    },
    filterData: function (categoryName, categories, data, filterValue) {
        const filteredData = [],
        dataIndex = categories.indexOf(categoryName) - 1;
        data.forEach(function(point) {
            if (point[dataIndex] === filterValue) {
                filteredData.push(point);
            }
        });
        return filteredData;
    },
    yearValidator: function(point) {
        return point && point > 1900 && point < new Date().getFullYear();
    },
    genderValidator: function(point) {
        return point && point === "M" || point === "K";
    },
    roadsValidator: function(point) {
        return point;
    },
    findPerson: function(name, data) {
        let person;
        data.forEach(function(point){
            if (point.name.includes(name)) {
                person = point;
            }
        });
        return person;
    },
    reduceData: function(data) {
        return data.reduce((a,b) => {return a+b[1]}, 0);
    },
    processData: function(csv) {
        const data = [], categories = [];

        // Split the lines
        var lines = csv.split('\n');
        lines.forEach(function(line, lineNo) {
            var items = line.replace(/&nbsp;/g, " ").split(';');
            // header line contains categories
            if (lineNo == 0) {
                items.forEach(function(item, itemNo) {
                    if (itemNo >= 0) categories.push(item);
                });
            }
            // the rest of the lines contain data with their name in the first position
            else {
                var series = {
                    data: []
                };
                let dataItem = [];
                items.forEach(function(item, itemNo) {
                    if (itemNo == 0) {
                        name = item;
                    }  else if (itemNo === 2 || itemNo === 5 || itemNo === 12) {
                      dataItem.push(item ? parseFloat(item) : null);
                    }  else if (itemNo === 10 || itemNo === 9) {
                      const boulderNumbers = item.split(',').map(function(el){
                        return el ? parseFloat(el) : null;
                      });
                      dataItem.push(boulderNumbers);
                    }  else {
                      dataItem.push(item)
                    }
                });

                dataItem.name = name;
                data.push(dataItem);

            }
        });
        return [categories, data];
    }
};