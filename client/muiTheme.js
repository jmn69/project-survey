import { MuiThemeProvider, createMuiTheme, createTypography } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import blue from 'material-ui/colors/blue';
import lightBlue from 'material-ui/colors/lightBlue';
import red from 'material-ui/colors/red';
import orange from 'material-ui/colors/orange';
import grey from 'material-ui/colors/grey';


const palette = createPalette({
    primary: lightBlue,
    accent: orange,
    error: red
});

// const MuiFormLabel = {
//     focused: {
//         color: palette.text.primary
//     }
// }

const theme = createMuiTheme({
    palette: palette,
    // overrides: {
    //     MuiFormLabel
    // }
});

export default theme;