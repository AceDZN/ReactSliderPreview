import React,{ Component } from 'react';
import './ForkBanner.css';
export default class ForkBanner extends Component {
  render() {
    return (
      <a className="fork-me" href={this.props.url} target={this.props.target}>
        <img
          src="https://www.acedzn.com/outer_resources/images/fork_me.svg"
          alt="Fork me on GitHub"
          data-canonical-src="https://www.acedzn.com/outer_resources/images/fork_me.svg"
          />
      </a>
    );
  }
}
ForkBanner.defaultProps = {
  url: 'https://github.com/AceDZN',
  target:"_blank"
};
