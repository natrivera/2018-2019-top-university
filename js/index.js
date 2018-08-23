//SOURCE DATA
//http://time.com/money/best-colleges/
var states = {
  0:{"name":"Alabama","abbrev":"AL","fips":"01" , "count": 0},
  1:{"name":"Alaska","abbrev":"AK","fips":"02" , "count": 0},
  2:{"name":"Arizona","abbrev":"AZ","fips":"04" , "count": 0},
  3:{"name":"Arkansas","abbrev":"AR","fips":"05" , "count": 0},
  4:{"name":"California","abbrev":"CA","fips":"06" , "count": 0},
  5:{"name":"Colorado","abbrev":"CO","fips":"08" , "count": 0},
  6:{"name":"Connecticut","abbrev":"CT","fips":"09" , "count": 0},
  7:{"name":"Delaware","abbrev":"DE","fips":"10" , "count": 0},
  8:{"name":"District of Columbia","abbrev":"DC","fips":"11" , "count": 0},
  9:{"name":"Florida","abbrev":"FL","fips":"12" , "count": 0},
  10:{"name":"Georgia","abbrev":"GA","fips":"13" , "count": 0},
  11:{"name":"Hawaii","abbrev":"HI","fips":"15" , "count": 0},
  12:{"name":"Idaho","abbrev":"ID","fips":"16" , "count": 0},
  13:{"name":"Illinois","abbrev":"IL","fips":"17" , "count": 0},
  14:{"name":"Indiana","abbrev":"IN","fips":"18" , "count": 0},
  15:{"name":"Iowa","abbrev":"IA","fips":"19" , "count": 0},
  16:{"name":"Kansas","abbrev":"KS","fips":"20" , "count": 0},
  17:{"name":"Kentucky","abbrev":"KY","fips":"21" , "count": 0},
  18:{"name":"Louisiana","abbrev":"LA","fips":"22" , "count": 0},
  19:{"name":"Maine","abbrev":"ME","fips":"23" , "count": 0},
  20:{"name":"Maryland","abbrev":"MD","fips":"24" , "count": 0},
  21:{"name":"Massachusetts","abbrev":"MA","fips":"25" , "count": 0},
  22:{"name":"Michigan","abbrev":"MI","fips":"26" , "count": 0},
  23:{"name":"Minnesota","abbrev":"MN","fips":"27" , "count": 0},
  24:{"name":"Mississippi","abbrev":"MS","fips":"28" , "count": 0},
  25:{"name":"Missouri","abbrev":"MO","fips":"29" , "count": 0},
  26:{"name":"Montana","abbrev":"MT","fips":"30" , "count": 0},
  27:{"name":"Nebraska","abbrev":"NE","fips":"31" , "count": 0},
  28:{"name":"Nevada","abbrev":"NV","fips":"32" , "count": 0},
  29:{"name":"New Hampshire","abbrev":"NH","fips":"33" , "count": 0},
  30:{"name":"New Jersey","abbrev":"NJ","fips":"34" , "count": 0},
  31:{"name":"New Mexico","abbrev":"NM","fips":"35" , "count": 0},
  32:{"name":"New York","abbrev":"NY","fips":"36" , "count": 0},
  33:{"name":"North Carolina","abbrev":"NC","fips":"37" , "count": 0},
  34:{"name":"North Dakota","abbrev":"ND","fips":"38" , "count": 0},
  35:{"name":"Ohio","abbrev":"OH","fips":"39" , "count": 0},
  36:{"name":"Oklahoma","abbrev":"OK","fips":"40" , "count": 0},
  37:{"name":"Oregon","abbrev":"OR","fips":"41" , "count": 0},
  38:{"name":"Pennsylvania","abbrev":"PA","fips":"42" , "count": 0},
  39:{"name":"Rhode Island","abbrev":"RI","fips":"44" , "count": 0},
  40:{"name":"South Carolina","abbrev":"SC","fips":"45" , "count": 0},
  41:{"name":"South Dakota","abbrev":"SD","fips":"46" , "count": 0},
  42:{"name":"Tennessee","abbrev":"TN","fips":"47" , "count": 0},
  43:{"name":"Texas","abbrev":"TX","fips":"48" , "count": 0},
  44:{"name":"Utah","abbrev":"UT","fips":"49" , "count": 0},
  45:{"name":"Vermont","abbrev":"VT","fips":"50" , "count": 0},
  46:{"name":"Virginia","abbrev":"VA","fips":"51" , "count": 0},
  47:{"name":"Washington","abbrev":"WA","fips":"53" , "count": 0},
  48:{"name":"West Virginia","abbrev":"WV","fips":"54" , "count": 0},
  49:{"name":"Wisconsin","abbrev":"WI","fips":"55" , "count": 0},
  50:{"name":"Wyoming","abbrev":"WY","fips":"56" , "count": 0}
};

var colors = [ "#ccccff" , "#9999ff" , "#6666ff" , "#3232ff" , "#0000ff" , "#000099"];

var dataURL = "https://raw.githubusercontent.com/natrivera/2016_votes_by_county/master/2018-2019-money-mag-best-uni.csv";
var dataSet;
var starter = 0;
var topNumber = 0;
var stateCount = [];
var stateQuart = [];
var colorKey = [];
var statOBJ = [];
var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .attr("id", "tooltip")
            .style("opacity", 0);

function getData() {
  //
  //Get THE DATA
  var req=new XMLHttpRequest();
  req.open("GET", dataURL ,true);
  req.send();
  req.onload=function(){
    dataSet = csvJSON(req.responseText); 
    
  };
  //
  //end of getting data
}//end of getData

function getStats(num) {
  
  //reset the count
  for(var n = 0; n < 51; n++) {
    states[n].count = 0;
  }
  
  //parse out the number from the button
  num = parseInt(num);
 
  //if user chooses all
  if(num === 0) {
    num = dataSet.length - 1;
  }
  
  //loop through the data and count
  for(var l = 0; l < num; l++) {
    for(var j = 0; j < 51; j++) {
      var temp = dataSet[l].State.toString().trim();
      var temp1 = states[j].abbrev.toString().trim();
      if( temp == temp1) {
        states[j].count++;
      }
    }
  }//end of for loop
  
  // load stateCount
  stateCount = [];
  for(var m = 0; m < 50; m++) {
    stateCount.push(states[m].count);
  }
  stateQuart = jStat.quantiles(stateCount , [0.25 , 0.40 , 0.5 , 0.75 , 0.90]);
  //console.log(stateQuart);
  for(var x = 0; x < stateQuart.length; x++) {
    if(stateQuart[x] === 0) {
      stateQuart.splice(x , 1);
      x--;
    }
  }
  //console.log(stateQuart);
  var base = colors.length - stateQuart.length - 1;
  colorKey = [];
  for(var p = 0; p < stateQuart.length; p++) {
   colorKey.push([ stateQuart[p] , colors[base + p] ]);
  }
  colorKey.push([ d3.max(stateCount) + 1 , colors[colors.length -1] ]);
  //console.log(colorKey);  
  //remove old table
  d3.selectAll("tr").remove();
  
  //add new table  headers
  var table = d3.select("#info");
  var th = table.append("tr");
    th.append("th").html("Rank");
    th.append("th").html("College");
    th.append("th").html("Price").attr("title" , "Est. price 2018-19 without aid");
    th.append("th").html("Cost").attr("title" , "Est. price 2018-19 with avg. grant");
    th.append("th").html("Grant %").attr("title" , "% with need who get grants");
    th.append("th").html("Student Debt").attr("title" , "Average Student Debt");
    th.append("th").html("Early Earnings").attr("title" , "Early Career Earnings");
  
  //add table details
  for(var i = 0; i < num; i++) {
    //parse out the data from the array
    var price = dataSet[i].price;
    price = parseInt(price).toLocaleString();
    var grantPrice = dataSet[i].price_with_avg_grant;
    grantPrice = parseInt(grantPrice).toLocaleString();
    var pergrants = dataSet[i].students_with_need_who_get_grants * 100;
    var debt = dataSet[i].Average_Student_Debt;
    debt = parseInt(debt).toLocaleString();
    var earn = dataSet[i].Early_career_earnings;
    earn = parseInt(earn).toLocaleString();
    
    var tr = table.append("tr");
      tr.append("td").html(i + 1);
      tr.append("td").html("<strong>" + dataSet[i].College +"</strong><br>"+
                          dataSet[i].City +", "+dataSet[i].State);
      tr.append("td").html("$" + price);
      tr.append("td").html("$" + grantPrice); 
      tr.append("td").html(pergrants + "%"); 
      tr.append("td").html("$" + debt);
      tr.append("td").html("$" + earn);
  }//end of adding table details
  
  table.attr("class" , "table table-primary table-striped table-hover");
  
}//end of getStats

run(0);

function run(num) {
  
  
  d3.selectAll("button").attr("class" , "button-unchecked");
  d3.select("#button-" + num).attr("class" , "button-checked");
  
  if(starter === 0) {
    //first run get all data ad stats
    getData();
    starter++;
    setTimeout(function() {
      getStats(num);
    },400);
  } else {
    //not first run get selected stats
    getStats(num);
  } 
  
  setTimeout(function() {
    loadSVG();
  },1000);
  
}//end of run

function loadSVG() {
  //remove the old map
  d3.selectAll("svg").remove();
  
  var path = d3.geoPath();
  
  var w = 960;
  var h = 600;
  var padding = 50;
  var svg = d3.select("#chart")
              .append("svg")
              .attr("width" , w)
              .attr("height" , h);
  

  //go into data and start building map
    d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
      if (error) throw error;

      //for each element in the data add a county
      svg.append("g")
          .selectAll("path")
          .data(topojson.feature(us, us.objects.states).features)
          .enter()
          .append("path")
          .attr("class", "state")
          .attr("d", path) 
          .attr("id" , (d) => "state-path-" + d.id)
          .attr("fill" , (d) => getColor(d.id))
          .attr("data-fips" , (d) => d.id)
          .on("mouseover" , (d) => {
            tooltip.style("opacity" , 1)
                    .html(getText(d.id));
            d3.select("#state-path-" + d.id).attr("class" , "state-active");
            //d3.select("#state-" + d.id)
            //  .attr("opacity" , 0)
            //  .attr("x", (d) => path.centroid(d)[0] + 100 )
            //  .attr("y", (d) => path.centroid(d)[1] + 100 );
          })
          .on("mousemove" , (d) => {
            tooltip.style("left" , d3.event.pageX - 200 + "px" )
                   .style("top" , d3.event.pageY - 133 + "px" );
          })
          .on("mouseout" , (d) => {
              tooltip.style("opacity" , 0)
                    .style("top" , "-500px");
              d3.select("#state-path-" + d.id).attr("class" , "");
             // d3.select("#state-" + d.id)
             //   .attr("x", (d) => path.centroid(d)[0] )
             //   .attr("y", (d) => path.centroid(d)[1] )
             //   .attr("opacity" , 1);
           
          })
          .on("click" , (d) => {
              stateTable(d.id);
          });//end of adding counties
      
      // add state count
       svg.append("g")
        .attr("class", "states-names")
        .selectAll("text")
        .data(topojson.feature(us, us.objects.states).features)
        .enter()
        .append("svg:text")
        .text( (d) => getCountBuffer() + getCount(d.id) )
        .attr("id" , (d) => "state-" + d.id)
        .attr("x", (d) => path.centroid(d)[0] )
        .attr("y", (d) => path.centroid(d)[1] )
        .attr("text-anchor","middle")
        .attr("font-size" , ".75em")
        .attr('fill', 'white')
        .on("mouseover" , (d) => {
            tooltip.style("opacity" , 1) 
            .html(getText(d.id));
            d3.select("#state-path-" + d.id).attr("class" , "state-active");
        })
       .on("mousemove" , (d) => {
            tooltip.style("left" , d3.event.pageX - 200 + "px" )
                   .style("top" , d3.event.pageY - 133 + "px" );
       })
       .on("mouseout" , (d) => {
         d3.select("#state-path-" + d.id).attr("class" , "");
       })
       .on("click" , (d) => {
              stateTable(d.id);
       });
 
  //add state borders    
  svg.append("path")
          .attr("class", "state-borders")
          .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
      
    });//end of getJSON
  
    // add legend
    svg.append("g")
     .selectAll("rect")
     .data(colorKey)
     .enter()
     .append("rect")
     .attr("class", "legend")
     .attr("height" , "25px")
     .attr("width" , "25px")
     .attr("x" , (d,i) => w-padding +"px")
     .attr("y" , (d,i) => h - (4*padding) + (25*i) +"px")
     .attr("fill" , (d , i) => d[1]);
  
  svg.append("g")
    .selectAll("text")
    .attr("id" , "legend-text")
    .data(colorKey)
    .enter() 
    .append("text")
    .attr("height" , 15)
    .attr("width" , 35)
    .attr("x" , (d , i) =>  w-20 +"px")
    .attr("y" , (d,i) => h - (4*padding) + (25*i) + 30 +"px" )
    .attr("fill" , "red")
    .attr("font-weight"  , "bold")
    .text((d) => parseInt(d[0]))
    .attr("font-size" , "1em");
  
  
  
  
}//end of loadSVG

function closeDiv() {
  d3.select("#popup").style("display" , "none");
}

function stateTable(id) {
  tooltip.style("opacity" , 0)
    .style("top" , "-500px");
  var st = "";
  var stateName = "";
  for(var i = 0; i < 51; i++) {
    if(id == states[i].fips) {
      st = states[i].abbrev;
      stateName = states[i].name;
    }
  }//end of get state abbr
  
  var tab = d3.select("#topState");
  tab.html("");
  var tr = tab.append("tr");
    tr.append("th").html("Pos.");
    tr.append("th").html("College");
    tr.append("th").html("Rank");
  var pos = 0;
  var enter = true;
  for(var t = 0; t < 10; t++) {
    enter = true;  
    while(pos < dataSet.length - 1 && enter) {      
      if(st == dataSet[pos].State.trim()) {
        tr = tab.append("tr");
        tr.append("td").html(t+1);
        tr.append("td").html(dataSet[pos].College);
        tr.append("td").html(pos + 1);
        enter = false;
      }
      pos++;
    }
  }
  d3.select("#toptenName").html(stateName + "'s Top Universities");
  d3.select("#popup").style("display" , "block");
  tab.attr("class" , "table-sm");
}

function getX(num) {
  var ex = num;
  if(num > 700) {
    ex = num - 150;
  }
  return ex;
}

function getText(id) {
 var out = states[0].fips;
  for(var i = 0; i < 51; i++) {
    if(id == states[i].fips) {
      out = "<h3>" + states[i].name + " (" + states[i].count + ")</h3>";
    }
  }
  out += "<p>Top Ranked: " + topUni(id) + "</p>";
  return out;
}//

function topUni(id) {
  var out = "N/A";
  var st = "";
  for(var i = 0; i < 51; i++) {
    if(id == states[i].fips) {
      st = states[i].abbrev;
    }
  }//end of get state abbr
  
  for(var k = 0; k < dataSet.length -1; k++) {
    if(st == dataSet[k].State.trim()) {
      out = "(" + (k + 1) + ")<br>" + dataSet[k].College ;
      return out;
    }
  }//end of for loop
 return out;
}

function getColor(id) {
  var out = "#0000FF";
  var number = getCount(id);
  for(var b = 0; b < colorKey.length; b++) {
    if(number < colorKey[b][0]) {
      out = colorKey[b][1];
      return out;
    }
  }
 return out;
}

function getCount(id) {
  var out = 0;
  for(var i = 0; i < 51; i++) {
    if(id == states[i].fips) {
      out = states[i].count;
    }
  }
  return out;
}//end of getCount

function getCountBuffer(id) {
  var out = "";
  
  return out;
}

function getState(id) {
  var out = states[0].fips;
  for(var i = 0; i < 51; i++) {
    if(id == states[i].fips) {
      out = states[i].name + " " + states[i].count;
    }
  }
  return out;
}

//var csv is the CSV file with headers
function csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

	  var obj = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);

  }
  
  //return result; //JavaScript object
  return result; //JSON
}
