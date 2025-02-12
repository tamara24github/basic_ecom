import Paragraph from './common/Paragraph'

function Footer() {
  return (
    <footer className="flex justify-center w-full mb-2">
      <Paragraph size="md" color="black">
        © {new Date().getFullYear()} John Doe All rights reserved.
      </Paragraph>
    </footer>
  )
}

export default Footer
