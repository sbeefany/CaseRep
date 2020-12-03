import React from "react";
import Chart from "react-google-charts";


const pieOptions = {
  title: "",
  pieHole: 0.6,
  slices: [
    {
      color: "#2BB673"
    },
    {
      color: "#d91e48"
    },
    {
      color: "#007fad"
    },
    {
      color: "#e9a227"
    }
  ],
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "233238",
      fontSize: 14
    }
  },
  tooltip: {
    showColorCode: true
  },
  chartArea: {
    left: 0,
    top: 0,
    width: "100%",
    height: "80%"
  },
  fontName: "Roboto"
};
const Diagramm = (props) => {
 
  const done = () => {
    let sum = 0;
    for (let i = 0; i< props.tasks.length; i++){
        if (props.tasks[i].status === 1){
            sum = sum + 1
        }
    }
    return sum
  }
  const Notdone = () => {
    let sum = 0;
    for (let i = 0; i < props.tasks.length; i++){
        if (props.tasks[i].status !== 1){
            sum = sum + 1
        }
    }
    return sum
  }
  console.log(props.curentProjectRender)
  
    return (
      <div className="App">
        <Chart
          chartType="PieChart"
          data={[["Age", "Weight"], ["Выполненно", done()], ["Не выполненно", Notdone()]]}
          options={pieOptions}
          graph_id="PieChart"
          width={"100%"}
          height={"400px"}
          legend_toggle
        />
      </div>
    );
  }



export default Diagramm