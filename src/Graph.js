import React, { PureComponent } from 'react';
import CanvasJSReact from './canvasjs.stock.react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";

var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

class Graph extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      title: "ashokley",
    };
    this.toggleData = this.toggleData.bind(this);
  }

  async toggleData(name) {
    try{
      let url = "https://stock-data-api-v1.herokuapp.com/api/v1/" + name;
      let dataPoints = [];
      let Data = await axios.get(url);
      let data = Data.data.data.allData;
      let i;
      for (i = 0; i < data.length; i++) {
        dataPoints.push({
          x: new Date(data[i].Date),
          y: Number(data[i].Close),
        });
      }
      if (i === data.length) {
        this.setState({
          data: dataPoints,
          title: name,
        });
      }
    }catch(err){
      alert("You must be logged in to view this page");
    }
    
  }

  render() {
    var options = {
      title: {
        text: this.state.title,
      },
      charts: [
        {
          data: [
            {
              type: "line",
              dataPoints: this.state.data,
            },
          ],
        },
      ],
      navigator: {
        data: [
          {
            dataPoints: this.state.data,
          },
        ],
        slider: {
          minimum: new Date(2015, 2, 1),
          maximum: new Date(2021, 1, 1),
        },
      },
    };

    return (
      <div>
        <div className="dropdown mt-2 mb-5 ml-2 ">
          <button
            className="btn btn-info dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.state.title}
          </button>
          <div
            className="dropdown-menu border border-info bg-info"
            aria-labelledby="dropdownMenuButton"
          >
            <button
              onClick={() => this.toggleData("AshokLey")}
              className="dropdown-item h5"
            >
              AshokLey
            </button>
            <button
              onClick={() => this.toggleData("Cipla")}
              className="dropdown-item h5"
            >
              Cipla
            </button>
            <button
              onClick={() => this.toggleData("Eichermot")}
              className="dropdown-item h5"
            >
              Eichermot
            </button>
            <button
              onClick={() => this.toggleData("Reliance")}
              className="dropdown-item h5"
            >
              Reliance
            </button>
            <button
              onClick={() => this.toggleData("TataSteel")}
              className="dropdown-item h5"
            >
              TataSteel
            </button>
          </div>
        </div>
        <CanvasJSStockChart
          options={options}
          style={{ height: "600px", width: "100%" }}
        />
      </div>
    );
  }
  async componentDidMount() {
    try{
      let dataPoints = [];
      let Data = await axios.get("https://stock-data-api-v1.herokuapp.com/api/v1/ashokley");
      let data = Data.data.data.allData;
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        dataPoints.push({
          x: new Date(data[i].Date),
          y: Number(data[i].Close),
        });
      }
      this.setState({
        data: dataPoints,
      });
      console.log(this.state.data);
    }catch(err){
      alert("You must be logged in to view this page");
    }
  }
}

export default Graph;