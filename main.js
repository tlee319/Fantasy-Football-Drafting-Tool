// Got top 200 players from each year
// If a player hasn't made top 200 in the past two years, then they are eliminated

dataByPlayers = {};
playerNameList = [];
qbPlayerNames = [];
rbPlayerNames = [];
wrPlayerNames = [];

for (var y = 2012; y < 2017; y++) {
    processDataByYear("Data/" + y + "ReadyData.csv", y);
}

d3.csv("Data/2012ReadyData.csv", function (error2012, data2012) {
    d3.csv("Data/2013ReadyData.csv", function (error2013, data2013) {
        d3.csv("Data/2014ReadyData.csv", function (error2014, data2014) {
            d3.csv("Data/2015ReadyData.csv", function (error2015, data2015) {
                d3.csv("Data/2016ReadyData.csv", function (error2016, data2016) {
//======================================================================================================================
                    eliminateIrrelevantPlayers();
                    console.log(dataByPlayers);
                    partitionByPosition();
                    console.log("QBs: " + qbPlayerNames);
                    console.log("RBs: " + rbPlayerNames);
                    console.log("WRs: " + wrPlayerNames);




//======================================================================================================================
                });
            });
        });
    });
});