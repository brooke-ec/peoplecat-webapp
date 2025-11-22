/***
 * Represents a generic error in the Peoplecat SDK.
 */
export class PeoplecatError extends Error {}

/***
 * Represents an error with the connection to the Peoplecat backend.
 */
export class PeoplecatConnectionError extends PeoplecatError {}
