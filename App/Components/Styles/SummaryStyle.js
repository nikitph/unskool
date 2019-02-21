import styleVariables from '../../Themes/Variables';

const summary = {};

summary.container = {
  backgroundColor: 'white',
height: 200}

summary.raitingsAndComments = {
  display: 'flex',
  flexDirection: 'row',
  marginBottom: 1,
  paddingLeft: 16,
}

summary.raitings = {
  display: 'flex',
  flexDirection: 'row'
}

summary.comments = {
  display: 'flex',
  flexDirection: 'row'
}

summary.summaryCopy = {
  color: styleVariables.mc2fontGray,
  paddingLeft: 16,
  paddingRight: 16,
  marginBottom: 9
}

summary.greetingContainer = {
  paddingTop: 10,
  paddingBottom: 8,
}

summary.summaryBodyCopy = {
  marginBottom: 12
}

summary.tagItem = {
  backgroundColor: styleVariables.mc2BlueElectric,
  height: 30,
  padding: 4,
  paddingLeft: 10,
  paddingRight: 10,
  margin: 4
}

summary.ellipsis = {
  backgroundColor: 'gray',
  padding: 8,
  paddingLeft: 15,
  paddingRight: 15,
  borderRadius: 16,
  marginRight: 4,
  margin: 4
}

summary.tagItemCopy = {
  color: 'white',
  fontWeight: '500'
}

export default summary;
