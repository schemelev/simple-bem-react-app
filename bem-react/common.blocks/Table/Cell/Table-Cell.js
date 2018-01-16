import { decl } from 'bem-react-core';
import React from 'react';
import PropTypes from 'prop-types';

export default decl(
    {
        block: 'Table',
        elem: 'Cell',
        tag: 'td',

        mods({ isHead }) {
            return { isHead };
        },

        content({ column }) {
            return column;
        },
    },
    {
        propTypes: {
            isHead: PropTypes.bool,
            column: PropTypes.any,
        },
    }
);
