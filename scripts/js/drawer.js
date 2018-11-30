class Drawer{
    constructor(){

        this.height = 800;
        this.width = 1400;
        this.svg = d3.select("#drawerGroup").append("svg")
            .attr("height",this.height)
            .attr("width", this.width);
        this.drawerContent = this.svg.append("g")
            .attr("transform", "translate(420, 0)")
            .attr("id","drawerContent");
        this.ifClose = true;
        // this.selectedChart = null;
        this.drawDrawer();

    }
    drawDrawer(){
        let cornerbutton = d3.select("#graph-corner").select("button");

        let backRect = this.drawerContent.append("rect")
            .attr("height", this.height)
            .attr("width", this.width)
            .attr("fill", "lightgrey")
            .style("opacity",0.3)
            .on("click", function() { d3.event.stopPropagation(); });
            
        cornerbutton
            .on("click", function() { d3.event.stopPropagation(); })
            .on("click.log",d=>{
                console.log(this.ifClose)
                if(this.ifClose){
                    d3.select("#drawerContent")
                        .transition().duration(350)
                        .attr("transform", "translate(0, 0)")
                        // .style("visibility","initial");
                    this.ifClose = false;
                } else {
                    d3.select("#drawerContent")
                        .transition().duration(350)
                        .attr("transform", "translate(420, 0)");
                        // .style("visibility","hidden");
                    this.ifClose = true;
                }
                
            })
        let comparison = this.drawerContent.append("text")
            .attr("id","comparisonButton")
            .attr("transform","translate(20,100)")
            .attr("class", "info")
            .text("Comparison Table")
            .on("click", function() { d3.event.stopPropagation(); })
            .on("click.log",d=>{
                d3.select("#comparisonDiv")
                    .style("visibility","initial");
                d3.select("#yearline")
                    .style("visibility","hidden");
                d3.select("#forceDirected")
                    .style("visibility","hidden");
                d3.select("#linechartGroup")
                    .style("visibility","hidden");
            })
        let linechart = this.drawerContent.append("text")
            .attr("id","yearchartButton")
            .attr("transform","translate(20,130)")
            .attr("class", "info")
            .text("Line Chart")
            .on("click.log", function() { d3.event.stopPropagation(); })
            .on("click",d=>{
                d3.select("#comparisonDiv")
                    .style("visibility","hidden");
                d3.select("#yearline")
                    .style("visibility","initial");
                d3.select("#forceDirected")
                    .style("visibility","hidden");
                d3.select("#linechartGroup")
                    .style("visibility","hidden");
            })
        let forceDirected = this.drawerContent.append("text")
            .attr("id","forcedirectedButton")
            .attr("transform","translate(20,160)")
            .attr("class", "info")
            .text("Force Directed Graph")
            .on("click.log", function() { d3.event.stopPropagation(); })
            .on("click",d=>{
                d3.select("#comparisonDiv")
                    .style("visibility","hidden");
                d3.select("#yearline")
                    .style("visibility","hidden");
                d3.select("#forceDirected")
                    .style("visibility","initial");
                d3.select("#linechartGroup")
                    .style("visibility","hidden");
            })

        let scatterchart = this.drawerContent.append("text")
            .attr("id","sctterButton")
            .attr("transform","translate(20,190)")
            .attr("class", "info")
            .text("Distance vs Co-Publications")
            .on("click.log", function() { d3.event.stopPropagation(); })
            .on("click",d=>{
                d3.select("#comparisonDiv")
                    .style("visibility","hidden");
                d3.select("#yearline")
                    .style("visibility","hidden");
                d3.select("#forceDirected")
                    .style("visibility","hidden");
                d3.select("#linechartGroup")
                    .style("visibility","initial");
        })

    }
}