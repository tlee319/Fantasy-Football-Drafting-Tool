// Got top 200 players from each year
// If a player hasn't made top 200 in the past two years, then they are eliminated

dataByPlayers = {};
playerNameList = [];
qbPlayerNames = [];
rbPlayerNames = [];
wrPlayerNames = [];

qbMeanWeekly = 0;
rbMeanWeekly = 0;
wrMeanWeekly = 0;
qbMeanWeeklyPPR = 0;
rbMeanWeeklyPPR = 0;
wrMeanWeeklyPPR = 0;

qbSDWeekly = 0;
qbSDWeeklyPPR = 0;
rbSDWeekly = 0;
rbSDWeeklyPPR = 0;
wrSDWeekly = 0;
wrSDWeeklyPPR = 0;

processData("Data/QBDataSetFinal.csv", "QB");
processData("Data/WRDataSetFinal.csv", "WR");
processData("Data/RBDataSetFinal.csv", "RB");


d3.csv("Data/QBDataSetFinal.csv", function (errorQB, dataQB) {
    d3.csv("Data/WRDataSetFinal.csv", function (errorWR, dataWR) {
        d3.csv("Data/RBDataSetFinal.csv", function (errorRB, dataRB) {
//======================================================================================================================
            partitionByPosition();
            calcualteFantasyPoints("QB", "nonePPR");
            calcualteFantasyPoints("WR", "nonePPR");
            calcualteFantasyPoints("RB", "nonePPR");

            calcualteFantasyPoints("QB", "PPR");
            calcualteFantasyPoints("WR", "PPR");
            calcualteFantasyPoints("RB", "PPR");

            findMeanWeekly("QB");
            findMeanWeekly("RB");
            findMeanWeekly("WR");

            calculateSD("QB");
            calculateSD("WR");
            calculateSD("RB");

            calculateZ("QB");
            calculateZ("WR");
            calculateZ("RB");

            calculatePercentile("QB");
            calculatePercentile("WR");
            calculatePercentile("RB");

            console.log(dataByPlayers);
            console.log("QBmean: " + qbMeanWeekly + " RBmean: " + rbMeanWeekly + " WRmean: " + wrMeanWeekly);
            console.log("QBmean: " + qbMeanWeeklyPPR + " RBmean: " + rbMeanWeeklyPPR + " WRmean: " + wrMeanWeeklyPPR);
            console.log("QBsd: " + qbSDWeekly + " RBsd: " + rbSDWeekly + " WRsd: " + wrSDWeekly);
            console.log("QBsd: " + qbSDWeeklyPPR + " RBsd: " + rbSDWeeklyPPR + " WRsd: " + wrSDWeeklyPPR);
//======================================================================================================================
        });
    });
});