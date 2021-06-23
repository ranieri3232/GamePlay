import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";


export const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  header:{
    paddingHorizontal: 20,
    marginTop: 22 + getStatusBarHeight(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 42
  },
  content: {
    marginTop: 42,
  },
  matches:{
    marginTop: 24,
    marginLeft: 24,
  }
});