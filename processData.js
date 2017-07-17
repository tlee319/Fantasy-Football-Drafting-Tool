/**
 * Created by ThomasLee on 7/8/17.
 */

function eliminateIrrelevantPlayers() {
    // Get rid of players who haven't played in the past 2 years
    // TODO: Iterate through the dictionary and do the said above
    var x = 0;
    playerNameList = Object.keys(dataByPlayers);
    playerNameList.forEach(function(name) {
        if (dataByPlayers[name][2016] == undefined && dataByPlayers[name][2015] == undefined) {
            delete dataByPlayers[name];
        }
    });

    // Update the name list
    playerNameList = Object.keys(dataByPlayers);
}

function processDataByYear(file, year) {
    d3.csv(file, function (error, data) {
        // Fix the name Job 1
        data.forEach(function (d) {
            var nameParts = d["Name"].split(["\\"]);
            d["Name"] =  nameParts[0];
        });

        // Fix the name Job 2
        data.forEach(function (d) {
            var nameParts = d["Name"].split(["*"]);
            d["Name"] =  nameParts[0];
        });

        // Connect each document(Object) to a player name
        data.forEach(function (d) {
            if (dataByPlayers[d["Name"]] != undefined) {
                dataByPlayers[d["Name"]][year] = d;
            } else {
                dataByPlayers[d["Name"]] = {};
                dataByPlayers[d["Name"]][year] = d;
            }
        });
    });
}

function partitionByPosition () {
    playerNameList.forEach(function(name) {
        if (dataByPlayers[name][2015] != undefined) {
            if (dataByPlayers[name][2015]["Pos"] == "QB") {
                qbPlayerNames.push(name);
            } else if (dataByPlayers[name][2015]["Pos"] == "RB") {
                rbPlayerNames.push(name);
            } else if (dataByPlayers[name][2015]["Pos"] == "WR") {
                wrPlayerNames.push(name);
            }
        } else if (dataByPlayers[name[2016] != undefined]) {
            if (dataByPlayers[name][2016]["Pos"] == "QB") {
                qbPlayerNames.push(name);
            } else if (dataByPlayers[name][2016]["Pos"] == "RB") {
                rbPlayerNames.push(name);
            } else if (dataByPlayers[name][2016]["Pos"] == "WR") {
                wrPlayerNames.push(name);
            }
        }
    })
}

function findMean(position) {
    if (position == "QB") {
        var sum = 0;
        var num = 0;
        qbPlayerNames.forEach(function (player) {
           yearList = Object.keys(dataByPlayers[player]);
           yearList.forEach(function (year) {
               sum += parseInt(dataByPlayers[player][year]["Fant Pt"]);
               num += 1;
           });
        });
        qbMean = sum / num;
    } else if (position == "RB") {
        var sum = 0;
        var num = 0;
        rbPlayerNames.forEach(function (player) {
            yearList = Object.keys(dataByPlayers[player]);
            yearList.forEach(function (year) {
                sum += parseInt(dataByPlayers[player][year]["Fant Pt"]);
                num += 1;
            });
        });
        rbMean = sum / num;
    } else if (position == "WR") {
        var sum = 0;
        var num = 0;
        wrPlayerNames.forEach(function (player) {
            yearList = Object.keys(dataByPlayers[player]);
            yearList.forEach(function (year) {
                sum += parseInt(dataByPlayers[player][year]["Fant Pt"]);
                num += 1;
            });
        });
        wrMean = sum / num;
    }
}