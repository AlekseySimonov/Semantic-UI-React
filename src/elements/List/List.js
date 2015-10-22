import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import META from 'src/utils/Meta';

export default class List extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static _meta = {
    library: META.library.semanticUI,
    name: 'List',
    type: META.type.element,
  };

  render() {
    const classes = classNames('sd-list', 'ui', this.props.className, 'list');
    return (
      <div {...this.props} className={classes}></div>
    );
  }
}
