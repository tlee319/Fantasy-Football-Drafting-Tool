/**
 * Created by ThomasLee on 7/8/17.
 */

function eliminateIrrelevantPlayers() {
    // Get rid of players who haven't played in the past 2 years
    // TODO: Iterate through the dictionary and do the said above
    var x = 0;
    playerNameList = Object.keys(dataByPlayers);

    // Update the name list
    playerNameList = Object.keys(dataByPlayers);
}

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

function calcualteFantasyPoints(position, type) {
    if (position == "QB") {
        qbPlayerNames.forEach(function (player) {
            var seasonList = Object.keys(dataByPlayers[player]);
            seasonList.forEach(function (season) {
                var weekList = Object.keys(dataByPlayers[player][season]);
                weekList.forEach(function (week) {
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
        });
    } else if (position == "WR") {
        wrPlayerNames.forEach(function (player) {
            var seasonList = Object.keys(dataByPlayers[player]);
            seasonList.forEach(function (season) {
                var weekList = Object.keys(dataByPlayers[player][season]);
                weekList.forEach(function (week) {
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
        });
    } else if (position == "RB") {
        rbPlayerNames.forEach(function (player) {
            var seasonList = Object.keys(dataByPlayers[player]);
            seasonList.forEach(function (season) {
                var weekList = Object.keys(dataByPlayers[player][season]);
                weekList.forEach(function (week) {
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

function calculateSD(position) {
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
                    sum += Math.pow((x - rbMeanWeekly), 2);
                    sumPPR += Math.pow((xPPR - rbMeanWeeklyPPR), 2);
                    num++;
                });
            });
            rbSDWeekly = Math.sqrt(sum / num);
            rbSDWeeklyPPR = Math.sqrt(sumPPR / num);
        });
    }
}

function getPercentage (zScore, player, season, week, type) {
    d3.csv("Data/ZScoreTableSetFinal.csv", function(error, data) {
        var roundedZScore100;
        var roundedZScore10;
        var positive = false;

        if (zScore == 0) {
            console.log("Player: " + player + ", season: " + season + ", week: " + week + ", percentile: " + 0.5);
            dataByPlayers[player][season][week]["percentile"] = .50;
        } else {
            if (zScore < 0) {
                roundedZScore100 = parseFloat(zScore.toString().substr(0, 5));
                roundedZScore10 = parseFloat(zScore.toString().substr(0, 4));
            } else if (zScore > 0) {
                roundedZScore100 = parseFloat(zScore.toString().substr(0, 4));
                roundedZScore10 = parseFloat(zScore.toString().substr(0, 3));
                roundedZScore10 = -roundedZScore10;
                positive = true;
            }

            var subZ = Math.abs(roundedZScore100 - roundedZScore10);
            subZ = parseFloat(subZ.toString().substr(0, 4));

            try {
                data.forEach(function (d) {
                    if (parseFloat(d["Z"]) == roundedZScore10) {
                        index = "Z" + subZ;
                        percentile = d[index];
                        if (positive) {
                            dataByPlayers[player][season][week]["percentile"] = (1.0 - parseFloat(percentile));
                            throw BreakException;
                        } else {
                            dataByPlayers[player][season][week]["percentile"] = parseFloat(percentile);
                            throw BreakException;
                        }
                    }
                });
            } catch (e) {

            }
        }
    });
}

function calculateZ(position) {
    if (position == "QB") {
        qbPlayerNames.forEach(function (player) {
            var seasonList = Object.keys(dataByPlayers[player]);
            seasonList.forEach(function (season) {
                var weekList = Object.keys(dataByPlayers[player][season]);
                weekList.forEach(function (week) {
                    var x = dataByPlayers[player][season][week]["pts"];
                    var xPPR = dataByPlayers[player][season][week]["ptsPPR"];

                    var z = ((x - qbMeanWeekly) / qbSDWeekly);
                    //console.log((xPPR - qbMeanWeeklyPPR) / qbSDWeeklyPPR);
                    getPercentage(z, player, season, week, "pts");
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
                    //console.log((xPPR - wrMeanWeeklyPPR) / wrSDWeeklyPPR);
                    //getPercentage(z, player, season, week, "pts");
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
                    //console.log((xPPR - rbMeanWeeklyPPR) / rbSDWeeklyPPR);
                    //getPercentage(z, player, season, week, "pts");
                });
            });
        });
    }
}