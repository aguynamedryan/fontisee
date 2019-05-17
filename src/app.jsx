import React from 'react';

function FontSize(props) {
  return (
    <div className="font-size">
      <input
        label="Font Size"
        type="number"
        onChange={props.onChange}
        value={props.fontSize} />
    </div>
  )
}

function SampleText(props) {
  return (
    <div className="sample-text">
      <textarea
        label="Sample Text"
        onChange={props.onChange}
        value={props.sampleText} />
    </div>
  )
}

function FontSample(props) {
  return (
    <div
      className="font-sample"
    >
      <p className="font-title">{props.fontName}</p>
      <p
        className="font-example"
        style={{
        fontFamily: props.fontName,
          fontSize: props.fontSize
      }}>
        {props.sampleText}
      </p>
    </div>
  );
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    let fm = require('font-manager')
    let compareFonts = (a, b) => {
      let aName = a.postscriptName;
      let bName = b.postscriptName;
      if (aName < bName) {
        return -1;
      }

      if (aName > bName) {
        return 1;
      }

      return 0;
    }
    this.state = {
      fonts: fm.getAvailableFontsSync().slice().sort(compareFonts),
      sampleText: "The Quick Brown Fox Jumped Over the Lazy Dog",
      fontSize: 18
    }

    this.handleSampleTextChange = this.handleSampleTextChange.bind(this)
    this.handleFontSizeChange = this.handleFontSizeChange.bind(this)
  }

  renderFontSample(font) {
    return (
      <FontSample
        key={font.postscriptName}
        sampleText={this.state.sampleText}
        fontName={font.postscriptName}
        fontSize={this.state.fontSize}
      />
    );
  }

  handleSampleTextChange(event) {
    this.setState({sampleText: event.target.value})
  }

  handleFontSizeChange(event) {
    this.setState({fontSize: parseInt(event.target.value, 10)})
  }

  render() {
    const fontSamples = this.state.fonts.map((font) => {
      return (this.renderFontSample(font));
    });

    return (
      <div>
        <div>
          <h2>Welcome to Your Fontisee!</h2>
        </div>
        <SampleText onChange={this.handleSampleTextChange} sampleText={this.state.sampleText} />
        <FontSize onChange={this.handleFontSizeChange} fontSize={this.state.fontSize} />
        <div>
          {fontSamples}
        </div>
      </div>
    );
  }
}
