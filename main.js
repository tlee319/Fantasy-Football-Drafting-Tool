var dataByPlayers = {};
var playerNameList = [];
var qbPlayerNames = [];
var rbPlayerNames = [];
var wrPlayerNames = [];

var numOfGamesPlayedByPlayers = {};

var qbMeanWeekly = 0;
var rbMeanWeekly = 0;
var wrMeanWeekly = 0;
var qbMeanWeeklyPPR = 0;
var rbMeanWeeklyPPR = 0;
var wrMeanWeeklyPPR = 0;

var qbSDWeekly = 0;
var qbSDWeeklyPPR = 0;
var rbSDWeekly = 0;
var rbSDWeeklyPPR = 0;
var wrSDWeekly = 0;
var wrSDWeeklyPPR = 0;

var playerInfo = {};

var qbVarianceMean = 0;
var wrVarianceMean = 0;
var rbVarianceMean = 0;
var qbVarianceMeanPPR = 0;
var wrVarianceMeanPPR = 0;
var rbVarianceMeanPPR = 0;

var qbConsistencySD = 0;
var wrConsistencySD = 0;
var rbConsistencySD = 0;

var playerInfoList = [];

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

            eliminateIrrelevantPlayers();

            findMeanWeekly("QB");
            findMeanWeekly("RB");
            findMeanWeekly("WR");

            calculatePerformanceSD("QB");
            calculatePerformanceSD("WR");
            calculatePerformanceSD("RB");

            calculatePerformanceZ("QB");
            calculatePerformanceZ("WR");
            calculatePerformanceZ("RB");

            calculatePerformancePercentile("QB");
            calculatePerformancePercentile("WR");
            calculatePerformancePercentile("RB");

            calculateConsistencyVariance();
            calculateConsistencyMean();
            calculateConsistencyZ();
            calculateConsistencyPercentile();
            addAvgPerformanceToPlayers();
            addPlayerInfoToList();

            paint();

            console.log(playerInfoList);
            console.log(playerInfo)
//======================================================================================================================
        });
    });
});