import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  overlay:{
    flex: 1,
    backgroundColor: theme.colors.overlay,
  },
  container: {  
    bottom: 0,
    width: '100%',
    height: '20%',
    position: 'absolute',
    backgroundColor: theme.colors.secondary80
  },
  textContent:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
  text:{
    fontFamily: theme.fonts.title500,
    color: theme.colors.heading,
    fontSize: 24,
    textAlign: 'center'
  },
  textGame:{
    marginLeft: 7,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 24
  },
  textPlay:{
    fontFamily: theme.fonts.title700,
    color: theme.colors.primary,
    fontSize: 24
  },
  textQuestionMark:{
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading,
    fontSize: 24 
  },
  buttonContainer:{
    flexDirection: 'row',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:24,
  },
  buttonCancel:{
    width: '35%',
    height: 40,
    borderColor: theme.colors.secondary30,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textCancel:{
    color: theme.colors.heading,
    fontSize: 15,
    fontFamily: theme.fonts.text500
  },
  buttonConfirm:{
    width: '35%',
    height: 40,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  textConfirm:{
    color: theme.colors.heading,
    fontSize: 15,
    fontFamily: theme.fonts.text500 
  }
});