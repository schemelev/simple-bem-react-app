import { decl } from 'bem-react-core';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Head from 'e:Head';
import Body from 'e:Body';

export default decl(
    {
        block: 'Table',
        tag: 'table',

        mods({ theme }) {
            return { theme };
        },

        content(props) {
            return (
                <Fragment>
                    {this._getHead(props)}
                    {this._getBody(props)}
                </Fragment>
            );
        },

        _getHead({ headers }) {
            return headers ? <Head key="h" headers={headers} /> : null;
        },

        _getBody({ rows }) {
            return rows ? <Body key="b" rows={rows} /> : null;
        },
    },
    {
        propTypes: {
            headers: PropTypes.array,
            rows: PropTypes.array.isRequired,
            theme: PropTypes.oneOf(['v1']),
        },
    }
);
