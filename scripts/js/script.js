async function worldMapLoadData() {
    // Load in GeoJSON and filliation data 
    let world = await d3.json("data/world.json");
    let world_aff = await d3.csv("data/world-affiliationsSub.csv");
    let pop = await d3.csv('data/pop.csv');
    let collabDetails = await d3.json('data/collaborationsDetails.json');
    let inslist = await d3.csv("data/insList.csv");

    return {
        'world':world,
        'world_aff':world_aff,
        'population': pop,
        'collabDetails': collabDetails,
        'inslist': inslist.map(d=>d.aff_name)
    };

};

// worldMap();

// d3.json('data/confArticles.json').then(articleData => {
//     console.log(articleData);
// });

d3.json('data/collaborations.json').then(collData => {
    d3.csv("data/world-affiliationsSub.csv").then(worldAff => {
        // console.log(Object.keys(collData));
        collNames = Object.keys(collData);
        // console.log(worldAff);
    }

    );
    
    // console.log(collData);
    // let chart = new connChar(collData);
    //chart.create_chart();
});

d3.json('data/collaborationsDetails.json').then(collDeData => {
    d3.csv("data/insList.csv").then(inslist =>{
        console.log(collDeData);
        
        
        let table = new comparsion(collDeData);
        table.create_comparsion();

        worldMapLoadData().then(data => {
            this.activeUniv = undefined;
            this.activeYear = undefined;
            this.activeunivList = undefined;
            let that = this
        
            function updateUniv(univName) {
                if(typeof(univName)==='string'){
                    that.activeUniv = univName
                    infoBox.updateInfoBox(univName, that.activeYear);
                    worldMap.updateMap(univName, that.activeYear)
                } else {
                    that.activeunivList = univName;
                    forceDirected.updateGraph(univName, that.activeYear);
                }
                
            }

            function updateYear(yearArray) {
                that.activeYear = yearArray

                infoBox.updateInfoBox(that.activeUniv, yearArray);
                worldMap.updateMap(that.activeUniv, yearArray);
                forceDirected.updateGraph(that.activeunivList, yearArray);
            }

            const forceDirected = new ForceDirected(data.collabDetails, updateUniv, updateYear);
            forceDirected.drawGraph();
            // forceDirected.updateGraph(["University of Minnesota", "University of Kentucky", "Purdue University", "Michigan State University", "University of Wisconsin - Madison", "University of Illinois at Chicago", "Northwestern University", "Univ. of Illinois at Urbana-Champaign", "Illinois Institute of Technology", "University of Chicago", "Indiana University", "University of Kansas", "Iowa State University", "Washington University in St. Louis", "Missouri University of Technology", "University of Notre Dame", "University of Iowa"],['2015','2016','2017']);
        
            const worldMap = new Map(data.world,data.world_aff,data.population,data.collabDetails, updateUniv, updateYear, table, forceDirected);
            worldMap.drawMap();
            worldMap.updateMap(undefined,undefined);
            
            const infoBox = new InfoBox(data.collabDetails, data.inslist, updateUniv, updateYear);
            infoBox.drawInfoBox();
            // infoBox.updateInfoBox("Carnegie Mellon University",['2015','2016','2017']);

            
        });


    });
    
});

