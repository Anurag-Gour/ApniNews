import React, { Component } from 'react'
import Loading from "./Loader.gif"
export default class Loader extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={Loading} alt="loading" />
      </div>
    )
  }
}
