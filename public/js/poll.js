let pollingData;
let total=0;
$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "https://open.canada.ca/data/api/action/package_show?id=0bfdacb3-12fd-40e7-820b-87f269e9f191",
        dataType: "JSON",
        success: function(response){
            let article = response.result;
            console.log(article.title);
            let articles_contact = $("#articles");
            let ul = $("<ul>");
            let li = $("<li>");
            let a = $("<a>");
            a.attr("href","https://www.canada.ca/en/health-canada/services/food-nutrition/genetically-modified-foods-other-novel-foods/approved-products/novel-food-information-biscuits-leclerc-praeventia-cookies-wine-extract.html")
            a.append(article.title);
            li.append(a);
            ul.append(li);
            articles_contact.append(ul);
        }
    })
})
$.getJSON("./poll.json", function (data) {
	// console.log(data);
    pollingData = data;
    formatData();
    pieChartMaker();
})
function formatData(){
    let yesVotes = pollingData[0].votes;
    let noVotes = pollingData[1].votes;
    let unsureVotes = pollingData[2].votes;
    for(let i = 0; i<pollingData.length;i++)
    {
        total += pollingData[i].votes;
    }
    let yesPercent = yesVotes/total;
    let noPercent = noVotes/total;
    let unsurePercent = unsureVotes/total;
    pollingData[0]["percent"] = yesPercent*100;
    pollingData[1]["percent"] = noPercent*100;
    pollingData[2]["percent"] = unsurePercent*100;
    // console.log(pollingData);
}
function addYes(){
    pollingData[0].votes += 1;
    // console.log(pollingData);
    formatData();
    pieChartMaker();
}
function addNo(){
    pollingData[1].votes += 1;
    formatData();
    pieChartMaker();
}
function addUnsure(){
    pollingData[2].votes += 1;
    formatData();
    pieChartMaker();
}
function pieChartMaker() {
    let svg = d3.select("#pieChart"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        margin = 50,
        radius = Math.min(width,height)/2 - margin;

    let data = pollingData;      
    
    let g = svg.append("g")
               .attr("transform", `translate(${width/2},${height/2})`);
    
    let colourScale = d3.scaleOrdinal()
                        .domain(data)
                        .range(["#90ee90","#fa7f72","#d3e0ea"]);

    let pie = d3.pie().value(function(d){
        return d.percent;
    });

    let arc = g.selectAll("arc")
               .data(pie(data))
               .enter();

    let section = d3.arc()
                    .outerRadius(radius)
                    .innerRadius(50);

    arc.append("path")
       .attr("d", section)
       .attr("fill", function(d){
            return colourScale(d.data.choice);
       });

    let label = d3.arc()
                  .outerRadius(radius)
                  .innerRadius(radius-100);

    arc.append("text")
       .attr("transform", function(d){
            return `translate(${label.centroid(d)})`;
       })
       .text(function(d){
            return d.data.choice;
       })
       .style("font-size", 15)
       .style("text-anchor", "middle")
       .attr("dy", ".35em");
}

const app = Vue.createApp({
    computed : {
        originalCookieData() {
        return [
            {cookie: 'M&M', sales:693},
            {cookie: 'Snickerdoodle', sales:240},
            {cookie: 'Macademia Nut', sales:512},
            {cookie: 'Double Chocolate', sales:454},
            {cookie: 'Christmas', sales:361},
            {cookie: 'Oatmeal', sales:482},
            {cookie: 'Ginger', sales:410},
            {cookie: 'Easter', sales:286},
            {cookie: 'Brown Sugar', sales:378},
            {cookie: 'Chocolate Chip', sales:824},
            {cookie: 'Birthday Cake', sales:517},
            {cookie: 'Chocolate Dip', sales:389},
        ];  
        }
    },
    data() {
      return {
        sortedCookieData: [],
        showTable: true
      }
    },
    mounted(){
        this.sortedCookieData = this.originalCookieData;
        console.log(this.sortedCookieData);
    },
    methods: {
        toggleTable() {
            this.showTable = !this.showTable;
        },
        orderCookieNums(type){
            if(type == 'cookie')
            {
                this.sortedCookieData.sort((x,y) => (x[type] < y[type] ? -1 : 1));
            }
            else{
                this.sortedCookieData.sort((x,y) => (x[type] > y[type] ? -1 : 1));
            }
        },
        orderedCookies(type){
            return this.sortedCookieData.sort((x,y) => (x[type] > y[type] ? -1 : 1));
        }
      }
  }).mount('#app')