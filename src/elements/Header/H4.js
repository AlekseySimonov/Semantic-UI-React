import React, {Component} from 'react';
import META from 'src/utils/Meta';
import _Header from './_Header';

export default class H4 extends Component {
  static _meta = {
    library: META.library.semanticUI,
    name: 'H4',
    type: META.type.element,
  };

  render() {
    return (
      <_Header {...this.props} _headerElement='h4'/>
    );
  }
}
