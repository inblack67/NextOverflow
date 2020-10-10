import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import syntaxTheme from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

const CodeBlocks = ({ language, value }) => {
  return (
    <Fragment>
      <SyntaxHighlighter language={language} style={syntaxTheme}>
        {value}
      </SyntaxHighlighter>
    </Fragment>
  );
};

CodeBlocks.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string,
};

export default CodeBlocks;
