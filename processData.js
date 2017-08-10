/**
 * Created by ThomasLee on 7/8/17.
 */
function processData(file, position) {
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
            d["Pos"] = position;
            var dateParts = d["Date"].split(["/"]);
            var month = dateParts[0];
            var day = dateParts[1];
            var year = dateParts[2];

            var week = parseInt(d["Week"]);

            var season;
            if (month == "1") {
                season = parseInt("20" + year) - 1;
            } else {
                season = parseInt("20" + year);
            }

            if (dataByPlayers[d["Name"]] != undefined) {
                if (dataByPlayers[d["Name"]][season] != undefined) {
                    dataByPlayers[d["Name"]][season][week] = d;
                } else {
                    dataByPlayers[d["Name"]][season] = {};
                    dataByPlayers[d["Name"]][season][week] = d;
                }
            } else {
                dataByPlayers[d["Name"]] = {};
                dataByPlayers[d["Name"]][season] = {};
                dataByPlayers[d["Name"]][season][week] = d;
            }
        });
    });
}

function partitionByPosition () {
    playerNameList = Object.keys(dataByPlayers);
    playerNameList.forEach(function(name) {
        seasonKey = Object.keys(dataByPlayers[name])[0];
        weekKey = Object.keys(dataByPlayers[name][seasonKey])[0];
        var playerPos = dataByPlayers[name][seasonKey][weekKey]["Pos"];

        if (playerPos == "QB") {
            qbPlayerNames.push(name);
        } else if (playerPos == "WR") {
            wrPlayerNames.push(name);
        } else if (playerPos == "RB") {
            rbPlayerNames.push(name);
        }
    })
}

function eliminateIrrelevantPlayers() {
    var filteredList = [];
    playerNameList.forEach(function (d) {
        if (numOfGamesPlayedByPlayers[d] > 12) {
            filteredList.push(d);
        }
    });

    qbPlayerNames = [];
    wrPlayerNames = [];
    rbPlayerNames = [];

    playerNameList = filteredList;

    filteredList.forEach(function(name) {
        seasonKey = Object.keys(dataByPlayers[name])[0];
        weekKey = Object.keys(dataByPlayers[name][seasonKey])[0];
        var playerPos = dataByPlayers[name][seasonKey][weekKey]["Pos"];

        if (playerPos == "QB") {
            qbPlayerNames.push(name);
        } else if (playerPos == "WR") {
            wrPlayerNames.push(name);
        } else if (playerPos == "RB") {
            rbPlayerNames.push(name);
        }
    })
}

function calcualteFantasyPoints(position, type) {
    if (position == "QB") {
        qbPlayerNames.forEach(function (player) {
            var numberOfGames = 0;
            var seasonList = Object.keys(dataByPlayers[player]);
            seasonList.forEach(function (season) {
                var weekList = Object.keys(dataByPlayers[player][season]);
                weekList.forEach(function (week) {
                    numberOfGames++;
                    var tdPass;
                    var pYrd;
                    var int;
                    var tdRush;
                    var ruYrd;
                    var tdRec;
                    var reYard;
                    var rec;

                    if (dataByPlayers[player][season][week]["PTD"] != undefined) {
                        tdPass = parseInt(dataByPlayers[player][season][week]["PTD"]);
                    } else {
                        tdPass = 0;
                    }

                    if (dataByPlayers[player][season][week]["PYds"] != undefined) {
                        pYrd = parseInt(dataByPlayers[player][season][week]["PYds"]);
                    } else {
                        pYrd = 0;
                    }

                    if (dataByPlayers[player][season][week]["Int"] != undefined) {
                        int = parseInt(dataByPlayers[player][season][week]["Int"]);
                    } else {
                        int = 0;
                    }

                    if (dataByPlayers[player][season][week]["RuTd"] != undefined) {
                        tdRush = parseInt(dataByPlayers[player][season][week]["RuTd"]);
                    } else {
                        tdRush = 0;
                    }

                    if (dataByPlayers[player][season][week]["RuYds"] != undefined) {
                        ruYrd = parseInt(dataByPlayers[player][season][week]["RuYds"]);
                    } else {
                        ruYrd = 0;
                    }

                    if (dataByPlayers[player][season][week]["ReTd"] != undefined) {
                        tdRec = parseInt(dataByPlayers[player][season][week]["ReTd"])
                    } else {
                        tdRec = 0;
                    }

                    if (dataByPlayers[player][season][week]["ReYds"] != undefined) {
                        reYard = parseInt(dataByPlayers[player][season][week]["ReYds"]);
                    } else {
                        reYard = 0;
                    }

                    if (dataByPlayers[player][season][week]["Rec"] != undefined) {
                        rec = parseInt(dataByPlayers[player][season][week]["Rec"]);
                    } else {
                        rec = 0;
                    }
                    var totalPoints
                    if (type == "PPR") {
                        totalPoints = (tdPass * 4.0) + (pYrd * 0.04) + (int * (-2.0)) + (tdRush * 6.0) + (ruYrd * 0.1) + (tdRec * 6.0) + (reYard * 0.1) + (rec * 1.0);
                        dataByPlayers[player][season][week]["ptsPPR"] = totalPoints;
                    } else {
                        totalPoints = (tdPass * 4.0) + (pYrd * 0.04) + (int * (-2.0)) + (tdRush * 6.0) + (ruYrd * 0.1) + (tdRec * 6.0) + (reYard * 0.1);
                        dataByPlayers[player][season][week]["pts"] = totalPoints;
                    }
                });
            });
            if (isNaN(numOfGamesPlayedByPlayers[player])) {
                numOfGamesPlayedByPlayers[player] = numberOfGames;
            }
        });
    } else if (position == "WR") {
        wrPlayerNames.forEach(function (player) {
            var numberOfGames = 0;
            var seasonList = Object.keys(dataByPlayers[player]);
            seasonList.forEach(function (season) {
                var weekList = Object.keys(dataByPlayers[player][season]);
                weekList.forEach(function (week) {
                    numberOfGames++;
                    var tdPass;
                    var pYrd;
                    var int;
                    var tdRush;
                    var ruYrd;
                    var tdRec;
                    var reYard;
                    var rec;

                    if (dataByPlayers[player][season][week]["PTD"] != undefined) {
                        tdPass = parseInt(dataByPlayers[player][season][week]["PTD"]);
                    } else {
                        tdPass = 0;
                    }

                    if (dataByPlayers[player][season][week]["PYds"] != undefined) {
                        pYrd = parseInt(dataByPlayers[player][season][week]["PYds"]);
                    } else {
                        pYrd = 0;
                    }

                    if (dataByPlayers[player][season][week]["Int"] != undefined) {
                        int = parseInt(dataByPlayers[player][season][week]["Int"]);
                    } else {
                        int = 0;
                    }

                    if (dataByPlayers[player][season][week]["RuTd"] != undefined) {
                        tdRush = parseInt(dataByPlayers[player][season][week]["RuTd"]);
                    } else {
                        tdRush = 0;
                    }

                    if (dataByPlayers[player][season][week]["RuYds"] != undefined) {
                        ruYrd = parseInt(dataByPlayers[player][season][week]["RuYds"]);
                    } else {
                        ruYrd = 0;
                    }

                    if (dataByPlayers[player][season][week]["ReTd"] != undefined) {
                        tdRec = parseInt(dataByPlayers[player][season][week]["ReTd"])
                    } else {
                        tdRec = 0;
                    }

                    if (dataByPlayers[player][season][week]["ReYds"] != undefined) {
                        reYard = parseInt(dataByPlayers[player][season][week]["ReYds"]);
                    } else {
                        reYard = 0;
                    }

                    if (dataByPlayers[player][season][week]["Rec"] != undefined) {
                        rec = parseInt(dataByPlayers[player][season][week]["Rec"]);
                    } else {
                        rec = 0;
                    }

                    var totalPoints
                    if (type == "PPR") {
                        totalPoints = (tdPass * 4.0) + (pYrd * 0.04) + (int * (-2.0)) + (tdRush * 6.0) + (ruYrd * 0.1) + (tdRec * 6.0) + (reYard * 0.1) + (rec * 1.0);
                        dataByPlayers[player][season][week]["ptsPPR"] = totalPoints;
                    } else {
                        totalPoints = (tdPass * 4.0) + (pYrd * 0.04) + (int * (-2.0)) + (tdRush * 6.0) + (ruYrd * 0.1) + (tdRec * 6.0) + (reYard * 0.1);
                        dataByPlayers[player][season][week]["pts"] = totalPoints;
                    }
                });
            });
            if (isNaN(numOfGamesPlayedByPlayers[player])) {
                numOfGamesPlayedByPlayers[player] = numberOfGames;
            }
        });
    } else if (position == "RB") {
        rbPlayerNames.forEach(function (player) {
            var numberOfGames = 0;
            var seasonList = Object.keys(dataByPlayers[player]);
            seasonList.forEach(function (season) {
                var weekList = Object.keys(dataByPlayers[player][season]);
                weekList.forEach(function (week) {
                    numberOfGames++;
                    var tdPass;
                    var pYrd;
                    var int;
                    var tdRush;
                    var ruYrd;
                    var tdRec;
                    var reYard;
                    var rec;

                    if (dataByPlayers[player][season][week]["PTD"] != undefined) {
                        tdPass = parseInt(dataByPlayers[player][season][week]["PTD"]);
                    } else {
                        tdPass = 0;
                    }

                    if (dataByPlayers[player][season][week]["PYds"] != undefined) {
                        pYrd = parseInt(dataByPlayers[player][season][week]["PYds"]);
                    } else {
                        pYrd = 0;
                    }

                    if (dataByPlayers[player][season][week]["Int"] != undefined) {
                        int = parseInt(dataByPlayers[player][season][week]["Int"]);
                    } else {
                        int = 0;
                    }

                    if (dataByPlayers[player][season][week]["RuTd"] != undefined) {
                        tdRush = parseInt(dataByPlayers[player][season][week]["RuTd"]);
                    } else {
                        tdRush = 0;
                    }

                    if (dataByPlayers[player][season][week]["RuYds"] != undefined) {
                        ruYrd = parseInt(dataByPlayers[player][season][week]["RuYds"]);
                    } else {
                        ruYrd = 0;
                    }

                    if (dataByPlayers[player][season][week]["ReTd"] != undefined) {
                        tdRec = parseInt(dataByPlayers[player][season][week]["ReTd"])
                    } else {
                        tdRec = 0;
                    }

                    if (dataByPlayers[player][season][week]["PTD"] != undefined) {
                        reYard = parseInt(dataByPlayers[player][season][week]["ReYds"]);
                    } else {
                        reYard = 0;
                    }

                    if (dataByPlayers[player][season][week]["Rec"] != undefined) {
                        rec = parseInt(dataByPlayers[player][season][week]["Rec"]);
                    } else {
                        rec = 0;
                    }

                    var totalPoints
                    if (type == "PPR") {
                        totalPoints = (tdPass * 4.0) + (pYrd * 0.04) + (int * (-2.0)) + (tdRush * 6.0) + (ruYrd * 0.1) + (tdRec * 6.0) + (reYard * 0.1) + (rec * 1.0);
                        dataByPlayers[player][season][week]["ptsPPR"] = totalPoints;
                    } else {
                        totalPoints = (tdPass * 4.0) + (pYrd * 0.04) + (int * (-2.0)) + (tdRush * 6.0) + (ruYrd * 0.1) + (tdRec * 6.0) + (reYard * 0.1);
                        dataByPlayers[player][season][week]["pts"] = totalPoints;
                    }

                });
            });
            if (isNaN(numOfGamesPlayedByPlayers[player])) {
                numOfGamesPlayedByPlayers[player] = numberOfGames;
            }
        });
    }
}

function findMeanWeekly(position) {
    if (position == "QB") {
        var sum = 0;
        var num = 0;
        var sumPPR = 0;
        var numPPR = 0;
        qbPlayerNames.forEach(function (player) {
           seasonList = Object.keys(dataByPlayers[player]);
            seasonList.forEach(function (season) {
               weekList = Object.keys(dataByPlayers[player][season]);
                weekList.forEach(function (week) {
                    sum += dataByPlayers[player][season][week]["pts"];
                    num += 1;
                    sumPPR += dataByPlayers[player][season][week]["ptsPPR"];
                    numPPR += 1;
                });
           });
        });
        qbMeanWeekly = sum / num;
        qbMeanWeeklyPPR = sumPPR / numPPR;
    } else if (position == "RB") {
        var sum = 0;
        var num = 0;
        var sumPPR = 0;
        var numPPR = 0;
        rbPlayerNames.forEach(function (player) {
            seasonList = Object.keys(dataByPlayers[player]);
            seasonList.forEach(function (season) {
                weekList = Object.keys(dataByPlayers[player][season]);
                weekList.forEach(function (week) {
                    sum += dataByPlayers[player][season][week]["pts"];
                    num += 1;
                    sumPPR += dataByPlayers[player][season][week]["ptsPPR"];
                    numPPR += 1;
                });
            });
        });
        rbMeanWeekly = sum / num;
        rbMeanWeeklyPPR = sumPPR / numPPR;
    } else if (position == "WR") {
        var sum = 0;
        var num = 0;
        var sumPPR = 0;
        var numPPR = 0;
        wrPlayerNames.forEach(function (player) {
            seasonList = Object.keys(dataByPlayers[player]);
            seasonList.forEach(function (season) {
                weekList = Object.keys(dataByPlayers[player][season]);
                weekList.forEach(function (week) {
                    sum += dataByPlayers[player][season][week]["pts"];
                    num += 1;
                    sumPPR += dataByPlayers[player][season][week]["ptsPPR"];
                    numPPR += 1;
                });
            });
        });
        wrMeanWeekly = sum / num;
        wrMeanWeeklyPPR = sumPPR / numPPR;
    }
}

function calculatePerformanceSD(position) {
    if (position == "QB") {
        var sum = 0;
        var sumPPR = 0;
        var num = 0;
        qbPlayerNames.forEach(function (player) {
            var seasonList = Object.keys(dataByPlayers[player]);
            seasonList.forEach(function (season) {
                var weekList = Object.keys(dataByPlayers[player][season]);
                weekList.forEach(function (week) {
                    var x = dataByPlayers[player][season][week]["pts"];
                    var xPPR = dataByPlayers[player][season][week]["ptsPPR"];
                    sum += Math.pow((x - qbMeanWeekly), 2);
                    sumPPR += Math.pow((xPPR - qbMeanWeeklyPPR), 2);
                    num++;
                });
            });
        });
        qbSDWeekly = Math.sqrt(sum / num);
        qbSDWeeklyPPR = Math.sqrt(sumPPR / num);
    } else if (position == "WR") {
        var sum = 0;
        var sumPPR = 0;
        var num = 0;
        wrPlayerNames.forEach(function (player) {
            var seasonList = Object.keys(dataByPlayers[player]);
            seasonList.forEach(function (season) {
                var weekList = Object.keys(dataByPlayers[player][season]);
                weekList.forEach(function (week) {
                    var x = dataByPlayers[player][season][week]["pts"];
                    var xPPR = dataByPlayers[player][season][week]["ptsPPR"];
                    sum += Math.pow((x - wrMeanWeekly), 2);
                    sumPPR += Math.pow((xPPR - wrMeanWeeklyPPR), 2);
                    num++;
                });
            });
        });
        wrSDWeekly = Math.sqrt(sum / num);
        wrSDWeeklyPPR = Math.sqrt(sumPPR / num);
    } else if (position == "RB") {
        var sum = 0;
        var sumPPR = 0;
        var num = 0;
        rbPlayerNames.forEach(function (player) {
            var seasonList = Object.keys(dataByPlayers[player]);
            seasonList.forEach(function (season) {
                var weekList = Object.keys(dataByPlayers[player][season]);
                weekList.forEach(function (week) {
                    var x = dataByPlayers[player][season][week]["pts"];
                    var xPPR = dataByPlayers[player][season][week]["ptsPPR"];
                    sum += Math.pow((x - rbMeanWeekly), 2);
                    sumPPR += Math.pow((xPPR - rbMeanWeeklyPPR), 2);
                    num++;
                });
            });
        });
        rbSDWeekly = Math.sqrt(sum / num);
        rbSDWeeklyPPR = Math.sqrt(sumPPR / num);
    }
}

function calculatePerformancePercentile (position) {
    d3.csv("Data/ZScoreTableSetFinal.csv", function(error, data) {
        if (position == "QB") {
            qbPlayerNames.forEach(function (player) {
                var seasonList = Object.keys(dataByPlayers[player]);
                seasonList.forEach(function (season) {
                    var weekList = Object.keys(dataByPlayers[player][season]);
                    weekList.forEach(function (week) {
                        var roundedZScore100;
                        var roundedZScore10;
                        var positive = false;
                        var zScore = dataByPlayers[player][season][week]["z"];

                        if (zScore == 0) {
                            dataByPlayers[player][season][week]["performancePercentile"] = 0.5;
                        } else if (zScore > 4.0) {
                            dataByPlayers[player][season][week]["performancePercentile"] = 0.99999;
                        } else if (zScore < -4.0 ) {
                            dataByPlayers[player][season][week]["performancePercentile"] = 0.00001;
                        } else {
                            var subZ;
                            if (zScore < 0) {
                                roundedZScore100 = parseFloat(zScore.toString().substr(0, 5));
                                roundedZScore10 = parseFloat(zScore.toString().substr(0, 4));
                                subZ = Math.abs(roundedZScore100 - roundedZScore10);
                            } else if (zScore > 0) {
                                roundedZScore100 = parseFloat(zScore.toString().substr(0, 4));
                                roundedZScore10 = parseFloat(zScore.toString().substr(0, 3));
                                subZ = Math.abs(roundedZScore100 - roundedZScore10);
                                roundedZScore10 = -roundedZScore10;
                                positive = true;
                            }
                            subZ = parseFloat(subZ.toString().substr(0, 4));
                            try {
                                data.forEach(function (d) {
                                    if (parseFloat(d["Z"]) == roundedZScore10) {
                                        index = "Z" + subZ;
                                        var percentile = d[index];
                                        if (positive) {
                                            dataByPlayers[player][season][week]["performancePercentile"] = parseFloat(1.0 - parseFloat(percentile));
                                            throw BreakException;
                                        } else {
                                            dataByPlayers[player][season][week]["performancePercentile"] = parseFloat(percentile);
                                            throw BreakException;
                                        }
                                    }
                                });
                            } catch (e) {

                            }
                        }

                        var roundedZScore100PPR;
                        var roundedZScore10PPR;
                        var positivePPR = false;
                        var zScorePPR = dataByPlayers[player][season][week]["zPPR"];

                        if (zScorePPR == 0) {
                            dataByPlayers[player][season][week]["performancePercentilePPR"] = 0.5;
                        } else if (zScore > 4.0) {
                            dataByPlayers[player][season][week]["performancePercentilePPR"] = 0.99999;
                        } else if (zScore < -4.0 ) {
                            dataByPlayers[player][season][week]["performancePercentilePPR"] = 0.00001;
                        } else {
                            var subZPPR;
                            if (zScorePPR < 0) {
                                roundedZScore100PPR = parseFloat(zScorePPR.toString().substr(0, 5));
                                roundedZScore10PPR = parseFloat(zScorePPR.toString().substr(0, 4));
                                subZPPR = Math.abs(roundedZScore100PPR - roundedZScore10PPR);
                            } else if (zScorePPR > 0) {
                                roundedZScore100PPR = parseFloat(zScorePPR.toString().substr(0, 4));
                                roundedZScore10PPR = parseFloat(zScorePPR.toString().substr(0, 3));
                                subZPPR = Math.abs(roundedZScore100PPR - roundedZScore10PPR);
                                roundedZScore10PPR = -roundedZScore10PPR;
                                positivePPR = true;
                            }
                            subZPPR = parseFloat(subZPPR.toString().substr(0, 4));
                            try {
                                data.forEach(function (d) {
                                    if (parseFloat(d["Z"]) == roundedZScore10PPR) {
                                        index = "Z" + subZPPR;
                                        var percentile = d[index];
                                        if (positivePPR) {
                                            dataByPlayers[player][season][week]["performancePercentilePPR"] = parseFloat(1.0 - parseFloat(percentile));
                                            throw BreakException;
                                        } else {
                                            dataByPlayers[player][season][week]["performancePercentilePPR"] = parseFloat(percentile);
                                            throw BreakException;
                                        }
                                    }
                                });
                            } catch (e) {

                            }
                        }
                    });
                });
            });
        } else if (position == "WR") {
            wrPlayerNames.forEach(function (player) {
                var seasonList = Object.keys(dataByPlayers[player]);
                seasonList.forEach(function (season) {
                    var weekList = Object.keys(dataByPlayers[player][season]);
                    weekList.forEach(function (week) {
                        var roundedZScore100;
                        var roundedZScore10;
                        var positive = false;
                        var zScore = dataByPlayers[player][season][week]["z"]

                        if (zScore == 0) {
                            dataByPlayers[player][season][week]["performancePercentile"] = 0.5;
                        } else if (zScore > 4.0) {
                            dataByPlayers[player][season][week]["performancePercentile"] = 0.99999;
                        } else if (zScore < -4.0 ) {
                            dataByPlayers[player][season][week]["performancePercentile"] = 0.00001;
                        } else {
                            var subZ;
                            if (zScore < 0) {
                                roundedZScore100 = parseFloat(zScore.toString().substr(0, 5));
                                roundedZScore10 = parseFloat(zScore.toString().substr(0, 4));
                                subZ = Math.abs(roundedZScore100 - roundedZScore10);
                            } else if (zScore > 0) {
                                roundedZScore100 = parseFloat(zScore.toString().substr(0, 4));
                                roundedZScore10 = parseFloat(zScore.toString().substr(0, 3));
                                subZ = Math.abs(roundedZScore100 - roundedZScore10);
                                roundedZScore10 = -roundedZScore10;
                                positive = true;
                            }
                            subZ = parseFloat(subZ.toString().substr(0, 4));
                            //console.log("Attempt");
                            try {
                                data.forEach(function (d) {
                                    if (parseFloat(d["Z"]) == roundedZScore10) {
                                        index = "Z" + subZ;
                                        var percentile = d[index];
                                        if (positive) {
                                            dataByPlayers[player][season][week]["performancePercentile"] = 1.0 - parseFloat(percentile);
                                            throw BreakException;
                                        } else {
                                            //console.log("Success");
                                            dataByPlayers[player][season][week]["performancePercentile"] = parseFloat(percentile);
                                            throw BreakException;
                                        }
                                    }
                                });
                            } catch (e) {

                            }
                        }

                        var roundedZScore100PPR;
                        var roundedZScore10PPR;
                        var positivePPR = false;
                        var zScorePPR = dataByPlayers[player][season][week]["zPPR"];

                        if (zScorePPR == 0) {
                            dataByPlayers[player][season][week]["performancePercentilePPR"] = 0.5;
                        } else if (zScorePPR > 4.0) {
                            dataByPlayers[player][season][week]["performancePercentilePPR"] = 0.99999;
                        } else if (zScorePPR < -4.0 ) {
                            dataByPlayers[player][season][week]["performancePercentilePPR"] = 0.00001;
                        } else {
                            var subZPPR;
                            if (zScorePPR < 0) {
                                roundedZScore100PPR = parseFloat(zScorePPR.toString().substr(0, 5));
                                roundedZScore10PPR = parseFloat(zScorePPR.toString().substr(0, 4));
                                subZPPR = Math.abs(roundedZScore100PPR - roundedZScore10PPR);
                            } else if (zScorePPR > 0) {
                                roundedZScore100PPR = parseFloat(zScorePPR.toString().substr(0, 4));
                                roundedZScore10PPR = parseFloat(zScorePPR.toString().substr(0, 3));
                                subZPPR = Math.abs(roundedZScore100PPR - roundedZScore10PPR);
                                roundedZScore10PPR = -roundedZScore10PPR;
                                positivePPR = true;
                            }
                            subZPPR = parseFloat(subZPPR.toString().substr(0, 4));
                            try {
                                data.forEach(function (d) {
                                    if (parseFloat(d["Z"]) == roundedZScore10PPR) {
                                        index = "Z" + subZPPR;
                                        var percentile = d[index];
                                        if (positivePPR) {
                                            dataByPlayers[player][season][week]["performancePercentilePPR"] = parseFloat(1.0 - parseFloat(percentile));
                                            throw BreakException;
                                        } else {
                                            dataByPlayers[player][season][week]["performancePercentilePPR"] = parseFloat(percentile);
                                            throw BreakException;
                                        }
                                    }
                                });
                            } catch (e) {

                            }
                        }
                    });
                });
            });
        } else if (position == "RB") {
            rbPlayerNames.forEach(function (player) {
                var seasonList = Object.keys(dataByPlayers[player]);
                seasonList.forEach(function (season) {
                    var weekList = Object.keys(dataByPlayers[player][season]);
                    weekList.forEach(function (week) {
                        var roundedZScore100;
                        var roundedZScore10;
                        var positive = false;
                        var zScore = dataByPlayers[player][season][week]["z"]
                        if (zScore == 0) {
                            dataByPlayers[player][season][week]["performancePercentile"] = 0.5;
                        } else if (zScore > 4.0) {
                            dataByPlayers[player][season][week]["performancePercentile"] = 0.99999;
                        } else if (zScore < -4.0 ) {
                            dataByPlayers[player][season][week]["performancePercentile"] = 0.00001;
                        } else {
                            var subZ;
                            if (zScore < 0) {
                                roundedZScore100 = parseFloat(zScore.toString().substr(0, 5));
                                roundedZScore10 = parseFloat(zScore.toString().substr(0, 4));
                                subZ = Math.abs(roundedZScore100 - roundedZScore10);
                            } else if (zScore > 0) {
                                roundedZScore100 = parseFloat(zScore.toString().substr(0, 4));
                                roundedZScore10 = parseFloat(zScore.toString().substr(0, 3));
                                subZ = Math.abs(roundedZScore100 - roundedZScore10);
                                roundedZScore10 = -roundedZScore10;
                                positive = true;
                            }
                            subZ = parseFloat(subZ.toString().substr(0, 4));
                            //console.log("Attempt");
                            try {
                                data.forEach(function (d) {
                                    if (parseFloat(d["Z"]) == roundedZScore10) {
                                        index = "Z" + subZ;
                                        var percentile = d[index];
                                        if (positive) {
                                            dataByPlayers[player][season][week]["performancePercentile"] = parseFloat(1.0 - parseFloat(percentile));
                                            throw BreakException;
                                        } else {
                                            //console.log("Success");
                                            dataByPlayers[player][season][week]["performancePercentile"] = parseFloat(percentile);
                                            throw BreakException;
                                        }
                                    }
                                });
                            } catch (e) {

                            }
                        }

                        var roundedZScore100PPR;
                        var roundedZScore10PPR;
                        var positivePPR = false;
                        var zScorePPR = dataByPlayers[player][season][week]["zPPR"];

                        if (zScorePPR == 0) {
                            dataByPlayers[player][season][week]["performancePercentilePPR"] = 0.5;
                        } else if (zScorePPR > 4.0) {
                            dataByPlayers[player][season][week]["performancePercentilePPR"] = 0.99999;
                        } else if (zScorePPR < -4.0 ) {
                            dataByPlayers[player][season][week]["performancePercentilePPR"] = 0.00001;
                        } else {
                            var subZPPR;
                            if (zScorePPR < 0) {
                                roundedZScore100PPR = parseFloat(zScorePPR.toString().substr(0, 5));
                                roundedZScore10PPR = parseFloat(zScorePPR.toString().substr(0, 4));
                                subZPPR = Math.abs(roundedZScore100PPR - roundedZScore10PPR);
                            } else if (zScorePPR > 0) {
                                roundedZScore100PPR = parseFloat(zScorePPR.toString().substr(0, 4));
                                roundedZScore10PPR = parseFloat(zScorePPR.toString().substr(0, 3));
                                subZPPR = Math.abs(roundedZScore100PPR - roundedZScore10PPR);
                                roundedZScore10PPR = -roundedZScore10PPR;
                                positivePPR = true;
                            }
                            subZPPR = parseFloat(subZPPR.toString().substr(0, 4));
                            try {
                                data.forEach(function (d) {
                                    if (parseFloat(d["Z"]) == roundedZScore10PPR) {
                                        index = "Z" + subZPPR;
                                        var percentile = d[index];
                                        if (positivePPR) {
                                            dataByPlayers[player][season][week]["performancePercentilePPR"] = parseFloat(1.0 - parseFloat(percentile));
                                            throw BreakException;
                                        } else {
                                            dataByPlayers[player][season][week]["performancePercentilePPR"] = parseFloat(percentile);
                                            throw BreakException;
                                        }
                                    }
                                });
                            } catch (e) {

                            }
                        }
                    });
                });
            });
        }
    });
}

function calculatePerformanceZ(position) {
    if (position == "QB") {
        qbPlayerNames.forEach(function (player) {
            var seasonList = Object.keys(dataByPlayers[player]);
            seasonList.forEach(function (season) {
                var weekList = Object.keys(dataByPlayers[player][season]);
                weekList.forEach(function (week) {
                    var x = dataByPlayers[player][season][week]["pts"];
                    var xPPR = dataByPlayers[player][season][week]["ptsPPR"];

                    var z = ((x - qbMeanWeekly) / qbSDWeekly);
                    dataByPlayers[player][season][week]["z"] = z;

                    var zPPR = ((xPPR - qbMeanWeeklyPPR) / qbSDWeeklyPPR);
                    dataByPlayers[player][season][week]["zPPR"] = zPPR;
                    //console.log((xPPR - qbMeanWeeklyPPR) / qbSDWeeklyPPR);
                    //calculatePerformancePercentile(z, player, season, week, "pts");
                });
            });
        });
    } else if (position == "WR") {
        var sum = 0;
        var sumPPR = 0;
        var num = 0;
        wrPlayerNames.forEach(function (player) {
            var seasonList = Object.keys(dataByPlayers[player]);
            seasonList.forEach(function (season) {
                var weekList = Object.keys(dataByPlayers[player][season]);
                weekList.forEach(function (week) {
                    var x = dataByPlayers[player][season][week]["pts"];
                    var xPPR = dataByPlayers[player][season][week]["ptsPPR"];

                    //console.log("WR");
                    var z = ((x - wrMeanWeekly) / wrSDWeekly);
                    dataByPlayers[player][season][week]["z"] = z;

                    var zPPR = ((xPPR - wrMeanWeeklyPPR) / wrSDWeeklyPPR);
                    dataByPlayers[player][season][week]["zPPR"] = zPPR;
                    //console.log((xPPR - wrMeanWeeklyPPR) / wrSDWeeklyPPR);
                    //calculatePerformancePercentile(z, player, season, week, "pts");
                });
            });
        });
    } else if (position == "RB") {
        rbPlayerNames.forEach(function (player) {
            var sum = 0;
            var sumPPR = 0;
            var num = 0;
            var seasonList = Object.keys(dataByPlayers[player]);
            seasonList.forEach(function (season) {
                var weekList = Object.keys(dataByPlayers[player][season]);
                weekList.forEach(function (week) {
                    var x = dataByPlayers[player][season][week]["pts"];
                    var xPPR = dataByPlayers[player][season][week]["ptsPPR"];
                    //console.log("RB");
                    var z = ((x - rbMeanWeekly) / rbSDWeekly);
                    dataByPlayers[player][season][week]["z"] = z;

                    var zPPR = ((xPPR - rbMeanWeeklyPPR) / rbSDWeeklyPPR);
                    dataByPlayers[player][season][week]["zPPR"] = zPPR;
                    //console.log((xPPR - rbMeanWeeklyPPR) / rbSDWeeklyPPR);
                    //calculatePerformancePercentile(z, player, season, week, "pts");
                });
            });
        });
    }
}

function calculateConsistencyVariance() {
    qbPlayerNames.forEach(function (player) {
        var numberOfGamesPlayed = 0;
        var sum = 0;
        var sumPPR = 0;
        var seasonList = Object.keys(dataByPlayers[player]);
        seasonList.forEach(function (season) {
            var weekList = Object.keys(dataByPlayers[player][season]);
            weekList.forEach(function (week) {
                numberOfGamesPlayed++;
                sum += dataByPlayers[player][season][week]["pts"];
                sumPPR += dataByPlayers[player][season][week]["ptsPPR"];
            });
        });

        var mean = sum / numberOfGamesPlayed;
        var meanPPR = sumPPR / numberOfGamesPlayed;

        var sdSum = 0;
        var sdSumPPR = 0;
        seasonList.forEach(function (season) {
            var weekList = Object.keys(dataByPlayers[player][season]);
            weekList.forEach(function (week) {
                var x = dataByPlayers[player][season][week]["pts"];
                var xPPR = dataByPlayers[player][season][week]["ptsPPR"];

                sdSum += Math.pow((x - mean), 2);
                sdSumPPR += Math.pow((xPPR - meanPPR), 2);
            });
        });

        var variance = sdSum / numberOfGamesPlayed;
        var variancePPR = sdSumPPR / numberOfGamesPlayed;

        playerInfo[player] = {"numGames": numberOfGamesPlayed, "variance": variance, "variancePPR": variancePPR, "pos": "qb"};
    });

    wrPlayerNames.forEach(function (player) {
        var numberOfGamesPlayed = 0;
        var sum = 0;
        var sumPPR = 0;
        var seasonList = Object.keys(dataByPlayers[player]);
        seasonList.forEach(function (season) {
            var weekList = Object.keys(dataByPlayers[player][season]);
            weekList.forEach(function (week) {
                numberOfGamesPlayed++;
                var x = dataByPlayers[player][season][week]["pts"];
                var xPPR = dataByPlayers[player][season][week]["ptsPPR"];

                sum += dataByPlayers[player][season][week]["pts"];
                sumPPR += dataByPlayers[player][season][week]["ptsPPR"];
            });
        });

        var mean = sum / numberOfGamesPlayed;
        var meanPPR = sumPPR / numberOfGamesPlayed;

        var sdSum = 0;
        var sdSumPPR = 0;
        seasonList.forEach(function (season) {
            var weekList = Object.keys(dataByPlayers[player][season]);
            weekList.forEach(function (week) {
                var x = dataByPlayers[player][season][week]["pts"];
                var xPPR = dataByPlayers[player][season][week]["ptsPPR"];

                sdSum += Math.pow((x - mean), 2);
                sdSumPPR += Math.pow((xPPR - meanPPR), 2);
            });
        });

        var variance = sdSum / numberOfGamesPlayed;
        var variancePPR = sdSumPPR / numberOfGamesPlayed;

        playerInfo[player] = {"numGames": numberOfGamesPlayed, "variance": variance, "variancePPR": variancePPR, "pos": "wr"};
    });

    rbPlayerNames.forEach(function (player) {
        var numberOfGamesPlayed = 0;
        var sum = 0;
        var sumPPR = 0;
        var seasonList = Object.keys(dataByPlayers[player]);
        seasonList.forEach(function (season) {
            var weekList = Object.keys(dataByPlayers[player][season]);
            weekList.forEach(function (week) {
                numberOfGamesPlayed++;
                var x = dataByPlayers[player][season][week]["pts"];
                var xPPR = dataByPlayers[player][season][week]["ptsPPR"];

                sum += dataByPlayers[player][season][week]["pts"];
                sumPPR += dataByPlayers[player][season][week]["ptsPPR"];
            });
        });

        var mean = sum / numberOfGamesPlayed;
        var meanPPR = sumPPR / numberOfGamesPlayed;

        var sdSum = 0;
        var sdSumPPR = 0;
        seasonList.forEach(function (season) {
            var weekList = Object.keys(dataByPlayers[player][season]);
            weekList.forEach(function (week) {
                var x = dataByPlayers[player][season][week]["pts"];
                var xPPR = dataByPlayers[player][season][week]["ptsPPR"];

                sdSum += Math.pow((x - mean), 2);
                sdSumPPR += Math.pow((xPPR - meanPPR), 2);
            });
        });

        var variance = sdSum / numberOfGamesPlayed;
        var variancePPR = sdSumPPR / numberOfGamesPlayed;

        playerInfo[player] = {"numGames": numberOfGamesPlayed, "variance": variance, "variancePPR": variancePPR, "pos": "rb"};
    });
}

function calculateConsistencyMean() {
    var qbSum = 0;
    var rbSum = 0;
    var wrSum = 0;

    var qbSumPPR = 0;
    var rbSumPPR = 0;
    var wrSumPPR = 0;

    var qbNum = 0;
    var rbNum = 0;
    var wrNum = 0;

    playerNameList.forEach(function(player) {
        if (playerInfo[player]["pos"] == "qb") {
            qbSum += playerInfo[player]["variance"];
            qbSumPPR += playerInfo[player]["variancePPR"];
            qbNum++;
        } else if (playerInfo[player]["pos"] == "rb") {
            rbSum += playerInfo[player]["variance"];
            rbSumPPR += playerInfo[player]["variancePPR"];
            rbNum++;
        } else if (playerInfo[player]["pos"] == "wr") {
            wrSum += playerInfo[player]["variance"];
            wrSumPPR += playerInfo[player]["variancePPR"];
            wrNum++;
        }
    });

    qbVarianceMean = qbSum / qbNum;
    wrVarianceMean = wrSum / wrNum;
    rbVarianceMean = rbSum / rbNum;

    qbVarianceMeanPPR = qbSumPPR / qbNum;
    rbVarianceMeanPPR = rbSumPPR / rbNum;
    wrVarianceMeanPPR = wrSumPPR / wrNum;

    var qbSDSum = 0;
    var rbSDSum = 0;
    var wrSDSum = 0;
    var qbSDSumPPR = 0;
    var rbSDSumPPR = 0;
    var wrSDSumPPR = 0;

    playerNameList.forEach(function(player) {
        var playerDict = playerInfo[player];
        if (playerDict["pos"] == "qb") {
            qbSDSum += Math.pow((playerDict["variance"] - qbVarianceMean), 2);
            qbSDSumPPR += Math.pow((playerDict["variance"] - qbVarianceMeanPPR), 2);
        } else if (playerDict["pos"] == "rb") {
            rbSDSum += Math.pow((playerDict["variance"] - rbVarianceMean), 2);
            rbSDSumPPR += Math.pow((playerDict["variance"] - rbVarianceMeanPPR), 2);
        } else if (playerDict["pos"] == "wr") {
            wrSDSum += Math.pow((playerDict["variance"] - wrVarianceMean), 2);
            wrSDSumPPR += Math.pow((playerDict["variance"] - wrVarianceMeanPPR), 2);
        }
    });

    qbConsistencySD = Math.sqrt(qbSDSum / qbNum);
    rbConsistencySD = Math.sqrt(rbSDSum / rbNum);
    wrConsistencySD = Math.sqrt(wrSDSum / wrNum);
}

function calculateConsistencyZ() {
    playerNameList.forEach(function(player) {
        var playerDict = playerInfo[player];
        if (playerDict["pos"] == "qb") {
            var z = ((playerDict["variance"] - qbVarianceMean) / qbConsistencySD);
            playerDict["z"] = z;
        } else if (playerDict["pos"] == "rb") {
            var z = ((playerDict["variance"] - rbVarianceMean) / rbConsistencySD);
            playerDict["z"] = z;
        } else if (playerDict["pos"] == "wr") {
            var z = ((playerDict["variance"] - wrVarianceMean) / wrConsistencySD);
            playerDict["z"] = z;
        }
    });
}

function calculateConsistencyPercentile() {
    d3.csv("Data/ZScoreTableSetFinal.csv", function(error, data) {
        playerNameList.forEach(function(player) {
            var playerDict = playerInfo[player];
            var roundedZScore100;
            var roundedZScore10;
            var positive = false;
            var zScore = playerDict["z"];

            if (zScore == 0) {
                playerDict["consistencyPercentile"] = 0.5;
            } else if (zScore > 4.0) {
                playerDict["consistencyPercentile"] = 0.00001;
            } else if (zScore < -4.0 ) {
                playerDict["consistencyPercentile"] = 0.99999;
            } else {
                var subZ;
                if (zScore < 0) {
                    roundedZScore100 = parseFloat(zScore.toString().substr(0, 5));
                    roundedZScore10 = parseFloat(zScore.toString().substr(0, 4));
                    subZ = Math.abs(roundedZScore100 - roundedZScore10);
                } else if (zScore > 0) {
                    roundedZScore100 = parseFloat(zScore.toString().substr(0, 4));
                    roundedZScore10 = parseFloat(zScore.toString().substr(0, 3));
                    subZ = Math.abs(roundedZScore100 - roundedZScore10);
                    roundedZScore10 = -roundedZScore10;
                    positive = true;
                }
                subZ = parseFloat(subZ.toString().substr(0, 4));
                try {
                    data.forEach(function (d) {
                        if (parseFloat(d["Z"]) == roundedZScore10) {
                            index = "Z" + subZ;
                            var percentile = d[index];
                            if (positive) {
                                playerDict["consistencyPercentile"] = parseFloat(percentile);
                                throw BreakException;
                            } else {
                                playerDict["consistencyPercentile"] = parseFloat(parseFloat(1.0 - percentile));
                                throw BreakException;
                            }
                        }
                    });
                } catch (e) {

                }
            }
        });
    });
}

function addAvgPerformanceToPlayers() {
    d3.csv("Data/ZScoreTableSetFinal.csv", function(error, data) {
        qbPlayerNames.forEach(function (player) {
            var sum = 0;
            var sumPPR = 0;
            var num = 0;
            var seasonList = Object.keys(dataByPlayers[player]);
            seasonList.forEach(function (season) {
                var weekList = Object.keys(dataByPlayers[player][season]);
                weekList.forEach(function (week) {
                    sum += dataByPlayers[player][season][week]["performancePercentile"];
                    num++;
                });
            });
            playerInfo[player]["avgPerformancePercentile"] = sum / num;
        });

        rbPlayerNames.forEach(function (player) {
            var sum = 0;
            var sumPPR = 0;
            var num = 0;
            var seasonList = Object.keys(dataByPlayers[player]);
            seasonList.forEach(function (season) {
                var weekList = Object.keys(dataByPlayers[player][season]);
                weekList.forEach(function (week) {
                    sum += dataByPlayers[player][season][week]["performancePercentile"];
                    num++;
                });
            });

            playerInfo[player]["avgPerformancePercentile"] = sum / num;
        });

        wrPlayerNames.forEach(function (player) {
            var sum = 0;
            var sumPPR = 0;
            var num = 0;
            var seasonList = Object.keys(dataByPlayers[player]);
            seasonList.forEach(function (season) {
                var weekList = Object.keys(dataByPlayers[player][season]);
                weekList.forEach(function (week) {
                    sum += dataByPlayers[player][season][week]["performancePercentile"];
                    num++;
                });
            });

            playerInfo[player]["avgPerformancePercentile"] = sum / num;
        });
    });
}

function addPlayerInfoToList() {
    d3.csv("Data/ZScoreTableSetFinal.csv", function(error, data) {
        playerNameList.forEach(function (player) {
            if (!isNaN(playerInfo[player]["consistencyPercentile"])) {
                playerInfoList.push({
                    "name": player,
                    "performancePercentile": playerInfo[player]["avgPerformancePercentile"],
                    "consistencyPercentile": playerInfo[player]["consistencyPercentile"],
                    "numGames": playerInfo[player]["numGames"]
                });
            } else {
                playerInfoList.push({
                    "name": player,
                    "performancePercentile": playerInfo[player]["avgPerformancePercentile"],
                    "consistencyPercentile": 0.0,
                    "numGames": playerInfo[player]["numGames"]
                });
            }
        });
    });
}