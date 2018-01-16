import { decl } from 'bem-react-core';
import React from 'react';
import PropTypes from 'prop-types';

import Cell from 'e:Cell m:isHead';

export default decl(
    {
        block: 'Table',
        elem: 'Row',
        tag: 'tr',

        mods({ isHead }) {
            return { isHead };
        },

        content({ columns, isHead }) {
            return (columns || []).map((column, index) => {
                return <Cell key={`cel-${index}`} isHead={isHead} column={column} />;
            });
        },
    },
    {
        propTypes: {
            isHead: PropTypes.bool,
            columns: PropTypes.array.isRequired,
        },
    }
);
