import { decl } from 'bem-react-core';
import React from 'react';
import PropTypes from 'prop-types';

import Row from 'e:Row';

export default decl(
    {
        block: 'Table',
        elem: 'Head',
        tag: 'thead',

        content({ headers }) {
            return <Row columns={headers} isHead={true} />;
        },
    },
    {
        propTypes: {
            headers: PropTypes.array,
        },
    }
);
