import { declMod } from 'bem-react-core';

export default declMod(({ isHead }) => isHead, {
    block: 'Table',
    elem: 'Cell',

    tag: 'th',
});
