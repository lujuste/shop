import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#203040',
    '& a': {
      color: '#fffff',
      marginLeft: 10,
    },
  },
  main: {
    minHeight: '80vh',
  },

  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: 'white',
  },

  grow: {
    flexGrow: 1,
  },

  footer: {
    textAlign: 'center',
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
})

export default useStyles
