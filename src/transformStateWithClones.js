'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let prevState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      let stateCopy = { ...prevState };

      stateCopy = Object.assign(stateCopy, action.extraData);
      history.push({ ...stateCopy });
      prevState = stateCopy;
    } else if (action.type === 'removeProperties') {
      const stateCopy = { ...prevState };

      for (const key of action.keysToRemove) {
        delete stateCopy[key];
      }
      prevState = stateCopy;
      history.push({ ...stateCopy });
    } else if (action.type === 'clear') {
      prevState = {};
      history.push({ ...prevState });
    }
  }

  return history;
}

module.exports = transformStateWithClones;
