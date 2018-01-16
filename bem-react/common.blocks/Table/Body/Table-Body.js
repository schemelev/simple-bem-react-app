import { decl } from 'bem-react-core';
import React from 'react';
import PropTypes from 'prop-types';

import Row from 'e:Row';

export default decl(
    {
        block: 'Table',
        elem: 'Body',
        tag: 'tbody',

        content({ rows }) {
            return (rows || []).map((columns, index) => (
                <Row key={this._getRowKey(columns, index)} columns={columns} />
            ));
        },

        _getRowKey(columns, index) {
            return columns.Id ? columns.Id : `idx-${index}`;
        },
    },
    {
        propTypes: {
            rows: PropTypes.array.isRequired,
        },
    }
);
