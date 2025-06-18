module.exports = async function handleAppSync(event, context) {
  /* AppSync fields:
   - event.arguments
   - event.identity
   - event.info.fieldName, parentTypeName, selectionSetList
  */
  console.log('AppSync field:', event.info.fieldName);
  return null;
}

