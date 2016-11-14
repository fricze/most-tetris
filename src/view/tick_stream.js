import { periodic } from 'most';

const tick$ = periodic(1000, 1);

export default tick$;
