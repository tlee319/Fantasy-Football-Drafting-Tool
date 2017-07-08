/**
 * Created by ThomasLee on 7/8/17.
 */

dataByPlayers = {};

d3.csv("Data/2012ReadyData.csv", function (error, data) {
    year = 2012;
    // Fix the name Job 1
    data.forEach(function (d) {
        nameParts = d["Name"].split(["\\"]);
        d["Name"] =  nameParts[0];
    });

    // Fix the name Job 2
    data.forEach(function (d) {
        nameParts = d["Name"].split(["*"]);
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

d3.csv("Data/2013ReadyData.csv", function (error, data) {
    year = 2013;
    // Fix the name Job 1
    data.forEach(function (d) {
        nameParts = d["Name"].split(["\\"]);
        d["Name"] =  nameParts[0];
    });

    // Fix the name Job 2
    data.forEach(function (d) {
        nameParts = d["Name"].split(["*"]);
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

d3.csv("Data/2014ReadyData.csv", function (error, data) {
    year = 2014;
    // Fix the name Job 1
    data.forEach(function (d) {
        nameParts = d["Name"].split(["\\"]);
        d["Name"] =  nameParts[0];
    });

    // Fix the name Job 2
    data.forEach(function (d) {
        nameParts = d["Name"].split(["*"]);
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

d3.csv("Data/2015ReadyData.csv", function (error, data) {
    year = 2015;
    // Fix the name Job 1
    data.forEach(function (d) {
        nameParts = d["Name"].split(["\\"]);
        d["Name"] =  nameParts[0];
    });

    // Fix the name Job 2
    data.forEach(function (d) {
        nameParts = d["Name"].split(["*"]);
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

d3.csv("Data/2016ReadyData.csv", function (error, data) {
    year = 2016;
    // Fix the name Job 1
    data.forEach(function (d) {
        nameParts = d["Name"].split(["\\"]);
        d["Name"] =  nameParts[0];
    });

    // Fix the name Job 2
    data.forEach(function (d) {
        nameParts = d["Name"].split(["*"]);
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

// Get rid of players who haven't played in the past 2 years
// TODO: Iterate through the dictionary and do the said above

console.log(dataByPlayers);