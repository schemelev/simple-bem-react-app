import { decl } from 'bem-react-core';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Head from 'e:Head';
import Body from 'e:Body';

export default decl(
    {
        block: 'Table',
        tag: 'table',

        content({ headers, rows }) {
            return (
                <Fragment>
                    {this._getHead(headers)}
                    {this._getBody(rows)}
                </Fragment>
            );
        },

        _getHead(headers) {
            return headers ? <Head key="h" headers={headers} /> : null;
        },

        _getBody(rows) {
            return rows ? <Body key="b" rows={rows} /> : null;
        },
    },
    {
        propTypes: {
            headers: PropTypes.array,
            rows: PropTypes.array.isRequired,
        },
    }
);
