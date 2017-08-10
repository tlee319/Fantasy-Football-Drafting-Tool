function paint() {
    d3.csv("Data/ZScoreTableSetFinal.csv", function(error, data) {
        var svg = d3.select("svg"),
            margin = {top: 20, right: 20, bottom: 30, left: 100},
            width = (+svg.attr("width")/2) - margin.left - margin.right,
            height = (+svg.attr("height")/2) - margin.top - margin.bottom;

        var svg2 = d3.select("svg"),
            margin = {top: 20, right: 20, bottom: 30, left: 100},
            width = (+svg.attr("width")/2) - margin.left - margin.right,
            height = (+svg.attr("height")/2) - margin.top - margin.bottom;

        playerInfoList.sort(function (a, b) {
            //console.log("a: " + a["performancePercentile"] + ", b: " + b["performancePercentile"] + ", diff: " + (a["performancePercentile"] - b["performancePercentile"]));
            return a["performancePercentile"] - b["performancePercentile"];
        });

        var x = d3.scaleLinear().range([0, width]);
        var y = d3.scaleBand().range([height, 0]);
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x2 = d3.scaleLinear().range([0, width]);
        var y2 = d3.scaleBand().range([height, 0]);
        var g2 = svg2.append("g")
            .attr("transform", "translate(" + (margin.left + 600) + "," + margin.top + ")");


        // x2
        x2.domain([0.0, 1.0]);
        y2.domain(playerInfoList.map(function (d) {
            return d["name"]
        })).padding(0.1);

        g2.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x2).ticks(4).tickFormat(function (d) {
                return d;
            }).tickSizeInner([-height]));

        g2.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y2));

        g2.selectAll(".bar")
            .data(playerInfoList)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("height", y2.bandwidth())
            .attr("y", function (d) {
                return y2(d["name"]);
            })
            .attr("width", function (d) {
                return x2(d["consistencyPercentile"]);
            });

        // x1
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

        console.log(dataByPlayers);

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