import { Text } from '@mantine/core'

const Footer = () => {
  /** @type {React.CSSProperties} */
  const style = {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  }

  const yearNow = new Date().getFullYear()
  const yearText = '2024' + (yearNow > 2024 ? `-${yearNow}` : '')

  return (
    <footer style={style}>
      <Text size='sm'>Copyright &copy; {yearText} Pyry Lahtinen</Text>
    </footer>
  )
}

export default Footer
