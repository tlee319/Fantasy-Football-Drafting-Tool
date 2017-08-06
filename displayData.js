function paint() {
    d3.csv("Data/ZScoreTableSetFinal.csv", function(error, data) {
        var svg = d3.select("svg"),
            margin = {top: 20, right: 20, bottom: 30, left: 100},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom;

        var svg2 = d3.select("svg"),
            margin = {top: 20, right: 20, bottom: 30, left: 100},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom;

        var x = d3.scaleLinear().range([0, width]);
        var y = d3.scaleBand().range([height, 0]);
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x2 = d3.scaleLinear().range([0, width]);
        var y2 = d3.scaleBand().range([height, 0]);
        var g2 = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain([0.0, 1.0]);
        y.domain(playerInfoList.map(function (d) {
            return d["name"]
        })).padding(0.1);

        playerInfoList.sort(function (a, b) {
            //console.log("a: " + a["performancePercentile"] + ", b: " + b["performancePercentile"] + ", diff: " + (a["performancePercentile"] - b["performancePercentile"]));
            return a["performancePercentile"] - b["performancePercentile"];
        })

        x.domain([0.0, 1.0]);
        y.domain(playerInfoList.map(function (d) {
            return d["name"]
        })).padding(0.1);

        g.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(4).tickFormat(function (d) {
                return d;
            }).tickSizeInner([-height]));

        g.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y));

        console.log("this shit");
        console.log(playerInfoList);

        /*
        playerInfoList.sort(function (a, b) {
            console.log(a["performancePercentile"]);
            return a["performancePercentile"] - b["performancePercentile"];
        }); */

        console.log(playerInfoList);
        console.log(playerNameList);

        g.selectAll(".bar")
            .data(playerInfoList)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("height", y.bandwidth())
            .attr("y", function (d) {
                return y(d["name"]);
            })
            .attr("width", function (d) {
                return x(d["performancePercentile"]);
            });
    });
}